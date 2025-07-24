"use client";

import { globalStyleObj } from "@/app/assets/styles";
import { MdOutlineDeleteForever } from "react-icons/md";
import { LabelText } from "..";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";

const NormalRepeatableInputField = ({
  isFetching = false,
  labelText = "",
  fieldId = "",
  translateField = false,
  labelFieldList = [],
  valueFieldList = [],
  labelFieldName = "",
  valueFieldName = "",
  labelInputPlaceholder = "",
  valueInputPlaceholder = "",
  handleLabelFieldOnChange = () => {},
  handleValueFieldOnChange = () => {},
  handleRemoveFields = () => {},
  addFields = () => {},
  colorGrade = { bgColor: "", hoverBgColor: "", textColor: "", hexCode: "" },
  extraContainerClasses = "",
}) => {
  return (
    <>
      <div className={`flex flex-col ${extraContainerClasses}`}>
        {isFetching ? (
          <Skeleton className="w-[150px] h-[30px] rounded-md" />
        ) : (
          <LabelText
            text={labelText}
            htmlForId={fieldId}
            translateField={translateField}
          />
        )}

        {labelFieldList.length > 0 && (
          <ul
            className={`w-full gap-3 mt-2 ${valueFieldList.length > 0 ? "flex flex-col" : "flex flex-wrap"}`}
          >
            {labelFieldList.map((item, index) =>
              isFetching ? (
                <Skeleton
                  key={`opening-timings-filed-${index + 1}`}
                  className="w-full h-[50px] rounded-md"
                />
              ) : (
                <li
                  key={`opening-timings-filed-${index + 1}`}
                  className={`${valueFieldList.length > 0 ? "flex justify-between gap-3" : "flex gap-3"}`}
                >
                  <Input
                    id={`opening-days-filed-${index + 1}`}
                    type="text"
                    name={labelFieldName}
                    value={item}
                    onChange={(e) =>
                      handleLabelFieldOnChange(
                        index,
                        e.target.name,
                        e.target.value
                      )
                    }
                    placeholder={labelInputPlaceholder}
                    className="max-w-[200px] border border-[#000]/20 py-5 font-poppins-rg text-[13px] text-light-weight-400 focus-visible:outline-none focus-visible:ring-0 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400"
                  />

                  {valueFieldList.length > 0 && (
                    <Input
                      id={`opening-times-filed-${index + 1}`}
                      type="text"
                      name={valueFieldName}
                      value={valueFieldList[index]}
                      onChange={(e) =>
                        handleValueFieldOnChange(
                          index,
                          e.target.name,
                          e.target.value
                        )
                      }
                      placeholder={valueInputPlaceholder}
                      className={`${globalStyleObj.commonSettingInputFieldClass}`}
                    />
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveFields(index, labelFieldName, valueFieldName)
                    }
                    className="flex justify-center items-center"
                  >
                    <MdOutlineDeleteForever
                      size={25}
                      className="text-red-500 hover:scale-[1.2] transition-300"
                    />
                  </button>
                </li>
              )
            )}
          </ul>
        )}

        {isFetching ? (
          <Skeleton className="w-[120px] h-[40px] rounded-md mt-4" />
        ) : (
          <button
            type="button"
            onClick={() => addFields(labelFieldName, valueFieldName)}
            className={`${globalStyleObj.flexCenter} transition-300 gap-2 rounded-[4px] ${colorGrade.bgColor} ${colorGrade.hoverBgColor} ${colorGrade.textColor} px-5 py-2 font-poppins-rg text-[13px] tracking-wide hover:text-white mt-4 w-full sm:max-w-[120px] dark:text-light-weight-800`}
          >
            Add
          </button>
        )}
      </div>
    </>
  );
};

export default NormalRepeatableInputField;
