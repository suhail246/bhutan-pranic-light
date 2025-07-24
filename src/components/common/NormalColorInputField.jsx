"use client";

import { globalStyleObj } from "@/app/assets/styles";
import { LabelText } from "..";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";

const NormalColorInputField = ({
  isFetching = false,
  labelText = "",
  fieldId = "unknown",
  fieldName = "unknown",
  placeholderText = "",
  inputValue = "",
  onChangeTextInputField,
  selectedHexCode = "",
  extraContainerClasses = "",
  extraInputClasses = "",
}) => {
  return (
    <div
      className={`${globalStyleObj.commonSettingInputContainerClass} ${extraContainerClasses}`}
    >
      {isFetching ? (
        <>
          {labelText && <Skeleton className="w-[150px] h-[30px] rounded-md" />}
          <Skeleton className={`w-full lg:max-w-[500px] h-[50px] rounded-md`} />
        </>
      ) : (
        <>
          {labelText && (
            <LabelText
              text={labelText}
              htmlForId={fieldId}
              translateField={translateField}
            />
          )}

          <div className="w-full lg:max-w-[500px]">
            <Input
              type="color"
              id={fieldId}
              name={fieldName}
              placeholder={placeholderText}
              value={inputValue}
              onChange={(e) => onChangeTextInputField(e)}
              className={`w-full lg:max-w-[500px] border border-[#000]/20 font-poppins-rg text-[13px] text-light-weight-400 focus-visible:outline-none focus-visible:ring-0 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400 ${extraInputClasses}`}
            />

            {selectedHexCode && (
              <p className="text-[10px] font-poppins-rg text-light-weight-400 mt-1">
                {`${selectedHexCode}${inputValue}`}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NormalColorInputField;
