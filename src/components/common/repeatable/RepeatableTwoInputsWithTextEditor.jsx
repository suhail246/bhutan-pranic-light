"use client";

import { globalStyleObj } from "@/app/assets/styles";
import { LabelText, NormalTextEditorInputFiled } from "@/components";
import { Input } from "@/components/ui/input";
import { MdAdd, MdClose } from "react-icons/md";

const RepeatableTwoInputsWithTextEditor = ({
  formData = {},
  labelText = "",
  fieldId = "",
  lableStatus = false,
  translateField = false,
  repeatableKeyname = "",
  repeatableKeys = [],
  addNewField = () => {},
  removeField = () => {},
  onChangeField = () => {},
  extraContainerClasses = "",
  inputBoxMaxWidth = "lg:max-w-[800px]",
}) => {
  return (
    <div
      className={`${globalStyleObj.commonInputContainerClass} ${extraContainerClasses}`}
    >
      <LabelText
        text={labelText}
        htmlForId={fieldId}
        star={lableStatus}
        translateField={translateField}
      />

      <div className={`w-full ${inputBoxMaxWidth}`}>
        {formData?.[repeatableKeyname] &&
          formData?.[repeatableKeyname]?.[repeatableKeys[0]]?.length > 0 && (
            <ul className="w-full flex flex-col border border-dashed border-[#000]/20 dark:border-[#fff]/10 rounded-md">
              {formData[repeatableKeyname][repeatableKeys[0]].map(
                (eachItem, index) => (
                  <li
                    key={`items-card-${index + 1}`}
                    className="flex gap-1 px-4 py-3"
                  >
                    <div className="flex flex-col gap-3 w-full">
                      {/* Title */}
                      <Input
                        type="text"
                        name={repeatableKeys[0]}
                        value={
                          formData?.[repeatableKeyname]?.[
                            repeatableKeys?.[0]
                          ]?.[index] || ""
                        }
                        onChange={(e) =>
                          onChangeField(
                            repeatableKeyname,
                            repeatableKeys[0],
                            e.target.value,
                            index
                          )
                        }
                        placeholder="Title"
                        className="w-full border border-[#000]/20 font-poppins-rg text-[13px] text-light-weight-400 focus-visible:outline-none focus-visible:ring-0 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400"
                      />

                      {/* Desctiption */}
                      <NormalTextEditorInputFiled
                        fieldName={repeatableKeys[1]}
                        placeholderText="Description"
                        inputValue={
                          formData?.[repeatableKeyname]?.[
                            repeatableKeys?.[1]
                          ]?.[index] || ""
                        }
                        toolbarButtons=""
                        onChangeTextEditorFiled={(newContent, fieldName) =>
                          onChangeField(
                            repeatableKeyname,
                            repeatableKeys[1],
                            newContent,
                            index
                          )
                        }
                        textEditorMaxWidth="w-full"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removeField(repeatableKeyname, repeatableKeys, index)
                      }
                      className="size-[30px] flex items-center justify-center"
                    >
                      <MdClose size={20} color="red" />
                    </button>
                  </li>
                )
              )}
            </ul>
          )}
        <button
          type="button"
          onClick={() => addNewField(repeatableKeyname, repeatableKeys)}
          className={`w-full max-w-[400px] py-2 rounded-md bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-white transition-300 text-[14px] font-poppins-rg flex justify-center items-center gap-2 ${formData?.[repeatableKeyname]?.[repeatableKeys[0]]?.length > 0 ? "mt-4 mx-auto" : ""}`}
        >
          <MdAdd size={20} />
          <span>Add New</span>
        </button>
      </div>
    </div>
  );
};

export default RepeatableTwoInputsWithTextEditor;
