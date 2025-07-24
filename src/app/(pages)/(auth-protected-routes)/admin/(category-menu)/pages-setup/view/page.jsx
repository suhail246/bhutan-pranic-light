import { togglePerticularCMSPageActiveStatus } from "@/actions/apiClientActions/cms";
import { fetchAllCMSPageLisitngData } from "@/actions/pageDataActions";
import { cmsPageTableColumns } from "@/app/assets/data/tableData";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";
import {
  Breadcrumb,
  CMSAllPagesLisitng,
  CommonErrorTemplate,
  CreateNewButton,
  Error403,
  HandleSessionEnd,
  SearchInputField,
  WordFocus,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";
import ROUTES from "@/constants/routes";
import { useUIPermissionCheck } from "@/lib/hooks";

// Handle meta data for all posts page
export const metadata = {
  title: titlesObject.allPageCms.title,
};

const AllWebsitePages = async ({ searchParams }) => {
  // Fetch necessary data for all blog posts
  const {
    allCMSPagesResponse,
    userId,
    search,
    adminRole,
    permissionsList,
    error,
  } = await fetchAllCMSPageLisitngData(
    searchParams,
    PERMISSIONS.CMS_SETUP.VIEW_ALL_PAGES
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
  }

  // Handle case when posts retrieval fails
  if (!allCMSPagesResponse.success) {
    return (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb currentTab="All Pages" mainParentTab="CMS Setup" />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription={allCMSPagesResponse.message}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb currentTab="All Pages" mainParentTab="CMS Setup" />

      <div
        className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] rounded-sm pb-3 shadow-light sm:pb-5`}
      >
        <div
          className={`flex flex-col md:flex-row md:items-center sm:justify-between gap-2 p-3`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            {/* Search Input Field */}
            <SearchInputField />
          </div>

          {/* Create New Button */}
          {useUIPermissionCheck(
            adminRole,
            permissionsList,
            PERMISSIONS.CMS_SETUP.ADD_PAGE
          ) && (
            <CreateNewButton
              hrefLink={ROUTES.ADMIN_CMS_CREATE_PAGE}
              text="Add Page"
              extraClass="max-w-[180px]"
            />
          )}
        </div>

        {(allCMSPagesResponse?.fetchData || []).length > 0 ? (
          <>
            {/* All CMS Pages List */}
            <CMSAllPagesLisitng
              userId={userId}
              data={allCMSPagesResponse?.fetchData || []}
              paginationDetails={allCMSPagesResponse?.paginationData || {}}
              tableColumns={cmsPageTableColumns}
              permissionItems={{
                editItem: PERMISSIONS.CMS_SETUP.EDIT_PAGE,
                sectionUpdateItem: PERMISSIONS.CMS_SETUP.EDIT_PAGE_SECTIONS,
                toggleActiveItem: PERMISSIONS.CMS_SETUP.TOGGLE_ACTIVE_PAGE,
              }}
              editRoute="/admin/pages-setup/update"
              sectionUpdateRoute="/admin/pages-setup/sections"
              targetType="cms page"
              actionFunctions={{
                toggleActiveItemFnc: togglePerticularCMSPageActiveStatus,
              }}
              search={search}
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          </>
        ) : (
          <>
            {/* No Posts Message */}
            <div className="flex flex-col w-full items-center justify-center gap-2 p-3 min-h-[50vh]">
              <WordFocus
                sentence="No Pages"
                manualMode={false}
                blurAmount={5}
                borderColor="red"
                animationDuration={2}
                pauseBetweenAnimations={1}
              />

              <p className="text-center text-[13px] md:text-[16px] text-dark-weight-350 dark:text-light-weight-400 font-poppins-rg">
                Create your first page to get started. Please click the{" "}
                <span className="text-dark-weight-550 dark:text-light-weight-800 font-poppins-sb">
                  Add Page
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

export default AllWebsitePages;
