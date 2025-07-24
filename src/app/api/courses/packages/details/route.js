import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import TrainingCoursePackageModel from "@/model/courses/packages/CoursePackage";
import TrainingCoursePackageTranslationModel from "@/model/courses/packages/CoursePackageTranslation";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const targetId = searchParams.get("targetId");
    const lang = searchParams.get("lang");

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
    const coursePackageDetails = await TrainingCoursePackageModel.findById(
      targetId
    )
      .select("-__v -isActive -isFeatured -createdAt -updatedAt")
      .lean()
      .exec();
    if (!coursePackageDetails) {
      return errorResponse({
        message: "Course package not found.",
        status: 404,
      });
    }

    // Get translated content
    const coursePackageTranslationDetails =
      await TrainingCoursePackageTranslationModel.findOne({
        referenceId: coursePackageDetails._id.toString(),
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

    // Fetch default course package English translation if requested language translation is missing
    let coursePackageEnData = null;
    if (!coursePackageTranslationDetails) {
      coursePackageEnData = await TrainingCoursePackageTranslationModel.findOne(
        {
          referenceId: coursePackageDetails._id.toString(),
          lang: "en",
        }
      )
        .lean()
        .exec();
    }

    // Merging translated content with original content
    const mergedDetails = deepMerge(
      coursePackageDetails,
      coursePackageTranslationDetails || coursePackageEnData
    );

    return successResponse({
      status: 200,
      coursePackageData: mergedDetails,
    });
  } catch (error) {
    console.log(`Error in getting course package details SERVER: ${error}`);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
