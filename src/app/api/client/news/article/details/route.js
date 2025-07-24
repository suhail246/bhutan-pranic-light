import dbConnect from "@/lib/db/dbConnect";
import FilesModel from "@/model/Files";
import LanguagesModel from "@/model/Language";
import AllNewsArticleModel from "@/model/news/NewsArticle";
import NewsTranslationModel from "@/model/news/NewsTranslation";
import { errorResponse, successResponse } from "@/utils/responseHandler";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    // Validate Category and User IDs
    if (!slug) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Get common news article details
    const newsArticleCommonDetails = await AllNewsArticleModel.findOne({
      slug,
    })
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
    if (!newsArticleCommonDetails) {
      return errorResponse({
        message: "News Article not found.",
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
        const translation = await NewsTranslationModel.findOne({
          referenceId: newsArticleCommonDetails._id.toString(),
          lang: language.code,
        })
          .select("-referenceType -referenceId -__v -createdAt -updatedAt")
          .exec();

        details[language.code] = translation || {}; // Empty object if null
      })
    );

    return successResponse({
      status: 200,
      newsArticleDetails: newsArticleCommonDetails,
      translationData: details,
    });
  } catch (error) {
    console.log(`Error in getting news article details SERVER: ${error}`);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
