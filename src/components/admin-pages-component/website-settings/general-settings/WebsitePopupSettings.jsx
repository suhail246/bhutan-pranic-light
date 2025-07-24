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

const WebsitePopupSettings = ({ userId, languagesResponse }) => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const { bgColor, hoverBgColor, textColor, hexCode } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  const [formData, setFormData] = useState({
    show_website_popup: "0",
    popup_content: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [activeTab, setActiveTab] = useState("en");

  const activeLanguages = useMemo(
    () => languagesResponse?.fetchData?.filter((lang) => lang.status) || [],
    [languagesResponse]
  );

  const getAllWebsitePopupFieldsData = useCallback(async () => {
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
      console.error("Failed to fetch website popup settings data:", error);
      useErrorToast("Failed to fetch website popup settings.");
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    if (!isSubmitting) {
      getAllWebsitePopupFieldsData();
    }
  }, [isSubmitting]);

  // Handle Input Filed Change
  const onChangeTextEditorFiled = (value, name) => {
    setFormData((prev) => ({
      ...prev,
      popup_content: value,
    }));
  };

  // Handle Switch State
  const onChangeSwtichState = () => {
    setFormData((prev) => ({
      ...prev,
      show_website_popup: prev.show_website_popup === "0" ? "1" : "0",
    }));
  };

  // Handle OnSubmit Form
  const handleWebsitePopupDataSubmit = async (e) => {
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
      console.error("Failed to update website popup settings:", error);
      useErrorToast("Failed to update website popup settings.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`${globalStyleObj.backgroundLight900Dark300} w-full max-w-[800px] mx-auto mt-[40px] rounded-sm shadow-light overflow-hidden`}
    >
      <h1 className="py-3 px-4 md:px-5 text-[16px] font-poppins-md text-dark-weight-550 dark:text-light-weight-550 border-b border-[#000]/20 dark:border-[#fff]/10">
        Website Popup
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
        <form onSubmit={handleWebsitePopupDataSubmit} className="py-4 px-5">
          {/* Show Website Popup */}
          <NormalSwitchInputField
            isFetching={isFetching}
            labelText="Show Website Popup?"
            fieldId="show-website-popup"
            fieldName="show_website_popup"
            switchStatus={formData?.show_website_popup || "0"}
            onChangeSwtichState={onChangeSwtichState}
            customBodySize="h-5 w-10"
            customThumbSize="h-4 w-5"
          />

          {/* Website Popup Content */}
          <NormalTextEditorInputFiled
            isFetching={isFetching}
            labelText="Popup Content"
            fieldId="popup-content"
            fieldName="popup_content"
            placeholderText="Popup Content"
            inputValue={formData?.popup_content || ""}
            onChangeTextEditorFiled={onChangeTextEditorFiled}
            extraContainerClasses="mt-5"
            translateField={true}
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
              labelText: "Popup Content",
              fieldId: `popup-content-lang-${activeTab}`,
              fieldName: "popup_content",
              placeholderText: "Popup Content",
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

export default WebsitePopupSettings;
