import { cacheKeyNames } from "@/app/assets/data/cacheKeysData";
import { getCache } from "@/lib/redis/actions";
import AdminCreatedRoleModel from "@/model/AdminCreatedRole";
import AdminCreatedRoleHasPermissionModel from "@/model/AdminCreatedRoleHasPermissions";
import PermissionModel from "@/model/Permission";
import UserModel from "@/model/User";

const hasRequiredPermission = (userPermissions, requiredPermissions) => {
  return requiredPermissions.some((perm) => userPermissions.has(perm));
};

const fetchUserWithRole = async (targetId) => {
  try {
    return await UserModel.findById(targetId)
      .populate({
        path: "adminAsignedRole",
        model: AdminCreatedRoleModel,
        select: "_id name", // Fetch only role ID and name
      })
      .lean();
  } catch (error) {
    console.error("Error fetching user with role:", error);
    return null;
  }
};

const fetchPermissionsForRole = async (roleId) => {
  try {
    const permissions = await AdminCreatedRoleHasPermissionModel.find({
      roleId,
    })
      .populate({
        path: "permissionId",
        model: PermissionModel,
        select: "name",
      })
      .lean();

    return new Set(
      permissions.map(({ permissionId }) => permissionId?.name).filter(Boolean)
    );
  } catch (error) {
    console.error("Error fetching role permissions:", error);
    return new Set();
  }
};

const getUserAuthorization = async (targetId, requiredPermissions) => {
  const user = await fetchUserWithRole(targetId);

  if (!user || !user.role.includes("Admin")) {
    return { success: false, message: "Action denied." };
  }

  if (user.adminAsignedRole?.name === "Super Admin") {
    return { success: true, user };
  }

  const userPermissions = user.adminAsignedRole
    ? await fetchPermissionsForRole(user.adminAsignedRole._id)
    : new Set();

  if (!hasRequiredPermission(userPermissions, requiredPermissions)) {
    return { success: false, message: "Action denied." };
  }

  return { success: true, user };
};

export const checkAuthorization = async ({
  targetId,
  requiredPermissions = [],
}) => {
  try {
    // 1. Attempt to fetch user data from Redis cache
    const { parsedValue: sessionUserData } = await getCache(
      `${cacheKeyNames.SESSION_USER_DETAILS}-${targetId}`
    );

    if (!sessionUserData) {
      console.log("checkAuthorization: Session User Data not found 🚨");
      return getUserAuthorization(targetId, requiredPermissions);
    }

    console.log("checkAuthorization: Session User Data Catch HIT ✅");

    const { userDetails, permissionsList } = sessionUserData;

    // 2. Validate that the cached user data exists and belongs to an Admin
    if (!userDetails || !userDetails.role.includes("Admin")) {
      return { success: false, message: "Action denied." };
    }

    // 3. Grant full access if the cached user is a "Super Admin"
    if (userDetails.adminAsignedRole?.name === "Super Admin") {
      return { success: true, user: userDetails };
    }

    // 4. Check if the cached permissions include at least one required permission
    if (!hasRequiredPermission(new Set(permissionsList), requiredPermissions)) {
      return { success: false, message: "Action denied." };
    }

    // 5. Return success if all authorization checks pass
    return { success: true, user: userDetails };
  } catch (error) {
    console.error("Authorization check failed:", error);
    return { success: false, message: "Internal server error." };
  }
};
