import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import PageCMSModel from "@/model/cms/PageCMS";
import PageCMSTranslationModel from "@/model/cms/PageCMSTranslation";
import { PageCMSValidationSchema } from "@/schemas";
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
      linkId,
      pageName,
      slug,
      description,
      metaTitle,
      metaImage,
      metaKeywords,
      metaDescription,
      translateData = {},
    } = body;

    // Is translation data provided
    const isTranslationData = Object.keys(translateData).length > 0;

    // Check validate requested IDs
    if (!userId || !linkId || !mongoose.Types.ObjectId.isValid(userId)) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.CMS_SETUP.EDIT_PAGE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Check if cms page exists
    const existingCMSPage = await PageCMSModel.findOne({
      linkId,
    }).exec();
    if (!existingCMSPage) {
      return errorResponse({
        message: "CMS Page not found.",
        status: 404,
      });
    }

    // VALIDATE the request data
    if (!isTranslationData) {
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

      // Set cms page updated values object
      const updatedCMSPageObj = {
        pageName,
        slug,
        description,
        metaTitle,
        metaImage: metaImage || null,
        metaKeywords,
        metaDescription,
      };

      // Update the CMS Page
      const updatedCMSPage = await PageCMSModel.findOneAndUpdate(
        { linkId },
        { $set: updatedCMSPageObj },
        { new: true }
      ).exec();
      if (!updatedCMSPage) {
        return errorResponse({
          message: "Falid to update the cms page. Please try again later.",
          status: 500,
        });
      }

      // Update English translation
      const updateEnTranslation =
        await PageCMSTranslationModel.findOneAndUpdate(
          {
            referenceId: updatedCMSPage._id.toString(),
            lang: "en",
          },
          {
            $set: {
              pageName: updatedCMSPage?.pageName || "",
              description: updatedCMSPage?.description || "",
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
        message: `${updatedCMSPage.pageName} page updated successfully. Refreshing the page...`,
        status: 200,
      });
    }

    // Handle other languages translation update
    const updateOtherTranslations =
      await PageCMSTranslationModel.findOneAndUpdate(
        {
          referenceId: existingCMSPage._id.toString(),
          lang: translateData.lang,
        },
        {
          $set: {
            pageName: translateData?.pageName || "",
            description: translateData?.description || "",
          },
        },
        {
          new: true,
          upsert: true,
        }
      );
    if (!updateOtherTranslations) {
      return errorResponse({
        message: `An unexpected error occurred while updating the ${translateData.lang} translation.`,
        status: 400,
      });
    }

    return successResponse({
      message: `${existingCMSPage.pageName} page has been updated successfully. Refreshing the page...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in updating the cms page SERVER: ${error}`);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
