import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import { useGenerateSlug } from "@/lib/hooks";
import AllNewsArticleModel from "@/model/news/NewsArticle";
import NewsTranslationModel from "@/model/news/NewsTranslation";
import { AllNewsArticleSchema } from "@/schemas/pagesSchema/newsSystem/newsArticleSchema";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import { validateSchema } from "@/utils/validateSchemaHandler";
import mongoose from "mongoose";

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const {
      userId,
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
    } = body;

    // NOTE Check invalid inputs
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.NEWS.ADD_NEWS_ARTICLE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // VALIDATE the request data
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

    // Create a new news article and save into DB
    const newNewsArticle = new AllNewsArticleModel({
      userId: authCheck.user._id.toString(),
      title,
      category,
      slug: slug || useGenerateSlug(title),
      bannerImage: bannerImage || null,
      shortDescription,
      description,
      tags,
      source,
      metaTitle,
      metaImage: metaImage ? metaImage : bannerImage ? bannerImage : null,
      metaDescription,
    });
    const savedNewsArticle = await newNewsArticle.save();

    // Store title, shortDescription, description, tags in the LanguageTranslation collection with lang = "en" default
    const createEnTranslation = await NewsTranslationModel.findOneAndUpdate(
      {
        referenceId: savedNewsArticle._id.toString(),
        lang: "en",
      },
      {
        $set: {
          title,
          shortDescription,
          description,
          tags,
        },
      },
      { new: true, upsert: true }
    );
    if (!createEnTranslation) {
      return errorResponse({
        message:
          "An usexpected error occure while saving news data in translation collection.",
        status: 400,
      });
    }

    return successResponse({
      message: "News Article created successfully.",
      status: 201,
    });
  } catch (error) {
    console.log("Error in creating news article SERVER: ", error);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
