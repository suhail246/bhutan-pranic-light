import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import { useTitleNanoid } from "@/lib/hooks";
import HeaderMenuModel from "@/model/HeaderMenu";
import MenuTranslationModel from "@/model/HeaderMenuTranslation";
import { HeaderMenuSchema } from "@/schemas";
import { isParentMenuDescendant } from "@/utils/menuTreeUtils";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import { validateSchema } from "@/utils/validateSchemaHandler";
import mongoose from "mongoose";

export async function PUT(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const {
      userId,
      targetId,
      name,
      link,
      parentMenu,
      orderNumber,
      translateData = {},
    } = body;
    // Is translation data provided
    const isTranslationData = Object.keys(translateData).length > 0;

    // Check invalid inputs
    if (
      !userId ||
      !targetId ||
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(targetId) ||
      (parentMenu &&
        parentMenu !== "none" &&
        !mongoose.Types.ObjectId.isValid(parentMenu))
    ) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.MENU_MANAGEMENT.EDIT_MENU],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    if (!isTranslationData) {
      // VALIDATE the request data
      const validatedFields = validateSchema(HeaderMenuSchema, {
        name,
        link,
        parentMenu,
        orderNumber,
      });
      if (!validatedFields.success) {
        return errorResponse({ status: 400, errors: validatedFields.errors });
      }

      // Get the menu details
      const menuData = await HeaderMenuModel.findById(targetId).exec();
      if (!menuData) {
        return errorResponse({
          message: "Menu not found.",
          status: 404,
        });
      }

      // Handle duplicate menu name. Only check for duplicates if name is changed
      let newName;
      if (name !== menuData.name || link !== menuData.link) {
        const existingMenu = await HeaderMenuModel.find({
          $or: [{ link }, { name }],
          _id: { $ne: targetId },
        });

        if (existingMenu && existingMenu.some((item) => item.name === name)) {
          newName = `${name} ${useTitleNanoid()}`;
        }

        if (existingMenu && existingMenu.some((item) => item.link === link)) {
          return errorResponse({
            message: "Menu link already exists.",
            status: 400,
          });
        }
      }

      // Prevent self-referencing
      if (parentMenu && parentMenu === targetId) {
        return errorResponse({
          message: "A menu cannot be its own parent.",
          status: 400,
        });
      }

      // Check parentMenu exists
      const parentMenuData =
        parentMenu && mongoose.Types.ObjectId.isValid(parentMenu)
          ? await HeaderMenuModel.findById(parentMenu).exec()
          : null;

      if (parentMenuData) {
        // Prevent circular reference
        const isCircularReference = await isParentMenuDescendant(
          targetId,
          parentMenu
        );
        if (isCircularReference) {
          return errorResponse({
            message:
              "Invalid parent menu. A menu cannot be a child of itself or its descendants.",
            status: 400,
          });
        }
      }

      // Set menu updated values object
      const updatedMenuObj = {
        name: newName || name,
        link,
        parentMenu: parentMenu ? parentMenu : null,
        orderNumber,
      };
      // Update the menu
      const updatedMenu = await HeaderMenuModel.findByIdAndUpdate(
        targetId,
        { $set: updatedMenuObj },
        { new: true }
      );
      if (!updatedMenu) {
        return errorResponse({
          message: "Unable to update the menu. Please try again later.",
          status: 500,
        });
      }

      // Update English translation
      const updateEnTranslation = await MenuTranslationModel.findOneAndUpdate(
        {
          referenceId: updatedMenu._id.toString(),
          lang: "en",
        },
        {
          $set: {
            name: updatedMenu?.name || "",
          },
        },
        {
          new: true,
          upsert: true,
        }
      );
      if (!updateEnTranslation) {
        return errorResponse({
          message:
            "An unexpected error occurred while updating the english translation.",
          status: 400,
        });
      }

      return successResponse({
        message: `${updatedMenu.name} menu has been successfully updated.`,
        status: 200,
      });
    }

    // Handle other languages translation update
    const updateOtherTranslation = await MenuTranslationModel.findOneAndUpdate(
      {
        referenceId: targetId.toString(),
        lang: translateData.lang,
      },
      {
        $set: {
          name: translateData?.name || "",
        },
      },
      {
        new: true,
        upsert: true,
      }
    );
    if (!updateOtherTranslation) {
      return errorResponse({
        message: `An unexpected error occurred while updating the ${translateData.lang} translation.`,
        status: 400,
      });
    }

    return successResponse({
      message: `${name || "Menu"} has been updated successfully. Refreshing the page...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in updating menu SERVER: `, error);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
