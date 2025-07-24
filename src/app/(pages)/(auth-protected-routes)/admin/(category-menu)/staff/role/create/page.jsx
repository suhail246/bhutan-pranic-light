import { fetchCreateAdminStaffRolePageData } from "@/actions/pageDataActions";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";
import {
  Breadcrumb,
  CommonErrorTemplate,
  Error403,
  HandleSessionEnd,
  RoleForm,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";
import { makePermissionsGroup } from "@/utils/permission-helper";

export const metadata = {
  title: titlesObject.createRole.title,
};

const CreateRole = async () => {
  const { success, fetchData, userId, error } =
    await fetchCreateAdminStaffRolePageData(PERMISSIONS.STAFF.ADD_STAFF_ROLE);

  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
  }

  if (!success) {
    return (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb
          currentTab="Create Role"
          mainParentTab="Staff Management"
          firstChildTab="Roles"
        />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription="Role does not exists."
        />
      </div>
    );
  }

  const groupPermission = success ? makePermissionsGroup(fetchData) : {};

  return (
    <div className={`min-h-full`}>
      <Breadcrumb
        currentTab="Create Role"
        mainParentTab="Staff Management"
        firstChildTab="Roles"
      />

      <div
        className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] min-h-full rounded-sm shadow-light`}
      >
        <h1 className="py-3 px-5 text-dark-weight-550 dark:text-light-weight-550 font-poppins-md text-[15px] border-b dark:border-[#fff]/10">
          Role Information
        </h1>
        <RoleForm sessionUserId={userId} groupPermission={groupPermission} />
      </div>
    </div>
  );
};

export default CreateRole;
