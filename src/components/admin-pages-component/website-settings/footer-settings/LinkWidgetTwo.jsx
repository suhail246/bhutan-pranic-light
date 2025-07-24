"use client";

import {
  getWebSettingFiledData,
  websiteSettingsUpdate,
} from "@/actions/apiClientActions/website-settings";
import { globalStyleObj } from "@/app/assets/styles";
import {
  LanguageTabs,
  NormalRepeatableInputField,
  NormalTextInputField,
  SettingsUpdateButton,
  TranslationNormalForm,
} from "@/components";
import { useErrorToast, useSuccessToast } from "@/lib/hooks";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { isValidJSONData } from "@/utils/website-settings-helper";
import { useCallback, useEffect, useMemo, useState } from "react";

const LinkWidgetTwo = ({ userId, languagesResponse }) => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const { bgColor, hoverBgColor, textColor, hexCode } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  const [formData, setFormData] = useState({
    link_two_title: "",
    link_two_label: [],
    link_two_value: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [activeTab, setActiveTab] = useState("en");

  const activeLanguages = useMemo(
    () => languagesResponse?.fetchData?.filter((lang) => lang.status) || [],
    [languagesResponse]
  );

  // Fetch data
  const getLinkTwoFieldsData = useCallback(async () => {
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
      console.error("Failed to fetch link two widget settings data:", error);
      useErrorToast("Failed to fetch link two widget settings.");
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    if (!isSubmitting) {
      getLinkTwoFieldsData();
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

  // Handle Add Repeatable Fields
  const addFields = (labelFieldName, valueFieldName) => {
    setFormData((prev) => {
      const updatedData = { ...prev };

      if (labelFieldName) {
        updatedData[labelFieldName] = [...prev[labelFieldName], ""];
      }
      if (valueFieldName) {
        updatedData[valueFieldName] = [...prev[valueFieldName], ""];
      }

      return updatedData;
    });
  };

  // Handle Remove Repeatable Fields
  const handleRemoveFields = (index, labelName, valueName) => {
    setFormData((prev) => {
      const updatedData = { ...prev };

      if (labelName) {
        updatedData[labelName] =
          prev[labelName]?.filter((_, i) => i !== index) || [];
      }
      if (valueName) {
        updatedData[valueName] =
          prev[valueName]?.filter((_, i) => i !== index) || [];
      }

      return updatedData;
    });
  };

  // Handle Repeatable Label Change
  const handleLabelFieldOnChange = (index, name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: prev[name].map((item, i) => (i === index ? value : item)),
    }));
  };

  // Handle Repeatable Value Change
  const handleValueFieldOnChange = (index, name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: prev[name].map((item, i) => (i === index ? value : item)),
    }));
  };

  // Handle Form Submit
  const handleLinkTwoDataSubmit = async (e) => {
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
      console.error("Failed to update link two widget settings:", error);
      useErrorToast("Failed to update link two widget settings.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`${globalStyleObj.backgroundLight900Dark300} w-full max-w-[800px] mx-auto mt-[40px] rounded-sm shadow-light overflow-hidden`}
    >
      <h1 className="py-3 px-4 md:px-5 text-[16px] font-poppins-md text-dark-weight-550 dark:text-light-weight-550 border-b border-[#000]/20 dark:border-[#fff]/10">
        Link Two Widget
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
        <form onSubmit={handleLinkTwoDataSubmit} className="py-4 px-5">
          {/* Title */}
          <NormalTextInputField
            isFetching={isFetching}
            labelText="Title"
            fieldId="link-two-title"
            fieldName="link_two_title"
            placeholderText="Title"
            inputValue={formData?.link_two_title || ""}
            onChangeTextInputField={onChangeTextInputField}
            translateField={true}
          />

          {/* Repeatable Links Input Field */}
          <NormalRepeatableInputField
            isFetching={isFetching}
            labelText="Links"
            fieldId="link-widget-two-list"
            translateField={true}
            labelFieldList={formData.link_two_label}
            valueFieldList={formData.link_two_value}
            labelFieldName="link_two_label"
            valueFieldName="link_two_value"
            labelInputPlaceholder="Label"
            valueInputPlaceholder="Pathname"
            handleLabelFieldOnChange={handleLabelFieldOnChange}
            handleValueFieldOnChange={handleValueFieldOnChange}
            handleRemoveFields={handleRemoveFields}
            addFields={addFields}
            colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
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
      ) : (
        <TranslationNormalForm
          fields={[
            {
              labelText: "Title",
              fieldId: `link-two-title-lang-${activeTab}`,
              fieldName: "link_two_title",
              placeholderText: "Title",
              inputValue: "",
              isTextEditorType: false,
              translateField: true,
            },
            {
              labelText: "Links",
              fieldId: `link-widget-two-list-lang-${activeTab}`,
              fieldName: ["link_two_label"],
              labelInputPlaceholder: "Label",
              inputValue: [[]],
              isTextEditorType: false,
              isRepeatableType: true,
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

export default LinkWidgetTwo;
