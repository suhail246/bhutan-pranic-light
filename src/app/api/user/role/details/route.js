import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import AdminCreatedRoleModel from "@/model/AdminCreatedRole";
import AdminCreatedRoleHasPermissionModel from "@/model/AdminCreatedRoleHasPermissions";
import PermissionModel from "@/model/Permission";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const roleId = searchParams.get("roleId");

    // NOTE Validate Role and User IDs
    if (
      !userId ||
      !roleId ||
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(roleId)
    ) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.STAFF.EDIT_STAFF_ROLE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // NOTE Get role info
    const roleInfo = await AdminCreatedRoleModel.findById(roleId).exec();
    if (!roleInfo) {
      return errorResponse({
        message: "Role does not exist.",
        status: 404,
      });
    }

    // NOTE Get role's permissions
    const roleHasPermissionsList =
      await AdminCreatedRoleHasPermissionModel.find({ roleId })
        .select("permissionId")
        .populate({
          path: "permissionId",
          model: PermissionModel,
          select: "_id",
        })
        .exec();

    return successResponse({
      status: 200,
      roleDetails: roleInfo,
      selectedPermissions: roleHasPermissionsList,
    });
  } catch (error) {
    console.log(`Error in getting role details SERVER: ${error}`);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
