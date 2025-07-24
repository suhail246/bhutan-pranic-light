import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import PageCMSModel from "@/model/cms/PageCMS";
import PageCMSTranslationModel from "@/model/cms/PageCMSTranslation";
import { PageCMSValidationSchema } from "@/schemas";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import { validateSchema } from "@/utils/validateSchemaHandler";
import mongoose from "mongoose";

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const {
      userId,
      pageName,
      slug,
      description,
      metaTitle,
      metaImage,
      metaKeywords,
      metaDescription,
    } = body;

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
      requiredPermissions: [PERMISSIONS.CMS_SETUP.ADD_PAGE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // VALIDATE the request data
    const validatedFields = validateSchema(PageCMSValidationSchema, {
      pageName,
      slug,
      description,
      metaTitle,
      metaImage,
      metaKeywords,
      metaDescription,
    });
    if (!validatedFields.success) {
      return errorResponse({ status: 400, errors: validatedFields.errors });
    }

    // Create a new CMS page and save into DB
    const newCMSPage = new PageCMSModel({
      pageName,
      slug,
      linkId: slug || "",
      description,
      metaTitle,
      metaImage: metaImage || null,
      metaKeywords,
      metaDescription,
    });
    const savedCMSPage = await newCMSPage.save();

    // Store title, heading, subHeading, description in the Translation collection with lang = "en" default
    const createEnTranslation = await PageCMSTranslationModel.findOneAndUpdate(
      {
        referenceId: savedCMSPage._id.toString(),
        lang: "en",
      },
      {
        $set: {
          pageName: savedCMSPage?.pageName || "",
          description: savedCMSPage?.description || "",
        },
      },
      { new: true, upsert: true }
    );
    if (!createEnTranslation) {
      return errorResponse({
        message:
          "An usexpected error occure while saving cms page data in translation collection.",
        status: 400,
      });
    }

    return successResponse({
      message: `${savedCMSPage.pageName} page created successfully.`,
      status: 201,
    });
  } catch (error) {
    console.log("Error in creating cms page SERVER: ", error);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
