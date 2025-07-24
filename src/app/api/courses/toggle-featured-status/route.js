import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import TrainingCourseModel from "@/model/courses/TrainingCourse";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function PATCH(request) {
  await dbConnect();

  try {
    const body = await request.json();

    const { userId, slug } = body;
    if (!userId || !slug || !mongoose.Types.ObjectId.isValid(userId)) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.COURSES.TOGGLE_FEATURED_COURSE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Get the course details
    const existingCourseDetails = await TrainingCourseModel.findOne({
      slug,
    }).exec();
    if (!existingCourseDetails) {
      return errorResponse({
        message: "Course not found.",
        status: 404,
      });
    }

    // Toggle Featured Status
    const updatedCourse = await TrainingCourseModel.findByIdAndUpdate(
      existingCourseDetails._id,
      {
        $set: {
          isFeatured: !existingCourseDetails.isFeatured,
        },
      },
      { new: true }
    ).exec();
    if (!updatedCourse) {
      return errorResponse({
        message:
          "Failed to update the course featured status. Try again later.",
        status: 500,
      });
    }

    // Check if the updated course's featured status is true and active status is false, then make updated course's isActive as true
    if (updatedCourse.isFeatured && !updatedCourse.isActive) {
      await TrainingCourseModel.findByIdAndUpdate(updatedCourse._id, {
        $set: {
          isActive: true,
        },
      });
    }

    return successResponse({
      message: updatedCourse.isFeatured
        ? `You've enabled the ${updatedCourse.title} as a featured course. Refreshing to apply changes...`
        : `You've disabled the ${updatedCourse.title} as a featured course. Refreshing to apply changes...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in changing course featured status SERVER: `, error);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
