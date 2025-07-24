import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import AdminCreatedRoleModel from "@/model/AdminCreatedRole";
import AdminCreatedRoleHasPermissionModel from "@/model/AdminCreatedRoleHasPermissions";
import { AllUserRolesSchema } from "@/schemas";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import { validateSchema } from "@/utils/validateSchemaHandler";
import mongoose from "mongoose";

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { userId, name, permissionIds } = body;

    // NOTE Check invalid inputs
    if (
      !userId ||
      !mongoose.Types.ObjectId.isValid(userId) ||
      ["Super Admin", "super admin"].includes(name)
    ) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.STAFF.ADD_STAFF_ROLE],
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

    // Check duplicate role name
    const existRole = await AdminCreatedRoleModel.findOne({ name }).exec();
    if (existRole) {
      return errorResponse({
        message: `${name} is already exists. Please try with different name.`,
        status: 400,
      });
    }

    // Create a new role and save into DB
    const newRole = new AdminCreatedRoleModel({
      name,
    });
    await newRole.save();

    // Store roleId and each permissionId in the AdminCreatedRoleHasPermissions collection
    for (let i = 0; i < permissionIds.length; i++) {
      const permissionId = permissionIds[i];
      const roleHasPermission = new AdminCreatedRoleHasPermissionModel({
        roleId: newRole._id,
        permissionId,
      });

      await roleHasPermission.save();
    }

    return successResponse({
      message: `${newRole.name} has been created successfully. Refreshing...`,
      status: 201,
    });
  } catch (error) {
    console.log("Error in creating new role SERVER: ", error);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
