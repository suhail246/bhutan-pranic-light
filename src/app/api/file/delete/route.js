import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import { s3DeleteFile } from "@/lib/s3/core";
import AllBlogsModel from "@/model/blog/AllBlogs";
import AllBlogsCategoryModel from "@/model/blog/BlogsCategory";
import { default as FilesModel } from "@/model/Files";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function DELETE(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const fileKey = searchParams.get("fileKey");
    const userId = searchParams.get("userId");

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.FILE.DELETE_FILE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // NOTE Get the file details
    const fileRecord = await FilesModel.findOne({
      fileS3Key: fileKey,
    });
    if (!fileRecord) {
      return errorResponse({
        message: "File not found.",
        status: 404,
      });
    }

    // NOTE Prevent delete if file is a default file
    if (fileRecord.isDefault) {
      return errorResponse({
        message: "Cannot delete default file.",
        status: 400,
      });
    }

    let defaultImage;
    if (fileRecord.fileType.startsWith("image/")) {
      // NOTE Check if any default image is exist or not
      defaultImage = await FilesModel.findOne({
        isDefault: true,
      });
      if (!defaultImage) {
        return errorResponse({
          message: "No default image found. Please make a default image.",
          status: 404,
        });
      }
    }

    // NOTE Perfome delete functionality in AWS S3
    const awsS3ClientResponse = await s3DeleteFile(fileRecord.fileS3Key);
    if (!awsS3ClientResponse.success) {
      return errorResponse({
        message: awsS3ClientResponse.error,
        status: 500,
      });
    }

    // NOTE Delete the file from the DB
    const deletedFile = await FilesModel.findOneAndDelete({
      fileS3Key: fileRecord.fileS3Key,
    });
    if (!deletedFile) {
      return errorResponse({
        message: "Failed to delete the file. Please try again later.",
        status: 500,
      });
    }

    // NOTE Store the default image file id in all blog post where the deleted image file is used
    if (deletedFile.fileType.startsWith("image/")) {
      // Update for blogs
      const allBlogPosts = await AllBlogsModel.find({
        $or: [{ bannerImage: deletedFile._id }, { metaImage: deletedFile._id }],
      }).exec();

      for (const blog of allBlogPosts) {
        const updates = {};

        if (
          blog.bannerImage &&
          blog.bannerImage.toString() === deletedFile._id.toString()
        ) {
          updates.bannerImage = defaultImage._id;
        }
        if (
          blog.metaImage &&
          blog.metaImage.toString() === deletedFile._id.toString()
        ) {
          updates.metaImage = defaultImage._id;
        }

        // Update the blog post only if there are changes
        if (Object.keys(updates).length > 0) {
          await AllBlogsModel.updateOne({ _id: blog._id }, { $set: updates });
        }
      }

      // Update for categories
      const allCategories = await AllBlogsCategoryModel.find({
        metaImage: defaultImage._id,
      });

      for (const category of allCategories) {
        const update = {};

        if (
          category.metaImage &&
          category.metaImage.toString() === deletedFile._id.toString()
        ) {
          update.metaImage = defaultImage._id;
        }

        if (Object.keys(update).length > 0) {
          await AllBlogsCategoryModel.updateOne(
            { _id: category._id },
            { $set: update }
          );
        }
      }
    }

    return successResponse({
      message: `${deletedFile.fileName} has been deleted successfully. Refreshing the page ...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in deleting perticular image SERVER: ${error}`);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
