"use client";

import { globalStyleObj } from "@/app/assets/styles";
import { LabelText } from "..";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { Textarea } from "../ui/textarea";

const NormalTextInputField = ({
  isFetching = false,
  isTextArea = false,
  labelText = "",
  labelStatus = false,
  fieldId = "unknown",
  fieldName = "unknown",
  placeholderText = "",
  inputValue = "",
  onChangeTextInputField,
  extraFiledInfo = "",
  extraContainerClasses = "",
  extraInputClasses = "",
  inputBoxSize = "lg:max-w-[500px]",
  translateField = false,
}) => {
  return (
    <div
      className={`${globalStyleObj.commonSettingInputContainerClass} ${extraContainerClasses}`}
    >
      {isFetching ? (
        <>
          {labelText && <Skeleton className="w-[150px] h-[30px] rounded-md" />}
          <Skeleton
            className={`w-full lg:max-w-[500px] ${isTextArea ? "h-[70px]" : "h-[50px]"} rounded-md`}
          />
        </>
      ) : (
        <>
          {labelText && (
            <LabelText
              text={labelText}
              htmlForId={fieldId}
              star={labelStatus}
              translateField={translateField}
            />
          )}

          <div className={`w-full ${inputBoxSize}`}>
            {isTextArea ? (
              <Textarea
                id={fieldId}
                name={fieldName}
                type="text"
                placeholder={placeholderText}
                value={inputValue}
                onChange={(e) => onChangeTextInputField(e)}
                className={`${globalStyleObj.commonSettingInputFieldClass} ${extraInputClasses}`}
              />
            ) : (
              <Input
                id={fieldId}
                name={fieldName}
                type="text"
                placeholder={placeholderText}
                value={inputValue}
                onChange={(e) => onChangeTextInputField(e)}
                className={`${globalStyleObj.commonSettingInputFieldClass} ${extraInputClasses}`}
              />
            )}

            {extraFiledInfo && (
              <p className="text-[10px] font-poppins-rg text-light-weight-400 mt-1">
                {extraFiledInfo}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NormalTextInputField;
