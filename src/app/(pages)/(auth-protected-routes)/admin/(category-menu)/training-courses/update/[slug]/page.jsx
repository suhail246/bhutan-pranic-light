import {
  getCourseDetails,
  updatePerticularCourse,
} from "@/actions/apiClientActions/courses";
import { fetchUpdateCoursePageData } from "@/actions/pageDataActions";
import { courseTabConfig } from "@/app/assets/data/cms-pages-tab-data";
import {
  Breadcrumb,
  CommonErrorTemplate,
  CourseForm,
  Error403,
  HandleSessionEnd,
  TabNavigation,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";
import { verifySession } from "@/utils/verifySession";
import mongoose from "mongoose";

// Handle dynamic meta data
export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  const { userId } = await verifySession();

  if (!userId || !slug || !mongoose.Types.ObjectId.isValid(userId)) {
    return {
      title: `Update Course ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
      description: "Course details not found.",
    };
  }

  const { courseDetails, message } = await getCourseDetails(userId, slug);

  return {
    title: message
      ? `Update Course ${process.env.NEXT_PUBLIC_META_APP_NAME}`
      : courseDetails?.metaTitle ||
        `Default Title ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
    description: message
      ? "Course details not found."
      : courseDetails?.metaDescription || "Default description.",
  };
};

const UpdateCoursePage = async ({ params, searchParams }) => {
  const {
    filesResponse,
    languagesResponse,
    courseDetailsResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
    lang,
    slug,
    error,
  } = await fetchUpdateCoursePageData(
    params,
    searchParams,
    PERMISSIONS.COURSES.EDIT_COURSE
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? (
      <HandleSessionEnd /> // Handle unauthorized session
    ) : error === "Not Found" ? (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb
          currentTab="Update Course"
          mainParentTab="Training Courses"
        />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription="Course does not exists."
        />
      </div>
    ) : (
      <Error403 /> // Handle forbidden access
    );
  }

  // Handle case when post retrieval fails
  if (!courseDetailsResponse.success) {
    return (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb
          currentTab="Update Course"
          mainParentTab="Training Courses"
        />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription={courseDetailsResponse.message}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb currentTab="Update Course" mainParentTab="Training Courses" />

      <div className="flex flex-col lg:flex-row gap-3 lg:gap-5 mt-[40px]">
        <TabNavigation activeTabList={courseTabConfig} />

        <CourseForm
          formType="UPDATE_FORM"
          userId={userId}
          languages={languagesResponse?.fetchData || []}
          activeLanguageTab={lang}
          courseSlug={slug}
          filesList={filesResponse?.filesList || []}
          allFiles={filesResponse?.allFilesData || []}
          paginationDetails={filesResponse?.paginationData || {}}
          courseDetails={courseDetailsResponse?.courseDetails || {}}
          updateFnc={updatePerticularCourse}
          searchValue={searchName}
          selectedFileType={selectedFileType}
          adminRole={adminRole}
          permissionsList={permissionsList || []}
        />
      </div>
    </div>
  );
};

export default UpdateCoursePage;
