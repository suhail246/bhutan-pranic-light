"use client";

import { globalStyleObj } from "@/app/assets/styles";
import {
  CourseCategoryConditionFormSection,
  CourseFAQsFormSection,
  CourseGalaryFormSection,
  CourseInfoFormSection,
  CourseMetaFormSection,
  CourseOptionsFormSection,
  CoursePackagesFormSection,
  CourseRegistrationFormSection,
  CourseTrainingFormSection,
  LanguageTabSwitcher,
  PageRefresh,
  SubmitButton,
} from "@/components";
import { useErrorToast, useGenerateSlug, useSuccessToast } from "@/lib/hooks";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { usePageRefresh } from "@/utils/refreshPage";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { MdModelTraining } from "react-icons/md";

const CourseForm = ({
  formType = "CREATE_FORM",
  userId,
  languages = [],
  activeLanguageTab = "",
  courseSlug = "",
  filesList,
  allFiles,
  paginationDetails,
  courseDetails = {},
  createFnc = () => {},
  updateFnc = () => {},
  searchValue,
  selectedFileType,
  adminRole,
  permissionsList,
}) => {
  const { isPending, pageRefresh } = usePageRefresh();
  const searchParams = useSearchParams();
  const activeSection = searchParams.get("tab");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
    setError,
    setValue,
  } = useForm({
    defaultValues: courseDetails,
  });
  // Watch Form Data
  const formData = watch();
  const watchedTitle = watch("title") || "";

  const isCourseDetailsExist = Object.keys(courseDetails).length > 0;
  const isHideInOtherLanguages = useMemo(() => {
    return formType === "CREATE_FORM" ? true : activeLanguageTab === "en";
  }, [activeLanguageTab]);

  // Get Layout Theme Color
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const { bgColor, hoverBgColor, textColor, hexCode } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  // Reset the form state when courseDetails changes
  useEffect(() => {
    if (Object.keys(courseDetails).length > 0 && formType === "UPDATE_FORM") {
      reset(courseDetails);
    }
  }, [courseDetails, reset]);

  // Handle Auto Generated slug value based on the course title name
  useEffect(() => {
    const generateSlugWithTitle = () => {
      if (watchedTitle && watchedTitle.length > 0) {
        setError("slug", "");
        const generatedSlug = useGenerateSlug(watchedTitle);
        setValue("slug", generatedSlug);
      } else {
        setValue("slug", "");
      }
    };

    if (formType === "CREATE_FORM") {
      generateSlugWithTitle();
    }
  }, [watchedTitle]);

  // Handle On Change Text Editor Functionality
  const handleOnChangeTextEditor = useCallback(
    (value, keyName) => {
      if (value) {
        setValue(keyName, value);
      } else {
        setValue(keyName, "");
      }
    },
    [setValue]
  );

  // Handle On Change File Functionality
  const handleOnChangeFile = useCallback(
    (keyName, value) => {
      if (value) {
        setValue(keyName, value);
      } else {
        setValue(keyName, "");
      }
    },
    [setValue]
  );

  // Handle Add Repeatable Field Functionality
  const handleAddRepeatableField = useCallback(
    (keyName, labelNames = []) => {
      const watchedField = watch(keyName) || {}; // Get existing values or an empty object

      // Loop through labelNameList and add values dynamically
      const updatedField = labelNames.reduce((acc, key) => {
        acc[key] = [...(watchedField[key] || []), ""];

        return acc;
      }, {});

      setValue(keyName, {
        ...watchedField,
        ...updatedField,
      });
    },
    [setValue, watch]
  );

  // Handle On Change Repeatable Fields
  const handleOnChangeRepeatableFields = useCallback(
    (keyName, labelName, value, index) => {
      const watchedField = watch(keyName) || {}; // Get existing data

      // Ensure the field exists and is an array
      const updatedField = {
        ...watchedField,
        [labelName]: watchedField[labelName].map((item, i) =>
          i === index ? value : item
        ),
      };

      setValue(keyName, updatedField);
    },
    [setValue, watch]
  );

  // Handle Remove Repeatable Field Functionality
  const handleRemoveRepeatableField = useCallback(
    (keyName, labelNames = [], index) => {
      const watchedField = watch(keyName) || {}; // Get existing values or an empty object

      // Loop through labelNameList and remove the item at the given index
      const updatedField = labelNames.reduce((acc, key) => {
        acc[key] = watchedField[key]?.filter((_, i) => i !== index) || [];

        return acc;
      }, {});

      setValue(keyName, {
        ...watchedField,
        ...updatedField,
      });
    },
    [setValue, watch]
  );

  // Handle On Change Package Categories Switch Fields
  const handleOnChangePackageCategoriesSwitchField = useCallback(
    (keyName, status) => {
      setValue(keyName, status); // Update the switch field

      if (status) {
        setValue("packageCategories", ["", ""]); // Default values when enabled
      } else {
        setValue("packageCategories", []); // Empty array when disabled
      }
    },
    [setValue]
  );

  // Handle On Change Package Categories
  const handleOnChangePackagesCategories = useCallback(
    (index, value) => {
      const watchedField = watch("packageCategories") || [];

      // Create a new array with the updated value at the specified index
      const updatedField = [...watchedField];
      updatedField[index] = value;

      // Update the state with the modified array
      setValue("packageCategories", updatedField);
    },
    [setValue, watch]
  );

  // Handle Form Submit Functionality
  const onSubmit = async (data) => {
    if (
      !watch("title") ||
      !watch("subTitle") ||
      !watch("slug") ||
      !watch("orderNumber")
    ) {
      useErrorToast("Please fill all the required fields.");
      return;
    }

    if (formType === "CREATE_FORM") {
      const response = await createFnc(data, userId);

      if (response.success) {
        useSuccessToast(response?.message || "Course created successfully.");
        reset();
      } else {
        useErrorToast(response?.message || "Something went wrong");
      }
    }

    if (formType === "UPDATE_FORM") {
      const response = await updateFnc(
        userId,
        courseSlug,
        data,
        activeLanguageTab
      );

      if (response.success) {
        useSuccessToast(response?.message || "Course updated successfully.");
        pageRefresh();
      } else {
        useErrorToast(response?.message || "Something went wrong");
      }
    }
  };

  return (
    <div
      className={`${globalStyleObj.backgroundLight900Dark300} w-full rounded-sm shadow-light overflow-hidden`}
    >
      {/* Langugage Tab Switcher */}
      {isCourseDetailsExist && (
        <LanguageTabSwitcher
          languages={languages}
          colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
        />
      )}

      {isPending ? (
        <PageRefresh />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={`p-3 sm:p-5`}>
          {/* Course Info Section (title, subTitle, slug, orderNumber, shortDescription, description, image, buttonLabel */}
          {activeSection === "section-1" && (
            <CourseInfoFormSection
              control={control}
              errors={errors}
              formData={formData}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              handleOnChangeTextEditor={handleOnChangeTextEditor}
              handleOnChangeFile={handleOnChangeFile}
              adminRole={adminRole}
              permissionsList={permissionsList}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              isCourseDetailsExist={isCourseDetailsExist}
              isHideInOtherLanguages={isHideInOtherLanguages}
            />
          )}

          {/* Course Options Section (optionsTitle, optionsHeading, optionsSubHeading, optionsCards(Repeatable [icon, title, description]) */}
          {activeSection === "section-2" && (
            <CourseOptionsFormSection
              control={control}
              errors={errors}
              formData={formData}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              handleAddRepeatableField={handleAddRepeatableField}
              handleOnChangeRepeatableFields={handleOnChangeRepeatableFields}
              handleRemoveRepeatableField={handleRemoveRepeatableField}
              adminRole={adminRole}
              permissionsList={permissionsList}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              isCourseDetailsExist={isCourseDetailsExist}
              isHideInOtherLanguages={isHideInOtherLanguages}
            />
          )}

          {/* Course Packages Section (packagesTitle, packagesHeading, packagesSubHeading, packageCategoriesSwitch, packageCategories */}
          {activeSection === "section-3" && (
            <CoursePackagesFormSection
              control={control}
              errors={errors}
              formData={formData}
              handleOnChangePackageCategoriesSwitchField={
                handleOnChangePackageCategoriesSwitchField
              }
              handleOnChangePackagesCategories={
                handleOnChangePackagesCategories
              }
              handleAddRepeatableField={handleAddRepeatableField}
              handleOnChangeRepeatableFields={handleOnChangeRepeatableFields}
              handleRemoveRepeatableField={handleRemoveRepeatableField}
              isCourseDetailsExist={isCourseDetailsExist}
              courseStaticId={courseDetails?.courseStaticId || ""}
            />
          )}

          {/* Course Category/Condition Section (categoryConditionTitle, categoryConditionHeading, categoryConditionDescription */}
          {activeSection === "section-4" && (
            <CourseCategoryConditionFormSection
              control={control}
              errors={errors}
              formData={formData}
              handleOnChangeTextEditor={handleOnChangeTextEditor}
              isCourseDetailsExist={isCourseDetailsExist}
            />
          )}

          {/* Course Registration Section (registrationTitle, registrationHeading, registrationCards(Repeatable) */}
          {activeSection === "section-5" && (
            <CourseRegistrationFormSection
              control={control}
              errors={errors}
              formData={formData}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              handleAddRepeatableField={handleAddRepeatableField}
              handleOnChangeRepeatableFields={handleOnChangeRepeatableFields}
              handleRemoveRepeatableField={handleRemoveRepeatableField}
              adminRole={adminRole}
              permissionsList={permissionsList}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              isCourseDetailsExist={isCourseDetailsExist}
              isHideInOtherLanguages={isHideInOtherLanguages}
            />
          )}

          {/* Course Training Section (trainingHeading, trainingDetails(Repeatable) */}
          {activeSection === "section-6" && (
            <CourseTrainingFormSection
              control={control}
              errors={errors}
              formData={formData}
              handleAddRepeatableField={handleAddRepeatableField}
              handleOnChangeRepeatableFields={handleOnChangeRepeatableFields}
              handleRemoveRepeatableField={handleRemoveRepeatableField}
              isCourseDetailsExist={isCourseDetailsExist}
            />
          )}

          {/* Course Galary Section (galaryImages(Repeatable) */}
          {isHideInOtherLanguages && activeSection === "section-7" && (
            <CourseGalaryFormSection
              control={control}
              errors={errors}
              formData={formData}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              handleAddRepeatableField={handleAddRepeatableField}
              handleOnChangeRepeatableFields={handleOnChangeRepeatableFields}
              handleRemoveRepeatableField={handleRemoveRepeatableField}
              adminRole={adminRole}
              permissionsList={permissionsList}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              isCourseDetailsExist={isCourseDetailsExist}
            />
          )}

          {/* Course FAQs Section (faqTitle, faqHeading, faqSubHeading, faqQNA(Repeatable) */}
          {activeSection === "section-8" && (
            <CourseFAQsFormSection
              control={control}
              errors={errors}
              formData={formData}
              handleAddRepeatableField={handleAddRepeatableField}
              handleOnChangeRepeatableFields={handleOnChangeRepeatableFields}
              handleRemoveRepeatableField={handleRemoveRepeatableField}
              isCourseDetailsExist={isCourseDetailsExist}
            />
          )}

          {/* Course Meta Section (metaTitle, metaImage, metaKeywords, metaDescription) */}
          {isHideInOtherLanguages && activeSection === "section-9" && (
            <CourseMetaFormSection
              control={control}
              errors={errors}
              formData={formData}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              handleOnChangeFile={handleOnChangeFile}
              adminRole={adminRole}
              permissionsList={permissionsList}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              isCourseDetailsExist={isCourseDetailsExist}
            />
          )}

          <SubmitButton
            isSubmitting={isSubmitting}
            colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
            label={
              formType === "CREATE_FORM" ? "Add New Course" : "Update Course"
            }
            icon={<MdModelTraining />}
          />
        </form>
      )}
    </div>
  );
};

export default CourseForm;
