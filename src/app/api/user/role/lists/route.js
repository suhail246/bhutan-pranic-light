import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import AdminCreatedRoleModel from "@/model/AdminCreatedRole";
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

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [
        PERMISSIONS.STAFF.ADD_STAFF,
        PERMISSIONS.STAFF.EDIT_STAFF,
        PERMISSIONS.STAFF.VIEW_ALL_STAFFS,
        PERMISSIONS.STAFF.VIEW_STAFF_ROLES,
      ],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    const searchQuery = escapeStringRegexp(search || "");
    const query = {
      name: { $ne: "Super Admin" }, // Exclude Super Admin roles
      ...(searchQuery && {
        $or: [
          { name: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
        ],
      }),
    };

    const rolesList = await AdminCreatedRoleModel.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    const paginationTotalRoles =
      await AdminCreatedRoleModel.countDocuments(query).exec();
    const totalRolesCount = await AdminCreatedRoleModel.countDocuments({
      name: { $ne: "Super Admin" }, // Exclude Super Admin count as well
    }).exec();

    // Pagination
    const paginationData = {
      currentPage: page,
      currentLimit: pageSize,
      totalPages: Math.ceil(paginationTotalRoles / pageSize),
      totalRoles: paginationTotalRoles,
      totalRolesCount,
    };

    return successResponse({
      status: 200,
      rolesData: rolesList,
      paginationData,
    });
  } catch (error) {
    console.log(`Error in getting all roles SERVER: ${error.stack || error}`);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
