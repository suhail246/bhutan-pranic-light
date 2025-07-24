import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import TrainingCoursePackageModel from "@/model/courses/packages/CoursePackage";
import TrainingCourseModel from "@/model/courses/TrainingCourse";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import escapeStringRegexp from "escape-string-regexp";
import mongoose from "mongoose";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const course = searchParams.get("course");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page"));
    const pageSize = parseInt(searchParams.get("pageSize"));
    const status = searchParams.get("status");
    const featured = searchParams.get("featured");

    // Validate Category and User IDs
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.PACKAGES.VIEW_ALL_PACKAGES],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Create find query
    const searchQuery = escapeStringRegexp(search || "");
    const query = {
      ...(searchQuery && {
        $or: [
          { packageTitle: { $regex: searchQuery, $options: "i" } },
          {
            coursePackageType: { $regex: searchQuery, $options: "i" },
          },
        ],
      }),
      ...(course &&
        mongoose.Types.ObjectId.isValid(course) && { courseId: course }),
      ...(status && {
        isActive: status === "true", // Convert to boolean
      }),
      ...(featured && {
        isFeatured: featured === "true", // Convert to boolean
      }),
    };

    // Get all course packages
    const coursePackagesList = await TrainingCoursePackageModel.find(query)
      .populate({
        path: "courseId",
        model: TrainingCourseModel,
        select: "title slug",
      })
      .select(
        "packageTitle courseId coursePackageType isActive isFeatured createdAt updatedAt"
      )
      .sort({ updatedAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    // Pagination
    const paginationTotalPackages =
      await TrainingCoursePackageModel.countDocuments(query).exec();
    const totalItemsCount =
      await TrainingCoursePackageModel.countDocuments().exec();
    const paginationData = {
      currentPage: page,
      currentLimit: pageSize,
      totalPages: Math.ceil(paginationTotalPackages / pageSize),
      totalItemsPerQuery: paginationTotalPackages,
      totalItemsCount,
    };

    return successResponse({
      status: 200,
      coursePackages: coursePackagesList,
      paginationData,
    });
  } catch (error) {
    console.log("Error in getting all course packages SERVER: ", error);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
