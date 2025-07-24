"use client";

import { globalStyleObj } from "@/app/assets/styles";
import {
  CareerFormDetails,
  LanguageTabs,
  PageRefresh,
  TranslationForm,
} from "@/components";
import { useErrorToast, useSuccessToast } from "@/lib/hooks";
import { CareerSchema } from "@/schemas";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { usePageRefresh } from "@/utils/refreshPage";
import { getTranslationDetails } from "@/utils/translation-helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { useTheme } from "next-themes";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const CareerForm = ({
  userId,
  languages = [],
  careerDetails = {},
  translationDetails = {},
  filesList,
  allFiles,
  paginationDetails,
  createFnc = () => {},
  updateFnc = () => {},
  selectedImageFileId,
  selectedImageFileName,
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
  const isCareerDetailsExist = Object.keys(careerDetails).length > 0;
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
    resolver: zodResolver(CareerSchema),
    defaultValues: {
      jobName: getTranslationDetails(translationDetails, "en")?.jobName || "",
      jobDescripton:
        getTranslationDetails(translationDetails, "en")?.jobDescripton || "",
      jobVacancies: careerDetails?.jobVacancies || "",
      orderNumber: careerDetails?.orderNumber || "",
      applyLink: careerDetails?.applyLink || "",
      image:
        careerDetails?.image !== null
          ? (careerDetails?.image?._id ?? null)
          : null,
      metaTitle: careerDetails?.metaTitle || "",
      metaImage:
        careerDetails?.metaImage !== null
          ? (careerDetails?.metaImage?._id ?? null)
          : null,
      metaKeywords: careerDetails?.metaKeywords || "",
      metaDescription: careerDetails?.metaDescription || "",
    },
  });

  // Relevant fields for comparison with the careerDetails object (For Update Career)
  const relevantFields = {
    jobName: getTranslationDetails(translationDetails, "en")?.jobName || "",
    jobDescripton:
      getTranslationDetails(translationDetails, "en")?.jobDescripton || "",
    jobVacancies: careerDetails?.jobVacancies || "",
    orderNumber: careerDetails?.orderNumber || "",
    applyLink: careerDetails?.applyLink || "",
    image:
      careerDetails?.image !== null
        ? (careerDetails?.image?._id ?? null)
        : null,
    metaTitle: careerDetails?.metaTitle || "",
    metaImage:
      careerDetails?.metaImage !== null
        ? (careerDetails?.metaImage?._id ?? null)
        : null,
    metaKeywords: careerDetails?.metaKeywords || "",
    metaDescription: careerDetails?.metaDescription || "",
  };
  const hasChanges = !isEqual(relevantFields, watch());

  // Handle Image Change
  const onChangeImage = useCallback(
    (id) => {
      setValue("image", id);
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
    // For Create New Career
    if (!isCareerDetailsExist) {
      const response = await createFnc(data, userId);

      if (response.success) {
        useSuccessToast(response?.message || "Career created successfully.");
        reset();
      } else {
        if (response.errors) {
          handleValidationErrors(response.errors);
        } else {
          useErrorToast(response?.message || "Something went wrong.");
        }
      }
    }

    // For Update Career
    else {
      const updateResponse = await updateFnc(userId, careerDetails._id, data);

      if (updateResponse.success) {
        useSuccessToast(
          updateResponse?.message || "Career updated successfully."
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
      {isCareerDetailsExist && activeLanguages.length > 1 && (
        <LanguageTabs
          languages={activeLanguages}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
        />
      )}

      {activeTab === "en" ? (
        <CareerFormDetails
          // User & Role
          userId={userId}
          adminRole={adminRole}
          permissionsList={permissionsList}
          // Career Details & Form State
          isCareerDetailsExist={isCareerDetailsExist}
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
          selectedMetaFileId={selectedMetaFileId}
          selectedMetaFileName={selectedMetaFileName}
          onChangeImage={onChangeImage}
          onChangeMetaImage={onChangeMetaImage}
          // Pagination & Search
          paginationDetails={paginationDetails}
          searchValue={searchValue}
          // Form Filed Controls
          watchJobDescription={watch("jobDescripton")}
          setValue={setValue}
          // UI & Theme
          theme={theme}
          colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
        />
      ) : (
        <TranslationForm
          fields={[
            {
              name: "jobName",
              lableName: "Name",
              value:
                getTranslationDetails(translationDetails, activeTab)?.jobName ||
                "",
              placeholderText: "Vacancy Name",
              fieldId: `translate-${activeTab}-update-career-name`,
            },
            {
              name: "jobDescripton",
              lableName: "Description",
              value:
                getTranslationDetails(translationDetails, activeTab)
                  ?.jobDescripton || "",
              fieldId: `translate-${activeTab}-update-career-description`,
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

export default CareerForm;
