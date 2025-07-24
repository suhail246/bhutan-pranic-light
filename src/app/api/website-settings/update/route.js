import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import WebsiteSettingsModel from "@/model/WebsiteSettings";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function PUT(request) {
  await dbConnect();

  try {
    const body = await request.json();

    if (!body.userId || !mongoose.Types.ObjectId.isValid(body.userId)) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: body.userId,
      requiredPermissions: [
        PERMISSIONS.WEBSITE_SETUP.HEADER_SETUP,
        PERMISSIONS.WEBSITE_SETUP.FOOTER_SETUP,
        PERMISSIONS.WEBSITE_SETUP.GENERAL_SETTINGS,
      ],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Validate `body.types`
    if (!Array.isArray(body.types) || body.types.length === 0) {
      return errorResponse({
        message: "Invalid settings types provided.",
        status: 400,
      });
    }

    // Update settings
    for (const type of body.types) {
      const typeValue = body[type] || "";

      // Set `lang` to `null` if not provided or if it's "en"
      const formatedLanguage =
        !body.lang || body.lang === "en" ? null : body.lang;

      const existSettingsDetails = await WebsiteSettingsModel.findOne({
        key: type,
        lang: formatedLanguage,
      }).exec();

      if (existSettingsDetails) {
        await WebsiteSettingsModel.findOneAndUpdate(
          {
            key: type,
            lang: formatedLanguage,
          },
          {
            value: Array.isArray(typeValue)
              ? JSON.stringify(typeValue)
              : typeValue,
            lang: formatedLanguage,
          },
          { new: true }
        ).exec();
      } else {
        const newSetting = new WebsiteSettingsModel({
          key: type,
          value: Array.isArray(typeValue)
            ? JSON.stringify(typeValue)
            : typeValue,
          lang: formatedLanguage,
        });
        await newSetting.save();
      }
    }

    return successResponse({
      message: "Website settings updated successfully",
      status: 200,
    });
  } catch (error) {
    console.log(`Error in updating the website settings SERVER: ${error}`);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
