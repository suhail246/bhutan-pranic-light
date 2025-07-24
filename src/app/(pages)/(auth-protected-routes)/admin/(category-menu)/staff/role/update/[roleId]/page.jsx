import { getPerticularRole } from "@/actions/apiClientActions/user";
import { fetchUpdateAdminStaffRolePageData } from "@/actions/pageDataActions";
import { globalStyleObj } from "@/app/assets/styles";
import {
  Breadcrumb,
  CommonErrorTemplate,
  Error403,
  HandleSessionEnd,
  RoleForm,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";
import {
  makePermissionsGroup,
  makeSelectedPermissionIdsList,
} from "@/utils/permission-helper";
import { verifySession } from "@/utils/verifySession";
import mongoose from "mongoose";

export const generateMetadata = async ({ params }) => {
  const { roleId } = await params;
  const { userId } = await verifySession();

  if (
    !userId ||
    roleId === "undefiend" ||
    !mongoose.Types.ObjectId.isValid(roleId)
  ) {
    return {
      title: `Update Role ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
      description: "Role details not found.",
    };
  }

  const { roleData, message } = await getPerticularRole(userId, roleId);

  return {
    title: message
      ? `Update Role ${process.env.NEXT_PUBLIC_META_APP_NAME}`
      : `${roleData.name} Role ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
    description: message
      ? "Role details not found."
      : `${roleData.name} Role details page.`,
  };
};

const UpdateRole = async ({ params }) => {
  const { permissionsResponse, roleResponse, userId, roleId, error } =
    await fetchUpdateAdminStaffRolePageData(
      params,
      PERMISSIONS.STAFF.EDIT_STAFF_ROLE
    );

  if (error) {
    return error === "Unauthorized" ? (
      <HandleSessionEnd />
    ) : error === "Not Found" ? (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb
          currentTab="Update Role"
          mainParentTab="Staff Management"
          firstChildTab="Roles"
        />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription="Role does not exists."
        />
      </div>
    ) : (
      <Error403 />
    );
  }

  if (!roleResponse.success) {
    return (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb
          currentTab="Update Role"
          mainParentTab="Staff Management"
          firstChildTab="Roles"
        />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription={roleResponse.message}
        />
      </div>
    );
  }

  const groupPermission = permissionsResponse.success
    ? makePermissionsGroup(permissionsResponse.fetchData)
    : {};

  const selectedPermissionIdsList =
    roleResponse.selectedPermissions.length > 0
      ? makeSelectedPermissionIdsList(roleResponse.selectedPermissions)
      : [];

  return (
    <div className={`min-h-full`}>
      <Breadcrumb
        currentTab="Update Role"
        mainParentTab="Staff Management"
        firstChildTab="Roles"
      />

      <div
        className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] min-h-full rounded-sm shadow-light`}
      >
        <h1 className="py-3 px-5 text-dark-weight-550 dark:text-light-weight-550 font-poppins-md text-[15px] border-b dark:border-[#fff]/10">
          {`${roleResponse?.roleData?.name} Information` || "Role Information"}
        </h1>

        <RoleForm
          sessionUserId={userId}
          groupPermission={groupPermission}
          targetRoleDetails={{
            targetId: roleId,
            name: roleResponse?.roleData?.name || "",
            selectedpermissionIds: selectedPermissionIdsList,
          }}
        />
      </div>
    </div>
  );
};

export default UpdateRole;
