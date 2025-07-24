"use client";

import {
  getWebSettingFiledData,
  websiteSettingsUpdate,
} from "@/actions/apiClientActions/website-settings";
import { useErrorToast, useSuccessToast } from "@/lib/hooks";
import { isValidJSONData } from "@/utils/website-settings-helper";
import { useCallback, useEffect, useState } from "react";
import {
  NormalRepeatableInputField,
  NormalTextEditorInputFiled,
  NormalTextInputField,
  SettingsUpdateButton,
} from "..";

const TranslationNormalForm = ({
  fields = [],
  userId,
  activeTab = "",
  colorGrade,
}) => {
  // State to manage data
  const [translateFormData, setTranslateFormData] = useState(() => {
    return fields.reduce((acc, field) => {
      const { fieldName, inputValue } = field;

      if (Array.isArray(fieldName) && Array.isArray(inputValue)) {
        fieldName.forEach((name, index) => {
          acc[name] = inputValue[index] ?? ""; // Assign corresponding value or empty string if undefined
        });
      } else {
        acc[fieldName] = inputValue ?? "";
      }

      return acc;
    }, {});
  });

  const [isTranslateDataFetching, setIsTranslateDataFetching] = useState(false);
  const [isTranslateDataSubmitting, setIsTranslateDataSubmitting] =
    useState(false);

  // Function to fetch translation data from the server
  const getAllTranslateFieldsData = useCallback(async () => {
    setIsTranslateDataFetching(true);

    try {
      const response = await getWebSettingFiledData(
        userId,
        Object.keys(translateFormData),
        activeTab
      );

      if (response.targetFieldsData) {
        Object.entries(response.targetFieldsData).forEach(([key, value]) => {
          setTranslateFormData((prev) => ({
            ...prev,
            [key]: isValidJSONData(value) ? JSON.parse(value) : value,
          }));
        });
      }
    } catch (error) {
      console.error(
        "Failed to fetch cookies aggrement translate settings data:",
        error
      );
      useErrorToast("Failed to fetch cookies aggrement translate settings.");
    } finally {
      setIsTranslateDataFetching(false);
    }
  }, []);

  // Fetch data when the component mounts or when `isTranslateDataSubmitting` changes
  useEffect(() => {
    if (!isTranslateDataSubmitting) {
      getAllTranslateFieldsData();
    }
  }, [isTranslateDataSubmitting]);

  // Handler for text editor field changes
  const onChangeTextEditorFiled = (value, name) => {
    setTranslateFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler for text input field changes
  const onChangeTextInputField = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setTranslateFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Repeatable Label Field Change
  const handleLabelFieldOnChange = (index, name, value) => {
    setTranslateFormData((prev) => ({
      ...prev,
      [name]: prev[name].map((item, i) => (i === index ? value : item)),
    }));
  };

  // Handle Repeatable Value Field Change
  const handleValueFieldOnChange = (index, name, value) => {
    setTranslateFormData((prev) => ({
      ...prev,
      [name]: prev[name].map((item, i) => (i === index ? value : item)),
    }));
  };

  // Handle Remove Repeatable Fields
  const handleRemoveFields = (index, labelName, valueName) => {
    setTranslateFormData((prev) => {
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

  // Handle Add Repeatable Fields
  const addFields = (labelFieldName, valueFieldName) => {
    setTranslateFormData((prev) => {
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

  // Handler for form submission
  const handleTranslateFormSubmit = async (e) => {
    e.preventDefault();

    const formatedTranslateData = {
      types: Object.keys(translateFormData),
      ...translateFormData,
    };

    setIsTranslateDataSubmitting(true);

    try {
      const response = await websiteSettingsUpdate(
        userId,
        formatedTranslateData,
        activeTab
      );
      if (response.success) {
        useSuccessToast(response?.message || "Settings updated successfully.");
      } else {
        useErrorToast(response?.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Failed to update transalte settings:", error);
      useErrorToast("Failed to update transalte settings.");
    } finally {
      setIsTranslateDataSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleTranslateFormSubmit} className="py-4 px-5">
      {fields.map((field) =>
        field.isTextEditorType ? (
          <NormalTextEditorInputFiled
            key={field.fieldId}
            isFetching={isTranslateDataFetching}
            labelText={field?.labelText || "Anonymous"}
            fieldId={field?.fieldId || "anonymous"}
            fieldName={field?.fieldName}
            placeholderText={field?.placeholderText || ""}
            inputValue={translateFormData[field?.fieldName] || ""}
            onChangeTextEditorFiled={onChangeTextEditorFiled}
            extraFiledInfo={field?.extraFiledInfo || ""}
            extraContainerClasses={field?.extraContainerClasses || ""}
            extraInputClasses={field?.extraInputClasses || ""}
            translateField={field?.translateField || false}
          />
        ) : field.isRepeatableType ? (
          <NormalRepeatableInputField
            key={field.fieldId}
            isFetching={isTranslateDataFetching}
            labelText={field?.labelText || "Anonymous"}
            fieldId={field?.fieldId || "anonymous"}
            translateField={field?.translateField || false}
            labelFieldList={translateFormData[field?.fieldName[0]] || []}
            valueFieldList={translateFormData[field?.fieldName[1]] || []}
            labelFieldName={field?.fieldName[0] || ""}
            valueFieldName={field?.fieldName[1] || ""}
            labelInputPlaceholder={field?.labelInputPlaceholder || ""}
            valueInputPlaceholder={field?.valueInputPlaceholder || ""}
            handleLabelFieldOnChange={handleLabelFieldOnChange}
            handleValueFieldOnChange={handleValueFieldOnChange}
            handleRemoveFields={handleRemoveFields}
            addFields={addFields}
            colorGrade={colorGrade}
            extraContainerClasses="mt-5"
          />
        ) : (
          <NormalTextInputField
            key={field.fieldId}
            isFetching={isTranslateDataFetching}
            isTextArea={field?.isTextArea || false}
            labelText={field?.labelText || "Anonymous"}
            fieldId={field?.fieldId || "anonymous"}
            fieldName={field?.fieldName || ""}
            placeholderText={field?.placeholderText || ""}
            inputValue={translateFormData[field?.fieldName] || ""}
            onChangeTextInputField={onChangeTextInputField}
            extraFiledInfo={field?.extraFiledInfo || ""}
            extraContainerClasses={field?.extraContainerClasses || ""}
            extraInputClasses={field?.extraInputClasses || ""}
            translateField={field?.translateField || false}
          />
        )
      )}

      <div className="flex justify-end mt-5">
        <SettingsUpdateButton
          isFetching={isTranslateDataFetching}
          isSubmitting={isTranslateDataSubmitting}
          colorGrade={colorGrade}
          btnText="Update"
        />
      </div>
    </form>
  );
};

export default TranslationNormalForm;
