"use client";

import { globalStyleObj } from "@/app/assets/styles";
import { LabelText } from "@/components";
import { Textarea } from "@/components/ui/textarea";
import { Controller } from "react-hook-form";

const CommonTextAreaField = ({
  fieldName,
  fieldId,
  control,
  errors,
  errorsType,
  labelName,
  labelStatus,
  placeholderText = "",
  extraClass = "",
  inputBoxMaxWidth = "max-w-[800px]",
  translateField = false,
}) => {
  return (
    <div
      className={`${extraClass} ${globalStyleObj.commonInputContainerClass}`}
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
            <Textarea
              {...field}
              id={fieldId}
              value={field.value || ""}
              placeholder={placeholderText}
              className={`h-[100px] ${globalStyleObj.commonDefaultInputFieldClass}`}
            />
          )}
        />

        {errors && errorsType && (
          <p className={globalStyleObj.commonInputErrorClass}>
            {errorsType.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default CommonTextAreaField;
