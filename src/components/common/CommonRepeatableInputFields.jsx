"use client";

import { globalStyleObj } from "@/app/assets/styles";
import { Trash2 } from "lucide-react";
import { LabelText } from "..";
import { Input } from "../ui/input";

const CommonRepeatableInputFields = ({
  labelText = "",
  fieldId = "",
  lableStatus = false,
  itemDetailsExist = false,
  repeatableField = {},
  singleRepeatableField = [],
  repeatableLabelInputType = "text",
  repeatableLabelFieldName = "labels",
  repeatableLabelFieldPlaceholder = "Days",
  repeatableValueInputType = "text",
  repeatableValueFieldName = "values",
  repeatableValueFieldPlaceholder = "Timings",
  addLabelField = () => {},
  addValueField = () => {},
  handleAddRepeatableField = () => {},
  handleRemoveRepeatableField = () => {},
  colorGrade = { bgColor: "", hoverBgColor: "", textColor: "", hexCode: "" },
  extraContainerClasses = "",
}) => {
  return (
    <div
      className={`${globalStyleObj.commonInputContainerClass} ${extraContainerClasses}`}
    >
      <LabelText
        text={labelText}
        htmlForId={fieldId}
        star={lableStatus}
        translateField={itemDetailsExist}
      />

      <div className="w-full max-w-[800px]">
        {Object.keys(repeatableField).length > 0 ? (
          <>
            {repeatableField?.labels?.length > 0 && (
              <ul
                className={`w-full gap-1 md:gap-2 ${
                  repeatableField?.values ? "flex flex-col" : "flex flex-wrap"
                }`}
              >
                {repeatableField.labels.map((item, index) => (
                  <li
                    key={`repeatable-filed-${index + 1}`}
                    className="flex items-center gap-1 md:gap-2"
                  >
                    <Input
                      type={repeatableLabelInputType}
                      name={repeatableLabelFieldName}
                      value={item}
                      onChange={(e) => addLabelField(e.target.value, index)}
                      placeholder={repeatableLabelFieldPlaceholder}
                      className="max-w-[120px] md:max-w-[200px] border border-[#000]/20 py-5 font-poppins-rg text-[13px] text-light-weight-400 focus-visible:outline-none focus-visible:ring-0 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400"
                    />

                    {repeatableField?.values ? (
                      <Input
                        type={repeatableValueInputType}
                        name={repeatableValueFieldName}
                        value={repeatableField[repeatableValueFieldName][index]}
                        onChange={(e) => addValueField(e.target.value, index)}
                        placeholder={repeatableValueFieldPlaceholder}
                        className="w-full border border-[#000]/20 py-5 font-poppins-rg text-[13px] text-light-weight-400 focus-visible:outline-none focus-visible:ring-0 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400"
                      />
                    ) : null}

                    <Trash2
                      size={25}
                      onClick={() => handleRemoveRepeatableField(index)}
                      className="text-red-500 hover:scale-[1.2] transition-300 cursor-pointer"
                    />
                  </li>
                ))}
              </ul>
            )}

            <button
              type="button"
              onClick={handleAddRepeatableField}
              className={`w-fit px-5 py-2 text-[14px] font-poppins-rg ${colorGrade.bgColor} ${colorGrade.hoverBgColor} ${colorGrade.textColor} ${repeatableField?.labels?.length > 0 || repeatableField?.values?.length > 0 ? "mt-2" : ""} hover:text-white transition-300 rounded-sm`}
            >
              Add
            </button>
          </>
        ) : (
          <>
            {singleRepeatableField.length > 0 && (
              <ul className={`w-full gap-1 md:gap-2 flex flex-wrap`}>
                {singleRepeatableField.map((item, index) => (
                  <li
                    key={`repeatable-filed-${index + 1}`}
                    className="flex items-center gap-1 md:gap-2"
                  >
                    <Input
                      type={repeatableLabelInputType}
                      name={repeatableLabelFieldName}
                      value={item}
                      onChange={(e) => addLabelField(e.target.value, index)}
                      placeholder={repeatableLabelFieldPlaceholder}
                      className="max-w-[120px] md:max-w-[200px] border border-[#000]/20 py-5 font-poppins-rg text-[13px] text-light-weight-400 focus-visible:outline-none focus-visible:ring-0 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400"
                    />

                    <Trash2
                      size={25}
                      onClick={() => handleRemoveRepeatableField(index)}
                      className="text-red-500 hover:scale-[1.2] transition-300 cursor-pointer"
                    />
                  </li>
                ))}
              </ul>
            )}

            <button
              type="button"
              onClick={handleAddRepeatableField}
              className={`w-fit px-5 py-2 text-[14px] font-poppins-rg ${colorGrade.bgColor} ${colorGrade.hoverBgColor} ${colorGrade.textColor} ${singleRepeatableField.length > 0 ? "mt-2" : ""} hover:text-white transition-300 rounded-sm`}
            >
              Add
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CommonRepeatableInputFields;
