import { createNewNewsArticle } from "@/actions/apiClientActions/news/articles";
import { fetchCreateNewsArticlePageData } from "@/actions/pageDataActions";
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
  title: titlesObject.createNewsArticle.title,
};

const CreateNewsArticlePage = async ({ searchParams }) => {
  // Fetch necessary data for creating a blog post
  const {
    newsCategoriesResponse,
    filesResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
    error,
  } = await fetchCreateNewsArticlePageData(
    searchParams,
    PERMISSIONS.NEWS.ADD_NEWS_ARTICLE
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
  }

  // Create category tree structure
  const categoryTree =
    (newsCategoriesResponse?.fetchData || []).length > 0
      ? useFormattedCategoryTree(newsCategoriesResponse.fetchData)
      : [];

  return (
    <div className={`min-h-full`}>
      <Breadcrumb
        currentTab="Create News"
        mainParentTab="News System"
        firstChildTab="News Articles"
      />

      {/* Create Post Form Component */}
      <BlogPostForm
        userId={userId}
        categoryList={categoryTree}
        filesList={filesResponse?.filesList || []}
        allFiles={filesResponse?.allFilesData || []}
        paginationDetails={filesResponse?.paginationData || {}}
        createFnc={createNewNewsArticle}
        searchValue={searchName}
        selectedFileType={selectedFileType}
        adminRole={adminRole}
        permissionsList={permissionsList || []}
      />
    </div>
  );
};

export default CreateNewsArticlePage;
