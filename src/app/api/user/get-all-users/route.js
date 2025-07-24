import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import UserModel from "@/model/User";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import escapeStringRegexp from "escape-string-regexp";
import mongoose from "mongoose";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page"));
    const pageSize = parseInt(searchParams.get("pageSize"));
    const role = searchParams.get("role");

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    if (role && !mongoose.Types.ObjectId.isValid(role)) {
      return errorResponse({
        message: "Invalid role.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.STAFF.VIEW_ALL_STAFFS],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    const searchQuery = escapeStringRegexp(search || "");
    const query = {
      role: { $all: ["User", "Admin"] }, // Ensure the user has both "User" and "Admin" roles
      ...(searchQuery && {
        $or: [
          { email: { $regex: searchQuery, $options: "i" } },
          { username: { $regex: searchQuery, $options: "i" } },
        ],
      }),
      ...(role && { adminAsignedRole: new mongoose.Types.ObjectId(role) }), // Filter by adminAsignedRole ID
    };

    const usersList = await UserModel.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .select("-password -__v -createdAt -updatedAt")
      .populate({
        path: "adminAsignedRole",
        select: "name",
      })
      .exec();

    const paginationTotalUsers = await UserModel.countDocuments(query).exec();
    const totalUsersCount = await UserModel.countDocuments({
      role: { $all: ["User", "Admin"] },
    }).exec();

    // Pagination
    const paginationData = {
      currentPage: page,
      currentLimit: pageSize,
      totalPages: Math.ceil(paginationTotalUsers / pageSize),
      totalUsers: paginationTotalUsers,
      totalUsersCount,
    };

    return successResponse({
      status: 200,
      users: usersList,
      paginationData,
    });
  } catch (error) {
    console.log(
      `Error in getting all categories SERVER: ${error.stack || error}`
    );
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
