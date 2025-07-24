"use client";

import { globalStyleObj } from "@/app/assets/styles";
import { MdErrorOutline } from "react-icons/md";
import { LabelText } from "..";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Skeleton } from "../ui/skeleton";

const NormalSelectInputFields = ({
  isFetching = false,
  labelText = "Anonymous",
  fieldId = "unknown",
  selectedValue = "",
  onSelectInputFiledChangeFunction,
  placeholderText = "",
  targetDataList = [],
  targetItemKeyName = "label",
  extraContainerClasses = "",
  extraInputClasses = "",
}) => {
  return (
    <div
      className={`${globalStyleObj.commonSettingInputContainerClass} ${extraContainerClasses}`}
    >
      {isFetching ? (
        <>
          <Skeleton className="w-[150px] h-[30px] rounded-md" />
          <Skeleton className="w-full lg:max-w-[500px] h-[50px] rounded-md" />
        </>
      ) : (
        <>
          <LabelText text={labelText} htmlForId={fieldId} />

          <div className={`w-full lg:max-w-[500px] ${extraInputClasses}`}>
            <Select
              id={fieldId}
              value={selectedValue}
              onValueChange={(value) => onSelectInputFiledChangeFunction(value)}
            >
              <SelectTrigger
                className={globalStyleObj.commonSettingInputFieldClass}
              >
                <SelectValue placeholder={placeholderText} />
              </SelectTrigger>

              <SelectContent
                className={`${globalStyleObj.backgroundLight900Dark200}`}
              >
                <SelectGroup>
                  {targetDataList.length > 0 ? (
                    targetDataList.map((item) => (
                      <SelectItem
                        key={item._id}
                        value={item._id}
                        className="text-[13px] font-poppins-rg text-dark-weight-550 dark:text-light-weight-450"
                      >
                        {item[targetItemKeyName]}
                      </SelectItem>
                    ))
                  ) : (
                    <p className="text-light-weight-400 text-[13px] font-poppins-rg flex items-center justify-center gap-2">
                      <MdErrorOutline size={16} color="#878a99" />
                      No data found
                    </p>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </>
      )}
    </div>
  );
};

export default NormalSelectInputFields;
