"use client";

import { globalStyleObj } from "@/app/assets/styles";
import { Controller } from "react-hook-form";
import { LabelText } from "..";
import { Input } from "../ui/input";

const CommonTextInputField = ({
  fieldName,
  fieldType,
  fieldId,
  control,
  errors,
  errorsType,
  placeholderText,
  labelName,
  labelStatus,
  extraClass = "",
  inputBoxMaxWidth = "max-w-[800px]",
  translateField = false,
  extraInformationText = "",
}) => {
  return (
    <div
      className={`${globalStyleObj.commonInputContainerClass} ${extraClass}`}
    >
      <LabelText
        text={labelName}
        htmlForId={fieldId}
        star={labelStatus}
        translateField={translateField}
      />
      <div className={`flex flex-col gap-2 w-full ${inputBoxMaxWidth}`}>
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
        {errors && errorsType ? (
          <p className={globalStyleObj.commonInputErrorClass}>
            {errorsType.message}
          </p>
        ) : extraInformationText ? (
          <p className="text-[12px] font-poppins-rg text-light-weight-400">
            {extraInformationText}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default CommonTextInputField;
