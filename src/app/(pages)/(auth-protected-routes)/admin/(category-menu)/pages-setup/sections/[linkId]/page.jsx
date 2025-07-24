import { getPerticularCMSPage } from "@/actions/apiClientActions/cms";
import { fetchUpdateCMSPageSectionsData } from "@/actions/pageDataActions";
import { tabConfig } from "@/app/assets/data/cms-pages-tab-data";
import {
  Breadcrumb,
  CommonErrorTemplate,
  Error403,
  HandleSessionEnd,
  MainSectionForm,
  TabNavigation,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";
import { verifySession } from "@/utils/verifySession";

// Handle dynamic meta data for update page
export const generateMetadata = async ({ params }) => {
  const { linkId } = await params;

  const { userId } = await verifySession();

  // If user is not authenticated or targetId is not valid, return default metadata
  if (!userId || !linkId) {
    return {
      title: `Update CMS Page ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
      description: "CMS Page details not found.",
    };
  }

  // Fetch the post details using the postId and userId
  const { translationDetails, message } = await getPerticularCMSPage(
    userId,
    linkId
  );

  return {
    title: message
      ? `Update CMS Page Sections ${process.env.NEXT_PUBLIC_META_APP_NAME}`
      : `${translationDetails?.en?.pageName + " Sections" || "CMS Page Sections Details"} ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
    description: message
      ? "CMS Page Sections details not found."
      : `${translationDetails?.en?.pageName || "CMS"} Page Sections details form page.`,
  };
};

const EditWebsitePageSections = async ({ params, searchParams }) => {
  // Fetch necessary data for updating the blog post
  const {
    filesResponse,
    languagesResponse,
    userId,
    searchName,
    selectedFileType,
    linkId,
    tab,
    adminRole,
    permissionsList,
    error,
  } = await fetchUpdateCMSPageSectionsData(
    params,
    searchParams,
    PERMISSIONS.CMS_SETUP.EDIT_PAGE_SECTIONS
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? (
      <HandleSessionEnd /> // Handle unauthorized session
    ) : error === "Not Found" ? (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb
          currentTab="Update Page Sections"
          mainParentTab="CMS Setup"
        />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription="CMS Page does not exists."
        />
      </div>
    ) : (
      <Error403 /> // Handle forbidden access
    );
  }

  // Set the default page for non required pages
  if (!tabConfig[linkId]) {
    return (
      <div className={`min-h-full`}>
        <Breadcrumb
          currentTab="Update Page Sections"
          mainParentTab="CMS Setup"
        />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription="CMS Page Content doesn't required."
        />
      </div>
    );
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb currentTab="Update Page Sections" mainParentTab="CMS Setup" />

      <div className="flex flex-col lg:flex-row gap-3 lg:gap-5 mt-[40px]">
        <TabNavigation activeTabList={tabConfig?.[linkId] || []} />

        <MainSectionForm
          userId={userId}
          linkId={linkId}
          languages={languagesResponse?.fetchData || []}
          allFilesResponse={filesResponse}
          searchValue={searchName}
          selectedFileType={selectedFileType}
          adminRole={adminRole}
          permissionsList={permissionsList}
        />
      </div>
    </div>
  );
};

export default EditWebsitePageSections;
