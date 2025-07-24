import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import { useSlugNanoid, useTitleNanoid } from "@/lib/hooks";
import AllNewsArticleModel from "@/model/news/NewsArticle";
import NewsTranslationModel from "@/model/news/NewsTranslation";
import { AllNewsArticleSchema } from "@/schemas/pagesSchema/newsSystem/newsArticleSchema";
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
      targetId,
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
      requiredPermissions: [PERMISSIONS.NEWS.EDIT_NEWS_ARTICLE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // VALIDATE the request data
    if (!isTranslationData) {
      const validatedFields = validateSchema(AllNewsArticleSchema, {
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

      // Check if news article exists
      const existingNewsArticle =
        await AllNewsArticleModel.findById(targetId).exec();
      if (!existingNewsArticle) {
        return errorResponse({
          message: "News Article not found.",
          status: 404,
        });
      }

      // Only check for duplicates if title or slug are changed
      let newSlug;
      let newTitle;
      if (
        title !== existingNewsArticle.title ||
        slug !== existingNewsArticle.slug
      ) {
        const existingNewsArticleDetails = await AllNewsArticleModel.find({
          $or: [{ slug }, { title }],
          _id: { $ne: targetId },
        }).exec();

        // Handle Duplicate news article Title (Add Random Characters)
        if (
          existingNewsArticleDetails &&
          existingNewsArticleDetails.some((article) => article.title === title)
        ) {
          newTitle = `${title} ${useTitleNanoid()}`;
        }

        // Handle Duplicate news article Slug (Add Random Characters)
        if (
          existingNewsArticleDetails &&
          existingNewsArticleDetails.some((article) => article.slug === slug)
        ) {
          newSlug = `${slug}-${useSlugNanoid()}`;
        }
      }

      // Set news article updated values object
      const updatedNewsArticleObj = {
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

      // Update the news article
      const updatedNewsArticle = await AllNewsArticleModel.findOneAndUpdate(
        { _id: targetId },
        { $set: updatedNewsArticleObj },
        { new: true }
      ).exec();
      if (!updatedNewsArticle) {
        return errorResponse({
          message: "Falid to update the news article. Please try again later.",
          status: 500,
        });
      }

      // Update English translation
      const updateEnTranslation = await NewsTranslationModel.findOneAndUpdate(
        {
          referenceId: updatedNewsArticle._id.toString(),
          lang: "en",
        },
        {
          $set: {
            title: updatedNewsArticle?.title || "",
            shortDescription: updatedNewsArticle?.shortDescription || "",
            description: updatedNewsArticle?.description || "",
            tags: updatedNewsArticle?.tags || [],
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
        message: "News Article updated successfully. Refreshing the page...",
        status: 200,
      });
    }

    // Handle other languages translation update
    const updateOtherTranslations = await NewsTranslationModel.findOneAndUpdate(
      {
        referenceId: targetId,
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
      message: `News Article has been updated successfully. Refreshing the page...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in updating the news article SERVER: ${error}`);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
