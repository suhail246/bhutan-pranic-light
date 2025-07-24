import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import { useSlugNanoid, useTitleNanoid } from "@/lib/hooks";
import AllContactsModel from "@/model/contacts/Contacts";
import ContactTranslationModel from "@/model/contacts/ContactTranslation";
import { AllContactsSchema } from "@/schemas";
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
      translateData = {},
    } = body;

    // Is translation data provided
    const isTranslationData = Object.keys(translateData).length > 0;

    // Check validate requested IDs
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
      requiredPermissions: [PERMISSIONS.CONTACTS.EDIT_CONTACT],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // VALIDATE the request data
    if (!isTranslationData) {
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

      // Check if contact exists
      const existingContact = await AllContactsModel.findById(targetId).exec();
      if (!existingContact) {
        return errorResponse({
          message: "Contact not found.",
          status: 404,
        });
      }

      // Only check for duplicates if branchName or slug are changed
      let newSlug;
      let newBranchName;
      if (
        branchName !== existingContact.branchName ||
        slug !== existingContact.slug
      ) {
        const existingContactDetails = await AllContactsModel.find({
          $or: [{ slug }, { branchName }],
          _id: { $ne: targetId },
        }).exec();

        // Handle Duplicate Contact BranchName (Add Random Characters)
        if (
          existingContactDetails.length > 0 &&
          existingContactDetails.some(
            (contact) => contact.branchName === branchName
          )
        ) {
          newBranchName = `${branchName} ${useTitleNanoid()}`;
        }

        // Handle Duplicate Contact Slug (Add Random Characters)
        if (
          existingContactDetails.length > 0 &&
          existingContactDetails.some((contact) => contact.slug === slug)
        ) {
          newSlug = `${slug}-${useSlugNanoid()}`;
        }
      }

      // Set contact updated values object
      const updatedContactObj = {
        title,
        branchName: newBranchName || branchName,
        slug: newSlug || slug,
        orderNumber: orderNumber || "1",
        branchAddress,
        contactNumber,
        contactEmail,
        openingHours,
        latitude,
        longitude,
        metaTitle: metaTitle || "",
        metaImage: metaImage || null,
        metaKeywords: metaKeywords || "",
        metaDescription: metaDescription || "",
      };

      // Update the contact
      const updatedContact = await AllContactsModel.findOneAndUpdate(
        { _id: targetId },
        { $set: updatedContactObj },
        { new: true }
      ).exec();
      if (!updatedContact) {
        return errorResponse({
          message: "Falid to update the contact. Please try again later.",
          status: 500,
        });
      }

      // Update English translation
      const updateTranslationResponse =
        await ContactTranslationModel.findOneAndUpdate(
          { referenceId: updatedContact._id.toString(), lang: "en" },
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
      if (!updateTranslationResponse) {
        return errorResponse({
          message:
            "An unexpected error occurred during update en language translation. Please try again later.",
          status: 500,
        });
      }

      return successResponse({
        message: `${updatedContact.branchName} contact updated successfully. Refreshing the page...`,
        status: 200,
      });
    }

    // Handle other languages translation update
    const updateTranslationResponse =
      await ContactTranslationModel.findOneAndUpdate(
        { referenceId: targetId.toString(), lang: translateData.lang },
        {
          $set: {
            title: translateData?.title || "",
            branchName: translateData?.branchName || "",
            branchAddress: translateData?.branchAddress || "",
            openingHours: {
              labels: translateData?.openingHours?.labels || [],
            },
          },
        },
        { new: true, upsert: true }
      ).exec();
    if (!updateTranslationResponse) {
      return errorResponse({
        message: `An unexpected error occurred during ${translateData.lang} language translation. Please try again later.`,
        status: 500,
      });
    }

    return successResponse({
      message: `${updateTranslationResponse.branchName} contact updated successfully. Refreshing the page...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in updating the contact SERVER: ${error}`);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
