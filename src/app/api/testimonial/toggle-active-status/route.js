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
      requiredPermissions: [PERMISSIONS.TESTIMONIAL.TOGGLE_ACTIVE_TESTIMONIAL],
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
          isActive: !existingTestimonialDetails.isActive,
        },
      },
      { new: true }
    ).exec();
    if (!updatedTestimonial) {
      return errorResponse({
        message:
          "Failed to update the testimonial active status. Try again later.",
        status: 500,
      });
    }

    // Check if the updated testimonial's active status is false and featured status is true, then make updated testimonial's isFeatured as false
    if (updatedTestimonial.isFeatured && !updatedTestimonial.isActive) {
      await TestimonialModel.findByIdAndUpdate(updatedTestimonial._id, {
        $set: {
          isFeatured: false,
        },
      });
    }

    return successResponse({
      message: updatedTestimonial.isActive
        ? `You've enabled the ${updatedTestimonial?.name || "Anonymous"} testimonial. Refreshing to apply changes...`
        : `You've disabled the ${updatedTestimonial?.name || "Anonymous"} testimonial. Refreshing to apply changes...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in changing testimonial active status SERVER: `, error);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
