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

const OpeningSchedule = ({ userId, languagesResponse }) => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const { bgColor, hoverBgColor, textColor, hexCode } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  const [formData, setFormData] = useState({
    opening_title: "",
    opening_days: [],
    opening_timings: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [activeTab, setActiveTab] = useState("en");

  const activeLanguages = useMemo(
    () => languagesResponse?.fetchData?.filter((lang) => lang.status) || [],
    [languagesResponse]
  );

  // Fetch data
  const getOpeningTimingsFieldsData = useCallback(async () => {
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
      console.error(
        "Failed to fetch opening timings widget settings data:",
        error
      );
      useErrorToast("Failed to fetch opening timings widget settings.");
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    if (!isSubmitting) {
      getOpeningTimingsFieldsData();
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

  // Handle Opening Days Change
  const handleLabelFieldOnChange = (index, name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: prev[name].map((item, i) => (i === index ? value : item)),
    }));
  };

  // Handle Opening Timings Change
  const handleValueFieldOnChange = (index, name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: prev[name].map((item, i) => (i === index ? value : item)),
    }));
  };

  // Handle Form Submit
  const handleOpeningTimingsDataSubmit = async (e) => {
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
      console.error("Failed to update opening timings widget settings:", error);
      useErrorToast("Failed to update opening timings widget settings.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`${globalStyleObj.backgroundLight900Dark300} w-full max-w-[800px] mx-auto mt-[40px] rounded-sm shadow-light overflow-hidden`}
    >
      <h1 className="py-3 px-4 md:px-5 text-[16px] font-poppins-md text-dark-weight-550 dark:text-light-weight-550 border-b border-[#000]/20 dark:border-[#fff]/10">
        Opening Schedule
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
        <form onSubmit={handleOpeningTimingsDataSubmit} className="py-4 px-5">
          {/* Footer Title */}
          <NormalTextInputField
            isFetching={isFetching}
            labelText="Title"
            fieldId="opening-timings-title"
            fieldName="opening_title"
            placeholderText="Title"
            inputValue={formData?.opening_title || ""}
            onChangeTextInputField={onChangeTextInputField}
            translateField={true}
          />

          {/* Repeatable Opening Timings Input Field */}
          <NormalRepeatableInputField
            isFetching={isFetching}
            labelText="Opening Timings"
            fieldId="opening-timings"
            translateField={true}
            labelFieldList={formData.opening_days}
            valueFieldList={formData.opening_timings}
            labelFieldName="opening_days"
            valueFieldName="opening_timings"
            labelInputPlaceholder="Days"
            valueInputPlaceholder="Timings"
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
              fieldId: `opening-timings-title-lang-${activeTab}`,
              fieldName: "opening_title",
              placeholderText: "Title",
              inputValue: "",
              isTextEditorType: false,
              translateField: true,
            },
            {
              labelText: "Opening Timings",
              fieldId: `opening-timings-lang-${activeTab}`,
              fieldName: ["opening_days"],
              labelInputPlaceholder: "Days",
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

export default OpeningSchedule;
