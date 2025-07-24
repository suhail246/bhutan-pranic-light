import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import UserModel from "@/model/User";
import { UserUpdateSchema } from "@/schemas";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import { validateSchema } from "@/utils/validateSchemaHandler";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export async function PUT(request) {
  await dbConnect();

  try {
    const { userId, targetId, name, email, password, roleId } =
      await request.json();

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
      requiredPermissions: [PERMISSIONS.STAFF.EDIT_STAFF],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // VALIDATE the request data
    const validatedFields = validateSchema(UserUpdateSchema, {
      name,
      email,
      password,
      roleId,
    });
    if (!validatedFields.success) {
      return errorResponse({ status: 400, errors: validatedFields.errors });
    }

    // Get the target user info
    const targetUserInfo = await UserModel.findById(targetId).exec();
    if (!targetUserInfo) {
      return errorResponse({
        message: "User not found.",
        status: 404,
      });
    }

    if (!targetUserInfo.role.includes("Admin")) {
      return errorResponse({
        message:
          "Access denied. You can't update the user details of a user who is not an admin.",
        status: 400,
      });
    }

    // Update the user
    const updateFileds = {
      email: email === targetUserInfo.email ? targetUserInfo.email : email,
      username:
        name === targetUserInfo.username ? targetUserInfo.username : name,
      password:
        password === ""
          ? targetUserInfo.password
          : await bcrypt.hash(password, 10),
      adminAsignedRole:
        roleId === targetUserInfo.adminAsignedRole
          ? targetUserInfo.adminAsignedRole.toString()
          : roleId.toString(),
    };

    const updatedUser = await UserModel.findByIdAndUpdate(
      targetId,
      updateFileds,
      { new: true }
    );

    if (!updatedUser) {
      return errorResponse({
        message: "Failed to update the user. Please try again later.",
        status: 500,
      });
    }

    return successResponse({
      message: `${updatedUser.username} has been updated successfully. Refreshing...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in updating the user SERVER: ${error.stack || error}`);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
