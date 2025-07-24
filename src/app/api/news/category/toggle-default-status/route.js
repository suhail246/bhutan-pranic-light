import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import AllNewsCategoryModel from "@/model/news/NewsCategory";
import { updateParentCategories } from "@/utils/categoryTreeUtils";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function PATCH(request) {
  await dbConnect();

  try {
    const body = await request.json();

    const { userId, categoryId, defaultStatus } = body;
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
        PERMISSIONS.NEWS_CATEGORY.TOGGLE_DEFAULT_NEWS_CATEGORY,
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

    // Make all other categories default status false
    await AllNewsCategoryModel.updateMany(
      { isDefault: true },
      { $set: { isDefault: false } }
    );

    // Toggle activeStatus
    const updatedCategory = await AllNewsCategoryModel.findByIdAndUpdate(
      category._id,
      {
        $set: {
          isDefault: !category.isDefault,
          activeStatus: true,
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

    // Check if the updated category has any parent category, if so then make that parent category's activeStatus as true
    if (updatedCategory.isDefault && updatedCategory.parentCategoryId) {
      await updateParentCategories(updatedCategory.parentCategoryId, false);
    }

    return successResponse({
      message: `${updatedCategory.name} is now the default category. Refreshing to apply changes...`,
      status: 200,
    });
  } catch (error) {
    console.log(
      `Error in changing news category default status SERVER: `,
      error
    );
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
