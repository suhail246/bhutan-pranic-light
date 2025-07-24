import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import UserModel from "@/model/User";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function DELETE(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");
    const targetUserId = searchParams.get("targetUserId");

    // NOTE: Handle not getting request data
    if (
      !sessionId ||
      !targetUserId ||
      !mongoose.Types.ObjectId.isValid(sessionId) ||
      !mongoose.Types.ObjectId.isValid(targetUserId)
    ) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Target user details
    const targetUserInfo = await UserModel.findById(targetUserId)
      .populate("adminAsignedRole")
      .exec();
    if (
      targetUserInfo.adminAsignedRole &&
      targetUserInfo.adminAsignedRole.name === "Super Admin"
    ) {
      return errorResponse({
        message: "You cannot delete the Super Admin.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.STAFF.DELETE_STAFF],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Delete the user
    const deletedUser = await UserModel.findByIdAndDelete({
      _id: targetUserId,
    }).exec();
    if (!deletedUser) {
      return errorResponse({
        message: "The specified user does not exists.",
        status: 400,
      });
    }

    return successResponse({
      message: `${deletedUser.username} deleted successfully. Refreshing...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in deleting the user SERVER: ${error}`);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
