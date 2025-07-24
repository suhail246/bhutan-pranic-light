import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
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

    // Validate Category and User IDs
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
      requiredPermissions: [PERMISSIONS.LANGUAGE.EDIT_LANGUAGE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Get language details
    const language = await LanguagesModel.findById(targetId)
      .select("-__v -createdAt -updatedAt")
      .exec();
    if (!language) {
      return errorResponse({
        message: "Language not found.",
        status: 404,
      });
    }

    return successResponse({
      status: 200,
      languageDetails: language,
    });
  } catch (error) {
    console.log(`Error in getting language details SERVER: ${error}`);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
