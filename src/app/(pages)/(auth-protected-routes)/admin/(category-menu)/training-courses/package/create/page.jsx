import { createNewCoursePackage } from "@/actions/apiClientActions/courses/packages";
import { fetchAddNewCoursePackagePageData } from "@/actions/pageDataActions";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import {
  Breadcrumb,
  CoursePackageForm,
  Error403,
  HandleSessionEnd,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";
import { useFilterActiveItems } from "@/lib/hooks";

// Handle meta data for all posts page
export const metadata = {
  title: titlesObject.createCoursePackage.title,
};

const CreateNewCoursePackagePage = async ({ searchParams }) => {
  const {
    filesResponse,
    coursesResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
    error,
  } = await fetchAddNewCoursePackagePageData(
    searchParams,
    PERMISSIONS.PACKAGES.ADD_PACKAGE
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
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
        currentTab="Create Package"
        mainParentTab="Training Courses"
        firstChildTab="Packages"
      />

      <CoursePackageForm
        userId={userId}
        coursesList={
          activeCoursesWithoutGoldenVisa.length > 0
            ? activeCoursesWithoutGoldenVisa
            : []
        }
        filesList={filesResponse?.filesList || []}
        allFiles={filesResponse?.allFilesData || []}
        paginationDetails={filesResponse?.paginationData || {}}
        createFnc={createNewCoursePackage}
        searchValue={searchName}
        selectedFileType={selectedFileType}
        adminRole={adminRole}
        permissionsList={permissionsList || []}
      />
    </div>
  );
};

export default CreateNewCoursePackagePage;
