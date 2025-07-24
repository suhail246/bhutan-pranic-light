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

import {
  deletePerticularPost,
  postToggleActiveStatus,
  postToggleFeaturedStatus,
} from "@/actions/apiClientActions/blogs/posts";
import { fetchAllPostsPageData } from "@/actions/pageDataActions";
import { postTableColumns } from "@/app/assets/data/tableData";
import ROUTES from "@/constants/routes";
import { useUIPermissionCheck } from "@/lib/hooks";

// Handle meta data for all posts page
export const metadata = {
  title: titlesObject.allPosts.title,
};

// Component for all blog posts
const AllBlogs = async ({ searchParams }) => {
  // Fetch necessary data for all blog posts
  const {
    postsResponse,
    categoriesResponse,
    userId,
    search,
    adminRole,
    permissionsList,
    error,
  } = await fetchAllPostsPageData(
    searchParams,
    PERMISSIONS.POST.VIEW_ALL_POSTS
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
  }

  // Handle case when posts retrieval fails
  if (!postsResponse.success) {
    return (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb
          currentTab="All Posts"
          mainParentTab="Blog System"
          firstChildTab="Posts"
        />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription={postsResponse.message}
        />
      </div>
    );
  }

  // Render the blog posts
  return (
    <div className={`min-h-full`}>
      <Breadcrumb
        currentTab="All Posts"
        mainParentTab="Blog System"
        firstChildTab="Posts"
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
                PERMISSIONS.CATEGORY.VIEW_ALL_CATEGORIES
              ) && (
                <CategoriesFilter
                  categoriesList={categoriesResponse?.fetchData || []}
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
            PERMISSIONS.POST.ADD_POST
          ) && (
            <CreateNewButton
              hrefLink={ROUTES.ADMIN_BLOG_CREATE_POST}
              text="Add Post"
              extraClass="max-w-[180px]"
            />
          )}
        </div>

        {(postsResponse?.fetchData || []).length > 0 ? (
          <>
            {/* All Blog Posts List */}
            <AllBlogPostsList
              userId={userId}
              data={postsResponse?.fetchData || []}
              paginationDetails={postsResponse?.paginationData || {}}
              tableColumns={postTableColumns}
              permissionItems={{
                editItem: PERMISSIONS.POST.EDIT_POST,
                deleteItem: PERMISSIONS.POST.DELETE_POST,
                toggleActiveItem: PERMISSIONS.POST.TOGGLE_ACTIVE_POST,
                toggleFeaturedItem: PERMISSIONS.POST.TOGGLE_FEATURED_POST,
              }}
              editRoute="/admin/blog/post/update"
              targetType="blog"
              actionFunctions={{
                deleteItemFnc: deletePerticularPost,
                toggleActiveItemFnc: postToggleActiveStatus,
                toggleFeaturedItemFnc: postToggleFeaturedStatus,
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
                sentence="No Post"
                manualMode={false}
                blurAmount={5}
                borderColor="red"
                animationDuration={2}
                pauseBetweenAnimations={1}
              />

              <p className="text-center text-[13px] md:text-[16px] text-dark-weight-350 dark:text-light-weight-400 font-poppins-rg">
                Create your first blog post to get started. Please click the{" "}
                <span className="text-dark-weight-550 dark:text-light-weight-800 font-poppins-sb">
                  Add Post
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

export default AllBlogs;
