"use client";

import {
  getWebSettingFiledData,
  websiteSettingsUpdate,
} from "@/actions/apiClientActions/website-settings";
import { globalStyleObj } from "@/app/assets/styles";
import {
  LanguageTabs,
  NormalTextEditorInputFiled,
  SettingsUpdateButton,
  TranslationNormalForm,
} from "@/components";
import { useErrorToast, useSuccessToast } from "@/lib/hooks";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { isValidJSONData } from "@/utils/website-settings-helper";
import { useCallback, useEffect, useMemo, useState } from "react";

const CopyWriteWidget = ({ userId, languagesResponse }) => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const { bgColor, hoverBgColor, textColor, hexCode } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  const [formData, setFormData] = useState({
    copywrite_text: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [activeTab, setActiveTab] = useState("en");

  const activeLanguages = useMemo(
    () => languagesResponse?.fetchData?.filter((lang) => lang.status) || [],
    [languagesResponse]
  );

  // Fetch data
  const getCopyWriteFieldData = useCallback(async () => {
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
      console.error("Failed to fetch copywrite settings data:", error);
      useErrorToast("Failed to fetch copywrite settings.");
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    if (!isSubmitting) {
      getCopyWriteFieldData();
    }
  }, [isSubmitting]);

  // Handle Input Filed Change
  const onChangeTextEditorFiled = (value, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle OnSubmit Form
  const handleCopyWriteDataSubmit = async (e) => {
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
      console.error("Failed to update copywrite settings:", error);
      useErrorToast("Failed to update copywrite settings.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`${globalStyleObj.backgroundLight900Dark300} w-full max-w-[800px] mx-auto mt-[40px] rounded-sm shadow-light overflow-hidden`}
    >
      <h1 className="py-3 px-4 md:px-5 text-[16px] font-poppins-md text-dark-weight-550 dark:text-light-weight-550 border-b border-[#000]/20 dark:border-[#fff]/10">
        Copywrite Text
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
        <form onSubmit={handleCopyWriteDataSubmit} className="py-4 px-5">
          {/* Cookies Aggrement Text */}
          <NormalTextEditorInputFiled
            isFetching={isFetching}
            labelText="Copywrite Text"
            fieldId="copywrite-text"
            fieldName="copywrite_text"
            placeholderText="Copywrite Text"
            inputValue={formData?.copywrite_text || ""}
            onChangeTextEditorFiled={onChangeTextEditorFiled}
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
              labelText: "Copywrite Text",
              fieldId: `copywrite-text-lang-${activeTab}`,
              fieldName: "copywrite_text",
              placeholderText: "Copywrite Text",
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

export default CopyWriteWidget;
