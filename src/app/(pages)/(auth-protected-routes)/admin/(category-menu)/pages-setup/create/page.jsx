import { createNewPageCMS } from "@/actions/apiClientActions/cms";
import { fetchCreateCMSPageData } from "@/actions/pageDataActions";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import {
  Breadcrumb,
  CMSPageForm,
  Error403,
  HandleSessionEnd,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";

// Handle meta data info
export const metadata = {
  title: titlesObject.createPageCms.title,
};

const CreateWebsitePage = async ({ searchParams }) => {
  // Fetch necessary data for creating a blog post
  const {
    filesResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
    error,
  } = await fetchCreateCMSPageData(
    searchParams,
    PERMISSIONS.CMS_SETUP.ADD_PAGE
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb currentTab="Add New Page" mainParentTab="CMS Setup" />

      <CMSPageForm
        userId={userId}
        filesList={filesResponse?.filesList || []}
        allFiles={filesResponse?.allFilesData || []}
        paginationDetails={filesResponse?.paginationData || {}}
        createFnc={createNewPageCMS}
        searchValue={searchName}
        selectedFileType={selectedFileType}
        adminRole={adminRole}
        permissionsList={permissionsList || []}
      />
    </div>
  );
};

export default CreateWebsitePage;
