import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import AdminCreatedRoleModel from "@/model/AdminCreatedRole";
import UserModel from "@/model/User";
import { AdminStaffSchema } from "@/schemas";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import { validateSchema } from "@/utils/validateSchemaHandler";
import mongoose from "mongoose";

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { userId, name, email, password, roleId } = body;

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
      requiredPermissions: [PERMISSIONS.STAFF.ADD_STAFF],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // VALIDATE the request data
    const validatedFields = validateSchema(AdminStaffSchema, body);
    if (!validatedFields.success) {
      return errorResponse({ status: 400, errors: validatedFields.errors });
    }

    // Check role exist
    const roleExist = await AdminCreatedRoleModel.findById(roleId).exec();
    if (!roleExist) {
      return errorResponse({
        message: "Role does not exist.",
        status: 400,
      });
    }

    // Check if user already exists with the same email address
    const existUser = await UserModel.findOne({ email }).exec();
    if (existUser) {
      return errorResponse({
        message: "User already exists with the same email address.",
        status: 400,
      });
    }

    // Create a new user and save into DB
    const newUser = new UserModel({
      email,
      username: name,
      password,
      role: ["User", "Admin"],
      adminAsignedRole: roleId,
      isVerified: true,
    });

    await newUser.save();

    return successResponse({
      message: `${newUser.username} has been created successfully. Refreshing...`,
      status: 201,
    });
  } catch (error) {
    console.log(
      `Error in creating new admin staff SERVER: ${error.stack || error}`
    );
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
