import { checkUserPermission } from "@/actions/pageDataActions";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";
import {
  Breadcrumb,
  CreateNewButton,
  Error403,
  FileGallery,
  FileTypeFilterDropdown,
  HandleSessionEnd,
  SearchByFileName,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";
import ROUTES from "@/constants/routes";
import { useUIPermissionCheck } from "@/lib/hooks";
import { redirect } from "next/navigation";

// Handle meta data for all files page
export const metadata = {
  title: titlesObject.allFiles.title,
};

// Component for all files
const FileLists = async ({ searchParams }) => {
  // Fetch necessary data for all files
  const { userId, adminRole, permissionsList, error } =
    await checkUserPermission(PERMISSIONS.FILE.VIEW_ALL_FILES);

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
  }

  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  let pageNumber;
  let pageSizeNumber;

  // Handle page parameter
  if (page) {
    const parsedPage = parseInt(page, 10);
    if (!isNaN(parsedPage) && parsedPage > 0) {
      pageNumber = parsedPage;
    } else {
      // Redirect to page 1 if an invalid page number is provided
      redirect(`${ROUTES.ADMIN_ALL_FILES}?page=1`);
    }
  }

  if (pageSize) {
    const parsedPageSize = parseInt(pageSize, 10);
    if (!isNaN(parsedPageSize) && parsedPageSize > 0) {
      pageSizeNumber = parsedPageSize;
    } else {
      // Redirect to page 1 if an invalid page size is provided
      redirect(`${ROUTES.ADMIN_ALL_FILES}?pageSize=24`);
    }
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb currentTab="File Lists" mainParentTab="Files Console" />

      <div
        className={`mt-[40px] ${globalStyleObj.backgroundLight900Dark300} rounded-sm p-3 shadow-light sm:p-5`}
      >
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 pt-1">
          <div className="flex items-center gap-2">
            <SearchByFileName />
            <FileTypeFilterDropdown />
          </div>

          {useUIPermissionCheck(
            adminRole,
            permissionsList,
            PERMISSIONS.FILE.ADD_FILE
          ) && (
            <CreateNewButton
              hrefLink={ROUTES.ADMIN_CREATE_FILE}
              text="Upload"
            />
          )}
        </div>
        <div className="overflow-hidden mt-5">
          <FileGallery
            userId={userId}
            page={pageNumber}
            pageSize={pageSizeNumber}
            selectedFileType={selectedFileType}
            search={searchName}
            adminRole={adminRole}
            permissionsList={permissionsList}
          />
        </div>
      </div>
    </div>
  );
};

export default FileLists;
