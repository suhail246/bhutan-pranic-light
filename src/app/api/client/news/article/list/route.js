import dbConnect from "@/lib/db/dbConnect";
import FilesModel from "@/model/Files";
import LanguagesModel from "@/model/Language";
import AllNewsArticleModel from "@/model/news/NewsArticle";
import AllNewsCategoryModel from "@/model/news/NewsCategory";
import NewsTranslationModel from "@/model/news/NewsTranslation";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import escapeStringRegexp from "escape-string-regexp";
import mongoose from "mongoose";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page"));
    const pageSize = parseInt(searchParams.get("pageSize"));
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const featured = searchParams.get("featured");

    // NOTE Escape special characters - (), ., *, +, ?, [, ], ^, $, \ -> Prevents regex injection attacks. More info: https://www.freeformatter.com/regexp-escape.html [Ex - hello(world) = hello\(world\)]. Ensures your search strings behave as intended in a regular expression. Reduces runtime errors caused by invalid regex patterns.
    const searchQuery = escapeStringRegexp(search || "");
    const query = {
      ...(searchQuery && {
        $or: [
          { title: { $regex: searchQuery, $options: "i" } },
          { slug: { $regex: searchQuery, $options: "i" } },
          { shortDescription: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
        ],
      }),
      ...(category &&
        mongoose.Types.ObjectId.isValid(category) && { category }), // Category filter (direct match)
      ...(status && {
        isActive: status === "true", // Convert to boolean
      }),
      ...(featured && {
        isFeatured: featured === "true", // Convert to boolean
      }),
    };

    const articleLists = await AllNewsArticleModel.find(query)
      .populate({
        path: "category",
        model: AllNewsCategoryModel,
        select: "name",
      })
      .populate({
        path: "bannerImage",
        model: FilesModel,
        select: "fileUrl fileName fileType",
      })
      .select("-__v -metaTitle -metaImage -metaDescription")
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    // Fetch all active languages
    const languages = await LanguagesModel.find({
      status: true,
    }).exec();

    // Fetch translations in one query
    const articleIds = articleLists.map((article) => article._id);
    const translations = await NewsTranslationModel.find({
      referenceId: { $in: articleIds },
    })
      .select("-__v -createdAt -updatedAt -description -_id -referenceType")
      .exec();

    // Map translations by article ID
    const translationMap = {};
    translations.forEach(
      ({ referenceId, lang, title, shortDescription, tags }) => {
        if (!translationMap[referenceId]) {
          translationMap[referenceId] = {};
        }
        translationMap[referenceId][lang] = {
          title,
          shortDescription,
          tags,
        };
      }
    );

    // Process articles and attach translations
    const formattedArticleLists = articleLists.map((eachArticle) => {
      const articleData = eachArticle.toObject();

      // Initialize title and shortDescription as objects
      articleData.title = {};
      articleData.shortDescription = {};
      articleData.tags = {};

      // Fetch translations for the current article
      const translations = translationMap[eachArticle._id];

      // If translations exist, populate the fields
      if (translations) {
        // Loop through all available languages
        for (const lang in translations) {
          if (translations[lang]) {
            // Assign translations for title and shortDescription
            articleData.title[lang] = translations[lang].title || "";
            articleData.shortDescription[lang] =
              translations[lang].shortDescription || "";
            articleData.tags[lang] = translations[lang].tags || [];
          }
        }
      }

      return articleData;
    });

    // Pagination
    const paginationTotalArticles =
      await AllNewsArticleModel.countDocuments(query).exec();
    const totalItemsCount = await AllNewsArticleModel.countDocuments().exec();
    const paginationData = {
      currentPage: page,
      currentLimit: pageSize,
      totalPages: Math.ceil(paginationTotalArticles / pageSize),
      totalItemsPerQuery: paginationTotalArticles,
      totalItemsCount,
    };

    return successResponse({
      status: 200,
      newsArticles: formattedArticleLists,
      paginationData,
    });
  } catch (error) {
    console.log(
      `Error in getting all news articles SERVER: ${error.stack || error}`
    );
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
