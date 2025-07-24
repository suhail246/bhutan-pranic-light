import {
  getPerticularCMSPage,
  updatePerticularCMSPage,
} from "@/actions/apiClientActions/cms";
import { fetchUpdateCMSPageData } from "@/actions/pageDataActions";
import {
  Breadcrumb,
  CMSPageForm,
  CommonErrorTemplate,
  Error403,
  HandleSessionEnd,
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
  const { cmsPageData, translationDetails, message } =
    await getPerticularCMSPage(userId, linkId);

  return {
    title: message
      ? `Update CMS Page ${process.env.NEXT_PUBLIC_META_APP_NAME}`
      : cmsPageData?.metaTitle ||
        `${translationDetails?.en?.pageName || "CMS Page Details"} ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
    description: message
      ? "CMS Page details not found."
      : cmsPageData?.metaDescription || "CMS Page details form page.",
  };
};

const UpdateWebsitePage = async ({ params, searchParams }) => {
  // Fetch necessary data for updating the blog post
  const {
    filesResponse,
    languagesResponse,
    cmsPageDetailsResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
    error,
  } = await fetchUpdateCMSPageData(
    params,
    searchParams,
    PERMISSIONS.CMS_SETUP.EDIT_PAGE
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? (
      <HandleSessionEnd /> // Handle unauthorized session
    ) : error === "Not Found" ? (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb currentTab="Update CMS Page" mainParentTab="CMS Setup" />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription="CMS Page does not exists."
        />
      </div>
    ) : (
      <Error403 /> // Handle forbidden access
    );
  }

  // Handle case when cms page retrieval fails
  if (!cmsPageDetailsResponse.success) {
    return (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb currentTab="Update CMS Page" mainParentTab="CMS Setup" />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription={cmsPageDetailsResponse.message}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb currentTab="Update CMS Page" mainParentTab="CMS Setup" />

      {/* Edit CMS Page Form Component */}
      <CMSPageForm
        userId={userId}
        languages={languagesResponse?.fetchData || []}
        pageDetails={cmsPageDetailsResponse?.cmsPageData || {}}
        translationDetails={cmsPageDetailsResponse?.translationDetails || {}}
        filesList={filesResponse?.filesList || []}
        allFiles={filesResponse?.allFilesData || []}
        paginationDetails={filesResponse?.paginationData || {}}
        updateFnc={updatePerticularCMSPage}
        selectedMetaFileId={
          cmsPageDetailsResponse.cmsPageData.metaImage !== null
            ? cmsPageDetailsResponse.cmsPageData?.metaImage?._id
            : ""
        }
        selectedMetaFileName={
          cmsPageDetailsResponse.cmsPageData.metaImage !== null
            ? cmsPageDetailsResponse.cmsPageData?.metaImage?.fileName
            : ""
        }
        searchValue={searchName}
        selectedFileType={selectedFileType}
        adminRole={adminRole}
        permissionsList={permissionsList || []}
      />
    </div>
  );
};

export default UpdateWebsitePage;
