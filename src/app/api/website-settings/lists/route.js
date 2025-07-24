import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import WebsiteSettingsModel from "@/model/WebsiteSettings";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [
        PERMISSIONS.WEBSITE_SETUP.HEADER_SETUP,
        PERMISSIONS.WEBSITE_SETUP.FOOTER_SETUP,
        PERMISSIONS.WEBSITE_SETUP.GENERAL_SETTINGS,
      ],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    const settingsList = await WebsiteSettingsModel.find()
      .select("key value lang")
      .exec();

    return successResponse({
      status: 200,
      settingsList,
    });
  } catch (error) {
    console.log(`Error in getting the website settings SERVER: ${error}`);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
