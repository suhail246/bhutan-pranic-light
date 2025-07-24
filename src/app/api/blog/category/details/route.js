import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import BlogCategoryTranslationModel from "@/model/blog/BlogCategoryTranslation";
import AllBlogsCategoryModel from "@/model/blog/BlogsCategory";
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
    const categoryId = searchParams.get("categoryId");

    // Validate Category and User IDs
    if (
      !userId ||
      !categoryId ||
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(categoryId)
    ) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.CATEGORY.EDIT_CATEGORY],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Get category details
    const category = await AllBlogsCategoryModel.findById(categoryId)
      .select("-__v -name -description -createdAt -updatedAt")
      .populate({
        path: "metaImage",
        model: FilesModel,
        select: "fileUrl fileName fileType",
        match: { _id: { $ne: null } },
      })
      .exec();
    if (!category) {
      return errorResponse({
        message: "Category not found.",
        status: 404,
      });
    }

    // Get all types of languages ["en", "ar", ...]
    const languagesList = await LanguagesModel.find({
      status: true,
    })
      .select("code")
      .exec();

    // Fetch translations and format them as { "en": { ...translationData }, "ar": {}, ... }
    const details = {};

    await Promise.all(
      languagesList.map(async (language) => {
        const translation = await BlogCategoryTranslationModel.findOne({
          referenceId: category._id.toString(),
          lang: language.code,
        })
          .select("-referenceId -__v -createdAt -updatedAt")
          .exec();

        details[language.code] = translation || {}; // Empty object if null
      })
    );

    return successResponse({
      status: 200,
      categoryDetails: category,
      translationData: details,
    });
  } catch (error) {
    console.log(`Error in getting category details SERVER: ${error}`);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
