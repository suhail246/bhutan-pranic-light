import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import HeaderMenuModel from "@/model/HeaderMenu";
import { updateParentMenus } from "@/utils/menuTreeUtils";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function PATCH(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { userId, targetId, productStatus } = body;

    // Validate request data
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
      requiredPermissions: [PERMISSIONS.MENU_MANAGEMENT.TOGGLE_PRODUCT_MENU],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Get the menu details
    const menuData = await HeaderMenuModel.findById(targetId).exec();
    if (!menuData) {
      return errorResponse({
        message: "Menu not found.",
        status: 404,
      });
    }

    // Toggle product status
    const updatedMenu = await HeaderMenuModel.findByIdAndUpdate(
      targetId,
      {
        $set: {
          productMenuStatus: !menuData.productMenuStatus,
          activeStatus: true,
        },
      },
      { new: true }
    );
    if (!updatedMenu) {
      return errorResponse({
        message: "Failed to update the menu. Try again later.",
        status: 500,
      });
    }

    // Check if the updated menu has any parent menu, if so then make that parent menu's activeStatus as true
    if (updatedMenu.productMenuStatus && updatedMenu.parentMenu) {
      await updateParentMenus(updatedMenu.parentMenu, false);
    }

    return successResponse({
      message: productStatus
        ? `You've disabled ${menuData.name} menu product status. Refreshing to apply changes...`
        : `You've enabled ${menuData.name} menu product status. Refreshing to apply changes...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in toggling menu product status SERVER: `, error);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
