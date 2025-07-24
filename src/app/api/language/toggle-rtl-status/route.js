import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import LanguagesModel from "@/model/Language";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function PATCH(request) {
  await dbConnect();

  try {
    const body = await request.json();

    const { userId, targetId, rtlStatus } = body;
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
      requiredPermissions: [PERMISSIONS.LANGUAGE.TOGGLE_RTL_LANGUAGE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Get the language details
    const language = await LanguagesModel.findById(targetId).exec();
    if (!language) {
      return errorResponse({
        message: "Language not found.",
        status: 404,
      });
    }

    // Toggle rtlStatus
    const updatedLanguage = await LanguagesModel.findByIdAndUpdate(
      language._id,
      {
        $set: {
          rtl: !language.rtl,
        },
      },
      { new: true }
    ).exec();
    if (!updatedLanguage) {
      return errorResponse({
        message: "Failed to update the language. Try again later.",
        status: 500,
      });
    }

    return successResponse({
      message: rtlStatus
        ? `You've disabled ${language.name} language's RTL. Refreshing to apply changes...`
        : `You've enabled ${language.name} language's RTL. Refreshing to apply changes...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in changing language RTL status SERVER: `, error);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
