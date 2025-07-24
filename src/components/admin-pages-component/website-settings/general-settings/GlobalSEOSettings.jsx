"use client";

import {
  getWebSettingFiledData,
  websiteSettingsUpdate,
} from "@/actions/apiClientActions/website-settings";
import { globalStyleObj } from "@/app/assets/styles";
import {
  NormalBrowseFileInputFiled,
  NormalTextInputField,
  SettingsUpdateButton,
} from "@/components";
import { useErrorToast, useSuccessToast } from "@/lib/hooks";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { isValidJSONData } from "@/utils/website-settings-helper";
import { useCallback, useEffect, useMemo, useState } from "react";

const GlobalSEOSettings = ({
  userId,
  allFilesResponse,
  adminRole,
  permissionsList,
  searchValue,
  selectedFileType,
}) => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const { bgColor, hoverBgColor, textColor, hexCode } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  const [formData, setFormData] = useState({
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    meta_image: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const getAllSEOFieldsData = useCallback(async () => {
    setIsFetching(true);

    try {
      const response = await getWebSettingFiledData(
        userId,
        Object.keys(formData)
      );

      if (response.targetFieldsData) {
        Object.entries(response.targetFieldsData).forEach(([key, value]) => {
          setFormData((prev) => ({
            ...prev,
            [key]: isValidJSONData(value) ? JSON.parse(value) : value,
          }));
        });
      }
    } catch (error) {
      console.error("Failed to fetch SEO settings data:", error);
      useErrorToast("Failed to fetch SEO settings.");
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    if (!isSubmitting) {
      getAllSEOFieldsData();
    }
  }, [isSubmitting]);

  // Handle Text Input Field State
  const onChangeTextInputField = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Meta Image State
  const onChangeMetaImage = (id) => {
    setFormData((prev) => ({
      ...prev,
      meta_image: id,
    }));
  };

  // Handle OnSubmit Form
  const handleSEODataSubmit = async (e) => {
    e.preventDefault();

    const formatedFormData = {
      types: Object.keys(formData),
      ...formData,
    };

    setIsSubmitting(true);

    try {
      const response = await websiteSettingsUpdate(userId, formatedFormData);
      if (response.success) {
        useSuccessToast(response?.message || "Settings updated successfully.");
      } else {
        useErrorToast(response?.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Failed to update SEO settings:", error);
      useErrorToast("Failed to update SEO settings.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`${globalStyleObj.backgroundLight900Dark300} w-full max-w-[800px] mx-auto mt-[40px] rounded-sm shadow-light overflow-hidden`}
    >
      <h1 className="py-3 px-4 md:px-5 text-[16px] font-poppins-md text-dark-weight-550 dark:text-light-weight-550 border-b border-[#000]/20 dark:border-[#fff]/10">
        Global SEO
      </h1>

      <form onSubmit={handleSEODataSubmit} className="py-4 px-5">
        {/* Meta Title */}
        <NormalTextInputField
          isFetching={isFetching}
          labelText="Meta Title"
          fieldId="meta-title"
          fieldName="meta_title"
          placeholderText="Meta Title"
          inputValue={formData?.meta_title || ""}
          onChangeTextInputField={onChangeTextInputField}
        />

        {/* Meta Description */}
        <NormalTextInputField
          isFetching={isFetching}
          isTextArea={true}
          labelText="Meta Description"
          fieldId="meta-description"
          fieldName="meta_description"
          placeholderText="Meta Description"
          inputValue={formData?.meta_description || ""}
          onChangeTextInputField={onChangeTextInputField}
          extraContainerClasses="mt-5"
        />

        {/* Meta Keywords */}
        <NormalTextInputField
          isFetching={isFetching}
          labelText="Meta Keywords"
          fieldId="meta-keywords"
          fieldName="meta_keywords"
          placeholderText="Meta Keywords"
          inputValue={formData?.meta_keywords || ""}
          onChangeTextInputField={onChangeTextInputField}
          extraFiledInfo="Separate with coma"
          extraContainerClasses="mt-5"
        />

        {/* Meta Image */}
        <NormalBrowseFileInputFiled
          userId={userId}
          isFetching={isFetching}
          labelText="Meta Image"
          fieldId="meta_image"
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImageFunction={onChangeMetaImage}
          selectedFileId={formData?.meta_image || ""}
          adminRole={adminRole}
          permissionsList={permissionsList}
          extraContainerClasses="mt-5"
        />

        <div className="flex justify-end mt-5">
          <SettingsUpdateButton
            isFetching={isFetching}
            isSubmitting={isSubmitting}
            colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
            btnText="Update"
          />
        </div>
      </form>
    </div>
  );
};

export default GlobalSEOSettings;
