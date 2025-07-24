import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import AllNewsCategoryModel from "@/model/news/NewsCategory";
import {
  checkDefaultChildCategoryPresence,
  updateChildCategories,
  updateParentCategories,
} from "@/utils/categoryTreeUtils";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function PATCH(request) {
  await dbConnect();

  try {
    const body = await request.json();

    const { userId, categoryId, active } = body;
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
      requiredPermissions: [
        PERMISSIONS.NEWS_CATEGORY.TOGGLE_ACTIVE_NEWS_CATEGORY,
      ],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Get the category details
    const category = await AllNewsCategoryModel.findById(categoryId).exec();
    if (!category) {
      return errorResponse({
        message: "Category not found.",
        status: 404,
      });
    }

    // Prevent deactivating a default category
    if (category.isDefault) {
      return errorResponse({
        message: "Default category cannot be inactive.",
        status: 400,
      });
    }

    // Prevent deactivating a category that has a default child category
    if (active) {
      const hasDefaultInBranch = await checkDefaultChildCategoryPresence(
        category._id
      );
      if (hasDefaultInBranch) {
        return errorResponse({
          message: "Cannot inactive a category with a default child.",
          status: 400,
        });
      }
    }

    // Toggle the activeStatus of the category
    const updatedCategory = await AllNewsCategoryModel.findByIdAndUpdate(
      category._id,
      {
        $set: {
          activeStatus: !category.activeStatus,
          isFeatured: active === true ? false : category.isFeatured,
        },
      },
      { new: true }
    ).exec();
    if (!updatedCategory) {
      return errorResponse({
        message: "Failed to update the category. Try again later.",
        status: 500,
      });
    }

    // Recursively update child categories (deactivate them if needed)
    await updateChildCategories(categoryId, active);

    // Recursively update parent categories (reactivate if needed)
    await updateParentCategories(category.parentCategoryId, active);

    return successResponse({
      message: active
        ? `You've disabled ${category.name}. Refreshing to apply changes...`
        : `You've enabled ${category.name}. Refreshing to apply changes...`,
      status: 200,
    });
  } catch (error) {
    console.log(
      `Error in changing news category active status SERVER: `,
      error
    );
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
