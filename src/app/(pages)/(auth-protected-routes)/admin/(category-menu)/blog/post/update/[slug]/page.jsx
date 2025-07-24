import {
  getPerticularPost,
  updatePerticularPost,
} from "@/actions/apiClientActions/blogs/posts";
import { fetchUpdateBlogPageData } from "@/actions/pageDataActions";
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
      title: `Update Post ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
      description: "Post details not found.",
    };
  }

  // Fetch the post details using the postId and userId
  const { postData, message } = await getPerticularPost(
    userId,
    slugData,
    targetId
  );

  return {
    title: message
      ? `Update Blog Post ${process.env.NEXT_PUBLIC_META_APP_NAME}`
      : postData?.metaTitle ||
        `Blog Post Details ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
    description: message
      ? "Blog Post details not found."
      : postData?.metaDescription || "Blog Post details form page.",
  };
};

// Component for updating a blog post
const UpdateBlog = async ({ params, searchParams }) => {
  // Fetch necessary data for updating the blog post
  const {
    categoriesResponse,
    filesResponse,
    languagesResponse,
    postResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
    error,
  } = await fetchUpdateBlogPageData(
    params,
    searchParams,
    PERMISSIONS.POST.EDIT_POST
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? (
      <HandleSessionEnd /> // Handle unauthorized session
    ) : error === "Not Found" ? (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb
          currentTab="Update Post"
          mainParentTab="Blog System"
          firstChildTab="Posts"
        />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription="Post does not exists."
        />
      </div>
    ) : (
      <Error403 /> // Handle forbidden access
    );
  }

  // Handle case when post retrieval fails
  if (!postResponse.success) {
    return (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb
          currentTab="Update Post"
          mainParentTab="Blog System"
          firstChildTab="Posts"
        />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription={postResponse.message}
        />
      </div>
    );
  }

  // Create category tree structure for category selection
  const categoryTree =
    (categoriesResponse?.fetchData || []).length > 0
      ? useFormattedCategoryTree(categoriesResponse.fetchData)
      : [];

  return (
    <div className={`min-h-full`}>
      <Breadcrumb
        currentTab="Update Post"
        mainParentTab="Blog System"
        firstChildTab="Posts"
      />

      {/* Edit Post Form Component */}
      <BlogPostForm
        userId={userId}
        languages={languagesResponse?.fetchData || []}
        postDetails={postResponse?.postData || {}}
        translationDetails={postResponse?.translationDetails || {}}
        categoryList={categoryTree}
        filesList={filesResponse?.filesList || []}
        allFiles={filesResponse?.allFilesData || []}
        paginationDetails={filesResponse?.paginationData || {}}
        updateFnc={updatePerticularPost}
        selectedBannerFileId={
          postResponse.postData.bannerImage !== null
            ? postResponse.postData?.bannerImage?._id
            : ""
        }
        selectedBannerFileName={
          postResponse.postData?.bannerImage?.fileName || ""
        }
        selectedMetaFileId={
          postResponse.postData.metaImage !== null
            ? postResponse.postData?.metaImage?._id
            : ""
        }
        selectedMetaFileName={
          postResponse.postData.metaImage !== null
            ? postResponse.postData?.metaImage?.fileName
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

export default UpdateBlog;
