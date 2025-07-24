import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import TrainingCourseModel from "@/model/courses/TrainingCourse";
import TrainingCourseTranslationModel from "@/model/courses/TrainingCourseTranslation";
import FilesModel from "@/model/Files";
import LanguagesModel from "@/model/Language";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

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
      requiredPermissions: [
        PERMISSIONS.COURSES.VIEW_ALL_COURSES,
        PERMISSIONS.PACKAGES.VIEW_ALL_PACKAGES,
        PERMISSIONS.PACKAGES.ADD_PACKAGE,
        PERMISSIONS.PACKAGES.EDIT_PACKAGE,
      ],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Get all courses
    const coursesList = await TrainingCourseModel.find()
      .select(
        "_id title subTitle slug courseStaticId orderNumber shortDescription image packageCategoriesSwitch packageCategories isActive isFeatured"
      )
      .populate({
        path: "image",
        model: FilesModel,
        select: "fileUrl fileName fileType",
        match: { _id: { $ne: null } },
      })
      .exec();

    // Short by orderNumber by converting it to integer
    coursesList.sort(
      (a, b) => parseInt(b.orderNumber) - parseInt(a.orderNumber)
    );

    // Fetch all active languages
    const languages = await LanguagesModel.find({
      status: true,
    }).exec();

    // Fetch translations in one query
    const courseIds = coursesList.map((course) => course._id);
    const translations = await TrainingCourseTranslationModel.find({
      referenceId: { $in: courseIds },
    })
      .select(
        "referenceId lang title subTitle shortDescription packageCategories"
      )
      .exec();

    // Map translations by course ID
    const translationMap = {};
    translations.forEach(
      ({
        referenceId,
        lang,
        title,
        subTitle,
        shortDescription,
        packageCategories,
      }) => {
        if (!translationMap[referenceId]) {
          translationMap[referenceId] = {};
        }
        translationMap[referenceId][lang] = {
          title,
          subTitle,
          shortDescription,
          packageCategories,
        };
      }
    );

    // Process courses and attach translations
    const formattedCourseList = coursesList.map((eachCourse) => {
      const courseData = eachCourse.toObject();

      // Initialize title, subTitle, shortDescription, packageCategories as objects
      courseData.title = {};
      courseData.subTitle = {};
      courseData.shortDescription = {};
      courseData.packageCategories = {};

      // Fetch translations for the current course
      const translations = translationMap[eachCourse._id];

      // If translations exist, populate the fields
      if (translations) {
        // Loop through all available languages
        for (const lang in translations) {
          if (translations[lang]) {
            // Assign translations for title, subTitle, shortDescription, packageCategories
            courseData.title[lang] = translations[lang].title || "";
            courseData.subTitle[lang] = translations[lang].subTitle || "";
            courseData.shortDescription[lang] =
              translations[lang]?.shortDescription || "";
            courseData.packageCategories[lang] =
              translations[lang]?.packageCategories || [];
          }
        }
      }

      return courseData;
    });

    return successResponse({
      status: 200,
      courses: formattedCourseList,
    });
  } catch (error) {
    console.log("Error in getting all courses SERVER: ", error);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
