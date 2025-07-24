"use client";

import { globalStyleObj } from "@/app/assets/styles";
import { Controller } from "react-hook-form";
import { Input } from "../ui/input";

const TextInputField = ({
  fieldName,
  fieldType,
  fieldId,
  control,
  errors,
  errorsType,
  placeholderText,
}) => {
  return (
    <>
      <Controller
        name={fieldName}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            id={fieldId}
            type={fieldType}
            value={field.value || ""}
            placeholder={placeholderText}
            className={globalStyleObj.commonDefaultInputFieldClass}
          />
        )}
      />
      {errors && errorsType && (
        <p className={globalStyleObj.commonInputErrorClass}>
          {errorsType.message}
        </p>
      )}
    </>
  );
};

export default TextInputField;
