"use client";

import { globalStyleObj } from "@/app/assets/styles";
import {
  CoursePackageFormFields,
  LanguageTabSwitcher,
  PageRefresh,
  SubmitButton,
} from "@/components";
import { useErrorToast, useSuccessToast } from "@/lib/hooks";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { usePageRefresh } from "@/utils/refreshPage";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GoPackage } from "react-icons/go";

const CoursePackageForm = ({
  formType = "CREATE_FORM",
  userId,
  targetId = "",
  languages = [],
  activeLanguageTab = "en",
  courseSlug = "",
  coursesList = [],
  filesList,
  allFiles,
  paginationDetails,
  coursePackageDetails = {},
  createFnc = () => {},
  updateFnc = () => {},
  searchValue,
  selectedFileType,
  adminRole,
  permissionsList,
}) => {
  const { isPending, pageRefresh } = usePageRefresh();

  // States
  const [formData, setFormData] = useState(() =>
    formType === "UPDATE_FORM" ? { ...coursePackageDetails } : {}
  );
  const [packageTypes, setPackageTypes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Track previous language using useRef
  const previousLanguageRef = useRef(activeLanguageTab);
  const previousCoursePackageDetailsRef = useRef(coursePackageDetails);

  // Check details data exits or not AND hide condition in other languages
  const isCoursePackageDetailsExist = useMemo(() => {
    return Object.keys(coursePackageDetails).length > 0;
  }, [coursePackageDetails]);
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

  // Handle reset formData based on activeLanguageTab
  useEffect(() => {
    if (isCoursePackageDetailsExist && formType === "UPDATE_FORM") {
      setFormData((prev) => ({
        ...prev,
        ...coursePackageDetails,
      }));
    }
  }, [activeLanguageTab, coursePackageDetails]);

  // Handle packageCategories based on selected courseId
  useEffect(() => {
    const selectedCourseId = formData?.courseId || "";

    if (mongoose.Types.ObjectId.isValid(selectedCourseId)) {
      const selectedCourse = coursesList.find(
        (course) => course._id === selectedCourseId
      );

      const typesStatus = selectedCourse?.packageCategoriesSwitch || false;
      const types =
        selectedCourse?.packageCategories?.[activeLanguageTab] || [];

      setPackageTypes(typesStatus ? types : []);
    }
  }, [activeLanguageTab, formData?.courseId]);

  // Handle On Change Text Input Functionality
  const handleOnChangeTextInput = useCallback((event) => {
    const keyName = event.target.name;
    const value = event.target.value;

    setFormData((prev) => ({ ...prev, [keyName]: value || "" }));
  }, []);

  // Handle On Change Text Editor Functionality
  const handleOnChangeTextEditor = useCallback((value, keyName) => {
    setFormData((prev) => ({ ...prev, [keyName]: value || "" }));
  }, []);

  // Handle On Change Select Input Functionality
  const handleOnChangeSelectInput = useCallback((keyName, value) => {
    setFormData((prev) => ({ ...prev, [keyName]: value || "" }));
  }, []);

  // Handle On Change File Functionality
  const handleOnChangeFile = useCallback((keyName, value) => {
    setFormData((prev) => ({ ...prev, [keyName]: value || "" }));
  }, []);

  // Handle Add Repeatable Field Functionality
  const handleAddRepeatableField = useCallback((keyName, labelNames = []) => {
    setFormData((prev) => {
      const currentField = prev[keyName] || {}; // Get existing values or an empty object

      // Create updated field structure
      const updatedField = labelNames.reduce((acc, key) => {
        acc[key] = [...(currentField[key] || []), ""];

        return acc;
      }, {});

      return { ...prev, [keyName]: { ...currentField, ...updatedField } };
    });
  }, []);

  // Handle On Change Repeatable Fields
  const handleOnChangeRepeatableFields = useCallback(
    (keyName, labelName, value, index) => {
      setFormData((prev) => {
        const currentField = prev[keyName] || {}; // Get existing values or an empty object

        return {
          ...prev,
          [keyName]: {
            ...currentField,
            [labelName]: (currentField[labelName] || []).map((item, i) =>
              i === index ? value : item
            ),
          },
        };
      });
    },
    []
  );

  // Handle Remove Repeatable Field Functionality
  const handleRemoveRepeatableField = useCallback(
    (keyName, labelNames = [], index) => {
      setFormData((prev) => {
        const currentField = prev[keyName] || {}; // Get existing values or an empty object

        // Loop through labelNameList and remove the item at the given index
        const updatedField = labelNames.reduce((acc, key) => {
          acc[key] = (currentField[key] || []).filter((_, i) => i !== index);

          return acc;
        }, {});

        return { ...prev, [keyName]: { ...currentField, ...updatedField } };
      });
    },
    []
  );

  // Handle Form Submit Functionality
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!formData.courseId || !formData.orderNumber) {
      useErrorToast("Please fill all the required fields.");
      return;
    }

    try {
      setIsSubmitting(true);

      if (formType === "CREATE_FORM") {
        const response = await createFnc(formData, userId);
        if (response.success) {
          useSuccessToast(response?.message || "Package created successfully.");
          setFormData({});
        }
      }

      if (formType === "UPDATE_FORM") {
        const response = await updateFnc(
          userId,
          courseSlug,
          targetId,
          formData,
          activeLanguageTab
        );
        if (response.success) {
          useSuccessToast(response?.message || "Package updated successfully.");
          pageRefresh();
        }
      }
    } catch (error) {
      useErrorToast(error?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`${globalStyleObj.backgroundLight900Dark300} w-full mt-[40px] rounded-sm shadow-light overflow-hidden`}
    >
      {/* Langugage Tab Switcher */}
      {isCoursePackageDetailsExist && (
        <LanguageTabSwitcher
          languages={languages}
          colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
        />
      )}

      {isPending ? (
        <PageRefresh />
      ) : (
        <form onSubmit={onSubmit} className={`p-3 sm:p-5`}>
          {/* Form Fileds */}
          <CoursePackageFormFields
            formData={formData}
            coursePackageDetails={coursePackageDetails}
            activeLanguageTab={activeLanguageTab}
            packageTypes={packageTypes}
            itemList={coursesList}
            handleOnChangeTextInput={handleOnChangeTextInput}
            handleOnChangeTextEditor={handleOnChangeTextEditor}
            handleOnChangeSelectInput={handleOnChangeSelectInput}
            handleOnChangeFile={handleOnChangeFile}
            handleAddRepeatableField={handleAddRepeatableField}
            handleOnChangeRepeatableFields={handleOnChangeRepeatableFields}
            handleRemoveRepeatableField={handleRemoveRepeatableField}
            filesList={filesList}
            allFiles={allFiles}
            paginationDetails={paginationDetails}
            searchValue={searchValue}
            selectedFileType={selectedFileType}
            adminRole={adminRole}
            permissionsList={permissionsList}
            isCoursePackageDetailsExist={isCoursePackageDetailsExist}
            isHideInOtherLanguages={isHideInOtherLanguages}
          />

          <SubmitButton
            isSubmitting={isSubmitting}
            colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
            label={
              formType === "CREATE_FORM" ? "Add Package" : "Update Package"
            }
            icon={<GoPackage />}
          />
        </form>
      )}
    </div>
  );
};

export default CoursePackageForm;
