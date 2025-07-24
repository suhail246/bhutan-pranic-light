import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import FilesModel from "@/model/Files";
import LanguagesModel from "@/model/Language";
import TestimonialModel from "@/model/testimonial/Testimonial";
import TestimonialTranslationModel from "@/model/testimonial/TestimonialTranslation";
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
      requiredPermissions: [PERMISSIONS.TESTIMONIAL.VIEW_ALL_TESTIMONIALS],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // NOTE Escape special characters - (), ., *, +, ?, [, ], ^, $, \ -> Prevents regex injection attacks. More info: https://www.freeformatter.com/regexp-escape.html [Ex - hello(world) = hello\(world\)]. Ensures your search strings behave as intended in a regular expression. Reduces runtime errors caused by invalid regex patterns.
    const searchQuery = escapeStringRegexp(search || "");
    const query = {
      ...(searchQuery && {
        $or: [
          { name: { $regex: searchQuery, $options: "i" } },
          { designation: { $regex: searchQuery, $options: "i" } },
          { message: { $regex: searchQuery, $options: "i" } },
        ],
      }),
      ...(status && {
        isActive: status === "true", // Convert to boolean
      }),
      ...(featured && {
        isFeatured: featured === "true", // Convert to boolean
      }),
    };

    const testimonialLists = await TestimonialModel.find(query)
      .populate({
        path: "image",
        model: FilesModel,
        select: "fileUrl fileName fileType",
        match: { _id: { $ne: null } },
      })
      .select("-__v -name -designation -message")
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    // Fetch all active languages
    const languages = await LanguagesModel.find({
      status: true,
    }).exec();

    // Fetch translations in one query
    const testimonialIds = testimonialLists.map(
      (testimonial) => testimonial._id
    );
    const translations = await TestimonialTranslationModel.find({
      referenceId: { $in: testimonialIds },
    })
      .select("-__v -createdAt -updatedAt -_id")
      .exec();

    // Map translations by testimonial ID
    const translationMap = {};
    translations.forEach(
      ({ referenceId, lang, name, designation, message }) => {
        if (!translationMap[referenceId]) {
          translationMap[referenceId] = {};
        }
        translationMap[referenceId][lang] = {
          name,
          designation,
          message,
        };
      }
    );

    // Process testimonial and attach translations
    const formattedTstimonialLists = testimonialLists.map((eachTestimonial) => {
      const testimonialData = eachTestimonial.toObject();

      // Initialize name, designation and message as objects
      testimonialData.name = {};
      testimonialData.designation = {};
      testimonialData.message = {};

      // Fetch translations for the current testimonial
      const translations = translationMap[eachTestimonial._id];

      // If translations exist, populate the fields
      if (translations) {
        // Loop through all available languages
        for (const lang in translations) {
          if (translations[lang]) {
            // Assign translations for name, designation and message
            testimonialData.name[lang] = translations[lang].name || "";
            testimonialData.designation[lang] =
              translations[lang].designation || "";
            testimonialData.message[lang] = translations[lang].message || "";
          }
        }
      }

      return testimonialData;
    });

    // Pagination
    const paginationTotalTestimonials =
      await TestimonialModel.countDocuments(query).exec();
    const totalItemsCount = await TestimonialModel.countDocuments().exec();
    const paginationData = {
      currentPage: page,
      currentLimit: pageSize,
      totalPages: Math.ceil(paginationTotalTestimonials / pageSize),
      totalItemsPerQuery: paginationTotalTestimonials,
      totalItemsCount,
    };

    return successResponse({
      status: 200,
      testimonials: formattedTstimonialLists,
      paginationData,
    });
  } catch (error) {
    console.log(
      `Error in getting all testimonials SERVER: ${error.stack || error}`
    );
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
