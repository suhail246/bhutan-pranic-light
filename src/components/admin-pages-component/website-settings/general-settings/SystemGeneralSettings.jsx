"use client";

import {
  getWebSettingFiledData,
  websiteSettingsUpdate,
} from "@/actions/apiClientActions/website-settings";
import { globalStyleObj } from "@/app/assets/styles";
import {
  NormalBrowseFileInputFiled,
  NormalSelectInputFields,
  NormalTextInputField,
  SettingsUpdateButton,
} from "@/components";
import { useErrorToast, useSuccessToast } from "@/lib/hooks";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { isValidJSONData } from "@/utils/website-settings-helper";
import { useCallback, useEffect, useMemo, useState } from "react";

const SystemGeneralSettings = ({
  userId,
  allFilesResponse,
  allTimezonesResponse,
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
    system_name: "",
    frontend_website_name: "",
    site_moto: "",
    site_icon_image: "",
    logo_white_image: "",
    logo_dark_image: "",
    timezone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const getAllSystemFieldsData = useCallback(async () => {
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
      console.error("Failed to fetch system settings data:", error);
      useErrorToast("Failed to fetch system settings.");
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    if (!isSubmitting) {
      getAllSystemFieldsData();
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

  // Handle Site Icon Image State
  const onChangeSiteIconImage = (id) => {
    setFormData((prev) => ({
      ...prev,
      site_icon_image: id,
    }));
  };

  // Handle Logo White Image State
  const onChangeLogoWhiteImage = (id) => {
    setFormData((prev) => ({
      ...prev,
      logo_white_image: id,
    }));
  };

  // Handle Logo Dark Image State
  const onChangeLogoDarkImage = (id) => {
    setFormData((prev) => ({
      ...prev,
      logo_dark_image: id,
    }));
  };

  // Handle Timezone State
  const onChangeTimezone = (value) => {
    setFormData((prev) => ({
      ...prev,
      timezone: value,
    }));
  };

  // Handle OnSubmit Form
  const handleSubmit = async (e) => {
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
      console.error("Failed to update system settings:", error);
      useErrorToast("Failed to update system settings.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`${globalStyleObj.backgroundLight900Dark300} w-full max-w-[800px] mx-auto mt-[40px] rounded-sm shadow-light overflow-hidden`}
    >
      <h1 className="py-3 px-4 md:px-5 text-[16px] font-poppins-md text-dark-weight-550 dark:text-light-weight-550 border-b border-[#000]/20 dark:border-[#fff]/10">
        System Settings
      </h1>

      <form onSubmit={handleSubmit} className="py-4 px-5">
        {/* System Name */}
        <NormalTextInputField
          isFetching={isFetching}
          labelText="System Name"
          fieldId="system-name"
          fieldName="system_name"
          placeholderText="System Name"
          inputValue={formData?.system_name || ""}
          onChangeTextInputField={onChangeTextInputField}
        />

        {/* Frontend Website Name */}
        <NormalTextInputField
          isFetching={isFetching}
          labelText="Frontend Website Name"
          fieldId="frontend-website-name"
          fieldName="frontend_website_name"
          placeholderText="Frontend Website Name"
          inputValue={formData?.frontend_website_name || ""}
          onChangeTextInputField={onChangeTextInputField}
          extraContainerClasses="mt-5"
        />

        {/* Site Moto */}
        <NormalTextInputField
          isFetching={isFetching}
          labelText="Site Moto"
          fieldId="site-moto"
          fieldName="site_moto"
          placeholderText="Site Moto"
          inputValue={formData?.site_moto || ""}
          onChangeTextInputField={onChangeTextInputField}
          extraContainerClasses="mt-5"
        />

        {/* Site Icon */}
        <NormalBrowseFileInputFiled
          userId={userId}
          isFetching={isFetching}
          labelText="Site Icon"
          fieldId="site_icon_image"
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImageFunction={onChangeSiteIconImage}
          selectedFileId={formData?.site_icon_image || ""}
          adminRole={adminRole}
          permissionsList={permissionsList}
          infoText="Minimum dimensions required: 32px width X 32px height."
          extraContainerClasses="mt-5"
        />

        {/* Logo White */}
        <NormalBrowseFileInputFiled
          userId={userId}
          isFetching={isFetching}
          labelText="System Logo-White"
          fieldId="logo_white_image"
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImageFunction={onChangeLogoWhiteImage}
          selectedFileId={formData?.logo_white_image || ""}
          adminRole={adminRole}
          permissionsList={permissionsList}
          infoText="Will be used in admin panel side menu. Minimum dimensions required: 189px width X 31px height."
          extraContainerClasses="mt-5"
        />

        {/* Logo Dark */}
        <NormalBrowseFileInputFiled
          userId={userId}
          isFetching={isFetching}
          labelText="System Logo-Dark"
          fieldId="logo_dark_image"
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImageFunction={onChangeLogoDarkImage}
          selectedFileId={formData?.logo_dark_image || ""}
          adminRole={adminRole}
          permissionsList={permissionsList}
          infoText="Will be used in admin panel side menu. Minimum dimensions required: 189px width X 31px height."
          extraContainerClasses="mt-5"
        />

        {/* System Time Zone */}
        <NormalSelectInputFields
          isFetching={isFetching}
          labelText="System Timezone"
          fieldId="system-timezone"
          selectedValue={formData?.timezone || ""}
          onSelectInputFiledChangeFunction={onChangeTimezone}
          placeholderText="Select Timezone"
          targetDataList={allTimezonesResponse?.timezonesData || []}
          targetItemKeyName="label"
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

export default SystemGeneralSettings;
