import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import AllNewsArticleModel from "@/model/news/NewsArticle";
import NewsTranslationModel from "@/model/news/NewsTranslation";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function DELETE(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const targetId = searchParams.get("targetId");

    // Handle not getting request data
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
      requiredPermissions: [PERMISSIONS.NEWS.DELETE_NEWS_ARTICLE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Delete the news article
    const deletedNewsArticle =
      await AllNewsArticleModel.findByIdAndDelete(targetId).exec();
    if (!deletedNewsArticle) {
      return errorResponse({
        message: "Failed to delete the news article. Please try again later.",
        status: 500,
      });
    }

    // Delete all translations according to deleted news article id
    await NewsTranslationModel.deleteMany({
      referenceId: deletedNewsArticle._id.toString(),
    }).exec();

    return successResponse({
      message: "News Article has been deleted successfully. Refreshing...",
      status: 200,
    });
  } catch (error) {
    console.log(`Error in deleting news article SERVER: ${error}`);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
