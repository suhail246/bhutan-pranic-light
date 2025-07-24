import {
  getPerticularCategory,
  updatePerticularCategory,
} from "@/actions/apiClientActions/blogs/category";
import { fetchUpdateCategoryPageData } from "@/actions/pageDataActions";
import {
  Breadcrumb,
  CategoryForm,
  CommonErrorTemplate,
  Error403,
  HandleSessionEnd,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";
import { useFormattedCategoryTree } from "@/lib/hooks";
import { verifySession } from "@/utils/verifySession";
import mongoose from "mongoose";

// Handle dynamic meta data info
export const generateMetadata = async ({ params }) => {
  const { categoryId } = await params;
  const { userId } = await verifySession();

  // If user is not authenticated or categoryId is not valid, return default metadata
  if (
    !userId ||
    categoryId === "undefiend" ||
    !mongoose.Types.ObjectId.isValid(categoryId)
  ) {
    return {
      title: `Update Category ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
      description: "Category details not found.",
    };
  }

  // Fetch the category details
  const { categoryData, translationDetails, message } =
    await getPerticularCategory(userId, categoryId);

  return {
    title: message
      ? `Update Blog Category ${process.env.NEXT_PUBLIC_META_APP_NAME}`
      : categoryData?.metaTitle ||
        `${translationDetails?.en?.name || "Anonymous Blog Category"} ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
    description: message
      ? "Blog Category details not found."
      : categoryData?.metaDescription ||
        `${translationDetails?.en?.name || "Anonymous News Category"} update form page.`,
  };
};

// Component for updating a category
const UpdateBlogCategory = async ({ params, searchParams }) => {
  // Fetch necessary data for updating the category
  const {
    categoriesResponse,
    filesResponse,
    languagesResponse,
    categoryDetailsResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
    error,
  } = await fetchUpdateCategoryPageData(
    params,
    searchParams,
    PERMISSIONS.CATEGORY.EDIT_CATEGORY
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? (
      <HandleSessionEnd />
    ) : error === "Not Found" ? (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb
          currentTab="Update Category"
          mainParentTab="Blog System"
          firstChildTab="Categories"
        />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription="Category does not exists."
        />
      </div>
    ) : (
      <Error403 />
    );
  }

  // Handle case when category details retrieval fails
  if (!categoryDetailsResponse.success) {
    return (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb
          currentTab="Update Category"
          mainParentTab="Blog System"
          firstChildTab="Categories"
        />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription={categoryDetailsResponse.message}
        />
      </div>
    );
  }

  // Create category TREE structure
  const categoryTree =
    categoriesResponse.fetchData.length > 0
      ? useFormattedCategoryTree(categoriesResponse.fetchData)
      : [];

  return (
    <div className={`min-h-full`}>
      <Breadcrumb
        currentTab="Update Category"
        mainParentTab="Blog System"
        firstChildTab="Categories"
      />

      <CategoryForm
        userId={userId}
        languages={languagesResponse?.fetchData || []}
        categoryDetails={categoryDetailsResponse.categoryData}
        translationDetails={categoryDetailsResponse.translationDetails}
        categoryList={categoryTree}
        updateCategoryFnc={updatePerticularCategory}
        filesList={filesResponse?.filesList || []}
        allFiles={filesResponse?.allFilesData || []}
        paginationDetails={filesResponse.paginationData}
        selectedMetaFileId={
          categoryDetailsResponse.categoryData.metaImage !== null
            ? categoryDetailsResponse?.categoryData?.metaImage?._id
            : ""
        }
        selectedMetaFileName={
          categoryDetailsResponse.categoryData.metaImage !== null
            ? categoryDetailsResponse?.categoryData?.metaImage?.fileName
            : ""
        }
        searchValue={searchName}
        selectedFileType={selectedFileType}
        adminRole={adminRole}
        permissionsList={permissionsList}
      />
    </div>
  );
};

export default UpdateBlogCategory;
