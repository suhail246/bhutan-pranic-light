"use client";

import { globalStyleObj } from "@/app/assets/styles";
import { LabelText, RenderCategoryOptions } from "@/components";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";

const CommonSelectInputField = ({
  fieldName,
  fieldId,
  control,
  errors,
  errorsType,
  itemList = [],
  notFoundText,
  labelName,
  labelStatus,
  extraClass = "",
  extraItemName = "",
  placeholderText = "--",
}) => {
  return (
    <div
      className={`${extraClass} ${globalStyleObj.commonInputContainerClass}`}
    >
      <LabelText text={labelName} htmlForId={fieldId} star={labelStatus} />
      <div className="flex flex-col gap-2 w-full max-w-[800px]">
        <Controller
          name={fieldName}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              id={fieldId}
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
            >
              <SelectTrigger
                className={globalStyleObj.commonDefaultInputFieldClass}
              >
                <SelectValue placeholder={placeholderText} />
              </SelectTrigger>
              <SelectContent
                className={`border-0 ${globalStyleObj.backgroundLight900Dark200}`}
              >
                <SelectGroup>
                  {extraItemName && (
                    <SelectItem
                      value={extraItemName.toLowerCase()}
                      className="text-red-500 test-[13px] font-poppins-rg"
                    >
                      {extraItemName}
                    </SelectItem>
                  )}
                  {itemList.length > 0 ? (
                    <RenderCategoryOptions categoryList={itemList} />
                  ) : (
                    <p className="text-light-weight-400 text-[13px] font-poppins-rg flex items-center justify-center gap-2">
                      <MdErrorOutline size={16} color="#878a99" />
                      {notFoundText}
                    </p>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
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

export default CommonSelectInputField;
