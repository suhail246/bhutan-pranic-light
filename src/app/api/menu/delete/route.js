import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import HeaderMenuModel from "@/model/HeaderMenu";
import MenuTranslationModel from "@/model/HeaderMenuTranslation";
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
      requiredPermissions: [PERMISSIONS.MENU_MANAGEMENT.DELETE_MENU],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Delete the menu
    const deletedMenu =
      await HeaderMenuModel.findByIdAndDelete(targetId).exec();
    if (!deletedMenu) {
      return errorResponse({
        message: "Unable to delete the menu. Please try again later.",
        status: 500,
      });
    }

    // Check if the menu has any parent menu, and having any child menu, then make those child menu's parentMenuId as the deleted menu's parentMenuId otherwise make the parentMenuId as null
    await HeaderMenuModel.updateMany(
      { parentMenu: targetId },
      {
        $set: {
          parentMenu: deletedMenu.parentMenu || null,
        },
      }
    );

    // Delete the menu translations
    await MenuTranslationModel.deleteMany({
      referenceId: targetId.toString(),
    }).exec();

    return successResponse({
      message: `${deletedMenu.name} menu has been deleted. Refreshing...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in deleting menu SERVER: `, error);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
