import {
  getPerticularNewsArticle,
  updatePerticularNewsArticle,
} from "@/actions/apiClientActions/news/articles";
import { fetchUpdateNewsArticlePageData } from "@/actions/pageDataActions";
import {
  BlogPostForm,
  Breadcrumb,
  CommonErrorTemplate,
  Error403,
  HandleSessionEnd,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";
import {
  useExtractSlugAndTargetId,
  useFormattedCategoryTree,
} from "@/lib/hooks";
import { verifySession } from "@/utils/verifySession";
import mongoose from "mongoose";

// Handle dynamic meta data for update page
export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  const { slugData, targetId } = useExtractSlugAndTargetId(slug);

  const { userId } = await verifySession();

  // If user is not authenticated or targetId is not valid, return default metadata
  if (
    !userId ||
    !slugData ||
    !targetId ||
    targetId === "undefiend" ||
    !mongoose.Types.ObjectId.isValid(targetId)
  ) {
    return {
      title: `Update News Article ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
      description: "News Article details not found.",
    };
  }

  // Fetch the post details using the postId and userId
  const { newsArticleData, message } = await getPerticularNewsArticle(
    userId,
    slugData,
    targetId
  );

  return {
    title: message
      ? `Update News Article ${process.env.NEXT_PUBLIC_META_APP_NAME}`
      : newsArticleData?.metaTitle ||
        `New Article Details ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
    description: message
      ? "New Article details not found."
      : newsArticleData?.metaDescription || "News Article details form page.",
  };
};

const UpdateNewsArticlePage = async ({ params, searchParams }) => {
  // Fetch necessary data for updating the blog post
  const {
    newsCategoriesResponse,
    filesResponse,
    languagesResponse,
    newArticleResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
    error,
  } = await fetchUpdateNewsArticlePageData(
    params,
    searchParams,
    PERMISSIONS.NEWS.EDIT_NEWS_ARTICLE
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? (
      <HandleSessionEnd /> // Handle unauthorized session
    ) : error === "Not Found" ? (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb
          currentTab="Update New Article"
          mainParentTab="News System"
          firstChildTab="News Article"
        />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription="News Article does not exists."
        />
      </div>
    ) : (
      <Error403 /> // Handle forbidden access
    );
  }

  // Handle case when post retrieval fails
  if (!newArticleResponse.success) {
    return (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb
          currentTab="Update New Article"
          mainParentTab="News System"
          firstChildTab="News Article"
        />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription={newArticleResponse.message}
        />
      </div>
    );
  }

  // Create category tree structure for category selection
  const categoryTree =
    (newsCategoriesResponse?.fetchData || []).length > 0
      ? useFormattedCategoryTree(newsCategoriesResponse.fetchData)
      : [];

  return (
    <div className={`min-h-full`}>
      <Breadcrumb
        currentTab="Update New Article"
        mainParentTab="News System"
        firstChildTab="News Article"
      />

      {/* Edit Post Form Component */}
      <BlogPostForm
        userId={userId}
        languages={languagesResponse?.fetchData || []}
        postDetails={newArticleResponse?.newsArticleData || {}}
        translationDetails={newArticleResponse?.translationDetails || {}}
        categoryList={categoryTree}
        filesList={filesResponse?.filesList || []}
        allFiles={filesResponse?.allFilesData || []}
        paginationDetails={filesResponse?.paginationData || {}}
        updateFnc={updatePerticularNewsArticle}
        selectedBannerFileId={
          newArticleResponse.newsArticleData.bannerImage !== null
            ? newArticleResponse.newsArticleData?.bannerImage?._id
            : ""
        }
        selectedBannerFileName={
          newArticleResponse.newsArticleData?.bannerImage?.fileName || ""
        }
        selectedMetaFileId={
          newArticleResponse.newsArticleData.metaImage !== null
            ? newArticleResponse.newsArticleData?.metaImage?._id
            : ""
        }
        selectedMetaFileName={
          newArticleResponse.newsArticleData.metaImage !== null
            ? newArticleResponse.newsArticleData?.metaImage?.fileName
            : ""
        }
        searchValue={searchName}
        selectedFileType={selectedFileType}
        adminRole={adminRole}
        permissionsList={permissionsList || []}
      />
    </div>
  );
};

export default UpdateNewsArticlePage;
