import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import TrainingCourseModel from "@/model/courses/TrainingCourse";
import TrainingCourseTranslationModel from "@/model/courses/TrainingCourseTranslation";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const slug = searchParams.get("slug");
    const lang = searchParams.get("lang");

    // Check invalid inputs
    if (!userId || !slug || !lang || !mongoose.Types.ObjectId.isValid(userId)) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.COURSES.EDIT_COURSE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Get course details
    const courseDetails = await TrainingCourseModel.findOne({ slug })
      .select("-__v -isActive -isFeatured -createdAt -updatedAt")
      .lean()
      .exec();
    if (!courseDetails) {
      return errorResponse({
        message: "Course not found.",
        status: 404,
      });
    }

    // Get translated content
    const courseTranslationDetails =
      await TrainingCourseTranslationModel.findOne({
        referenceId: courseDetails._id.toString(),
        lang,
      })
        .lean()
        .exec();

    // Function to merge translations while handling nested objects
    function deepMerge(defaultData, translatedData) {
      return Object.keys(defaultData).reduce((acc, key) => {
        if (translatedData.hasOwnProperty(key)) {
          if (
            typeof defaultData[key] === "object" &&
            key !== "_id" &&
            !Array.isArray(defaultData[key])
          ) {
            acc[key] = deepMerge(defaultData[key], translatedData[key]);
          } else {
            acc[key] = translatedData[key];
          }
        } else {
          acc[key] = defaultData[key];
        }

        return acc;
      }, {});
    }

    // Fetch default course English translation if requested language translation is missing
    let courseEnData = null;
    if (!courseTranslationDetails) {
      courseEnData = await TrainingCourseTranslationModel.findOne({
        referenceId: courseDetails._id.toString(),
        lang: "en",
      })
        .lean()
        .exec();
    }

    // Merging translated content with original content
    const mergedDetails = deepMerge(
      courseDetails,
      courseTranslationDetails || courseEnData
    );

    return successResponse({
      status: 200,
      courseData: mergedDetails,
    });
  } catch (error) {
    console.log(`Error in getting course details SERVER: ${error}`);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
