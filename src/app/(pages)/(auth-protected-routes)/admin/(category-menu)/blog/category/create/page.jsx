import { createNewCategory } from "@/actions/apiClientActions/blogs/category";
import { fetchCreateCategoryPageData } from "@/actions/pageDataActions";
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
  title: titlesObject.createCategory.title,
};

// Component for creating a category
const CreateNewBlogCategory = async ({ searchParams }) => {
  // Fetch necessary data for creating a category
  const {
    categoriesResponse,
    filesResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
    error,
  } = await fetchCreateCategoryPageData(
    searchParams,
    PERMISSIONS.CATEGORY.ADD_CATEGORY
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
  }

  // Create category TREE structure
  const categoryTree =
    categoriesResponse.fetchData.length > 0
      ? useFormattedCategoryTree(categoriesResponse.fetchData)
      : [];

  // Render the category form
  return (
    <div className={`min-h-full`}>
      <Breadcrumb
        currentTab="Create Category"
        mainParentTab="Blog System"
        firstChildTab="Categories"
      />

      <CategoryForm
        userId={userId}
        categoryList={categoryTree}
        filesList={filesResponse?.filesList || []}
        allFiles={filesResponse?.allFilesData || []}
        createCategoryFnc={createNewCategory}
        paginationDetails={filesResponse?.paginationData || {}}
        searchValue={searchName}
        selectedFileType={selectedFileType}
        adminRole={adminRole}
        permissionsList={permissionsList}
      />
    </div>
  );
};

export default CreateNewBlogCategory;
