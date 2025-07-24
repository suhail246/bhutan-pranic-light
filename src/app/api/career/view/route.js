import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import CareerModel from "@/model/career/Career";
import CareerTranslationModel from "@/model/career/CareerTranslation";
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
      requiredPermissions: [PERMISSIONS.CAREER.VIEW_ALL_CAREERS],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // NOTE Escape special characters - (), ., *, +, ?, [, ], ^, $, \ -> Prevents regex injection attacks. More info: https://www.freeformatter.com/regexp-escape.html [Ex - hello(world) = hello\(world\)]. Ensures your search strings behave as intended in a regular expression. Reduces runtime errors caused by invalid regex patterns.
    const searchQuery = escapeStringRegexp(search || "");
    const query = {
      ...(searchQuery && {
        $or: [
          { jobName: { $regex: searchQuery, $options: "i" } },
          { jobDescripton: { $regex: searchQuery, $options: "i" } },
        ],
      }),
      ...(status && {
        isActive: status === "true", // Convert to boolean
      }),
      ...(featured && {
        isFeatured: featured === "true", // Convert to boolean
      }),
    };

    const careerLists = await CareerModel.find(query)
      .populate({
        path: "image",
        model: FilesModel,
        select: "fileUrl fileName fileType",
        match: { _id: { $ne: null } },
      })
      .select("-__v -jobName -jobDescripton")
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    // Fetch all active languages
    const languages = await LanguagesModel.find({
      status: true,
    }).exec();

    // Fetch translations in one query
    const careerIds = careerLists.map((career) => career._id);
    const translations = await CareerTranslationModel.find({
      referenceId: { $in: careerIds },
    })
      .select("-__v -createdAt -updatedAt -_id")
      .exec();

    // Map translations by career ID
    const translationMap = {};
    translations.forEach(({ referenceId, lang, jobName, jobDescripton }) => {
      if (!translationMap[referenceId]) {
        translationMap[referenceId] = {};
      }
      translationMap[referenceId][lang] = {
        jobName,
        jobDescripton,
      };
    });

    // Process career and attach translations
    const formattedCareerLists = careerLists.map((eachCareer) => {
      const careerData = eachCareer.toObject();

      // Initialize jobName, jobDescripton as objects
      careerData.jobName = {};
      careerData.jobDescripton = {};

      // Fetch translations for the current career
      const translations = translationMap[eachCareer._id];

      // If translations exist, populate the fields
      if (translations) {
        // Loop through all available languages
        for (const lang in translations) {
          if (translations[lang]) {
            // Assign translations for name, designation and message
            careerData.jobName[lang] = translations[lang].jobName || "";
            careerData.jobDescripton[lang] =
              translations[lang].jobDescripton || "";
          }
        }
      }

      return careerData;
    });

    // Pagination
    const paginationTotalCareers =
      await CareerModel.countDocuments(query).exec();
    const totalItemsCount = await CareerModel.countDocuments().exec();
    const paginationData = {
      currentPage: page,
      currentLimit: pageSize,
      totalPages: Math.ceil(paginationTotalCareers / pageSize),
      totalItemsPerQuery: paginationTotalCareers,
      totalItemsCount,
    };

    return successResponse({
      status: 200,
      careers: formattedCareerLists,
      paginationData,
    });
  } catch (error) {
    console.log(`Error in getting all careers SERVER: ${error.stack || error}`);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
