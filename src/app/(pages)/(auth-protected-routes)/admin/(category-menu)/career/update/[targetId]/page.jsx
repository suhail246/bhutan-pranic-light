import {
  getPerticularCareer,
  updatePerticularCareer,
} from "@/actions/apiClientActions/career";
import { fetchUpdateCareerPageData } from "@/actions/pageDataActions";
import {
  Breadcrumb,
  CareerForm,
  CommonErrorTemplate,
  Error403,
  HandleSessionEnd,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";
import { verifySession } from "@/utils/verifySession";
import mongoose from "mongoose";

// Handle dynamic meta data for update page
export const generateMetadata = async ({ params }) => {
  const { targetId } = await params;

  const { userId } = await verifySession();

  // If user is not authenticated or targetId is not valid, return default metadata
  if (
    !userId ||
    !targetId ||
    targetId === "undefiend" ||
    !mongoose.Types.ObjectId.isValid(targetId)
  ) {
    return {
      title: `Update Career ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
      description: "Career details not found.",
    };
  }

  // Fetch the career details using the targetId and userId
  const { careerData, translationDetails, message } = await getPerticularCareer(
    userId,
    targetId
  );

  return {
    title: message
      ? `Update Career ${process.env.NEXT_PUBLIC_META_APP_NAME}`
      : `${careerData?.metaTitle || translationDetails?.en?.jobName || "Anonymous"} ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
    description: message
      ? "Career details not found."
      : `${careerData?.metaDescription || "Career details form page"} .`,
  };
};

const UpdateCareerPage = async ({ params, searchParams }) => {
  // Fetch necessary data for updating career
  const {
    filesResponse,
    languagesResponse,
    careerDetailsResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
    error,
  } = await fetchUpdateCareerPageData(
    params,
    searchParams,
    PERMISSIONS.CAREER.EDIT_CAREER
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? (
      <HandleSessionEnd /> // Handle unauthorized session
    ) : error === "Not Found" ? (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb currentTab="Update Career" mainParentTab="Manage Careers" />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription="Career does not exists."
        />
      </div>
    ) : (
      <Error403 /> // Handle forbidden access
    );
  }

  // Handle case when career retrieval fails
  if (!careerDetailsResponse.success) {
    return (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb currentTab="Update Career" mainParentTab="Manage Careers" />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription={careerDetailsResponse.message}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb currentTab="Update Career" mainParentTab="Manage Careers" />

      {/* Edit Career Form Component */}
      <CareerForm
        userId={userId}
        languages={languagesResponse?.fetchData || []}
        careerDetails={careerDetailsResponse?.careerData || {}}
        translationDetails={careerDetailsResponse?.translationDetails || {}}
        filesList={filesResponse?.filesList || []}
        allFiles={filesResponse?.allFilesData || []}
        paginationDetails={filesResponse?.paginationData || {}}
        updateFnc={updatePerticularCareer}
        selectedImageFileId={
          careerDetailsResponse.careerData.image !== null
            ? careerDetailsResponse.careerData?.image?._id
            : ""
        }
        selectedImageFileName={
          careerDetailsResponse.careerData?.image?.fileName || ""
        }
        selectedMetaFileId={
          careerDetailsResponse.careerData.metaImage !== null
            ? careerDetailsResponse.careerData?.metaImage?._id
            : ""
        }
        selectedMetaFileName={
          careerDetailsResponse.careerData?.metaImage?.fileName || ""
        }
        searchValue={searchName}
        selectedFileType={selectedFileType}
        adminRole={adminRole}
        permissionsList={permissionsList || []}
      />
    </div>
  );
};

export default UpdateCareerPage;
