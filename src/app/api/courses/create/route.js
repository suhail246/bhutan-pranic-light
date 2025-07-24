import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import TrainingCourseModel from "@/model/courses/TrainingCourse";
import TrainingCourseTranslationModel from "@/model/courses/TrainingCourseTranslation";
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
      requiredPermissions: [PERMISSIONS.COURSES.ADD_COURSE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Take other keyvalues from the request body
    const validationObj = Object.fromEntries(
      Object.entries(body).filter(([key]) => key !== "userId")
    );

    // Create a new course obj and save into DB
    const newCourseData = new TrainingCourseModel(validationObj);
    const savedCourseData = await newCourseData.save();

    // Store translations in the course translation table with lang = "en" default
    const createEnTranslation =
      await TrainingCourseTranslationModel.findOneAndUpdate(
        {
          referenceId: savedCourseData._id.toString(),
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
      message: `${savedCourseData.title} created successfully.`,
      status: 201,
    });
  } catch (error) {
    console.log("Error in creating course SERVER: ", error);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
