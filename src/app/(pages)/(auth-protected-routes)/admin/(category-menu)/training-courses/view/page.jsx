import {
  deletePerticularCourse,
  toggleActiveCourse,
  toggleFeaturedCourse,
} from "@/actions/apiClientActions/courses";
import { fetchAllCoursesPageData } from "@/actions/pageDataActions";
import { coursesTableColumns } from "@/app/assets/data/tableData";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";
import {
  AllCoursesList,
  Breadcrumb,
  CommonErrorTemplate,
  CreateNewButton,
  Error403,
  HandleSessionEnd,
  WordFocus,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";
import ROUTES from "@/constants/routes";
import { useUIPermissionCheck } from "@/lib/hooks";

// Handle meta data for all posts page
export const metadata = {
  title: titlesObject.allCourses.title,
};

const CoursesLisitingPage = async () => {
  // Fetch necessary data for all blog posts
  const { coursesResponse, userId, adminRole, permissionsList, error } =
    await fetchAllCoursesPageData(PERMISSIONS.COURSES.VIEW_ALL_COURSES);

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
  }

  // Handle case when courses retrieval fails
  if (!coursesResponse.success) {
    return (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb currentTab="All Courses" mainParentTab="Training Courses" />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription={coursesResponse.message}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb currentTab="All Courses" mainParentTab="Training Courses" />

      <div
        className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] rounded-sm pb-3 shadow-light sm:pb-5`}
      >
        <div className="flex sm:justify-end p-3">
          {/* Create New Button */}
          {useUIPermissionCheck(
            adminRole,
            permissionsList,
            PERMISSIONS.COURSES.ADD_COURSE
          ) && (
            <CreateNewButton
              hrefLink={ROUTES.ADMIN_CREATE_COURSE}
              text="Add Course"
              extraClass="max-w-[180px]"
            />
          )}
        </div>

        {(coursesResponse?.fetchData || []).length > 0 ? (
          <>
            <AllCoursesList
              userId={userId}
              data={coursesResponse?.fetchData || []}
              tableColumns={coursesTableColumns}
              permissionItems={{
                editItem: PERMISSIONS.COURSES.EDIT_COURSE,
                deleteItem: PERMISSIONS.COURSES.DELETE_COURSE,
                toggleActiveItem: PERMISSIONS.COURSES.TOGGLE_ACTIVE_COURSE,
                toggleFeaturedItem: PERMISSIONS.COURSES.TOGGLE_FEATURED_COURSE,
              }}
              editRoute="/admin/training-courses/update"
              targetType="course"
              actionFunctions={{
                deleteItemFnc: deletePerticularCourse,
                toggleActiveItemFnc: toggleActiveCourse,
                toggleFeaturedItemFnc: toggleFeaturedCourse,
              }}
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          </>
        ) : (
          <div className="flex flex-col w-full items-center justify-center gap-2 p-3 min-h-[50vh]">
            <WordFocus
              sentence="No Courses"
              manualMode={false}
              blurAmount={5}
              borderColor="red"
              animationDuration={2}
              pauseBetweenAnimations={1}
            />

            <p className="text-center text-[13px] md:text-[16px] text-dark-weight-350 dark:text-light-weight-400 font-poppins-rg">
              Create your first news course to get started. Please click the{" "}
              <span className="text-dark-weight-550 dark:text-light-weight-800 font-poppins-sb">
                Add Course
              </span>{" "}
              button.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesLisitingPage;
