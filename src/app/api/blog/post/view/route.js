import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import AllBlogsModel from "@/model/blog/AllBlogs";
import AllBlogsCategoryModel from "@/model/blog/BlogsCategory";
import BlogTranslationModel from "@/model/blog/BlogTranslation";
import FilesModel from "@/model/Files";
import LanguagesModel from "@/model/Language";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import escapeStringRegexp from "escape-string-regexp";
import mongoose from "mongoose";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page"));
    const pageSize = parseInt(searchParams.get("pageSize"));
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const featured = searchParams.get("featured");

    // Validate Category and User IDs
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.POST.VIEW_ALL_POSTS],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

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

    const postsList = await AllBlogsModel.find(query)
      .populate({
        path: "category",
        model: AllBlogsCategoryModel,
        select: "name",
      })
      .populate({
        path: "bannerImage",
        model: FilesModel,
        select: "fileUrl fileName fileType",
      })
      .select("-__v -description -metaTitle -metaImage -metaDescription")
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    // Fetch all active languages
    const languages = await LanguagesModel.find({
      status: true,
    }).exec();

    // Fetch translations in one query
    const postIds = postsList.map((post) => post._id);
    const translations = await BlogTranslationModel.find({
      referenceId: { $in: postIds },
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

    // Process posts and attach translations
    const formattedPostsLists = postsList.map((eachPost) => {
      const postData = eachPost.toObject();

      // Initialize title, and shortDescription as objects
      postData.title = {};
      postData.shortDescription = {};
      postData.tags = {};

      // Fetch translations for the current post
      const translations = translationMap[eachPost._id];

      // If translations exist, populate the fields
      if (translations) {
        // Loop through all available languages
        for (const lang in translations) {
          if (translations[lang]) {
            // Assign translations for title and shortDescription
            postData.title[lang] = translations[lang].title || "";
            postData.shortDescription[lang] =
              translations[lang].shortDescription || "";
            postData.tags[lang] = translations[lang].tags || [];
          }
        }
      }

      return postData;
    });

    const paginationTotalPosts =
      await AllBlogsModel.countDocuments(query).exec();
    const totalItemsCount = await AllBlogsModel.countDocuments().exec();

    // Pagination
    const paginationData = {
      currentPage: page,
      currentLimit: pageSize,
      totalPages: Math.ceil(paginationTotalPosts / pageSize),
      totalItemsPerQuery: paginationTotalPosts,
      totalItemsCount,
    };

    return successResponse({
      status: 200,
      posts: formattedPostsLists,
      paginationData,
    });
  } catch (error) {
    console.log(
      `Error in getting all categories SERVER: ${error.stack || error}`
    );
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
