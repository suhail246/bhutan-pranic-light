import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import LanguagesModel from "@/model/Language";
import { AllLanguagesSchema } from "@/schemas";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import { validateSchema } from "@/utils/validateSchemaHandler";
import mongoose from "mongoose";

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { userId, name, code, app_lang_code } = body;

    // Check invalid inputs
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.LANGUAGE.ADD_LANGUAGE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // VALIDATE the request data
    const validatedFields = validateSchema(AllLanguagesSchema, {
      name,
      code,
      app_lang_code,
    });
    if (!validatedFields.success) {
      return errorResponse({ status: 400, errors: validatedFields.errors });
    }

    // Create a new language and save into DB
    const newLanguage = new LanguagesModel({
      name: `${name[0].toUpperCase()}${name.slice(1)}`,
      code,
      app_lang_code: app_lang_code || code,
    });
    const savedLanguage = await newLanguage.save();

    return successResponse({
      message: `${savedLanguage.name} language created successfully.`,
      status: 201,
    });
  } catch (error) {
    console.log("Error in creating the language SERVER: ", error);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
