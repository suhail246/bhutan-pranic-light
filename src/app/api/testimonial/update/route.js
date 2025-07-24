import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import TestimonialModel from "@/model/testimonial/Testimonial";
import TestimonialTranslationModel from "@/model/testimonial/TestimonialTranslation";
import { TestimonialSchema } from "@/schemas";
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
      designation,
      message,
      orderNumber,
      rating,
      image,
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
      requiredPermissions: [PERMISSIONS.TESTIMONIAL.EDIT_TESTIMONIAL],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // VALIDATE the request data
    if (!isTranslationData) {
      const validatedFields = validateSchema(TestimonialSchema, {
        name,
        designation,
        message,
        orderNumber,
        rating,
        image,
      });
      if (!validatedFields.success) {
        return errorResponse({ status: 400, errors: validatedFields.errors });
      }

      // Check if testimonial exists
      const existingTestimonial =
        await TestimonialModel.findById(targetId).exec();
      if (!existingTestimonial) {
        return errorResponse({
          message: "Testimonial not found.",
          status: 404,
        });
      }

      // Set testimonial updated values object
      const updatedTestimonialObj = {
        name,
        designation,
        message,
        orderNumber: orderNumber || "1",
        rating,
        image: image || null,
      };

      // Update the testimonial
      const updatedTestimonial = await TestimonialModel.findOneAndUpdate(
        { _id: targetId },
        { $set: updatedTestimonialObj },
        { new: true }
      ).exec();
      if (!updatedTestimonial) {
        return errorResponse({
          message: "Falid to update the testimonial. Please try again later.",
          status: 500,
        });
      }

      // Update English translation
      const updateEnTranslation =
        await TestimonialTranslationModel.findOneAndUpdate(
          {
            referenceId: updatedTestimonial._id.toString(),
            lang: "en",
          },
          {
            $set: {
              name: updatedTestimonial?.name || "",
              designation: updatedTestimonial?.designation || "",
              message: updatedTestimonial?.message || "",
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
        message: `${updatedTestimonial?.name || "Anonymous"} testimonial updated successfully. Refreshing the page...`,
        status: 200,
      });
    }

    // Handle other languages translation update
    const updateOtherTranslations =
      await TestimonialTranslationModel.findOneAndUpdate(
        {
          referenceId: targetId,
          lang: translateData.lang,
        },
        {
          $set: {
            name: translateData?.name || "",
            designation: translateData?.designation || "",
            message: translateData?.message || "",
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
      message: `${name || "Anonymous"} testimonial updated successfully. Refreshing the page...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in updating the testimonial SERVER: ${error}`);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
