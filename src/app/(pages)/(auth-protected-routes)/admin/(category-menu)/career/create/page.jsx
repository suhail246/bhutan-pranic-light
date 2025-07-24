import { createNewCareer } from "@/actions/apiClientActions/career";
import { fetchCreateCareerPageData } from "@/actions/pageDataActions";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import {
  Breadcrumb,
  CareerForm,
  Error403,
  HandleSessionEnd,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";

// Handle meta data info
export const metadata = {
  title: titlesObject.createCareer.title,
};

const CreateCareerPage = async ({ searchParams }) => {
  // Fetch necessary data for creating a blog post
  const {
    filesResponse,
    userId,
    adminRole,
    permissionsList,
    searchName,
    selectedFileType,
    error,
  } = await fetchCreateCareerPageData(
    searchParams,
    PERMISSIONS.CAREER.ADD_CAREER
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb currentTab="Add New Job" mainParentTab="Manage Careers" />

      {/* Create Career Form Component */}
      <CareerForm
        userId={userId}
        filesList={filesResponse?.filesList || []}
        allFiles={filesResponse?.allFilesData || []}
        paginationDetails={filesResponse?.paginationData || {}}
        createFnc={createNewCareer}
        searchValue={searchName}
        selectedFileType={selectedFileType}
        adminRole={adminRole}
        permissionsList={permissionsList || []}
      />
    </div>
  );
};

export default CreateCareerPage;
