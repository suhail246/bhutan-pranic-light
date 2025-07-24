import dbConnect from "@/lib/db/dbConnect";
import LanguagesModel from "@/model/Language";
import AllNewsCategoryModel from "@/model/news/NewsCategory";
import NewsCategoryTranslationModel from "@/model/news/NewsCategoryTranslation";
import { errorResponse, successResponse } from "@/utils/responseHandler";

export async function GET(request) {
  await dbConnect();

  try {
    const categoryList = await AllNewsCategoryModel.find()
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
      `Error in getting all news categories FE SERVER: ${error.stack || error}`
    );
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
