import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import AdminCreatedRoleModel from "@/model/AdminCreatedRole";
import UserModel from "@/model/User";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const targetId = searchParams.get("targetId");

    // NOTE Validate Category and User IDs
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

    // Get target user info
    const targetUserInfo = await UserModel.findById(targetId)
      .select(
        "-password -verifyCode -verifyCodeExpiry -forgetPasswordCode -forgetPasswordCodeExpiry -__v -createdAt -updatedAt"
      )
      .populate({
        path: "adminAsignedRole",
        model: AdminCreatedRoleModel,
        select: "-__v -createdAt -updatedAt",
      })
      .exec();
    if (!targetUserInfo) {
      return errorResponse({
        message: "Staff not found.",
        status: 404,
      });
    }

    return NextResponse.json(
      {
        success: true,
        userDetails: targetUserInfo,
      },
      { status: 200 }
    );
    return successResponse({
      status: 200,
      userDetails: targetUserInfo,
    });
  } catch (error) {
    console.log(`Error in getting user details SERVER: ${error}`);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
