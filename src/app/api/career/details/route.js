import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import CareerModel from "@/model/career/Career";
import CareerTranslationModel from "@/model/career/CareerTranslation";
import FilesModel from "@/model/Files";
import LanguagesModel from "@/model/Language";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const targetId = searchParams.get("targetId");

    // Handle not getting request data
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
      requiredPermissions: [PERMISSIONS.CAREER.EDIT_CAREER],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Get common career details
    const careerCommonDetails = await CareerModel.findById(targetId)
      .select("-__v -jobName -jobDescripton -isActive -isFeatured")
      .populate({
        path: "image",
        model: FilesModel,
        select: "fileUrl fileName fileType",
        match: { _id: { $ne: null } },
      })
      .exec();
    if (!careerCommonDetails) {
      return errorResponse({
        message: "Career not found.",
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
        const translation = await CareerTranslationModel.findOne({
          referenceId: careerCommonDetails._id.toString(),
          lang: language.code,
        })
          .select("-referenceId -__v -createdAt -updatedAt")
          .exec();

        details[language.code] = translation || {}; // Empty object if null
      })
    );

    return successResponse({
      status: 200,
      careerDetails: careerCommonDetails,
      translationData: details,
    });
  } catch (error) {
    console.log(`Error in getting career details SERVER: ${error}`);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
