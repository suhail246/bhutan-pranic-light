import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import TestimonialModel from "@/model/testimonial/Testimonial";
import TestimonialTranslationModel from "@/model/testimonial/TestimonialTranslation";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function DELETE(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const targetId = searchParams.get("targetId");

    // Handle not getting request data
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
      requiredPermissions: [PERMISSIONS.TESTIMONIAL.DELETE_TESTIMONIAL],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Delete the testimonial
    const deletedTestimonial =
      await TestimonialModel.findByIdAndDelete(targetId).exec();
    if (!deletedTestimonial) {
      return errorResponse({
        message: "Failed to delete the testimonial. Please try again later.",
        status: 500,
      });
    }

    // Delete all translations according to deleted testimonial id
    await TestimonialTranslationModel.deleteMany({
      referenceId: deletedTestimonial._id.toString(),
    }).exec();

    return successResponse({
      message: `${deletedTestimonial?.name || "Anonymous"} testimonial has been deleted successfully. Refreshing...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in deleting translations SERVER: ${error}`);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
