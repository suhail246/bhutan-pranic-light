import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import AllNewsArticleModel from "@/model/news/NewsArticle";
import AllNewsCategoryModel from "@/model/news/NewsCategory";
import NewsCategoryTranslationModel from "@/model/news/NewsCategoryTranslation";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function DELETE(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const categoryId = searchParams.get("categoryId");

    // Handle not getting request data
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
      requiredPermissions: [PERMISSIONS.NEWS_CATEGORY.DELETE_NEWS_CATEGORY],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Get the category details
    const category = await AllNewsCategoryModel.findById(categoryId).exec();
    if (!category) {
      return errorResponse({
        message: "Category does not exists.",
        status: 404,
      });
    }

    // IF category is a default category, return an error message
    if (category.isDefault) {
      return errorResponse({
        message:
          "You cannot delete a default category. Please choose a different category to delete.",
        status: 400,
      });
    }

    // Check if there is a default category
    const defaultCategory = await AllNewsCategoryModel.findOne({
      isDefault: true,
    }).exec();
    if (!defaultCategory) {
      return errorResponse({
        message:
          "No default category found. Please ensure a default category exists before deleting categories.",
        status: 400,
      });
    }

    // Delete the category
    const deletedCategory = await AllNewsCategoryModel.findByIdAndDelete(
      category._id
    ).exec();
    if (!deletedCategory) {
      return errorResponse({
        message: "Unable to delete the category. Please try again later.",
        status: 500,
      });
    }

    // Check if the category has any parent category, and having any child category, then make those child category's parentCategoryId as the deleted category's parentCategoryId otherwise make the parentCategoryId as null
    await AllNewsCategoryModel.updateMany(
      { parentCategoryId: category._id },
      { $set: { parentCategoryId: category.parentCategoryId || null } }
    );

    // Update all news articles related to the deleted category to use the default category
    await AllNewsArticleModel.updateMany(
      { category: category._id },
      { $set: { category: defaultCategory ? defaultCategory._id : null } }
    );

    // Delete the category translations
    await NewsCategoryTranslationModel.deleteMany({
      referenceId: category._id.toString(),
    }).exec();

    return successResponse({
      message: `${deletedCategory?.name || "Anonymous"}category deleted successfully. Refreshing...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in deleting the news category SERVER: ${error}`);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
