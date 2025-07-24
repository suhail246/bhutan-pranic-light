"use client";

import {
  getWebSettingFiledData,
  websiteSettingsUpdate,
} from "@/actions/apiClientActions/website-settings";
import { globalStyleObj } from "@/app/assets/styles";
import {
  NormalSwitchInputField,
  NormalTextInputField,
  SettingsUpdateButton,
} from "@/components";
import { useErrorToast, useSuccessToast } from "@/lib/hooks";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { isValidJSONData } from "@/utils/website-settings-helper";
import { useCallback, useEffect, useMemo, useState } from "react";

const GeneralColorSettings = ({ userId }) => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const { bgColor, hoverBgColor, textColor, hexCode } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  const [formData, setFormData] = useState({
    primary_color: "",
    primary_hover_color: "",
    secondary_color: "",
    secondary_hover_color: "",
    gradient_color: "",
    toploader_color: "",
    show_toploader_switcher: "0",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const getAllGeneralFieldsData = useCallback(async () => {
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
      console.error("Failed to fetch general settings data:", error);
      useErrorToast("Failed to fetch general settings.");
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    if (!isSubmitting) {
      getAllGeneralFieldsData();
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

  // Handle Top Loader Switch State
  const onChangeSwtichState = () => {
    setFormData((prev) => ({
      ...prev,
      show_toploader_switcher: prev.show_toploader_switcher === "0" ? "1" : "0",
    }));
  };

  // Handle OnSubmit Form
  const handleGeneralSettingsSubmit = async (e) => {
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
      console.error("Failed to update general settings:", error);
      useErrorToast("Failed to update general settings.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`${globalStyleObj.backgroundLight900Dark300} w-full max-w-[800px] mx-auto mt-[40px] rounded-sm shadow-light overflow-hidden`}
    >
      <h1 className="py-3 px-4 md:px-5 text-[16px] font-poppins-md text-dark-weight-550 dark:text-light-weight-550 border-b border-[#000]/20 dark:border-[#fff]/10">
        General Settings
      </h1>

      <form onSubmit={handleGeneralSettingsSubmit} className="py-4 px-5">
        {/* Primary Color */}
        <NormalTextInputField
          isFetching={isFetching}
          labelText="Primary Color"
          fieldId="primary-color"
          fieldName="primary_color"
          placeholderText="Primary Color"
          inputValue={formData?.primary_color || ""}
          onChangeTextInputField={onChangeTextInputField}
          extraFiledInfo="Hex Color Code"
        />

        {/* Primary Hover Color */}
        <NormalTextInputField
          isFetching={isFetching}
          labelText="Primary Hover Color"
          fieldId="primary-hover-color"
          fieldName="primary_hover_color"
          placeholderText="Primary Hover Color"
          inputValue={formData?.primary_hover_color || ""}
          onChangeTextInputField={onChangeTextInputField}
          extraFiledInfo="Hex Color Code"
          extraContainerClasses="mt-5"
        />

        {/* Secondary Color */}
        <NormalTextInputField
          isFetching={isFetching}
          labelText="Secondary Color"
          fieldId="secondary-color"
          fieldName="secondary_color"
          placeholderText="Secondary Color"
          inputValue={formData?.secondary_color || ""}
          onChangeTextInputField={onChangeTextInputField}
          extraFiledInfo="Hex Color Code"
          extraContainerClasses="mt-5"
        />

        {/* Secondary Hover Color */}
        <NormalTextInputField
          isFetching={isFetching}
          labelText="Secondary Hover Color"
          fieldId="secondary-hover-color"
          fieldName="secondary_hover_color"
          placeholderText="Secondary Hover Color"
          inputValue={formData?.secondary_hover_color || ""}
          onChangeTextInputField={onChangeTextInputField}
          extraFiledInfo="Hex Color Code"
          extraContainerClasses="mt-5"
        />

        {/* Gradient Color */}
        <NormalTextInputField
          isFetching={isFetching}
          labelText="Gradient Color"
          fieldId="gradient-color"
          fieldName="gradient_color"
          placeholderText="Gradient Color"
          inputValue={formData?.gradient_color || ""}
          onChangeTextInputField={onChangeTextInputField}
          extraFiledInfo="Hex Color Code Seperated by comma. Example: #f00,#f0f"
          extraContainerClasses="mt-5"
        />

        {/* TopLoader Color */}
        <NormalTextInputField
          isFetching={isFetching}
          labelText="Top Loader Color"
          fieldId="toploader-color"
          fieldName="toploader_color"
          placeholderText="Top Loader Color"
          inputValue={formData?.toploader_color || ""}
          onChangeTextInputField={onChangeTextInputField}
          extraFiledInfo="Hex Color Code"
          extraContainerClasses="mt-5"
        />

        {/* Show Language Switcher */}
        <NormalSwitchInputField
          isFetching={isFetching}
          labelText="Show Top Loader?"
          fieldId="show-toploader-switcher"
          fieldName="show_toploader_switcher"
          switchStatus={formData?.show_toploader_switcher || "0"}
          onChangeSwtichState={onChangeSwtichState}
          extraContainerClasses="mt-5"
          customBodySize="h-5 w-10"
          customThumbSize="h-4 w-5"
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

export default GeneralColorSettings;
