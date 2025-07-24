import {
  getCoursePackageDetails,
  updatePerticularCoursePackage,
} from "@/actions/apiClientActions/courses/packages";
import { fetchUpdateCoursePackagePageData } from "@/actions/pageDataActions";
import {
  Breadcrumb,
  CommonErrorTemplate,
  CoursePackageForm,
  Error403,
  HandleSessionEnd,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";
import { useFilterActiveItems } from "@/lib/hooks";
import { verifySession } from "@/utils/verifySession";
import mongoose from "mongoose";

// Handle dynamic meta data
export const generateMetadata = async ({ params }) => {
  const { targetId } = await params;
  const { userId } = await verifySession();

  if (
    !userId ||
    !targetId ||
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(targetId)
  ) {
    return {
      title: `Update Course Package ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
      description: "Course package details not found.",
    };
  }

  const { coursePackageDetails, message } = await getCoursePackageDetails(
    userId,
    targetId
  );

  return {
    title: message
      ? `Update Course Package ${process.env.NEXT_PUBLIC_META_APP_NAME}`
      : `${coursePackageDetails?.packageTitle || "Default"} ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
    description: message
      ? "Course package details not found."
      : `${coursePackageDetails?.packageTitle || "Default"} course package details form`,
  };
};

const UpdateCoursePackagePage = async ({ params, searchParams }) => {
  const {
    filesResponse,
    languagesResponse,
    coursesResponse,
    coursePackageDetailsResponse,
    userId,
    targetId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
    lang,
    course,
    error,
  } = await fetchUpdateCoursePackagePageData(
    params,
    searchParams,
    PERMISSIONS.PACKAGES.EDIT_PACKAGE
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? (
      <HandleSessionEnd /> // Handle unauthorized session
    ) : error === "Not Found" ? (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb
          currentTab="Update Package"
          mainParentTab="Training Courses"
          firstChildTab="Packages"
        />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription="Course package does not exists."
        />
      </div>
    ) : (
      <Error403 /> // Handle forbidden access
    );
  }

  // Handle case when retrieval fails
  if (!coursePackageDetailsResponse.success) {
    return (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb
          currentTab="Update Package"
          mainParentTab="Training Courses"
          firstChildTab="Packages"
        />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription={coursePackageDetailsResponse.message}
        />
      </div>
    );
  }

  // Filter Active Courses
  const activeCourses = useFilterActiveItems(
    coursesResponse?.fetchData || [],
    "isActive"
  );

  // Filter out courseStaticId = golden-visa-driving-license
  const activeCoursesWithoutGoldenVisa =
    activeCourses.length > 0
      ? activeCourses.filter(
          (eachCourse) =>
            eachCourse.courseStaticId !== "golden-visa-driving-license"
        )
      : [];

  return (
    <div className={`min-h-full`}>
      <Breadcrumb
        currentTab="Update Package"
        mainParentTab="Training Courses"
        firstChildTab="Packages"
      />

      <CoursePackageForm
        formType="UPDATE_FORM"
        userId={userId}
        targetId={targetId}
        languages={languagesResponse?.fetchData || []}
        activeLanguageTab={lang}
        courseSlug={course}
        coursesList={
          activeCoursesWithoutGoldenVisa.length > 0
            ? activeCoursesWithoutGoldenVisa
            : []
        }
        filesList={filesResponse?.filesList || []}
        allFiles={filesResponse?.allFilesData || []}
        paginationDetails={filesResponse?.paginationData || {}}
        coursePackageDetails={
          coursePackageDetailsResponse?.coursePackageDetails || {}
        }
        updateFnc={updatePerticularCoursePackage}
        searchValue={searchName}
        selectedFileType={selectedFileType}
        adminRole={adminRole}
        permissionsList={permissionsList || []}
      />
    </div>
  );
};

export default UpdateCoursePackagePage;
