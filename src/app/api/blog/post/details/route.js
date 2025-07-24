import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import AllBlogsModel from "@/model/blog/AllBlogs";
import BlogTranslationModel from "@/model/blog/BlogTranslation";
import FilesModel from "@/model/Files";
import LanguagesModel from "@/model/Language";
import { checkAuthorization } from "@/utils/permissionHandler";
import { successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const postId = searchParams.get("postId");

    // NOTE Validate Category and User IDs
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
      requiredPermissions: [PERMISSIONS.POST.EDIT_POST],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Get common post details
    const postCommonDetails = await AllBlogsModel.findById(postId)
      .select(
        "-__v -title -shortDescription -description -tags -isActive -isFeatured"
      )
      .populate({
        path: "bannerImage",
        model: FilesModel,
        select: "fileUrl fileName fileType",
      })
      .populate({
        path: "metaImage",
        model: FilesModel,
        select: "fileUrl fileName fileType",
        match: { _id: { $ne: null } },
      })
      .exec();
    if (!postCommonDetails) {
      return errorResponse({
        message: "Post not found.",
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
        const translation = await BlogTranslationModel.findOne({
          referenceId: postCommonDetails._id.toString(),
          lang: language.code,
        })
          .select("-referenceType -referenceId -__v -createdAt -updatedAt")
          .exec();

        details[language.code] = translation || {}; // Empty object if null
      })
    );

    return successResponse({
      status: 200,
      postDetails: postCommonDetails,
      translationData: details,
    });
  } catch (error) {
    console.log(`Error in getting post details SERVER: ${error}`);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
