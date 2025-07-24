import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import HeaderMenuModel from "@/model/HeaderMenu";
import MenuTranslationModel from "@/model/HeaderMenuTranslation";
import { HeaderMenuSchema } from "@/schemas";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import { validateSchema } from "@/utils/validateSchemaHandler";
import mongoose from "mongoose";

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { userId, name, link, parentMenu, orderNumber } = body;

    console.log("ORDER_NUMBER: ", orderNumber);
    console.log(typeof orderNumber);

    // Check invalid inputs
    if (
      !userId ||
      !mongoose.Types.ObjectId.isValid(userId) ||
      (parentMenu && !mongoose.Types.ObjectId.isValid(parentMenu))
    ) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.MENU_MANAGEMENT.ADD_MENU],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

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

    // Set new menu obj
    const newMenuData = new HeaderMenuModel({
      userId: authCheck.user._id.toString(),
      name,
      link,
      parentMenu: parentMenu ? parentMenu : null,
      orderNumber,
    });

    const savedMenu = await newMenuData.save();

    // Store name data in language translations as initial lang = "en"
    const createEnTranslation = await MenuTranslationModel.findOneAndUpdate(
      {
        referenceId: savedMenu._id.toString(),
        lang: "en",
      },
      {
        $set: {
          name,
        },
      },
      { new: true, upsert: true }
    );
    if (!createEnTranslation) {
      return errorResponse({
        message:
          "An usexpected error occure while saving menu data in translation collection.",
        status: 400,
      });
    }

    return successResponse({
      message: `${savedMenu.name} menu has been successfully created.`,
      status: 201,
    });
  } catch (error) {
    console.log(`Error in creating new menu SERVER: `, error);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
