import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import PageCMSModel from "@/model/cms/PageCMS";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function PATCH(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { userId, linkId } = body;

    // Check invalid inputs
    if (!userId || !linkId || !mongoose.Types.ObjectId.isValid(userId)) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.CMS_SETUP.TOGGLE_ACTIVE_PAGE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Get the cms page details
    const existingCMSPageDetails = await PageCMSModel.findOne({
      linkId,
    }).exec();
    if (!existingCMSPageDetails) {
      return errorResponse({
        message: "CMS Page not found.",
        status: 404,
      });
    }

    // Toggle activeStatus
    const updatedCMSPage = await PageCMSModel.findOneAndUpdate(
      { linkId },
      {
        $set: {
          isActive: !existingCMSPageDetails.isActive,
        },
      },
      { new: true }
    ).exec();
    if (!updatedCMSPage) {
      return errorResponse({
        message:
          "Failed to update the cms page active status. Try again later.",
        status: 500,
      });
    }

    return successResponse({
      message: updatedCMSPage.isActive
        ? `You've enabled the ${updatedCMSPage.pageName} page. Refreshing to apply changes...`
        : `You've disabled the ${updatedCMSPage.pageName} page. Refreshing to apply changes...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in changing cms page active status SERVER: `, error);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
