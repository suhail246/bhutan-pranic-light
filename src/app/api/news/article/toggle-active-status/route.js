import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import AllNewsArticleModel from "@/model/news/NewsArticle";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function PATCH(request) {
  await dbConnect();

  try {
    const body = await request.json();

    const { userId, targetId } = body;
    if (
      !userId ||
      !targetId ||
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
      requiredPermissions: [PERMISSIONS.NEWS.TOGGLE_ACTIVE_NEWS_ARTICLE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Get the news article details
    const existingNewsArticleDetails =
      await AllNewsArticleModel.findById(targetId).exec();
    if (!existingNewsArticleDetails) {
      return errorResponse({
        message: "New Article not found.",
        status: 404,
      });
    }

    // Toggle activeStatus
    const updatedNewsArticle = await AllNewsArticleModel.findByIdAndUpdate(
      targetId,
      {
        $set: {
          isActive: !existingNewsArticleDetails.isActive,
        },
      },
      { new: true }
    ).exec();
    if (!updatedNewsArticle) {
      return errorResponse({
        message:
          "Failed to update the news article active status. Try again later.",
        status: 500,
      });
    }

    // Check if the updated article's active status is false and featured status is true, then make updated article's isFeatured as false
    if (updatedNewsArticle.isFeatured && !updatedNewsArticle.isActive) {
      await AllNewsArticleModel.findByIdAndUpdate(updatedNewsArticle._id, {
        $set: {
          isFeatured: false,
        },
      });
    }

    return successResponse({
      message: updatedNewsArticle.isActive
        ? `You've enabled the news article. Refreshing to apply changes...`
        : `You've disabled the news article. Refreshing to apply changes...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in changing news article active status SERVER: `, error);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
