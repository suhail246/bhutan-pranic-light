"use client";

import { globalStyleObj } from "@/app/assets/styles";
import {
  CMSPageFormDetails,
  LanguageTabs,
  PageRefresh,
  TranslationForm,
} from "@/components";
import { useErrorToast, useGenerateSlug, useSuccessToast } from "@/lib/hooks";
import { PageCMSValidationSchema } from "@/schemas";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { usePageRefresh } from "@/utils/refreshPage";
import { getTranslationDetails } from "@/utils/translation-helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const CMSPageForm = ({
  userId,
  languages = [],
  pageDetails = {},
  translationDetails = {},
  filesList,
  allFiles,
  paginationDetails,
  createFnc = () => {},
  updateFnc = () => {},
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
  const isPageDetailsExist = Object.keys(pageDetails).length > 0;
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
    resolver: zodResolver(PageCMSValidationSchema),
    defaultValues: {
      pageName: getTranslationDetails(translationDetails, "en")?.pageName || "",
      slug: pageDetails?.slug || "",
      description:
        getTranslationDetails(translationDetails, "en")?.description || "",
      metaTitle: pageDetails?.metaTitle || "",
      metaImage:
        pageDetails?.metaImage !== null
          ? (pageDetails?.metaImage?._id ?? null)
          : null,
      metaKeywords: pageDetails?.metaKeywords || "",
      metaDescription: pageDetails?.metaDescription || "",
    },
  });
  const watchedPageName = watch("pageName");

  // Relevant fields for comparison with the postDetails object (For Update Post)
  const relevantFields = {
    pageName: getTranslationDetails(translationDetails, "en")?.pageName || "",
    slug: pageDetails?.slug || "",
    description:
      getTranslationDetails(translationDetails, "en")?.description || "",
    metaTitle: pageDetails?.metaTitle || "",
    metaImage:
      pageDetails?.metaImage !== null
        ? (pageDetails?.metaImage?._id ?? null)
        : null,
    metaKeywords: pageDetails?.metaKeywords || "",
    metaDescription: pageDetails?.metaDescription || "",
  };
  const hasChanges = !isEqual(relevantFields, watch());

  // Handle Slug value according to the title (only if the post is new)
  useEffect(() => {
    const generateSlugWithPageName = () => {
      if (watchedPageName && watchedPageName.length > 0) {
        setError("slug", "");
        const generatedSlug = useGenerateSlug(watchedPageName);
        setValue("slug", generatedSlug);
      } else {
        setValue("slug", "");
      }
    };

    if (!isPageDetailsExist) {
      generateSlugWithPageName();
    }
  }, [watchedPageName, setValue, isPageDetailsExist]);

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
    // For Create
    if (!isPageDetailsExist) {
      const response = await createFnc(data, userId);

      if (response.success) {
        useSuccessToast(response?.message || "Page created successfully.");
        reset();
      } else {
        if (response.errors) {
          handleValidationErrors(response.errors);
        } else {
          useErrorToast(response?.message || "Something went wrong.");
        }
      }
    }

    // For Update
    else {
      const updateResponse = await updateFnc(
        userId,
        pageDetails?.linkId || "",
        activeTab,
        data
      );

      if (updateResponse.success) {
        useSuccessToast(
          updateResponse?.message || "Page updated successfully."
        );
        pageRefresh();
      } else {
        if (updateResponse.errors) {
          handleValidationErrors(updateResponse.errors);
        } else {
          useErrorToast(updateResponse?.message || "Something went wrong.");
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
      {isPageDetailsExist && activeLanguages.length > 1 && (
        <LanguageTabs
          languages={activeLanguages}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
        />
      )}

      {activeTab === "en" ? (
        <CMSPageFormDetails
          // User & Role
          userId={userId}
          adminRole={adminRole}
          permissionsList={permissionsList}
          // Page Details & Form State
          isPageDetailsExist={isPageDetailsExist}
          isSubmitting={isSubmitting}
          hasChanges={hasChanges}
          submitFunction={handleSubmit(onSubmit)}
          control={control}
          errors={errors}
          // File Management
          filesList={filesList}
          allFiles={allFiles}
          selectedFileType={selectedFileType}
          selectedMetaFileId={selectedMetaFileId}
          selectedMetaFileName={selectedMetaFileName}
          onChangeMetaImage={onChangeMetaImage}
          // Pagination & Search
          paginationDetails={paginationDetails}
          searchValue={searchValue}
          // Form Filed Controls
          watchDescription={watch("description")}
          setValue={setValue}
          // UI & Theme
          theme={theme}
          colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
        />
      ) : (
        <TranslationForm
          fields={[
            {
              name: "pageName",
              lableName: "Page Name",
              value:
                getTranslationDetails(translationDetails, activeTab)
                  ?.pageName || "",
              placeholderText: "Page Name",
              fieldId: `translate-${activeTab}-update-cms-page-name`,
            },
            {
              name: "description",
              lableName: "Description",
              value:
                getTranslationDetails(translationDetails, activeTab)
                  ?.description || "",
              fieldId: `translate-${activeTab}-update-cms-page-description`,
              isTextEditorType: true,
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

export default CMSPageForm;
