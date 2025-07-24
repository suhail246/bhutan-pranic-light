import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import AllBlogsModel from "@/model/blog/AllBlogs";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function PATCH(request) {
  await dbConnect();

  try {
    const body = await request.json();

    const { userId, postId } = body;
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
      requiredPermissions: [PERMISSIONS.POST.TOGGLE_FEATURED_POST],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // NOTE Get the post details
    const existingBlogPostDetails = await AllBlogsModel.findById(postId).exec();
    if (!existingBlogPostDetails) {
      return errorResponse({
        message: "Post not found.",
        status: 404,
      });
    }

    // NOTE Toggle activeStatus
    const updatedBlogPost = await AllBlogsModel.findByIdAndUpdate(
      postId,
      {
        $set: {
          isFeatured: !existingBlogPostDetails.isFeatured,
        },
      },
      { new: true }
    ).exec();
    if (!updatedBlogPost) {
      return errorResponse({
        message: "Failed to update the post featured status. Try again later.",
        status: 500,
      });
    }

    // NOTE Check if the updated post's featured status is true and active status is false, then make updated post's isActive as true
    if (updatedBlogPost.isFeatured && !updatedBlogPost.isActive) {
      await AllBlogsModel.findByIdAndUpdate(updatedBlogPost._id, {
        $set: {
          isActive: true,
        },
      });
    }

    return successResponse({
      message: updatedBlogPost.isFeatured
        ? `You've enabled the blog post as a featured post. Refreshing to apply changes...`
        : `You've disabled the blog post as a featured post. Refreshing to apply changes...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in changing post featured status SERVER: `, error);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
