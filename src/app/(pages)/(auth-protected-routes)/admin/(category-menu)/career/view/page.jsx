import {
  deletePerticularCareer,
  togglePerticularCareerActiveStatus,
  togglePerticularCareerFeaturedStatus,
} from "@/actions/apiClientActions/career";
import { fetchAllCareersPageData } from "@/actions/pageDataActions";
import { careersTableColumns } from "@/app/assets/data/tableData";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";
import {
  Breadcrumb,
  CareerLists,
  CommonErrorTemplate,
  CreateNewButton,
  Error403,
  HandleSessionEnd,
  PostFilterDropdown,
  SearchInputField,
  WordFocus,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";
import ROUTES from "@/constants/routes";
import { useUIPermissionCheck } from "@/lib/hooks";

// Handle meta data
export const metadata = {
  title: titlesObject.allCareers.title,
};

const AllCareersPage = async ({ searchParams }) => {
  // Fetch necessary data
  const { allCareersResponse, userId, adminRole, permissionsList, error } =
    await fetchAllCareersPageData(
      searchParams,
      PERMISSIONS.CAREER.VIEW_ALL_CAREERS
    );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
  }

  // Handle case when careers retrieval fails
  if (!allCareersResponse.success) {
    return (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb currentTab="Job Listings" mainParentTab="Manage Careers" />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription={allCareersResponse.message}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb currentTab="Job Listings" mainParentTab="Manage Careers" />

      <div
        className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] rounded-sm pb-3 shadow-light sm:pb-5`}
      >
        <div
          className={`flex flex-col md:flex-row md:items-center sm:justify-between gap-2 p-3`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            {/* Search Input Field */}
            <SearchInputField />

            <div className="flex items-center gap-1">
              {/* Filter Dropdown */}
              <PostFilterDropdown />
            </div>
          </div>

          {/* Create New Button */}
          {useUIPermissionCheck(
            adminRole,
            permissionsList,
            PERMISSIONS.CAREER.ADD_CAREER
          ) && (
            <CreateNewButton
              hrefLink={ROUTES.ADMIN_CREATE_CAREER}
              text="Add Career"
              extraClass="max-w-[180px]"
            />
          )}
        </div>

        {(allCareersResponse?.fetchData || []).length > 0 ? (
          <CareerLists
            userId={userId}
            data={allCareersResponse?.fetchData || []}
            paginationDetails={allCareersResponse?.paginationData || {}}
            tableColumns={careersTableColumns}
            permissionItems={{
              editItem: PERMISSIONS.CAREER.EDIT_CAREER,
              deleteItem: PERMISSIONS.CAREER.DELETE_CAREER,
              toggleActiveItem: PERMISSIONS.CAREER.TOGGLE_ACTIVE_CAREER,
              toggleFeaturedItem: PERMISSIONS.CAREER.TOGGLE_FEATURED_CAREER,
            }}
            editRoute="/admin/career/update"
            targetType="career"
            actionFunctions={{
              deleteItemFnc: deletePerticularCareer,
              toggleActiveItemFnc: togglePerticularCareerActiveStatus,
              toggleFeaturedItemFnc: togglePerticularCareerFeaturedStatus,
            }}
            adminRole={adminRole}
            permissionsList={permissionsList}
          />
        ) : (
          <>
            {/* No Posts Message */}
            <div className="flex flex-col w-full items-center justify-center gap-2 p-3 min-h-[50vh]">
              <WordFocus
                sentence="No Career"
                manualMode={false}
                blurAmount={5}
                borderColor="red"
                animationDuration={2}
                pauseBetweenAnimations={1}
              />

              <p className="text-center text-[13px] md:text-[16px] text-dark-weight-350 dark:text-light-weight-400 font-poppins-rg">
                Create your first career to get started. Please click the{" "}
                <span className="text-dark-weight-550 dark:text-light-weight-800 font-poppins-sb">
                  Add Career
                </span>{" "}
                button.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllCareersPage;
