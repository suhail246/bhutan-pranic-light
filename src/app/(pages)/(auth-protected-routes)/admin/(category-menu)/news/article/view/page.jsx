import {
  deletePerticularNewsArticle,
  togglePerticularNewsArticleActiveStatus,
  togglePerticularNewsArticleFeaturedStatus,
} from "@/actions/apiClientActions/news/articles";
import { fetchAllNewsArticlesPageData } from "@/actions/pageDataActions";
import { newsArticleTableColumns } from "@/app/assets/data/tableData";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";
import {
  AllBlogPostsList,
  Breadcrumb,
  CategoriesFilter,
  CommonErrorTemplate,
  CreateNewButton,
  Error403,
  HandleSessionEnd,
  PostFilterDropdown,
  SearchInputField,
  WordFocus,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";
import ROUTES from "@/constants/routes";
import { useUIPermissionCheck } from "@/lib/hooks";

// Handle meta data for all posts page
export const metadata = {
  title: titlesObject.allNewsArticles.title,
};

const AllNewsArticlesPage = async ({ searchParams }) => {
  // Fetch necessary data for all blog posts
  const {
    newsArticleResponse,
    newsCategoriesResponse,
    userId,
    search,
    adminRole,
    permissionsList,
    error,
  } = await fetchAllNewsArticlesPageData(
    searchParams,
    PERMISSIONS.NEWS.VIEW_ALL_NEWS_ARTICLES
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
  }

  // Handle case when posts retrieval fails
  if (!newsArticleResponse.success) {
    return (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb
          currentTab="All News Articles"
          mainParentTab="News System"
          firstChildTab="News Article"
        />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription={newsArticleResponse.message}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb
        currentTab="All News Articles"
        mainParentTab="News System"
        firstChildTab="News Article"
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
              {/* Categories Filter */}
              {useUIPermissionCheck(
                adminRole,
                permissionsList,
                PERMISSIONS.NEWS_CATEGORY.VIEW_ALL_NEWS_CATEGORIES
              ) && (
                <CategoriesFilter
                  categoriesList={newsCategoriesResponse?.fetchData || []}
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
            PERMISSIONS.NEWS.ADD_NEWS_ARTICLE
          ) && (
            <CreateNewButton
              hrefLink={ROUTES.ADMIN_CREATE_NEWS_ARTICLE}
              text="Add News"
              extraClass="max-w-[180px]"
            />
          )}
        </div>

        {(newsArticleResponse?.fetchData || []).length > 0 ? (
          <>
            {/* All News Articles List */}
            <AllBlogPostsList
              userId={userId}
              data={newsArticleResponse?.fetchData || []}
              paginationDetails={newsArticleResponse?.paginationData || {}}
              tableColumns={newsArticleTableColumns}
              permissionItems={{
                editItem: PERMISSIONS.NEWS.EDIT_NEWS_ARTICLE,
                deleteItem: PERMISSIONS.NEWS.DELETE_NEWS_ARTICLE,
                toggleActiveItem: PERMISSIONS.NEWS.TOGGLE_ACTIVE_NEWS_ARTICLE,
                toggleFeaturedItem:
                  PERMISSIONS.NEWS.TOGGLE_FEATURED_NEWS_ARTICLE,
              }}
              editRoute="/admin/news/article/update"
              targetType="news article"
              actionFunctions={{
                deleteItemFnc: deletePerticularNewsArticle,
                toggleActiveItemFnc: togglePerticularNewsArticleActiveStatus,
                toggleFeaturedItemFnc:
                  togglePerticularNewsArticleFeaturedStatus,
              }}
              search={search}
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          </>
        ) : (
          <>
            {/* No Posts Message */}
            <div className="flex flex-col w-full items-center justify-center gap-2 p-3 min-h-[50vh]">
              <WordFocus
                sentence="No News"
                manualMode={false}
                blurAmount={5}
                borderColor="red"
                animationDuration={2}
                pauseBetweenAnimations={1}
              />

              <p className="text-center text-[13px] md:text-[16px] text-dark-weight-350 dark:text-light-weight-400 font-poppins-rg">
                Create your first news article to get started. Please click the{" "}
                <span className="text-dark-weight-550 dark:text-light-weight-800 font-poppins-sb">
                  Add News
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

export default AllNewsArticlesPage;
