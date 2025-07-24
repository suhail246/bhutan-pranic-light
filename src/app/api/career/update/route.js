import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import CareerModel from "@/model/career/Career";
import CareerTranslationModel from "@/model/career/CareerTranslation";
import { CareerSchema } from "@/schemas";
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
      jobName,
      jobDescripton,
      jobVacancies,
      orderNumber,
      applyLink,
      image,
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
      requiredPermissions: [PERMISSIONS.CAREER.EDIT_CAREER],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // VALIDATE the request data
    if (!isTranslationData) {
      const validatedFields = validateSchema(CareerSchema, {
        jobName,
        jobDescripton,
        jobVacancies,
        orderNumber,
        applyLink,
        image,
        metaTitle,
        metaImage,
        metaKeywords,
        metaDescription,
      });
      if (!validatedFields.success) {
        return errorResponse({ status: 400, errors: validatedFields.errors });
      }

      // Check if career exists
      const existingCareer = await CareerModel.findById(targetId).exec();
      if (!existingCareer) {
        return errorResponse({
          message: "Career not found.",
          status: 404,
        });
      }

      // Set career updated values object
      const updatedCareerObj = {
        jobName,
        jobDescripton,
        jobVacancies,
        orderNumber: orderNumber || "1",
        applyLink,
        image: image || null,
        metaTitle,
        metaImage: metaImage || null,
        metaKeywords,
        metaDescription,
      };

      // Update the career
      const updatedCareer = await CareerModel.findOneAndUpdate(
        { _id: targetId },
        { $set: updatedCareerObj },
        { new: true }
      ).exec();
      if (!updatedCareer) {
        return errorResponse({
          message: "Falid to update the career. Please try again later.",
          status: 500,
        });
      }

      // Update English translation
      const updateEnTranslation = await CareerTranslationModel.findOneAndUpdate(
        {
          referenceId: updatedCareer._id.toString(),
          lang: "en",
        },
        {
          $set: {
            jobName: updatedCareer?.jobName || "",
            jobDescripton: updatedCareer?.jobDescripton || "",
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
        message: `${updatedCareer?.jobName || "Anonymous"} career updated successfully. Refreshing the page...`,
        status: 200,
      });
    }

    // Handle other languages translation update
    const updateOtherTranslations =
      await CareerTranslationModel.findOneAndUpdate(
        {
          referenceId: targetId,
          lang: translateData.lang,
        },
        {
          $set: {
            jobName: translateData?.jobName || "",
            jobDescripton: translateData?.jobDescripton || "",
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
      message: `${jobName || "Anonymous"} career updated successfully. Refreshing the page...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in updating the career SERVER: ${error}`);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
