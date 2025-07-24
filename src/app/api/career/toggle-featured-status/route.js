import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import CareerModel from "@/model/career/Career";
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
      requiredPermissions: [PERMISSIONS.CAREER.TOGGLE_FEATURED_CAREER],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Get the career details
    const existingCareerDetails = await CareerModel.findById(targetId).exec();
    if (!existingCareerDetails) {
      return errorResponse({
        message: "Career not found.",
        status: 404,
      });
    }

    // Toggle featuredStatus
    const updatedCareer = await CareerModel.findByIdAndUpdate(
      targetId,
      {
        $set: {
          isFeatured: !existingCareerDetails.isFeatured,
        },
      },
      { new: true }
    ).exec();
    if (!updatedCareer) {
      return errorResponse({
        message:
          "Failed to update the career featured status. Try again later.",
        status: 500,
      });
    }

    // Check if the updated career's featured status is true and active status is false, then make updated career's isActive as true
    if (updatedCareer.isFeatured && !updatedCareer.isActive) {
      await CareerModel.findByIdAndUpdate(updatedCareer._id, {
        $set: {
          isActive: true,
        },
      });
    }

    return successResponse({
      message: updatedCareer.isFeatured
        ? `You've enabled the ${updatedCareer?.jobName || "Anonymous"} career as a featured one. Refreshing to apply changes...`
        : `You've disabled the ${updatedCareer?.jobName || "Anonymous"} career as a featured one. Refreshing to apply changes...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in changing career featured status SERVER: `, error);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
