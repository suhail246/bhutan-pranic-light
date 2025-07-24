import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import HeaderMenuModel from "@/model/HeaderMenu";
import { updateChildMenus, updateParentMenus } from "@/utils/menuTreeUtils";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function PATCH(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { userId, targetId, active } = body;

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
      requiredPermissions: [PERMISSIONS.MENU_MANAGEMENT.TOGGLE_ACTIVE_MENU],
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

    // Toggle active status
    const updatedMenu = await HeaderMenuModel.findByIdAndUpdate(
      targetId,
      {
        $set: {
          activeStatus: !menuData.activeStatus,
          productMenuStatus:
            active === true ? false : menuData.productMenuStatus,
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

    // Recursively update child menus (deactivate them if needed)
    await updateChildMenus(targetId, active);

    // Recursively update parent menus (reactivate if needed)
    await updateParentMenus(menuData.parentMenu, active);

    return successResponse({
      message: active
        ? `You've disabled ${menuData.name} menu. Refreshing to apply changes...`
        : `You've enabled ${menuData.name} menu. Refreshing to apply changes...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in toggling menu active status SERVER: `, error);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
