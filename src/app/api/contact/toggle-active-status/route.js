import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import AllContactsModel from "@/model/contacts/Contacts";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function PATCH(request) {
  await dbConnect();

  try {
    const body = await request.json();

    const { userId, targetId } = body;
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
      requiredPermissions: [PERMISSIONS.CONTACTS.TOGGLE_ACTIVE_CONTACT],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Get the contact details
    const existingContactDetails =
      await AllContactsModel.findById(targetId).exec();
    if (!existingContactDetails) {
      return errorResponse({
        message: "Contact not found.",
        status: 404,
      });
    }

    // Toggle activeStatus
    const updatedContact = await AllContactsModel.findByIdAndUpdate(
      targetId,
      {
        $set: {
          isActive: !existingContactDetails.isActive,
        },
      },
      { new: true }
    ).exec();
    if (!updatedContact) {
      return errorResponse({
        message: "Failed to update the contact active status. Try again later.",
        status: 500,
      });
    }

    // Check if the updated contact's active status is false and (featured and forActive) status is true, then make updated contact's isFeatured as false
    if (!updatedContact.isActive) {
      if (updatedContact.isFeatured) {
        await AllContactsModel.findByIdAndUpdate(updatedContact._id, {
          $set: {
            isFeatured: false,
          },
        });
      }

      if (updatedContact.isFormActive) {
        await AllContactsModel.findByIdAndUpdate(updatedContact._id, {
          $set: {
            isFormActive: false,
          },
        });
      }
    }

    return successResponse({
      message: updatedContact.isActive
        ? `You've enabled the ${updatedContact.branchName} contact. Refreshing to apply changes...`
        : `You've disabled the ${updatedContact.branchName} contact. Refreshing to apply changes...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in changing contact active status SERVER: `, error);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
