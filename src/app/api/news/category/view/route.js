import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import LanguagesModel from "@/model/Language";
import AllNewsCategoryModel from "@/model/news/NewsCategory";
import NewsCategoryTranslationModel from "@/model/news/NewsCategoryTranslation";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import escapeStringRegexp from "escape-string-regexp";
import mongoose from "mongoose";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const search = searchParams.get("search");

    // NOTE Validate Category and User IDs
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
        PERMISSIONS.NEWS.ADD_NEWS_ARTICLE,
        PERMISSIONS.NEWS.EDIT_NEWS_ARTICLE,
        PERMISSIONS.NEWS_CATEGORY.ADD_NEWS_CATEGORY,
        PERMISSIONS.NEWS_CATEGORY.VIEW_ALL_NEWS_CATEGORIES,
      ],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // NOTE Escape special characters - (), ., *, +, ?, [, ], ^, $, \ -> Prevents regex injection attacks. More info: https://www.freeformatter.com/regexp-escape.html [Ex - hello(world) = hello\(world\)]. Ensures your search strings behave as intended in a regular expression. Reduces runtime errors caused by invalid regex patterns.
    const searchQuery = escapeStringRegexp(search || "");
    const query = {
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { slug: { $regex: searchQuery, $options: "i" } },
      ],
    };

    const categoryList = await AllNewsCategoryModel.find(query)
      .select("-__v -createdAt -updatedAt")
      .exec();

    // Fetch all active languages
    const languages = await LanguagesModel.find({
      status: true,
    }).exec();

    // Fetch translations in one query
    const categoryIds = categoryList.map((category) => category._id);
    const translations = await NewsCategoryTranslationModel.find({
      referenceId: { $in: categoryIds },
    }).exec();

    // Map translations by category ID
    const translationMap = {};
    translations.forEach(({ referenceId, lang, name, description }) => {
      if (!translationMap[referenceId]) {
        translationMap[referenceId] = {};
      }
      translationMap[referenceId][lang] = {
        name,
        description,
      };
    });

    // Process categories and attach translations
    const formattedCategoryList = categoryList.map((eachCategory) => {
      const categoryData = eachCategory.toObject();

      // Initialize name and description as objects
      categoryData.name = {};
      categoryData.description = {};

      // Fetch translations for the current article
      const translations = translationMap[eachCategory._id];

      // If translations exist, populate the fields
      if (translations) {
        // Loop through all available languages
        for (const lang in translations) {
          if (translations[lang]) {
            // Assign translations for name and description
            categoryData.name[lang] = translations[lang].name || "";
            categoryData.description[lang] =
              translations[lang].description || "";
          }
        }
      }

      return categoryData;
    });

    return successResponse({
      status: 200,
      categories: formattedCategoryList,
    });
  } catch (error) {
    console.log(
      `Error in getting all news categories SERVER: ${error.stack || error}`
    );
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
