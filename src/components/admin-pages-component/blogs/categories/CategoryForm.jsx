"use client";

import { globalStyleObj } from "@/app/assets/styles";
import {
  CategoryFormDetails,
  LanguageTabs,
  PageRefresh,
  TranslationForm,
} from "@/components";
import { useAppSelector } from "@/store/hooks";
import { useForm } from "react-hook-form";

import { useErrorToast, useGenerateSlug, useSuccessToast } from "@/lib/hooks";
import { CategorySchema } from "@/schemas";
import { getCustomTheme } from "@/utils/colors";
import { usePageRefresh } from "@/utils/refreshPage";
import { getTranslationDetails } from "@/utils/translation-helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";

const CategoryForm = ({
  userId,
  languages = [],
  categoryDetails = {},
  translationDetails = {},
  categoryList,
  createCategoryFnc = () => {},
  updateCategoryFnc = () => {},
  filesList,
  allFiles,
  paginationDetails,
  selectedMetaFileId,
  selectedMetaFileName,
  searchValue,
  selectedFileType,
  adminRole,
  permissionsList,
}) => {
  const [activeTab, setActiveTab] = useState("en");
  const { isPending, pageRefresh } = usePageRefresh();
  // Custom Colors
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const { bgColor, hoverBgColor, textColor, hexCode } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );
  const isCategoryDetailsExist = Object.keys(categoryDetails).length > 0;
  const activeLanguages = languages.filter((lang) => lang.status);

  // React Hook Form Instance
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
    setError,
    setValue,
  } = useForm({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: getTranslationDetails(translationDetails, "en")?.name || "",
      slug: categoryDetails?.slug || "",
      description:
        getTranslationDetails(translationDetails, "en")?.description || "",
      parentCategoryId: categoryDetails?.parentCategoryId || "none",
      metaTitle: categoryDetails?.metaTitle || "",
      metaImage:
        categoryDetails?.metaImage !== null
          ? (categoryDetails?.metaImage?._id ?? null)
          : null,
      metaDescription: categoryDetails?.metaDescription || "",
    },
  });
  const watchedName = watch("name");

  // Relevant fields for comparison with categoryDetails (For Update Category)
  const relevantFields = {
    name: getTranslationDetails(translationDetails, "en")?.name || "",
    slug: categoryDetails?.slug || "",
    description:
      getTranslationDetails(translationDetails, "en")?.description || "",
    parentCategoryId: categoryDetails?.parentCategoryId || "none",
    metaTitle: categoryDetails?.metaTitle || "",
    metaImage:
      categoryDetails?.metaImage !== null
        ? (categoryDetails?.metaImage?._id ?? null)
        : null,
    metaDescription: categoryDetails?.metaDescription || "",
  };
  const hasChanges = !isEqual(relevantFields, watch());

  // Handle Slug value according to the category name
  useEffect(() => {
    const generateSlugWithCategoryName = () => {
      if (watchedName && watchedName.length > 0) {
        setError("slug", "");
        const generatedSlug = useGenerateSlug(watchedName);
        setValue("slug", generatedSlug);
      } else {
        setValue("slug", "");
      }
    };

    if (!isCategoryDetailsExist) {
      generateSlugWithCategoryName();
    }
  }, [watchedName, setValue]);

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

  // Handle Create New Category functionality
  const onSubmit = async (data) => {
    if (!isCategoryDetailsExist) {
      const createNewCategoryResponse = await createCategoryFnc(data, userId);

      if (createNewCategoryResponse.success) {
        useSuccessToast(createNewCategoryResponse.message);
        reset();
      } else {
        if (createNewCategoryResponse.errors) {
          handleValidationErrors(createNewCategoryResponse.errors);
        } else {
          useErrorToast(createNewCategoryResponse.message);
        }
      }
    } else {
      const updateCategoryResponse = await updateCategoryFnc(
        userId,
        categoryDetails._id,
        data
      );

      if (updateCategoryResponse.success) {
        useSuccessToast(updateCategoryResponse.message);
        pageRefresh();
      } else {
        if (updateCategoryResponse.errors) {
          handleValidationErrors(updateCategoryResponse.errors);
        } else {
          useErrorToast(updateCategoryResponse.message);
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
      {isCategoryDetailsExist && activeLanguages.length > 1 && (
        <LanguageTabs
          languages={activeLanguages}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
        />
      )}

      {activeTab === "en" ? (
        <CategoryFormDetails
          // User & Role
          userId={userId}
          adminRole={adminRole}
          permissionsList={permissionsList}
          // Category Details & Form State
          isCategoryDetailsExist={isCategoryDetailsExist}
          isSubmitting={isSubmitting}
          hasChanges={hasChanges}
          submitFunction={handleSubmit(onSubmit)}
          control={control}
          errors={errors}
          // File Management
          filesList={filesList}
          allFiles={allFiles}
          categoryList={categoryList}
          paginationDetails={paginationDetails}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          selectedMetaFileId={selectedMetaFileId}
          selectedMetaFileName={selectedMetaFileName}
          onChangeMetaImage={onChangeMetaImage}
          colorGrade={{
            bgColor,
            hoverBgColor,
            textColor,
            hexCode,
          }}
        />
      ) : (
        <TranslationForm
          fields={[
            {
              name: "name",
              lableName: "Name",
              value:
                getTranslationDetails(translationDetails, activeTab)?.name ||
                "",
              placeholderText: "Enter Category Name",
              fieldId: `translate-${activeTab}-update-category-name`,
            },
            {
              name: "description",
              lableName: "Description",
              value:
                getTranslationDetails(translationDetails, activeTab)
                  ?.description || "",
              fieldId: `translate-${activeTab}-update-category-description`,
              isAreaInputType: true,
            },
          ]}
          isSubmitting={isSubmitting}
          colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
          handleTranslationSubmit={handleTranslationSubmit}
        />
      )}
    </div>
  );
};

export default CategoryForm;
