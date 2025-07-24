import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import { useGenerateSlug } from "@/lib/hooks";
import AllContactsModel from "@/model/contacts/Contacts";
import ContactTranslationModel from "@/model/contacts/ContactTranslation";
import { AllContactsSchema } from "@/schemas";
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
      title,
      branchName,
      slug,
      orderNumber,
      branchAddress,
      contactNumber,
      contactEmail,
      openingHours,
      latitude,
      longitude,
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
      requiredPermissions: [PERMISSIONS.CONTACTS.ADD_CONTACT],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // VALIDATE the request data
    const validatedFields = validateSchema(AllContactsSchema, {
      title,
      branchName,
      slug,
      orderNumber,
      branchAddress,
      contactNumber,
      contactEmail,
      openingHours,
      latitude,
      longitude,
      metaTitle,
      metaImage,
      metaKeywords,
      metaDescription,
    });
    if (!validatedFields.success) {
      return errorResponse({ status: 400, errors: validatedFields.errors });
    }

    // Create a new contact and save into DB
    const newContact = new AllContactsModel({
      title,
      branchName,
      slug: slug || useGenerateSlug(branchName),
      orderNumber: orderNumber || "1",
      branchAddress,
      contactNumber,
      contactEmail,
      openingHours,
      latitude,
      longitude,
      metaTitle,
      metaImage: metaImage ? metaImage : null,
      metaKeywords,
      metaDescription,
    });
    const savedContact = await newContact.save();

    // Store branchName, branchAddress and openingHours lables in the ContactTranslationModel collection with lang = "en" default
    const translationResponse = await ContactTranslationModel.findOneAndUpdate(
      { referenceId: savedContact._id.toString(), lang: "en" },
      {
        $set: {
          title,
          branchName,
          branchAddress,
          openingHours: {
            labels: openingHours?.labels || [],
          },
        },
      },
      { new: true, upsert: true }
    ).exec();
    if (!translationResponse) {
      return errorResponse({
        message:
          "An unexpected error occurred during en language translation. Please try again later.",
        status: 500,
      });
    }

    return successResponse({
      message: `${savedContact.title} Contact created successfully.`,
      status: 201,
    });
  } catch (error) {
    console.log("Error in creating contact SERVER: ", error);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
