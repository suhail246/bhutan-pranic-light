"use client";

import { globalStyleObj } from "@/app/assets/styles";
import {
  LanguageTabs,
  PageRefresh,
  TestimonialFormDetails,
  TranslationForm,
} from "@/components";
import { useErrorToast, useSuccessToast } from "@/lib/hooks";
import { TestimonialSchema } from "@/schemas";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { usePageRefresh } from "@/utils/refreshPage";
import { getTranslationDetails } from "@/utils/translation-helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { useTheme } from "next-themes";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const TestimonialForm = ({
  userId,
  languages = [],
  testimonialDetails = {},
  translationDetails = {},
  filesList,
  allFiles,
  paginationDetails,
  createFnc = () => {},
  updateFnc = () => {},
  selectedImageFileId,
  selectedImageFileName,
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
  const isTestimonialDetailsExist = Object.keys(testimonialDetails).length > 0;
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
    resolver: zodResolver(TestimonialSchema),
    defaultValues: {
      name: getTranslationDetails(translationDetails, "en")?.name || "",
      designation:
        getTranslationDetails(translationDetails, "en")?.designation || "",
      message: getTranslationDetails(translationDetails, "en")?.message || "",
      orderNumber: testimonialDetails?.orderNumber || "",
      rating: testimonialDetails?.rating || "",
      image:
        testimonialDetails?.image !== null
          ? (testimonialDetails?.image?._id ?? null)
          : null,
    },
  });

  // Relevant fields for comparison with the testimonialDetails object (For Update Testimonial)
  const relevantFields = {
    name: getTranslationDetails(translationDetails, "en")?.name || "",
    designation:
      getTranslationDetails(translationDetails, "en")?.designation || "",
    message: getTranslationDetails(translationDetails, "en")?.message || "",
    orderNumber: testimonialDetails?.orderNumber || "",
    rating: testimonialDetails?.rating || "",
    image:
      testimonialDetails?.image !== null
        ? (testimonialDetails?.image?._id ?? null)
        : null,
  };
  const hasChanges = !isEqual(relevantFields, watch());

  // Handle Image Change
  const onChangeImage = useCallback(
    (id) => {
      setValue("image", id);
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
    // For Create New Testimonial
    if (!isTestimonialDetailsExist) {
      const response = await createFnc(data, userId);

      if (response.success) {
        useSuccessToast(
          response?.message || "Testimonial created successfully."
        );
        reset();
      } else {
        if (response.errors) {
          handleValidationErrors(response.errors);
        } else {
          useErrorToast(response?.message || "Something went wrong.");
        }
      }
    }

    // For Update Testimonial
    else {
      const updateResponse = await updateFnc(
        userId,
        testimonialDetails._id,
        data
      );

      if (updateResponse.success) {
        useSuccessToast(
          updateResponse?.message || "Testimonial updated successfully."
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
      {isTestimonialDetailsExist && activeLanguages.length > 1 && (
        <LanguageTabs
          languages={activeLanguages}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
        />
      )}

      {activeTab === "en" ? (
        <TestimonialFormDetails
          // User & Role
          userId={userId}
          adminRole={adminRole}
          permissionsList={permissionsList}
          // Post Details & Form State
          isTestimonialDetailsExist={isTestimonialDetailsExist}
          isSubmitting={isSubmitting}
          hasChanges={hasChanges}
          submitFunction={handleSubmit(onSubmit)}
          control={control}
          errors={errors}
          // File Management
          filesList={filesList}
          allFiles={allFiles}
          selectedFileType={selectedFileType}
          selectedImageFileId={selectedImageFileId}
          selectedImageFileName={selectedImageFileName}
          onChangeImage={onChangeImage}
          // Pagination & Search
          paginationDetails={paginationDetails}
          searchValue={searchValue}
          // Form Filed Controls
          watchMessage={watch("message")}
          setValue={setValue}
          // UI & Theme
          theme={theme}
          colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
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
              placeholderText: "Name",
              fieldId: `translate-${activeTab}-update-testimonial-name`,
            },
            {
              name: "designation",
              lableName: "Designation",
              value:
                getTranslationDetails(translationDetails, activeTab)
                  ?.designation || "",
              fieldId: `translate-${activeTab}-update-testimonial-designation`,
            },
            {
              name: "message",
              lableName: "Message",
              value:
                getTranslationDetails(translationDetails, activeTab)?.message ||
                "",
              fieldId: `translate-${activeTab}-update-testimonial-message`,
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

export default TestimonialForm;
