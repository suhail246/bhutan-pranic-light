import {
  changeCategoryDefaultStatus,
  changeCategoryFeaturedStatus,
  changeCategoryStatus,
  deletePerticularCategory,
} from "@/actions/apiClientActions/blogs/category";
import { fetchAllCategoriesPageData } from "@/actions/pageDataActions";
import { categoryTableColumns } from "@/app/assets/data/tableData";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";
import {
  Breadcrumb,
  CommonErrorTemplate,
  CreateNewButton,
  Error403,
  HandleSessionEnd,
  RenderAllCategories,
  SearchInputField,
  WordFocus,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";
import ROUTES from "@/constants/routes";
import { useFormattedCategoryTree, useUIPermissionCheck } from "@/lib/hooks";

// Handle meta data for all categories page
export const metadata = {
  title: titlesObject.allCategories.title,
};

// Component for all blog categories
const BlogSystemCategories = async ({ searchParams }) => {
  // Fetch necessary data for all categories
  const {
    success,
    fetchData,
    message,
    userId,
    search,
    adminRole,
    permissionsList,
    error,
  } = await fetchAllCategoriesPageData(
    searchParams,
    PERMISSIONS.CATEGORY.VIEW_ALL_CATEGORIES
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
  }

  // Handle case when categories retrieval fails
  if (!success) {
    return (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb
          currentTab="All Categories"
          mainParentTab="Blog System"
          firstChildTab="Categories"
        />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription={message}
        />
      </div>
    );
  }

  // Create category TREE structure
  const categoryTree =
    fetchData.length > 0
      ? !search || search === ""
        ? useFormattedCategoryTree(fetchData)
        : fetchData
      : [];

  return (
    <div className={`min-h-full`}>
      <Breadcrumb
        currentTab="All Categories"
        mainParentTab="Blog System"
        firstChildTab="Categories"
      />

      <div
        className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] rounded-sm pb-3 shadow-light sm:pb-5`}
      >
        <div className={`${globalStyleObj.flexBetween} gap-5 p-3`}>
          <h4 className="font-poppins-md text-[15px] text-dark-weight-550 dark:text-light-weight-550">
            Categories
          </h4>

          {useUIPermissionCheck(
            adminRole,
            permissionsList,
            PERMISSIONS.CATEGORY.ADD_CATEGORY
          ) && (
            <CreateNewButton
              hrefLink={ROUTES.ADMIN_BLOG_CREATE_CATEGORY}
              text="Add Category"
              extraClass="max-w-[180px]"
            />
          )}
        </div>

        <div className="mx-3">
          <div className="max-w-[200px]">
            <SearchInputField />
          </div>

          {categoryTree.length > 0 ? (
            <RenderAllCategories
              userId={userId}
              categoryTree={categoryTree}
              tableColumns={categoryTableColumns}
              permissionsItems={{
                editCategory: PERMISSIONS.CATEGORY.EDIT_CATEGORY,
                deleteCategory: PERMISSIONS.CATEGORY.DELETE_CATEGORY,
                toggleActiveCategory:
                  PERMISSIONS.CATEGORY.TOGGLE_ACTIVE_CATEGORY,
                toggleFeaturedCategory:
                  PERMISSIONS.CATEGORY.TOGGLE_FEATURED_CATEGORY,
                toggleDefaultCategory:
                  PERMISSIONS.CATEGORY.TOGGLE_DEFAULT_CATEGORY,
              }}
              editRoute="/admin/blog/category/update"
              actionFunctions={{
                deleteCategoryFnc: deletePerticularCategory,
                toggleActiveCategoryFnc: changeCategoryStatus,
                toggleFeaturedCategoryFnc: changeCategoryFeaturedStatus,
                toggleDefaultCategoryFnc: changeCategoryDefaultStatus,
              }}
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          ) : (
            <div className="flex flex-col w-full items-center justify-center gap-2 p-3 min-h-[50vh]">
              <WordFocus
                sentence="No Category"
                manualMode={false}
                blurAmount={5}
                borderColor="red"
                animationDuration={2}
                pauseBetweenAnimations={1}
              />

              <p className="text-center text-[13px] md:text-[16px] text-dark-weight-350 dark:text-light-weight-400 font-poppins-rg">
                Create your first category to get started. Please click the{" "}
                <span className="text-dark-weight-550 dark:text-light-weight-800 font-poppins-sb">
                  Add Category
                </span>{" "}
                button.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogSystemCategories;
