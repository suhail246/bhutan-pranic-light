import { cacheKeyNames } from "@/app/assets/data/cacheKeysData";
import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import { deleteCache, deletePatternCache, getCache } from "@/lib/redis/actions";
import AdminCreatedRoleModel from "@/model/AdminCreatedRole";
import AdminCreatedRoleHasPermissionModel from "@/model/AdminCreatedRoleHasPermissions";
import UserModel from "@/model/User";
import { AllUserRolesSchema } from "@/schemas";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import { validateSchema } from "@/utils/validateSchemaHandler";
import mongoose from "mongoose";

export async function PUT(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { name, permissionIds, userId, roleId } = body;

    // NOTE Check invalid inputs
    if (
      !userId ||
      !roleId ||
      !mongoose.Types.ObjectId.isValid(roleId) ||
      !mongoose.Types.ObjectId.isValid(userId)
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

    // VALIDATE the request data
    const validatedFields = validateSchema(AllUserRolesSchema, {
      name,
      permissionIds,
    });
    if (!validatedFields.success) {
      return errorResponse({ status: 400, errors: validatedFields.errors });
    }

    // NOTE Check existing role
    const existingRole = await AdminCreatedRoleModel.findOne({
      name,
      _id: { $ne: roleId },
    }).exec();
    if (existingRole) {
      return errorResponse({
        message: "Role already exists. Please try with different name.",
        status: 400,
      });
    }

    // Update Role Name
    const roleIdDetails = await AdminCreatedRoleModel.findById(roleId).exec();
    let updatedRole = roleIdDetails;
    if (roleIdDetails.name.trim() !== name) {
      updatedRole = await AdminCreatedRoleModel.findByIdAndUpdate(
        roleId,
        {
          $set: {
            name,
          },
        },
        { new: true }
      ).exec();
      if (!updatedRole) {
        return errorResponse({
          message:
            "Internal Error: Role update failed. Please try again later.",
          status: 500,
        });
      }
    }

    // Get current permissions of the role
    const existingPermissions = await AdminCreatedRoleHasPermissionModel.find({
      roleId,
    }).exec();

    // Make permission ids array [permId, permId, ...]
    const currentPermissionIds = existingPermissions.map((perm) =>
      perm.permissionId.toString()
    );

    // Compare new and existing permissions
    if (
      JSON.stringify(permissionIds.sort()) !==
      JSON.stringify(currentPermissionIds.sort())
    ) {
      // Delete existing permissions
      await AdminCreatedRoleHasPermissionModel.deleteMany({
        roleId,
      });

      // Insert new permissions
      const permissionDocs = permissionIds.map((permissionId) => ({
        roleId,
        permissionId,
      }));
      await AdminCreatedRoleHasPermissionModel.insertMany(permissionDocs);
    }

    // Find the users who have the roleId
    const userList = await UserModel.find({
      adminAsignedRole: roleId,
    }).exec();
    if (userList.length > 0) {
      for (const user of userList) {
        const { parsedValue } = await getCache(
          `${cacheKeyNames.SESSION_USER_DETAILS}-${user._id}`
        );

        if (parsedValue) {
          await deleteCache(
            `${cacheKeyNames.SESSION_USER_DETAILS}-${user._id}`
          );
        }
      }
    }

    // Delete target role details if exists
    const { parsedValue } = await getCache(
      `${cacheKeyNames.ROLE_DETAILS}-${userId}-${roleId}`
    );
    if (parsedValue) {
      await deleteCache(`${cacheKeyNames.ROLE_DETAILS}-${userId}-${roleId}`);
    }

    // Delete all roles related caches
    await deletePatternCache(`${cacheKeyNames.ROLES}-${userId}-*`);

    return successResponse({
      message: `${updatedRole.name} role updated successfully. Refreshing...`,
      status: 200,
    });
  } catch (error) {
    console.log("Error in updating role SERVER: ", error);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
