import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import CareerModel from "@/model/career/Career";
import CareerTranslationModel from "@/model/career/CareerTranslation";
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
      requiredPermissions: [PERMISSIONS.CAREER.DELETE_CAREER],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Delete the career
    const deletedCareer = await CareerModel.findByIdAndDelete(targetId).exec();
    if (!deletedCareer) {
      return errorResponse({
        message: "Failed to delete the career. Please try again later.",
        status: 500,
      });
    }

    // Delete all translations according to deleted career id
    await CareerTranslationModel.deleteMany({
      referenceId: deletedCareer._id.toString(),
    }).exec();

    return successResponse({
      message: `${deletedCareer?.jobName || "Anonymous"} career has been deleted successfully. Refreshing...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in deleting career SERVER: ${error}`);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
