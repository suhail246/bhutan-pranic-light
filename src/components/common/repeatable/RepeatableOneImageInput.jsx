"use client";

import { globalStyleObj } from "@/app/assets/styles";
import { FileReuseDialog, LabelText } from "@/components";
import { getFileSettingsValue } from "@/utils/website-settings-helper";
import { MdAdd, MdClose } from "react-icons/md";

const RepeatableOneImageInput = ({
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
  filesList = [],
  allFiles = [],
  paginationDetails = {},
  searchValue = "",
  selectedFileType = "",
  adminRole = "",
  permissionsList = [],
  isCourseDetailsExist = false,
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
                      {/* Image */}
                      <div className="flex flex-col gap-2 w-full">
                        <FileReuseDialog
                          htmlId={`items-card-image-${index + 1}`}
                          filesList={filesList}
                          allFiles={allFiles}
                          paginationDetails={paginationDetails}
                          searchValue={searchValue}
                          selectedFileType={selectedFileType}
                          onChangeBannerImage={(id) =>
                            onChangeField(
                              repeatableKeyname,
                              repeatableKeys[0],
                              id,
                              index
                            )
                          }
                          selectedBannerFileId={
                            isCourseDetailsExist
                              ? (getFileSettingsValue(
                                  allFiles,
                                  formData?.[repeatableKeyname]?.[
                                    repeatableKeys[0]
                                  ]?.[index] || ""
                                )?._id ?? null)
                              : null
                          }
                          selectedBannerFileName={
                            isCourseDetailsExist
                              ? (getFileSettingsValue(
                                  allFiles,
                                  formData?.[repeatableKeyname]?.[
                                    repeatableKeys[0]
                                  ]?.[index] || ""
                                )?.fileName ?? null)
                              : null
                          }
                          adminRole={adminRole}
                          permissionsList={permissionsList}
                        />
                      </div>
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

export default RepeatableOneImageInput;
