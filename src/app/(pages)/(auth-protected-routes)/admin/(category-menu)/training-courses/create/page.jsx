import { createNewCourse } from "@/actions/apiClientActions/courses";
import { fetchAddNewCoursePageData } from "@/actions/pageDataActions";
import { courseTabConfig } from "@/app/assets/data/cms-pages-tab-data";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import {
  Breadcrumb,
  CourseForm,
  Error403,
  HandleSessionEnd,
  TabNavigation,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";

// Handle meta data for all posts page
export const metadata = {
  title: titlesObject.createCourse.title,
};

const CreateNewCoursePage = async ({ searchParams }) => {
  const {
    filesResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
    error,
  } = await fetchAddNewCoursePageData(
    searchParams,
    PERMISSIONS.COURSES.ADD_COURSE
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb
        currentTab="Publish Course"
        mainParentTab="Training Courses"
      />

      <div className="flex flex-col lg:flex-row gap-3 lg:gap-5 mt-[40px]">
        <TabNavigation activeTabList={courseTabConfig} />

        <CourseForm
          userId={userId}
          filesList={filesResponse?.filesList || []}
          allFiles={filesResponse?.allFilesData || []}
          paginationDetails={filesResponse?.paginationData || {}}
          createFnc={createNewCourse}
          searchValue={searchName}
          selectedFileType={selectedFileType}
          adminRole={adminRole}
          permissionsList={permissionsList || []}
        />
      </div>
    </div>
  );
};

export default CreateNewCoursePage;
