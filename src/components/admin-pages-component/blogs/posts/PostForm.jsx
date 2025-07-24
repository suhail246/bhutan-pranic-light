"use client";

import { useTheme } from "next-themes";

import { globalStyleObj } from "@/app/assets/styles";
import {
  LanguageTabs,
  PageRefresh,
  PostFormDetails,
  TranslationForm,
} from "@/components";
import { useErrorToast, useGenerateSlug, useSuccessToast } from "@/lib/hooks";
import { AllBlogsSchema } from "@/schemas";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { usePageRefresh } from "@/utils/refreshPage";
import { getTranslationDetails } from "@/utils/translation-helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const BlogPostForm = ({
  userId,
  languages = [],
  postDetails = {},
  translationDetails = {},
  categoryList,
  filesList,
  allFiles,
  paginationDetails,
  createFnc = () => {},
  updateFnc = () => {},
  selectedBannerFileId,
  selectedBannerFileName,
  selectedMetaFileId,
  selectedMetaFileName,
  searchValue,
  selectedFileType,
  adminRole,
  permissionsList,
}) => {
  const [activeTab, setActiveTab] = useState("en");
  const { isPending, pageRefresh } = usePageRefresh();
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const { theme } = useTheme();
  const { bgColor, hoverBgColor, textColor, hexCode } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );
  const isPostDetailsExist = Object.keys(postDetails).length > 0;
  const activeLanguages = languages.filter((lang) => lang.status);

  // Handle React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
    setError,
    setValue,
  } = useForm({
    resolver: zodResolver(AllBlogsSchema),
    defaultValues: {
      title: getTranslationDetails(translationDetails, "en")?.title || "",
      slug: postDetails?.slug || "",
      category: postDetails?.category || "",
      bannerImage:
        postDetails?.bannerImage !== null ? postDetails?.bannerImage?._id : "",
      shortDescription:
        getTranslationDetails(translationDetails, "en")?.shortDescription || "",
      description:
        getTranslationDetails(translationDetails, "en")?.description || "",
      tags: getTranslationDetails(translationDetails, "en")?.tags ?? [],
      source: postDetails?.source || "",
      metaTitle: postDetails?.metaTitle || "",
      metaImage:
        postDetails?.metaImage !== null
          ? (postDetails?.metaImage?._id ?? null)
          : null,
      metaDescription: postDetails?.metaDescription || "",
    },
  });
  const watchedTitle = watch("title");
  const watchedTags = watch("tags");

  // Relevant fields for comparison with the postDetails object (For Update Post)
  const relevantFields = {
    title: getTranslationDetails(translationDetails, "en")?.title || "",
    slug: postDetails?.slug || "",
    category: postDetails?.category || "",
    bannerImage:
      postDetails?.bannerImage !== null ? postDetails?.bannerImage?._id : "",
    shortDescription:
      getTranslationDetails(translationDetails, "en")?.shortDescription || "",
    description:
      getTranslationDetails(translationDetails, "en")?.description || "",
    tags: getTranslationDetails(translationDetails, "en")?.tags || [],
    source: postDetails?.source || "",
    metaTitle: postDetails?.metaTitle || "",
    metaImage:
      postDetails?.metaImage !== null
        ? (postDetails?.metaImage?._id ?? null)
        : null,
    metaDescription: postDetails?.metaDescription || "",
  };
  const hasChanges = !isEqual(relevantFields, watch());

  // Handle Slug value according to the title (only if the post is new)
  useEffect(() => {
    const generateSlugWithPostTitle = () => {
      if (watchedTitle && watchedTitle.length > 0) {
        setError("slug", "");
        const generatedSlug = useGenerateSlug(watchedTitle);
        setValue("slug", generatedSlug);
      } else {
        setValue("slug", "");
      }
    };

    if (!isPostDetailsExist) {
      generateSlugWithPostTitle();
    }
  }, [watchedTitle, setValue, isPostDetailsExist]);

  // Watched tag value change for add new, delete functionality
  const addTag = useCallback(
    (tag) => {
      setError("tags", null);
      if (watchedTags.length <= 20) {
        if (tag.length <= 20) {
          setValue("tags", [...watchedTags, tag]);
        } else {
          setError("tags", {
            message: "Each tag must not exceed 20 characters.",
          });
        }
      } else {
        setError("tags", { message: "A maximum of 20 tags are allowed." });
      }
    },
    [watchedTags, setError, setValue]
  );
  const removeTag = useCallback(
    (index) => {
      setValue(
        "tags",
        watchedTags.filter((_, i) => i !== index)
      );
    },
    [setValue, watchedTags]
  );

  // Handle Banner Image
  const onChangeBannerImage = useCallback(
    (id) => {
      setValue("bannerImage", id);
    },
    [setValue]
  );

  // Handle Meta Image
  const onChangeMetaImage = useCallback(
    (id) => {
      setValue("metaImage", id);
    },
    [setValue]
  );

  // Handle Validation Errors
  const handleValidationErrors = useCallback(
    (errors) => {
      Object.keys(errors).forEach((field) => {
        setError(field, {
          type: "server",
          message: errors[field].message,
        });
      });
    },
    [setError]
  );

  // Handle Form Submit Functionality
  const onSubmit = async (data) => {
    // For Create New Blog
    if (!isPostDetailsExist) {
      const response = await createFnc(data, userId);

      if (response.success) {
        useSuccessToast(response?.message || "Post created successfully.");
        reset();
      } else {
        if (response.errors) {
          handleValidationErrors(response.errors);
        } else {
          useErrorToast(response?.message || "Something went wrong.");
        }
      }
    }

    // For Update Blog
    else {
      const updatePostResponse = await updateFnc(
        userId,
        postDetails?.slug || "",
        postDetails._id,
        data
      );

      if (updatePostResponse.success) {
        useSuccessToast(
          updatePostResponse?.message || "Post updated successfully."
        );
        pageRefresh();
      } else {
        if (updatePostResponse.errors) {
          handleValidationErrors(updatePostResponse.errors);
        } else {
          useErrorToast(updatePostResponse?.message || "Something went wrong.");
        }
      }
    }
  };

  // Handle Translation Form Submit
  const handleTranslationSubmit = async (translateData) => {
    const data = {
      ...watch(),
      translateData: { ...translateData, lang: activeTab },
    };

    await onSubmit(data);
  };

  // Handle Refresh Page Loading when update API runs
  if (isPending) {
    return <PageRefresh />;
  }

  return (
    <div
      className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] rounded-sm shadow-light overflow-hidden`}
    >
      {isPostDetailsExist && activeLanguages.length > 1 && (
        <LanguageTabs
          languages={activeLanguages}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
        />
      )}

      {activeTab === "en" ? (
        <PostFormDetails
          // User & Role
          userId={userId}
          adminRole={adminRole}
          permissionsList={permissionsList}
          // Post Details & Form State
          isPostDetailsExist={isPostDetailsExist}
          isSubmitting={isSubmitting}
          hasChanges={hasChanges}
          submitFunction={handleSubmit(onSubmit)}
          control={control}
          errors={errors}
          // Category & File Management
          categoryList={categoryList}
          filesList={filesList}
          allFiles={allFiles}
          selectedFileType={selectedFileType}
          selectedBannerFileId={selectedBannerFileId}
          selectedBannerFileName={selectedBannerFileName}
          selectedMetaFileId={selectedMetaFileId}
          selectedMetaFileName={selectedMetaFileName}
          onChangeBannerImage={onChangeBannerImage}
          onChangeMetaImage={onChangeMetaImage}
          // Pagination & Search
          paginationDetails={paginationDetails}
          searchValue={searchValue}
          // Form Filed Controls
          watchDescription={watch("description")}
          setValue={setValue}
          watchedTags={watchedTags}
          addTag={addTag}
          removeTag={removeTag}
          // UI & Theme
          theme={theme}
          colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
        />
      ) : (
        <TranslationForm
          fields={[
            {
              name: "title",
              lableName: "Title",
              value:
                getTranslationDetails(translationDetails, activeTab)?.title ||
                "",
              placeholderText: "Enter Blog Title",
              fieldId: `translate-${activeTab}-update-blog-title`,
            },
            {
              name: "shortDescription",
              lableName: "Short Description",
              value:
                getTranslationDetails(translationDetails, activeTab)
                  ?.shortDescription || "",
              fieldId: `translate-${activeTab}-update-blog-shortDescription`,
              isAreaInputType: true,
            },
            {
              name: "description",
              lableName: "Description",
              value:
                getTranslationDetails(translationDetails, activeTab)
                  ?.description || "",
              fieldId: `translate-${activeTab}-update-blog-description`,
              isTextEditorType: true,
            },
            {
              name: "tags",
              lableName: "Tags",
              value:
                getTranslationDetails(translationDetails, activeTab)?.tags ||
                [],
              placeholderText: "Tag",
              fieldId: `translate-${activeTab}-update-blog-tags`,
              isRepeatableType: true,
            },
          ]}
          isSubmitting={isSubmitting}
          colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
          handleTranslationSubmit={handleTranslationSubmit}
          theme={theme}
        />
      )}
    </div>
  );
};

export default BlogPostForm;
