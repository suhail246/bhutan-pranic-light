import {
  getPerticularNewsCategory,
  updatePerticularNewsCategory,
} from "@/actions/apiClientActions/news/category";
import { fetchUpdateNewsCategoryPageData } from "@/actions/pageDataActions";
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
  const { targetId } = await params;
  const { userId } = await verifySession();

  // If user is not authenticated or targetId is not valid, return default metadata
  if (
    !userId ||
    targetId === "undefiend" ||
    !mongoose.Types.ObjectId.isValid(targetId)
  ) {
    return {
      title: `Update News Category ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
      description: "News Category details not found.",
    };
  }

  // Fetch the category details
  const { categoryData, translationDetails, message } =
    await getPerticularNewsCategory(userId, targetId);

  return {
    title: message
      ? `Update News Category ${process.env.NEXT_PUBLIC_META_APP_NAME}`
      : categoryData?.metaTitle ||
        `${translationDetails?.en?.name || "Anonymous News Category"} ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
    description: message
      ? "News Category details not found."
      : categoryData?.metaDescription ||
        `${translationDetails?.en?.name || "Anonymous News Category"} update form page.`,
  };
};

const UpdateNewCategoryPage = async ({ params, searchParams }) => {
  // Fetch necessary data for updating the category
  const {
    newsCategoriesResponse,
    filesResponse,
    languagesResponse,
    newsCategoryDetailsResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
    error,
  } = await fetchUpdateNewsCategoryPageData(
    params,
    searchParams,
    PERMISSIONS.NEWS_CATEGORY.EDIT_NEWS_CATEGORY
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? (
      <HandleSessionEnd />
    ) : error === "Not Found" ? (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb
          currentTab="Update News Category"
          mainParentTab="News System"
          firstChildTab="News Categories"
        />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription="News Category does not exists."
        />
      </div>
    ) : (
      <Error403 />
    );
  }

  // Handle case when category details retrieval fails
  if (!newsCategoryDetailsResponse.success) {
    return (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb
          currentTab="Update News Category"
          mainParentTab="News System"
          firstChildTab="News Categories"
        />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription={newsCategoryDetailsResponse.message}
        />
      </div>
    );
  }

  // Create category TREE structure
  const categoryTree =
    newsCategoriesResponse.fetchData.length > 0
      ? useFormattedCategoryTree(newsCategoriesResponse.fetchData)
      : [];

  return (
    <div className={`min-h-full`}>
      <Breadcrumb
        currentTab="Update News Category"
        mainParentTab="News System"
        firstChildTab="News Categories"
      />

      <CategoryForm
        userId={userId}
        languages={languagesResponse?.fetchData || []}
        categoryDetails={newsCategoryDetailsResponse?.categoryData || {}}
        translationDetails={
          newsCategoryDetailsResponse?.translationDetails || {}
        }
        categoryList={categoryTree}
        filesList={filesResponse?.filesList || []}
        allFiles={filesResponse?.allFilesData || []}
        updateCategoryFnc={updatePerticularNewsCategory}
        paginationDetails={filesResponse?.paginationData || {}}
        selectedMetaFileId={
          newsCategoryDetailsResponse.categoryData.metaImage !== null
            ? newsCategoryDetailsResponse?.categoryData?.metaImage?._id
            : ""
        }
        selectedMetaFileName={
          newsCategoryDetailsResponse.categoryData.metaImage !== null
            ? newsCategoryDetailsResponse?.categoryData?.metaImage?.fileName
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

export default UpdateNewCategoryPage;
