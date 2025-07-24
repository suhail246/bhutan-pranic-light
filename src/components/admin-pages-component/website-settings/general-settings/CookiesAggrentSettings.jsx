"use client";

import {
  getWebSettingFiledData,
  websiteSettingsUpdate,
} from "@/actions/apiClientActions/website-settings";
import { globalStyleObj } from "@/app/assets/styles";
import {
  LanguageTabs,
  NormalSwitchInputField,
  NormalTextEditorInputFiled,
  SettingsUpdateButton,
  TranslationNormalForm,
} from "@/components";
import { useErrorToast, useSuccessToast } from "@/lib/hooks";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { isValidJSONData } from "@/utils/website-settings-helper";
import { useCallback, useEffect, useMemo, useState } from "react";

const CookiesAggrentSettings = ({ userId, languagesResponse }) => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const { bgColor, hoverBgColor, textColor, hexCode } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  const [formData, setFormData] = useState({
    cookies_agreement_text: "",
    show_cookies_agreement: "0",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [activeTab, setActiveTab] = useState("en");

  const activeLanguages = useMemo(
    () => languagesResponse?.fetchData?.filter((lang) => lang.status) || [],
    [languagesResponse]
  );

  // Fetch data
  const getAllCookiesAggrementFieldsData = useCallback(async () => {
    setIsFetching(true);

    try {
      const response = await getWebSettingFiledData(
        userId,
        Object.keys(formData),
        activeTab
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
      console.error("Failed to fetch cookies aggrement settings data:", error);
      useErrorToast("Failed to fetch cookies aggrement settings.");
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    if (!isSubmitting) {
      getAllCookiesAggrementFieldsData();
    }
  }, [isSubmitting]);

  // Handle Input Filed Change
  const onChangeTextEditorFiled = (value) => {
    setFormData((prev) => ({
      ...prev,
      cookies_agreement_text: value,
    }));
  };

  // Handle Switch State
  const onChangeSwtichState = () => {
    setFormData((prev) => ({
      ...prev,
      show_cookies_agreement: prev.show_cookies_agreement === "0" ? "1" : "0",
    }));
  };

  // Handle OnSubmit Form
  const handleCookiesAggrementDataSubmit = async (e) => {
    e.preventDefault();

    const formatedFormData = {
      types: Object.keys(formData),
      ...formData,
    };

    setIsSubmitting(true);

    try {
      const response = await websiteSettingsUpdate(
        userId,
        formatedFormData,
        activeTab
      );
      if (response.success) {
        useSuccessToast(response?.message || "Settings updated successfully.");
      } else {
        useErrorToast(response?.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Failed to update cookies aggrement settings:", error);
      useErrorToast("Failed to update cookies aggrement settings.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`${globalStyleObj.backgroundLight900Dark300} w-full max-w-[800px] mx-auto mt-[40px] rounded-sm shadow-light overflow-hidden`}
    >
      <h1 className="py-3 px-4 md:px-5 text-[16px] font-poppins-md text-dark-weight-550 dark:text-light-weight-550 border-b border-[#000]/20 dark:border-[#fff]/10">
        Cookies Agreement
      </h1>

      {activeLanguages.length > 1 && (
        <LanguageTabs
          languages={activeLanguages}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
        />
      )}

      {activeTab === "en" ? (
        <form onSubmit={handleCookiesAggrementDataSubmit} className="py-4 px-5">
          {/* Cookies Aggrement Text */}
          <NormalTextEditorInputFiled
            isFetching={isFetching}
            labelText="Cookies Aggrement Text"
            fieldId="cookies-agreement-text"
            fieldName="cookies_agreement_text"
            placeholderText="Cookies Aggrement Text"
            inputValue={formData?.cookies_agreement_text || ""}
            onChangeTextEditorFiled={onChangeTextEditorFiled}
            translateField={true}
          />

          {/* Show Cookies Agreement */}
          <NormalSwitchInputField
            isFetching={isFetching}
            labelText="Show Cookies Agreement?"
            fieldId="show-cookies-agreement"
            fieldName="show_cookies_agreement"
            switchStatus={formData?.show_cookies_agreement || "0"}
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
      ) : (
        <TranslationNormalForm
          fields={[
            {
              labelText: "Cookies Agreement Text",
              fieldId: `cookies-agreement-text-lang-${activeTab}`,
              fieldName: "cookies_agreement_text",
              placeholderText: "Cookies Aggrement Text",
              inputValue: "",
              isTextEditorType: true,
              translateField: true,
            },
          ]}
          userId={userId}
          activeTab={activeTab}
          colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
        />
      )}
    </div>
  );
};

export default CookiesAggrentSettings;
