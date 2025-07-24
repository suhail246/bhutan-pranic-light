import { createNewTestimonial } from "@/actions/apiClientActions/testimonila";
import { fetchCreateTestimonialPageData } from "@/actions/pageDataActions";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import {
  Breadcrumb,
  Error403,
  HandleSessionEnd,
  TestimonialForm,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";

// Handle meta data info
export const metadata = {
  title: titlesObject.createTestimonial.title,
};

const CreateTestimonialPage = async ({ searchParams }) => {
  // Fetch necessary data for creating a blog post
  const {
    filesResponse,
    userId,
    adminRole,
    permissionsList,
    searchName,
    selectedFileType,
    error,
  } = await fetchCreateTestimonialPageData(
    searchParams,
    PERMISSIONS.TESTIMONIAL.ADD_TESTIMONIAL
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb currentTab="Create Feedback" mainParentTab="Testimonial" />

      {/* Create Testimonial Form Component */}
      <TestimonialForm
        userId={userId}
        filesList={filesResponse?.filesList || []}
        allFiles={filesResponse?.allFilesData || []}
        paginationDetails={filesResponse?.paginationData || {}}
        createFnc={createNewTestimonial}
        searchValue={searchName}
        selectedFileType={selectedFileType}
        adminRole={adminRole}
        permissionsList={permissionsList || []}
      />
    </div>
  );
};

export default CreateTestimonialPage;
