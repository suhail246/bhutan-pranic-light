"use client";

import { globalStyleObj } from "@/app/assets/styles";
import { useState } from "react";
import {
  LabelText,
  NormalBrowseFileInputFiled,
  NormalColorInputField,
  NormalTextInputField,
} from "../../../..";
import { Skeleton } from "../../../../ui/skeleton";

const RepeatableWidgetCards = ({
  stateDetails,
  isFetching = false,
  allFilesResponse,
  labelText = "",
  fieldId = "",
  searchValue,
  selectedFileType,
  adminRole,
  permissionsList,
  handleImageChange,
  handleTextInputChange,
  isHideInOtherLanguages = false,
  translateField = false,
  extraContainerClasses = "",
}) => {
  const [cards, setCards] = useState([{ id: 0 }, { id: 1 }, { id: 2 }]);

  // Handle Image Change
  const getSelectedBannerImageId = (fieldName, id) => {
    if (id) {
      handleImageChange(fieldName, id);
    } else {
      handleImageChange(fieldName, "");
    }
  };

  return (
    <div
      className={`${globalStyleObj.commonSettingInputContainerClass} ${extraContainerClasses}`}
    >
      {isFetching ? (
        <Skeleton className="w-[150px] h-[30px] rounded-md" />
      ) : (
        <LabelText
          text={labelText}
          htmlForId={fieldId}
          translateField={translateField}
        />
      )}

      <ul className={`flex flex-col gap-2 w-full lg:max-w-[500px]`}>
        {/* Repeatable Cards */}
        {cards.length > 0 &&
          cards.map((card, index) => (
            <li
              key={card.id}
              className="border border-dashed border-light-weight-400 p-2"
            >
              {/* Card Color */}
              {isHideInOtherLanguages && (
                <NormalColorInputField
                  isFetching={isFetching}
                  fieldId={`about-us-section-2-widget-card-color-${card.id}`}
                  fieldName={`about-us-section-2-widget-card-color-${card.id}`}
                  placeholderText="Card Color"
                  inputValue={
                    stateDetails?.[
                      `about-us-section-2-widget-card-color-${card.id}`
                    ] || ""
                  }
                  onChangeTextInputField={handleTextInputChange}
                  selectedHexCode="Selected Hex Code: "
                  extraContainerClasses="mb-5"
                />
              )}

              {/* Widget Icon Image */}
              {isHideInOtherLanguages && (
                <NormalBrowseFileInputFiled
                  isFetching={isFetching}
                  fieldId={`about-us-section-2-widget-card-icon-${card.id}`}
                  allFilesResponse={allFilesResponse}
                  searchValue={searchValue}
                  selectedFileType={selectedFileType}
                  onChangeImageFunction={(id) =>
                    getSelectedBannerImageId(
                      `about-us-section-2-widget-card-icon-${card.id}`,
                      id
                    )
                  }
                  selectedFileId={
                    stateDetails?.[
                      `about-us-section-2-widget-card-icon-${card.id}`
                    ] || ""
                  }
                  adminRole={adminRole}
                  permissionsList={permissionsList}
                  infoText="Recommended size: 40 x 40px"
                  extraContainerClasses="mb-5"
                />
              )}

              {/* Widget Title */}
              <NormalTextInputField
                isFetching={isFetching}
                fieldId={`about-us-section-2-widget-card-title-${card.id}`}
                fieldName={`about-us-section-2-widget-card-title-${card.id}`}
                placeholderText="Widget Title"
                inputValue={
                  stateDetails?.[
                    `about-us-section-2-widget-card-title-${card.id}`
                  ] || ""
                }
                onChangeTextInputField={handleTextInputChange}
                extraContainerClasses="mb-5"
              />

              {/* Widget Description */}
              <NormalTextInputField
                isFetching={isFetching}
                isTextArea={true}
                fieldId={`about-us-section-2-widget-card-description-${card.id}`}
                fieldName={`about-us-section-2-widget-card-description-${card.id}`}
                placeholderText="Widget Description"
                inputValue={
                  stateDetails?.[
                    `about-us-section-2-widget-card-description-${card.id}`
                  ] || ""
                }
                onChangeTextInputField={handleTextInputChange}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default RepeatableWidgetCards;
