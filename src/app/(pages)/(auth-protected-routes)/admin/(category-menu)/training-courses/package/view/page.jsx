import {
  deletePerticularCoursePackage,
  togglePerticularCoursePackageActiveStatus,
  togglePerticularCoursePackageFeaturedStatus,
} from "@/actions/apiClientActions/courses/packages";
import { fetchAllCoursePackagesData } from "@/actions/pageDataActions";
import { coursePackagesTableColumns } from "@/app/assets/data/tableData";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";
import {
  AllCoursePackagesList,
  Breadcrumb,
  CommonErrorTemplate,
  CoursesFilter,
  CreateNewButton,
  Error403,
  HandleSessionEnd,
  PostFilterDropdown,
  SearchInputField,
  WordFocus,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";
import ROUTES from "@/constants/routes";
import { useFilterActiveItems, useUIPermissionCheck } from "@/lib/hooks";

// Handle meta data
export const metadata = {
  title: titlesObject.allCoursePackages.title,
};

const AllCoursePackagesPage = async ({ searchParams }) => {
  const {
    coursesResponse,
    coursePackagesResponse,
    userId,
    adminRole,
    permissionsList,
    error,
  } = await fetchAllCoursePackagesData(
    searchParams,
    PERMISSIONS.PACKAGES.VIEW_ALL_PACKAGES
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
  }

  // Handle case when packages retrieval fails
  if (!coursePackagesResponse.success) {
    return (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb
          currentTab="All Packages"
          mainParentTab="Training Courses"
          firstChildTab="Packages"
        />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription={coursePackagesResponse.message}
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
        currentTab="All Packages"
        mainParentTab="Training Courses"
        firstChildTab="Packages"
      />

      <div
        className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] rounded-sm pb-3 shadow-light sm:pb-5`}
      >
        <div
          className={`flex flex-col md:flex-row md:items-center sm:justify-between gap-2 p-3`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            {/* Search Input Field */}
            <SearchInputField />

            <div className="flex items-center gap-1">
              {/* Courses Filter */}
              {useUIPermissionCheck(
                adminRole,
                permissionsList,
                PERMISSIONS.COURSES.VIEW_ALL_COURSES
              ) && (
                <CoursesFilter
                  itemList={
                    activeCoursesWithoutGoldenVisa.length > 0
                      ? activeCoursesWithoutGoldenVisa
                      : []
                  }
                />
              )}
              {/* Post Filter Dropdown */}
              <PostFilterDropdown />
            </div>
          </div>

          {/* Create New Button */}
          {useUIPermissionCheck(
            adminRole,
            permissionsList,
            PERMISSIONS.PACKAGES.ADD_PACKAGE
          ) && (
            <CreateNewButton
              hrefLink={ROUTES.ADMIN_CREATE_COURSE_PACKAGE}
              text="Add Package"
              extraClass="max-w-[180px]"
            />
          )}
        </div>

        {(coursePackagesResponse?.packages || []).length > 0 ? (
          <>
            {/* All Course Packages List */}
            <AllCoursePackagesList
              userId={userId}
              data={coursePackagesResponse?.packages || []}
              paginationDetails={coursePackagesResponse?.paginationData || {}}
              tableColumns={coursePackagesTableColumns}
              permissionItems={{
                editItem: PERMISSIONS.PACKAGES.EDIT_PACKAGE,
                deleteItem: PERMISSIONS.PACKAGES.DELETE_PACKAGE,
                toggleActiveItem: PERMISSIONS.PACKAGES.TOGGLE_ACTIVE_PACKAGE,
                toggleFeaturedItem:
                  PERMISSIONS.PACKAGES.TOGGLE_FEATURED_PACKAGE,
              }}
              editRoute="/admin/training-courses/package/update"
              targetType="course package"
              actionFunctions={{
                deleteItemFnc: deletePerticularCoursePackage,
                toggleActiveItemFnc: togglePerticularCoursePackageActiveStatus,
                toggleFeaturedItemFnc:
                  togglePerticularCoursePackageFeaturedStatus,
              }}
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          </>
        ) : (
          <>
            {/* No Posts Message */}
            <div className="flex flex-col w-full items-center justify-center gap-2 p-3 min-h-[50vh]">
              <WordFocus
                sentence="No Packages"
                manualMode={false}
                blurAmount={5}
                borderColor="red"
                animationDuration={2}
                pauseBetweenAnimations={1}
              />

              <p className="text-center text-[13px] md:text-[16px] text-dark-weight-350 dark:text-light-weight-400 font-poppins-rg">
                Create your first package to get started. Please click the{" "}
                <span className="text-dark-weight-550 dark:text-light-weight-800 font-poppins-sb">
                  Add Package
                </span>{" "}
                button.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllCoursePackagesPage;
