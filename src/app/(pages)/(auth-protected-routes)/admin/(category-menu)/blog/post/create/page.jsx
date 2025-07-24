import { createNewBlogPost } from "@/actions/apiClientActions/blogs/posts";
import { fetchCreateBlogPageData } from "@/actions/pageDataActions";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import {
  BlogPostForm,
  Breadcrumb,
  Error403,
  HandleSessionEnd,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";
import { useFormattedCategoryTree } from "@/lib/hooks";

// Handle meta data info
export const metadata = {
  title: titlesObject.createPost.title,
};

// Component for creating a blog post
const BlogSystemAllPosts = async ({ searchParams }) => {
  // Fetch necessary data for creating a blog post
  const {
    categoriesResponse,
    filesResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
    error,
  } = await fetchCreateBlogPageData(searchParams, PERMISSIONS.POST.ADD_POST);

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
  }

  // Create category tree structure
  const categoryTree =
    (categoriesResponse?.fetchData || []).length > 0
      ? useFormattedCategoryTree(categoriesResponse.fetchData)
      : [];

  return (
    <div className={`min-h-full`}>
      <Breadcrumb
        currentTab="Create Post"
        mainParentTab="Blog System"
        firstChildTab="Posts"
      />

      {/* Create Post Form Component */}
      <BlogPostForm
        userId={userId}
        categoryList={categoryTree}
        filesList={filesResponse?.filesList || []}
        allFiles={filesResponse?.allFilesData || []}
        paginationDetails={filesResponse?.paginationData || {}}
        createFnc={createNewBlogPost}
        searchValue={searchName}
        selectedFileType={selectedFileType}
        adminRole={adminRole}
        permissionsList={permissionsList || []}
      />
    </div>
  );
};

export default BlogSystemAllPosts;
