import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import AllContactsModel from "@/model/contacts/Contacts";
import ContactTranslationModel from "@/model/contacts/ContactTranslation";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function DELETE(request) {
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
      requiredPermissions: [PERMISSIONS.CONTACTS.DELETE_CONTACT],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Delete the contact
    const deletedContact =
      await AllContactsModel.findByIdAndDelete(targetId).exec();
    if (!deletedContact) {
      return errorResponse({
        message: "Failed to delete the contact. Please try again later.",
        status: 500,
      });
    }

    // Delete all translations according to deleted contact id
    await ContactTranslationModel.deleteMany({
      referenceId: deletedContact._id.toString(),
    }).exec();

    return successResponse({
      message: `${deletedContact.branchName} contact deleted successfully. Refreshing...`,
      status: 200,
    });
  } catch (error) {
    console.log("Error in deleting the contact SERVER: ", error);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
