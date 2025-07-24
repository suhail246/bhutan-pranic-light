import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import TestimonialModel from "@/model/testimonial/Testimonial";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function PATCH(request) {
  await dbConnect();

  try {
    const body = await request.json();

    const { userId, targetId } = body;
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
      requiredPermissions: [
        PERMISSIONS.TESTIMONIAL.TOGGLE_FEATURED_TESTIMONIAL,
      ],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Get the testimonial details
    const existingTestimonialDetails =
      await TestimonialModel.findById(targetId).exec();
    if (!existingTestimonialDetails) {
      return errorResponse({
        message: "Testimonial not found.",
        status: 404,
      });
    }

    // Toggle activeStatus
    const updatedTestimonial = await TestimonialModel.findByIdAndUpdate(
      targetId,
      {
        $set: {
          isFeatured: !existingTestimonialDetails.isFeatured,
        },
      },
      { new: true }
    ).exec();
    if (!updatedTestimonial) {
      return errorResponse({
        message:
          "Failed to update the testimonial featured status. Try again later.",
        status: 500,
      });
    }

    // Check if the updated testimonial's featured status is true and active status is false, then make updated testimonial's isActive as true
    if (updatedTestimonial.isFeatured && !updatedTestimonial.isActive) {
      await TestimonialModel.findByIdAndUpdate(updatedTestimonial._id, {
        $set: {
          isActive: true,
        },
      });
    }

    return successResponse({
      message: updatedTestimonial.isFeatured
        ? `You've enabled the ${updatedTestimonial?.name || "Anonymous"} testimonial as a featured one. Refreshing to apply changes...`
        : `You've disabled the ${updatedTestimonial?.name || "Anonymous"} testimonial as a featured one. Refreshing to apply changes...`,
      status: 200,
    });
  } catch (error) {
    console.log(
      `Error in changing testimonial featured status SERVER: `,
      error
    );
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
