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
      requiredPermissions: [PERMISSIONS.COURSES.TOGGLE_ACTIVE_COURSE],
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

    // Toggle activeStatus
    const updatedCourse = await TrainingCourseModel.findByIdAndUpdate(
      existingCourseDetails._id,
      {
        $set: {
          isActive: !existingCourseDetails.isActive,
        },
      },
      { new: true }
    ).exec();
    if (!updatedCourse) {
      return errorResponse({
        message: "Failed to update the course active status. Try again later.",
        status: 500,
      });
    }

    // Check if the updated course's active status is false and featured status is true, then make updated course's isFeatured as false
    if (!updatedCourse.isActive && updatedCourse.isFeatured) {
      await TrainingCourseModel.findByIdAndUpdate(updatedCourse._id, {
        $set: {
          isFeatured: false,
        },
      });
    }

    return successResponse({
      message: updatedCourse.isActive
        ? `You've enabled the ${updatedCourse.title} course. Refreshing to apply changes...`
        : `You've disabled the ${updatedCourse.title} course. Refreshing to apply changes...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in changing course active status SERVER: `, error);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
