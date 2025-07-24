import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import TrainingCourseModel from "@/model/courses/TrainingCourse";
import TrainingCourseTranslationModel from "@/model/courses/TrainingCourseTranslation";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function DELETE(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const slug = searchParams.get("slug");

    // Handle not getting request data
    if (!userId || !slug || !mongoose.Types.ObjectId.isValid(userId)) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.COURSES.DELETE_COURSE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Delete the course
    const deletedCourse = await TrainingCourseModel.findOneAndDelete({
      slug,
    }).exec();
    if (!deletedCourse) {
      return errorResponse({
        message: "Failed to delete the course. Please try again later.",
        status: 500,
      });
    }

    // Delete all translations according to deleted course id
    await TrainingCourseTranslationModel.deleteMany({
      referenceId: deletedCourse._id.toString(),
    }).exec();

    return successResponse({
      message: `${deletedCourse.title} course deleted successfully. Refreshing...`,
      status: 200,
    });
  } catch (error) {
    console.log("Error in deleting the course SERVER: ", error);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
