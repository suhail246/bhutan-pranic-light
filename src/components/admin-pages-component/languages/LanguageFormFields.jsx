"use client";

import { CommonTextInputField, SubmitButton } from "@/components";
import { FaLanguage } from "react-icons/fa";

const LanguageFormFields = ({
  submitFunction,
  isLanguageDetailsExist,
  control,
  errors,
  isSubmitting,
  colorGrade,
  hasChanges,
}) => {
  return (
    <form onSubmit={submitFunction} className={`p-3 sm:p-5`}>
      {/* Language Name */}
      <CommonTextInputField
        fieldName="name"
        fieldType="text"
        fieldId={`${isLanguageDetailsExist ? "update-language-name" : "language-name"}`}
        control={control}
        errors={errors}
        errorsType={errors?.name}
        placeholderText="Enter Language Name"
        labelName="Name"
        labelStatus={true}
      />

      {/* Language Code */}
      <CommonTextInputField
        fieldName="code"
        fieldType="text"
        fieldId={`${isLanguageDetailsExist ? "update-language-code" : "language-code"}`}
        control={control}
        errors={errors}
        errorsType={errors?.code}
        placeholderText="Enter Language Code"
        labelName="Code"
        labelStatus={true}
        extraClass="mt-5"
      />

      {/* Language App Code */}
      <CommonTextInputField
        fieldName="app_lang_code"
        fieldType="text"
        fieldId={`${isLanguageDetailsExist ? "update-language-app-code" : "language-app-code"}`}
        control={control}
        errors={errors}
        errorsType={errors?.app_lang_code}
        placeholderText="Enter Language App Code"
        labelName="App Code"
        labelStatus={false}
        extraClass="mt-5"
      />

      <SubmitButton
        isSubmitting={isSubmitting}
        hasChanges={hasChanges}
        isDetailsExist={isLanguageDetailsExist}
        colorGrade={colorGrade}
        label={isLanguageDetailsExist ? "Update" : "Create"}
        icon={<FaLanguage />}
      />
    </form>
  );
};

export default LanguageFormFields;
