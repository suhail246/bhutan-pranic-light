import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import PageCMSModel from "@/model/cms/PageCMS";
import PageCMSTranslationModel from "@/model/cms/PageCMSTranslation";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function PATCH(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { userId, linkId, data, lang } = body;

    // Is translation data provided
    const isTranslationData = Object.keys(data).length > 0;

    // Check validate requested IDs
    if (
      !userId ||
      !linkId ||
      !mongoose.Types.ObjectId.isValid(userId) ||
      !isTranslationData
    ) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.CMS_SETUP.EDIT_PAGE_SECTIONS],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Check if cms page exists
    const existingCMSPage = await PageCMSModel.findOne({
      linkId,
    }).exec();
    if (!existingCMSPage) {
      return errorResponse({
        message: "CMS Page not found.",
        status: 404,
      });
    }

    // Handle languages translation update
    const updateTranslations = await PageCMSTranslationModel.findOneAndUpdate(
      {
        referenceId: existingCMSPage._id.toString(),
        lang,
      },
      {
        $set: {
          content: JSON.stringify(data),
        },
      },
      {
        new: true,
        upsert: true,
      }
    );
    if (!updateTranslations) {
      return errorResponse({
        message: `An unexpected error occurred while updating the ${lang} translation.`,
        status: 400,
      });
    }

    return successResponse({
      message: `${existingCMSPage.pageName} page's content has been updated successfully. Refreshing the page...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in updating the cms page sections SERVER: ${error}`);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
