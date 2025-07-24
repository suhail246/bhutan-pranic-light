"use client";

import { globalStyleObj } from "@/app/assets/styles";
import JoditEditor from "jodit-react";
import { useTheme } from "next-themes";
import { LabelText } from "..";
import { Skeleton } from "../ui/skeleton";

const NormalTextEditorInputFiled = ({
  isFetching = false,
  labelText = "",
  fieldId = "unknown",
  fieldName = "unknown",
  placeholderText = "",
  inputValue = "",
  toolbarButtons = "",
  onChangeTextEditorFiled,
  extraFiledInfo = "",
  extraContainerClasses = "",
  extraInputClasses = "",
  textEditorMaxWidth = "lg:max-w-[500px]",
  translateField = false,
}) => {
  const { theme } = useTheme();

  return (
    <div
      className={`${extraContainerClasses} ${globalStyleObj.commonSettingInputContainerClass}`}
    >
      {isFetching ? (
        <>
          <Skeleton className="w-[150px] h-[30px] rounded-md" />
          <Skeleton className="w-full lg:max-w-[500px] h-[250px] rounded-md" />
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

          <div
            className={`w-full rounded-sm border border-[#000]/20 dark:border-[#fff]/10 ${textEditorMaxWidth}`}
          >
            <JoditEditor
              config={{
                placeholder: placeholderText,
                showCharsCounter: false,
                showWordsCounter: false,
                showXPathInStatusbar: false,
                height: 300,
                style: {
                  backgroundColor: theme === "light" ? "#ffffff" : "#22262A",
                  color: theme === "light" ? "#495057" : "#ced4da",
                },
                toolbarButtonSize: "middle",
                toolbar: true,
                buttons:
                  toolbarButtons === "all"
                    ? [
                        "bold",
                        "italic",
                        "underline",
                        "strikethrough",
                        "eraser",
                        "ul",
                        "ol",
                        "link",
                        "image",
                        "table",
                        "hr",
                        "align",
                        "font",
                        "fontsize",
                        "brush",
                        "paragraph",
                        "fullsize",
                        "source",
                      ] // Full toolbar
                    : [
                        "bold",
                        "italic",
                        "underline",
                        "ul",
                        "ol",
                        "link",
                        "source",
                      ], // Default minimal toolbar
                toolbarAdaptive: false,
              }}
              id={fieldId}
              value={inputValue}
              name={fieldName}
              onBlur={(newContent) =>
                onChangeTextEditorFiled(newContent, fieldName)
              }
            />

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

export default NormalTextEditorInputFiled;
