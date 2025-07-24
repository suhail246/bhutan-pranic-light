"use client";

import { globalStyleObj } from "@/app/assets/styles";
import { LabelText } from "..";
import { Skeleton } from "../ui/skeleton";
import { Switch } from "../ui/switch";

const NormalSwitchInputField = ({
  isFetching = false,
  labelText = "Anonymous",
  fieldId = "unknown",
  fieldName = "unknown",
  switchStatus = "0",
  onChangeSwtichState,
  extraContainerClasses = "",
  customBodySize = "",
  customThumbSize = "",
}) => {
  return (
    <div
      className={`${globalStyleObj.commonSettingInputContainerClass} ${extraContainerClasses}`}
    >
      {isFetching ? (
        <>
          <Skeleton className="w-[150px] h-[30px] rounded-md" />
          <Skeleton className={`w-full lg:max-w-[500px] h-[50px] rounded-md`} />
        </>
      ) : (
        <>
          <LabelText text={labelText} htmlForId={fieldId} />

          <div className="w-full lg:max-w-[500px]">
            <Switch
              id={fieldId}
              name={fieldName}
              checked={switchStatus === "1" ? true : false}
              onCheckedChange={onChangeSwtichState}
              className={`data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-slate-200 dark:data-[state=checked]:bg-green-500 dark:data-[state=unchecked]:bg-[#000]/20 ${customBodySize ? customBodySize : "h-3 w-7"}`}
              thumbClassName={`data-[state=checked]:bg-[#fff] data-[state=unchecked]:bg-[#fff] dark:data-[state=checked]:bg-[#fff] dark:data-[state=unchecked]:bg-[#fff]/20 ${customThumbSize ? customThumbSize : "h-2 w-2"}`}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default NormalSwitchInputField;
