import { fetchAllAdminCreatedRolePageData } from "@/actions/pageDataActions";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";
import {
  Breadcrumb,
  CommonErrorTemplate,
  CreateNewButton,
  Error403,
  HandleSessionEnd,
  PaginationComponent,
  RolesTable,
  SearchInputField,
  WordFocus,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";
import ROUTES from "@/constants/routes";
import { useUIPermissionCheck } from "@/lib/hooks";

export const metadata = {
  title: titlesObject.allRoles.title,
};

const UserRoles = async ({ searchParams }) => {
  const {
    fetchData,
    paginationData,
    message,
    userId,
    adminRole,
    permissionsList,
    error,
  } = await fetchAllAdminCreatedRolePageData(
    searchParams,
    PERMISSIONS.STAFF.VIEW_STAFF_ROLES
  );

  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
  }

  if (message) {
    return (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb
          currentTab="All Roles"
          mainParentTab="Staff Management"
          firstChildTab="Roles"
        />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription={message}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb
        currentTab="All Roles"
        mainParentTab="Staff Management"
        firstChildTab="Roles"
      />

      <div
        className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] rounded-sm shadow-light p-3`}
      >
        <div className="flex gap-3 flex-row sm:gap-5 items-center justify-between">
          <h1 className="text-[16px] md:text-[18px] font-poppins-md text-dark-weight-400 dark:text-light-weight-550 mb-2">
            All Roles
          </h1>
          {useUIPermissionCheck(
            adminRole,
            permissionsList,
            PERMISSIONS.STAFF.ADD_STAFF_ROLE
          ) && (
            <CreateNewButton
              hrefLink={ROUTES.ADMIN_STAFF_CREATE_ROLE}
              text="Add New Role"
              extraClass="max-w-[180px]"
            />
          )}
        </div>

        {fetchData.length === 0 ? (
          <div className="flex flex-col w-full items-center justify-center gap-2 p-3 min-h-[50vh]">
            <WordFocus
              sentence="No Roles"
              manualMode={false}
              blurAmount={5}
              borderColor="red"
              animationDuration={2}
              pauseBetweenAnimations={1}
            />

            <p className="text-center text-[13px] md:text-[16px] text-dark-weight-350 dark:text-light-weight-400 font-poppins-rg">
              Create roles to represent the types of users that access your
              applications. Assign roles to control what users are allowed to do
              in your apps.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-5 sm:mt-10 w-full max-w-[300px]">
              <SearchInputField />
            </div>

            <RolesTable
              sessionUserId={userId}
              rolesList={fetchData}
              paginationDetails={paginationData}
              adminRole={adminRole}
              permissionsList={permissionsList}
            />

            {paginationData.totalRolesCount > paginationData.currentLimit && (
              <div className="mt-5 px-3 flex items-center gap-2">
                <PaginationComponent paginationDetails={paginationData} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserRoles;
