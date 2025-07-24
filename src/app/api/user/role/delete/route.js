import { cacheKeyNames } from "@/app/assets/data/cacheKeysData";
import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import { deleteCache, deletePatternCache } from "@/lib/redis/actions";
import AdminCreatedRoleModel from "@/model/AdminCreatedRole";
import AdminCreatedRoleHasPermissionModel from "@/model/AdminCreatedRoleHasPermissions";
import UserModel from "@/model/User";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function DELETE(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const roleId = searchParams.get("roleId");

    // NOTE: Handle not getting request data
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
      requiredPermissions: [PERMISSIONS.STAFF.DELETE_STAFF_ROLE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    const targetRole = await AdminCreatedRoleModel.findById(roleId).exec();
    if (!targetRole) {
      return errorResponse({
        message: "The specified role does not exist.",
        status: 404,
      });
    }

    // NOTE Prevent deletion of essential roles
    if (["super admin", "Super Admin"].includes(targetRole.name)) {
      return errorResponse({
        message: `The role '${targetRole.name}' cannot be deleted.`,
        status: 400,
      });
    }

    // NOTE Delete the role
    const deletedRole = await AdminCreatedRoleModel.findByIdAndDelete({
      _id: roleId,
    }).exec();
    if (!deletedRole) {
      return errorResponse({
        message: "Failed to delete the role. Please try again later.",
        status: 500,
      });
    }

    // NOTE Delete the role's permissions
    const deletedPermissions = await AdminCreatedRoleHasPermissionModel.find({
      roleId,
    });
    if (deletedPermissions.length > 0) {
      await AdminCreatedRoleHasPermissionModel.deleteMany({
        roleId,
      });
    }

    // Get users who had this role assigned
    const userList = await UserModel.find({
      adminAsignedRole: roleId,
    }).exec();

    if (userList.length > 0) {
      // Remove role from users
      await UserModel.updateMany(
        {
          adminAsignedRole: roleId,
        },
        {
          $set: {
            adminAsignedRole: null,
          },
        }
      );

      // Delete each user's session and details cache
      for (const user of userList) {
        await Promise.all([
          deleteCache(`${cacheKeyNames.SESSION_USER_DETAILS}-${user._id}`),
          deleteCache(`${cacheKeyNames.USER_DETAILS}-${userId}-${user._id}`),
        ]);
      }
    }

    // Delete all users and roles cache
    const [deleteUserPatternCacheResponse, deleteRolePatternCacheResponse] =
      await Promise.all([
        deletePatternCache(`${cacheKeyNames.USERS}-${userId}-*`),
        deletePatternCache(`${cacheKeyNames.ROLES}-${userId}-*`),
      ]);

    return successResponse({
      message: `${deletedRole.name} has been deleted successfully. Refreshing...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in deleting the role SERVER: ${error}`);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
