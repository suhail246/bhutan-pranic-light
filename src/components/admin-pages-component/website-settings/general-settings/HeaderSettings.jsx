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

const HeaderSettings = ({ userId }) => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const { bgColor, hoverBgColor, textColor, hexCode } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  const [formData, setFormData] = useState({
    show_language_switcher: "0",
    enable_sticky_header: "0",
    helpline_number: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const getAllHeaderSettingFieldsData = useCallback(async () => {
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
      console.error("Failed to fetch header settings data:", error);
      useErrorToast("Failed to fetch header settings.");
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    if (!isSubmitting) {
      getAllHeaderSettingFieldsData();
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

  // Handle Language Switch State
  const onChangeLanguageSwtichState = () => {
    setFormData((prev) => ({
      ...prev,
      show_language_switcher: prev.show_language_switcher === "0" ? "1" : "0",
    }));
  };

  // Handle Sticky Header Switch State
  const onChangeHeaderSwtichState = () => {
    setFormData((prev) => ({
      ...prev,
      enable_sticky_header: prev.enable_sticky_header === "0" ? "1" : "0",
    }));
  };

  // Handle OnSubmit Form
  const handleHeaderSettingsDataSubmit = async (e) => {
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
      console.error("Failed to update header settings:", error);
      useErrorToast("Failed to update header settings.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`${globalStyleObj.backgroundLight900Dark300} w-full max-w-[800px] mx-auto mt-[40px] rounded-sm shadow-light overflow-hidden`}
    >
      <h1 className="py-3 px-4 md:px-5 text-[16px] font-poppins-md text-dark-weight-550 dark:text-light-weight-550 border-b border-[#000]/20 dark:border-[#fff]/10">
        Header Settings
      </h1>

      <form onSubmit={handleHeaderSettingsDataSubmit} className="py-4 px-5">
        {/* Show Language Switcher */}
        <NormalSwitchInputField
          isFetching={isFetching}
          labelText="Show Language Switcher?"
          fieldId="show-language-switcher"
          fieldName="show_language_switcher"
          switchStatus={formData?.show_language_switcher || "0"}
          onChangeSwtichState={onChangeLanguageSwtichState}
          customBodySize="h-5 w-10"
          customThumbSize="h-4 w-5"
        />

        {/* Enable Sticky Header */}
        <NormalSwitchInputField
          isFetching={isFetching}
          labelText="Enable Stikcy Header?"
          fieldId="enable-sticky-header"
          fieldName="enable_sticky_header"
          switchStatus={formData?.enable_sticky_header || "0"}
          onChangeSwtichState={onChangeHeaderSwtichState}
          extraContainerClasses="mt-5"
          customBodySize="h-5 w-10"
          customThumbSize="h-4 w-5"
        />

        {/* Helpline Number */}
        <NormalTextInputField
          isFetching={isFetching}
          labelText="Helpline Number"
          fieldId="helpline-number"
          fieldName="helpline_number"
          placeholderText="Helpline Number"
          inputValue={formData?.helpline_number || ""}
          onChangeTextInputField={onChangeTextInputField}
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

export default HeaderSettings;
