import { createNewsCategory } from "@/actions/apiClientActions/news/category";
import { fetchCreateNewsCategoryPageData } from "@/actions/pageDataActions";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import {
  Breadcrumb,
  CategoryForm,
  Error403,
  HandleSessionEnd,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";
import { useFormattedCategoryTree } from "@/lib/hooks";

// Handle meta data info
export const metadata = {
  title: titlesObject.createNewsCategory.title,
};

const CreateNewCategoryPage = async ({ searchParams }) => {
  // Fetch necessary data for creating a category
  const {
    newsCategoriesResponse,
    filesResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
    error,
  } = await fetchCreateNewsCategoryPageData(
    searchParams,
    PERMISSIONS.NEWS_CATEGORY.ADD_NEWS_CATEGORY
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
  }

  // Create category TREE structure
  const categoryTree =
    newsCategoriesResponse.fetchData.length > 0
      ? useFormattedCategoryTree(newsCategoriesResponse.fetchData)
      : [];

  return (
    <div className={`min-h-full`}>
      <Breadcrumb
        currentTab="Create News Category"
        mainParentTab="News System"
        firstChildTab="News Categories"
      />

      <CategoryForm
        userId={userId}
        categoryList={categoryTree}
        createCategoryFnc={createNewsCategory}
        filesList={filesResponse.filesList}
        allFiles={filesResponse?.allFilesData || []}
        paginationDetails={filesResponse.paginationData}
        searchValue={searchName}
        selectedFileType={selectedFileType}
        adminRole={adminRole}
        permissionsList={permissionsList}
      />
    </div>
  );
};

export default CreateNewCategoryPage;
