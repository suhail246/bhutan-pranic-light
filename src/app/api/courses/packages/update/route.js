import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import TrainingCoursePackageModel from "@/model/courses/packages/CoursePackage";
import TrainingCoursePackageTranslationModel from "@/model/courses/packages/CoursePackageTranslation";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function PUT(request) {
  await dbConnect();

  try {
    const body = await request.json();

    const { userId, targetId, lang, _id, ...rest } = body;

    // Check invalid inputs
    if (
      !userId ||
      !targetId ||
      !lang ||
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
      requiredPermissions: [PERMISSIONS.PACKAGES.EDIT_PACKAGE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Get course package details
    const existingCoursePackageDetails =
      await TrainingCoursePackageModel.findById(targetId).exec();
    if (!existingCoursePackageDetails) {
      return errorResponse({
        message: "Course package not found.",
        status: 404,
      });
    }

    // Update the course
    if (lang === "en") {
      const updatedCoursePackage =
        await TrainingCoursePackageModel.findByIdAndUpdate(
          existingCoursePackageDetails._id,
          {
            $set: rest,
          },
          { new: true }
        ).exec();
      if (!updatedCoursePackage) {
        return errorResponse({
          message:
            "Failed to update the course package. Please try again later.",
          status: 500,
        });
      }
    }

    // Update Translations according to updatedCoursePackage._id
    await TrainingCoursePackageTranslationModel.findOneAndUpdate(
      {
        referenceId: existingCoursePackageDetails._id.toString(),
        lang,
      },
      {
        $set: rest,
      },
      {
        new: true,
        upsert: true,
      }
    );

    return successResponse({
      message: `${rest?.packageTitle || "Anonymous"} course package updated successfully. Refreshing...`,
      status: 200,
    });
  } catch (error) {
    console.log("Error in updating course package SERVER: ", error);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
