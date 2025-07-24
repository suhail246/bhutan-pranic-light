import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import { useSlugNanoid, useTitleNanoid } from "@/lib/hooks";
import AllBlogsModel from "@/model/blog/AllBlogs";
import BlogTranslationModel from "@/model/blog/BlogTranslation";
import { AllBlogsSchema } from "@/schemas";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import { validateSchema } from "@/utils/validateSchemaHandler";
import mongoose from "mongoose";

export async function PUT(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const {
      userId,
      postId,
      title,
      category,
      slug,
      bannerImage,
      shortDescription,
      description,
      tags,
      source,
      metaTitle,
      metaImage,
      metaDescription,
      translateData = {},
    } = body;

    // Is translation data provided
    const isTranslationData = Object.keys(translateData).length > 0;

    // Check validate requested IDs
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

    // VALIDATE the request data
    if (!isTranslationData) {
      const validatedFields = validateSchema(AllBlogsSchema, {
        title,
        category,
        slug,
        bannerImage,
        shortDescription,
        description,
        tags,
        source,
        metaTitle,
        metaImage,
        metaDescription,
      });
      if (!validatedFields.success) {
        return errorResponse({ status: 400, errors: validatedFields.errors });
      }

      // Check if post exists
      const existsPost = await AllBlogsModel.findById(postId).exec();
      if (!existsPost) {
        return errorResponse({
          message: "Post not found.",
          status: 404,
        });
      }

      // Only check for duplicates if title or slug are changed
      let newSlug;
      let newTitle;
      if (title !== existsPost.title || slug !== existsPost.slug) {
        const existingPostDetails = await AllBlogsModel.find({
          $or: [{ slug }, { title }],
          _id: { $ne: postId },
        }).exec();

        // Handle Duplicate Post Title (Add Random Characters)
        if (
          existingPostDetails &&
          existingPostDetails.some((post) => post.title === title)
        ) {
          newTitle = `${title} ${useTitleNanoid()}`;
        }

        // Handle Duplicate Post Slug (Add Random Characters)
        if (
          existingPostDetails &&
          existingPostDetails.some((post) => post.slug === slug)
        ) {
          newSlug = `${slug}-${useSlugNanoid()}`;
        }
      }

      // Set post updated values object
      const updatedPostObj = {
        title: newTitle || title,
        category,
        slug: newSlug || slug,
        bannerImage: bannerImage || null,
        shortDescription,
        description,
        tags,
        source,
        metaTitle: metaTitle || "",
        metaImage: metaImage || bannerImage || null,
        metaDescription: metaDescription || "",
      };

      // Update the post
      const updatedPost = await AllBlogsModel.findOneAndUpdate(
        { _id: postId },
        { $set: updatedPostObj },
        { new: true }
      ).exec();
      if (!updatedPost) {
        return errorResponse({
          message: "Falid to update the post. Please try again later.",
          status: 500,
        });
      }

      // Update English translation
      const updateEnTranslation = await BlogTranslationModel.findOneAndUpdate(
        {
          referenceId: updatedPost._id.toString(),
          lang: "en",
        },
        {
          $set: {
            title: updatedPost?.title || "",
            shortDescription: updatedPost?.shortDescription || "",
            description: updatedPost?.description || "",
            tags: updatedPost?.tags || [],
          },
        },
        {
          new: true,
          upsert: true,
        }
      );
      if (!updateEnTranslation) {
        return errorResponse({
          message:
            "An unexpected error occurred while updating the english translation.",
          status: 400,
        });
      }

      return successResponse({
        message: "Post updated successfully. Refreshing the page...",
        status: 200,
      });
    }

    // Handle other languages translation update
    const updateOtherTranslations = await BlogTranslationModel.findOneAndUpdate(
      {
        referenceId: postId,
        lang: translateData.lang,
      },
      {
        $set: {
          title: translateData?.title || "",
          shortDescription: translateData?.shortDescription || "",
          description: translateData?.description || "",
          tags: translateData?.tags || [],
        },
      },
      {
        new: true,
        upsert: true,
      }
    );
    if (!updateOtherTranslations) {
      return errorResponse({
        message: `An unexpected error occurred while updating the ${translateData.lang} translation.`,
        status: 400,
      });
    }

    return successResponse({
      message: `Post has been updated successfully. Refreshing the page...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in updating the post SERVER: ${error}`);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
