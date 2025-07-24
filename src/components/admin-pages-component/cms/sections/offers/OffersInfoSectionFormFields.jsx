"use client";

import { NormalTextEditorInputFiled, NormalTextInputField } from "@/components";
import { useMemo } from "react";

const OffersInfoSectionFormFields = ({
  activeLang,
  isFetching,
  stateDetails,
  handleTextInputChange,
  handleTextEditorInputChange,
}) => {
  const isHideInOtherLanguages = useMemo(() => {
    return activeLang === "en";
  }, [activeLang]);

  return (
    <>
      {/* Tag Name */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Title"
        fieldId="offers-section-2-title"
        fieldName="offers-section-2-title"
        placeholderText="Tag Title"
        inputValue={stateDetails?.["offers-section-2-title"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraFiledInfo="Section tag name."
        translateField={true}
      />

      {/* Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading"
        fieldId="offers-section-2-heading"
        fieldName="offers-section-2-heading"
        placeholderText="Heading"
        inputValue={stateDetails?.["offers-section-2-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />

      {/* Description */}
      <NormalTextEditorInputFiled
        isFetching={isFetching}
        labelText="Description"
        fieldId="offers-section-2-description"
        fieldName="offers-section-2-description"
        placeholderText="Description"
        inputValue={stateDetails?.["offers-section-2-description"] || ""}
        onChangeTextEditorFiled={handleTextEditorInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />

      {/* Button Label */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Button Label"
        fieldId="offers-section-2-button-label"
        fieldName="offers-section-2-button-label"
        placeholderText="Label"
        inputValue={stateDetails?.["offers-section-2-button-label"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />

      {/* Button Link */}
      {isHideInOtherLanguages && (
        <NormalTextInputField
          isFetching={isFetching}
          labelText="Button Link"
          fieldId="offers-section-2-button-link"
          fieldName="offers-section-2-button-link"
          placeholderText="Link"
          inputValue={stateDetails?.["offers-section-2-button-link"] || ""}
          onChangeTextInputField={handleTextInputChange}
          extraFiledInfo="Redirection path"
          extraContainerClasses="mt-5"
        />
      )}
    </>
  );
};

export default OffersInfoSectionFormFields;
