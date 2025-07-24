import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import AllBlogsModel from "@/model/blog/AllBlogs";
import BlogTranslationModel from "@/model/blog/BlogTranslation";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function DELETE(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const postId = searchParams.get("postId");

    // Handle not getting request data
    if (
      !userId ||
      !postId ||
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(postId)
    ) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.POST.DELETE_POST],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Delete the post
    const deletedPost = await AllBlogsModel.findByIdAndDelete(postId).exec();
    if (!deletedPost) {
      return errorResponse({
        message: "Failed to delete the post. Please try again later.",
        status: 500,
      });
    }

    // Delete all translations according to deleted post id
    await BlogTranslationModel.deleteMany({
      referenceId: deletedPost._id.toString(),
    }).exec();

    return successResponse({
      message: "Post deleted successfully. Refreshing...",
      status: 200,
    });
  } catch (error) {
    console.log(`Error in deleting the post SERVER: ${error}`);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
