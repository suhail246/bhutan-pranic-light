import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import TrainingCoursePackageModel from "@/model/courses/packages/CoursePackage";
import TrainingCoursePackageTranslationModel from "@/model/courses/packages/CoursePackageTranslation";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();

    // Check invalid inputs
    if (!body.userId || !mongoose.Types.ObjectId.isValid(body.userId)) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: body.userId,
      requiredPermissions: [PERMISSIONS.PACKAGES.ADD_PACKAGE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Take other keyvalues from the request body
    const { userId, ...rest } = body;
    const validationObj = rest;

    // Create a new course_package obj and save into DB
    const newCoursePackageData = new TrainingCoursePackageModel(validationObj);
    const savedCoursePackageData = await newCoursePackageData.save();

    // Store translations in the course_package translation table with lang = "en" default
    const createEnTranslation =
      await TrainingCoursePackageTranslationModel.findOneAndUpdate(
        {
          referenceId: savedCoursePackageData._id.toString(),
          lang: "en",
        },
        {
          $set: validationObj,
        },
        {
          new: true,
          upsert: true,
        }
      );
    if (!createEnTranslation) {
      return errorResponse({
        message:
          "An usexpected error occure while saving data in translation collection.",
        status: 400,
      });
    }

    return successResponse({
      message: `${savedCoursePackageData?.packageTitle || "Anonymous"} package created successfully.`,
      status: 201,
    });
  } catch (error) {
    console.log("Error in creating course package SERVER: ", error);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
