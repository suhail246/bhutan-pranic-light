import { fetchAdminStaffListPageData } from "@/actions/pageDataActions";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";
import {
  AdminStaff,
  Breadcrumb,
  CommonErrorTemplate,
  Error403,
  HandleSessionEnd,
  RoleFilter,
  SearchInputField,
  UsersTable,
  WordFocus,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";
import { useUIPermissionCheck } from "@/lib/hooks";

// Handle meta data for all staffs page
export const metadata = {
  title: titlesObject.allUsers.title,
};

// Component for all staffs
const UserLists = async ({ searchParams }) => {
  // Fetch necessary data for all staffs
  const {
    getAllUsersResponse,
    getAllRolesResponse,
    userId,
    adminRole,
    permissionsList,
    error,
  } = await fetchAdminStaffListPageData(
    searchParams,
    PERMISSIONS.STAFF.VIEW_ALL_STAFFS
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
  }

  // Handle case when staffs retrieval fails
  if (!getAllUsersResponse.success) {
    return (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb currentTab="All Staff" mainParentTab="Staff Management" />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription={getAllUsersResponse.message}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb currentTab="All Staff" mainParentTab="Staff Management" />

      <div
        className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] rounded-sm shadow-light pb-3`}
      >
        <div
          className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <SearchInputField />

            {useUIPermissionCheck(
              adminRole,
              permissionsList,
              PERMISSIONS.STAFF.VIEW_STAFF_ROLES
            ) && (
              <RoleFilter roleLists={getAllRolesResponse?.fetchData || []} />
            )}
          </div>

          <AdminStaff
            sessionId={userId}
            roleLists={getAllRolesResponse.fetchData}
            adminRole={adminRole}
            permissionsList={permissionsList}
          />
        </div>

        {getAllUsersResponse.fetchData.length === 0 ? (
          <div className="flex flex-col w-full items-center justify-center gap-2 p-3 min-h-[50vh]">
            <WordFocus
              sentence="No Staff"
              manualMode={false}
              blurAmount={5}
              borderColor="red"
              animationDuration={2}
              pauseBetweenAnimations={1}
            />

            <p className="text-center text-[13px] md:text-[16px] text-dark-weight-350 dark:text-light-weight-400 font-poppins-rg">
              Create your first staff to get started. Please click the{" "}
              <span className="text-dark-weight-550 dark:text-light-weight-800 font-poppins-sb">
                Create Staff
              </span>{" "}
              button.
            </p>
          </div>
        ) : (
          <>
            <div id="users-table" className="px-3 mt-5 overflow-auto">
              <UsersTable
                userId={userId}
                usersList={getAllUsersResponse.fetchData}
                paginationDetails={getAllUsersResponse.paginationData}
                roleLists={getAllRolesResponse.fetchData}
                adminRole={adminRole}
                permissionsList={permissionsList}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserLists;
