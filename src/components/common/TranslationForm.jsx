"use client";

import { globalStyleObj } from "@/app/assets/styles";
import JoditEditor from "jodit-react";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import {
  CommonRepeatableInputFields,
  CommonTextAreaField,
  CommonTextInputField,
  LabelText,
} from "..";

const TranslationForm = ({
  fields,
  isSubmitting: parentIsSubmitting,
  colorGrade,
  handleTranslationSubmit,
  theme,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
    setError,
    setValue,
  } = useForm({
    defaultValues: fields.reduce((acc, field) => {
      acc[field.name] = field?.value || "";
      return acc;
    }, {}),
  });

  // Watch Repeatable Field Data
  const repeatableField = fields.find((field) => field.isRepeatableType);
  const repeatableFieldData = repeatableField
    ? watch(repeatableField.name)
    : null;

  // ✅ Reset form values when fields change
  useEffect(() => {
    const newDefaultValues = fields.reduce((acc, field) => {
      acc[field.name] = field?.value || "";
      return acc;
    }, {});
    reset(newDefaultValues); // <-- This updates form state
  }, [fields, reset]);

  // Handle Add Label Field
  const addLabelField = (value, index) => {
    const fieldName = fields.find((field) => field.isRepeatableType).name;
    const fieldIsArray = Array.isArray(watch(fieldName));
    const updatedLabels = fieldIsArray
      ? [...watch(fieldName)]
      : [...watch(fieldName).labels];

    if (index >= 0 && index < updatedLabels.length) {
      // Update the existing label at the specified index
      updatedLabels[index] = value;
    } else {
      // Add a new label to the array
      updatedLabels.push(value);
    }

    // Update the form state with the new labels
    if (!fieldIsArray) {
      setValue(fieldName, {
        labels: updatedLabels,
      });
    } else {
      setValue(fieldName, updatedLabels);
    }
  };

  // Handle Add Fields
  const handleAddRepeatableField = useCallback(() => {
    const fieldName = fields.find((field) => field.isRepeatableType).name;
    const fieldIsArray = Array.isArray(watch(fieldName));

    if (!fieldIsArray) {
      setValue(fieldName, {
        labels: [...watch(fieldName).labels, ""],
      });
    } else {
      setValue(fieldName, [...watch(fieldName), ""]);
    }
  }, [setValue, watch]);

  // Handle Remove Fields
  const handleRemoveRepeatableField = useCallback(
    (index) => {
      const fieldName = fields.find((field) => field.isRepeatableType).name;
      const fieldIsArray = Array.isArray(watch(fieldName));

      if (!fieldIsArray) {
        setValue(fieldName, {
          labels: watch(fieldName).labels.filter((_, i) => i !== index),
        });
      } else {
        setValue(
          fieldName,
          watch(fieldName).filter((_, i) => i !== index)
        );
      }
    },
    [watch, setValue]
  );

  // Handle Form Submit
  const onSubmit = async (data) => {
    try {
      await handleTranslationSubmit(data);
    } catch (error) {
      console.error("Translation Submission error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`p-3 sm:p-5`}>
      {(fields || []).map((field) =>
        field.isAreaInputType ? (
          <CommonTextAreaField
            fieldName={field.name}
            fieldId={field.fieldId}
            control={control}
            errors={errors}
            errorsType={errors[field.name]}
            labelName={field.lableName}
            labelStatus={false}
            extraClass="mt-5"
            translateField={true}
            key={field.name}
          />
        ) : field.isTextEditorType ? (
          <div
            key={field.name}
            className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}
          >
            <LabelText
              text={field.lableName}
              htmlForId={field.fieldId}
              star={false}
              translateField={true}
            />

            <div className="w-full max-w-[800px] rounded-sm border border-[#000]/20 dark:border-[#fff]/10">
              <JoditEditor
                config={{
                  placeholder: "",
                  showCharsCounter: false,
                  showWordsCounter: false,
                  showXPathInStatusbar: false,
                  height: 300,
                  style: {
                    backgroundColor: theme === "light" ? "#ffffff" : "#22262A",
                    color: theme === "light" ? "#495057" : "#ced4da",
                  },
                  toolbarAdaptive: true,
                  toolbarButtonSize: "middle",
                  toolbar: true,
                }}
                id={field.fieldId}
                value={watch(field.name)}
                name={field.name}
                onBlur={(newContent) => {
                  setValue(field.name, newContent);
                }}
              />
            </div>
          </div>
        ) : field.isRepeatableType ? (
          <CommonRepeatableInputFields
            labelText={field.lableName}
            fieldId={field.fieldId}
            lableStatus={false}
            itemDetailsExist={true}
            repeatableField={
              Array.isArray(repeatableFieldData) ? {} : repeatableFieldData
            }
            singleRepeatableField={
              Array.isArray(repeatableFieldData) ? repeatableFieldData : []
            }
            repeatableLabelFieldPlaceholder={field.placeholderText}
            addLabelField={addLabelField}
            handleAddRepeatableField={handleAddRepeatableField}
            handleRemoveRepeatableField={handleRemoveRepeatableField}
            colorGrade={colorGrade}
            extraContainerClasses="mt-5"
            key={field.name}
          />
        ) : (
          <CommonTextInputField
            fieldName={field?.name}
            fieldType="text"
            fieldId={field?.fieldId}
            control={control}
            errors={errors}
            errorsType={errors[field.name]}
            placeholderText={field?.placeholderText || ""}
            labelName={field.lableName}
            labelStatus={false}
            extraClass="mt-5"
            translateField={true}
            key={field.name}
          />
        )
      )}

      <button
        type="submit"
        disabled={isSubmitting || parentIsSubmitting}
        className={`${globalStyleObj.flexCenter} transition-300 gap-2 rounded-[4px] ${colorGrade.bgColor} ${colorGrade.hoverBgColor} ${colorGrade.textColor} px-5 py-2 font-poppins-rg text-[13px] tracking-wide hover:text-white mt-10 w-full sm:max-w-[180px] dark:text-light-weight-800 ${isSubmitting || parentIsSubmitting ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        {isSubmitting || parentIsSubmitting ? (
          <>
            <ClipLoader color={colorGrade.hexCode} size={13} />
            <span>Processing...</span>
          </>
        ) : (
          "Save"
        )}
      </button>
    </form>
  );
};

export default TranslationForm;
