import { cacheKeyNames } from "@/app/assets/data/cacheKeysData";
import dbConnect from "@/lib/db/dbConnect";
import { deleteCache } from "@/lib/redis/actions";
import AdminCreatedRoleModel from "@/model/AdminCreatedRole";
import AdminCreatedRoleHasPermissionModel from "@/model/AdminCreatedRoleHasPermissions";
import FilesModel from "@/model/Files";
import PermissionModel from "@/model/Permission";
import UserModel from "@/model/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId || !mongoose.Types.ObjectId.isValid(sessionId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid session. Please log in again.",
        },
        { status: 401 } // Unauthorized
      );
    }

    const sessionUserInfo = await UserModel.findById(sessionId)
      .select(
        "-password -verifyCode -verifyCodeExpiry -forgetPasswordCode -forgetPasswordCodeExpiry -__v -createdAt -updatedAt"
      )
      .populate({
        path: "picture",
        model: FilesModel,
        select: "fileUrl fileName fileType",
        match: { _id: { $ne: null } },
      })
      .populate({
        path: "adminAsignedRole",
        model: AdminCreatedRoleModel,
        select: "-__v -createdAt -updatedAt",
      })
      .lean();

    // 🚨 If the user was deleted, force logout 🚨
    if (
      !sessionUserInfo ||
      (sessionUserInfo.role.includes("Admin") &&
        sessionUserInfo.adminAsignedRole === null)
    ) {
      // Remove the session cache
      await deleteCache(
        `${cacheKeyNames.SESSION_USER_DETAILS}-${sessionUserInfo._id}`
      );
      return NextResponse.json(
        {
          success: false,
          message: "Session expired. Please log in again.",
        },
        { status: 401 } // Unauthorized
      );
    }

    // Get the role's permissions
    let permissionsNameList = [];
    if (sessionUserInfo.adminAsignedRole) {
      const permissions = await AdminCreatedRoleHasPermissionModel.find({
        roleId: sessionUserInfo.adminAsignedRole._id,
      })
        .select("-roleId -_id -__v -createdAt -updatedAt")
        .populate({
          path: "permissionId",
          model: PermissionModel,
          select: "name",
        })
        .lean();
      permissionsNameList = permissions
        .filter((permission) => permission.permissionId) // Avoid null references
        .map(({ permissionId }) => permissionId.name);
    }

    return NextResponse.json(
      {
        success: true,
        userDetails: sessionUserInfo,
        permissionsList: permissionsNameList,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(`Error in getting session user details SERVER: ${error}`);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
