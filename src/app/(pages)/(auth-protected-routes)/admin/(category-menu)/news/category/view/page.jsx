import {
  deletePerticularNewsCategory,
  toggleNewsCategoryActiveStatus,
  toggleNewsCategoryDefaultStatus,
  toggleNewsCategoryFeaturedStatus,
} from "@/actions/apiClientActions/news/category";
import { fetchAllNewsCategoriesPageData } from "@/actions/pageDataActions";
import { newsCategoryTableColumns } from "@/app/assets/data/tableData";
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

// Handle meta data info
export const metadata = {
  title: titlesObject.allNewsCategories.title,
};

const AllNewCategoriesPage = async ({ searchParams }) => {
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
  } = await fetchAllNewsCategoriesPageData(
    searchParams,
    PERMISSIONS.NEWS_CATEGORY.VIEW_ALL_NEWS_CATEGORIES
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
          currentTab="All News Categories"
          mainParentTab="News System"
          firstChildTab="News Categories"
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
    fetchData.length > 0 ? useFormattedCategoryTree(fetchData) : [];

  return (
    <div className={`min-h-full`}>
      <Breadcrumb
        currentTab="All News Categories"
        mainParentTab="News System"
        firstChildTab="News Categories"
      />

      <div
        className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] rounded-sm pb-3 shadow-light sm:pb-5`}
      >
        <div className={`${globalStyleObj.flexBetween} gap-5 p-3`}>
          <h4 className="font-poppins-md text-[15px] text-dark-weight-550 dark:text-light-weight-550">
            News Categories
          </h4>

          {useUIPermissionCheck(
            adminRole,
            permissionsList,
            PERMISSIONS.NEWS_CATEGORY.ADD_NEWS_CATEGORY
          ) && (
            <CreateNewButton
              hrefLink={ROUTES.ADMIN_CREATE_NEWS_CATEGORY}
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
              tableColumns={newsCategoryTableColumns}
              permissionsItems={{
                editCategory: PERMISSIONS.NEWS_CATEGORY.EDIT_NEWS_CATEGORY,
                deleteCategory: PERMISSIONS.NEWS_CATEGORY.DELETE_NEWS_CATEGORY,
                toggleActiveCategory:
                  PERMISSIONS.NEWS_CATEGORY.TOGGLE_ACTIVE_NEWS_CATEGORY,
                toggleFeaturedCategory:
                  PERMISSIONS.NEWS_CATEGORY.TOGGLE_FEATURED_NEWS_CATEGORY,
                toggleDefaultCategory:
                  PERMISSIONS.NEWS_CATEGORY.TOGGLE_DEFAULT_NEWS_CATEGORY,
              }}
              editRoute="/admin/news/category/update"
              actionFunctions={{
                deleteCategoryFnc: deletePerticularNewsCategory,
                toggleActiveCategoryFnc: toggleNewsCategoryActiveStatus,
                toggleFeaturedCategoryFnc: toggleNewsCategoryFeaturedStatus,
                toggleDefaultCategoryFnc: toggleNewsCategoryDefaultStatus,
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
                Create your first news category to get started. Please click the{" "}
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

export default AllNewCategoriesPage;
