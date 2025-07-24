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
      requiredPermissions: [PERMISSIONS.NEWS.TOGGLE_FEATURED_NEWS_ARTICLE],
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
          isFeatured: !existingNewsArticleDetails.isFeatured,
        },
      },
      { new: true }
    ).exec();
    if (!updatedNewsArticle) {
      return errorResponse({
        message:
          "Failed to update the news article featured status. Try again later.",
        status: 500,
      });
    }

    // Check if the updated article's featured status is true and active status is false, then make updated article's isActive as true
    if (updatedNewsArticle.isFeatured && !updatedNewsArticle.isActive) {
      await AllNewsArticleModel.findByIdAndUpdate(updatedNewsArticle._id, {
        $set: {
          isActive: true,
        },
      });
    }

    return successResponse({
      message: updatedNewsArticle.isFeatured
        ? `You've enabled the blog news article as a featured post. Refreshing to apply changes...`
        : `You've disabled the blog news article as a featured post. Refreshing to apply changes...`,
      status: 200,
    });
  } catch (error) {
    console.log(
      `Error in changing news article featured status SERVER: `,
      error
    );
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
