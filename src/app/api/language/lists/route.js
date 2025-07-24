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
      requiredPermissions: [
        PERMISSIONS.POST.EDIT_POST,
        PERMISSIONS.CATEGORY.EDIT_CATEGORY,
        PERMISSIONS.NEWS.EDIT_NEWS_ARTICLE,
        PERMISSIONS.NEWS_CATEGORY.EDIT_NEWS_CATEGORY,
        PERMISSIONS.CONTACTS.EDIT_CONTACT,
        PERMISSIONS.TESTIMONIAL.EDIT_TESTIMONIAL,
        PERMISSIONS.CAREER.EDIT_CAREER,
        PERMISSIONS.CMS_SETUP.EDIT_PAGE,
        PERMISSIONS.CMS_SETUP.EDIT_PAGE_SECTIONS,
        PERMISSIONS.WEBSITE_SETUP.HEADER_SETUP,
        PERMISSIONS.WEBSITE_SETUP.FOOTER_SETUP,
        PERMISSIONS.WEBSITE_SETUP.GENERAL_SETTINGS,
        PERMISSIONS.MENU_MANAGEMENT.EDIT_MENU,
        PERMISSIONS.LANGUAGE.VIEW_ALL_LANGUAGES,
      ],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Get all languages
    const languages = await LanguagesModel.find({})
      .select("-__v -createdAt -updatedAt")
      .exec();

    return successResponse({
      status: 200,
      languageList: languages,
    });
  } catch (error) {
    console.log(`Error in getting all languages SERVER: ${error}`);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
