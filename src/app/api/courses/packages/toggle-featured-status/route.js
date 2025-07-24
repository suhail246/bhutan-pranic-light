import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import TrainingCoursePackageModel from "@/model/courses/packages/CoursePackage";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function PATCH(request) {
  await dbConnect();

  try {
    const body = await request.json();

    const { userId, targetId } = body;
    if (
      !userId ||
      !targetId ||
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(targetId)
    ) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.PACKAGES.TOGGLE_FEATURED_PACKAGE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Get the course package details
    const existingCoursePackageDetails =
      await TrainingCoursePackageModel.findById(targetId).exec();
    if (!existingCoursePackageDetails) {
      return errorResponse({
        message: "Course package not found.",
        status: 404,
      });
    }

    // Toggle Featured Status
    const updatedCoursePackage =
      await TrainingCoursePackageModel.findByIdAndUpdate(
        existingCoursePackageDetails._id,
        {
          $set: {
            isFeatured: !existingCoursePackageDetails.isFeatured,
          },
        },
        { new: true }
      ).exec();
    if (!updatedCoursePackage) {
      return errorResponse({
        message:
          "Failed to update the course package featured status. Try again later.",
        status: 500,
      });
    }

    // Check if the updated package's featured status is true and active status is false, then make updated package's isActive as true
    if (updatedCoursePackage.isFeatured && !updatedCoursePackage.isActive) {
      await TrainingCoursePackageModel.findByIdAndUpdate(
        updatedCoursePackage._id,
        {
          $set: {
            isActive: true,
          },
        }
      );
    }

    return successResponse({
      message: updatedCoursePackage.isFeatured
        ? `You've enabled the ${updatedCoursePackage?.packageTitle || "Anonymous"} as a featured course package. Refreshing to apply changes...`
        : `You've disabled the ${updatedCoursePackage?.packageTitle || "Anonymous"} as a featured course package. Refreshing to apply changes...`,
      status: 200,
    });
  } catch (error) {
    console.log(
      `Error in changing course package featured status SERVER: `,
      error
    );

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
