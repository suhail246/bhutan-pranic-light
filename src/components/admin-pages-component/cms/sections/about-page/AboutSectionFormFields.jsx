"use client";

import {
  NormalTextEditorInputFiled,
  NormalTextInputField,
  RepeatableWidgetCards,
} from "@/components";
import { useMemo } from "react";

const AboutSectionFormFields = ({
  activeLang,
  isFetching,
  stateDetails,
  allFilesResponse,
  searchValue,
  selectedFileType,
  handleTextInputChange,
  handleTextEditorInputChange,
  handleImageChange,
  adminRole,
  permissionsList,
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
        fieldId="about-us-section-2-title"
        fieldName="about-us-section-2-title"
        placeholderText="Tag Title"
        inputValue={stateDetails?.["about-us-section-2-title"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraFiledInfo="Section tag name."
        translateField={true}
      />

      {/* Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading"
        fieldId="about-us-section-2-heading"
        fieldName="about-us-section-2-heading"
        placeholderText="Heading"
        inputValue={stateDetails?.["about-us-section-2-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />

      {/* Description */}
      <NormalTextEditorInputFiled
        isFetching={isFetching}
        labelText="Description"
        fieldId="about-us-section-2-description"
        fieldName="about-us-section-2-description"
        placeholderText="Description"
        inputValue={stateDetails?.["about-us-section-2-description"] || ""}
        onChangeTextEditorFiled={handleTextEditorInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />

      {/* Repeatable Widget Cards */}
      <RepeatableWidgetCards
        stateDetails={stateDetails}
        isFetching={isFetching}
        allFilesResponse={allFilesResponse}
        labelText="Widget Cards"
        fieldId="about-us-section-2-widget-cards"
        searchValue={searchValue}
        selectedFileType={selectedFileType}
        adminRole={adminRole}
        permissionsList={permissionsList}
        handleImageChange={handleImageChange}
        handleTextInputChange={handleTextInputChange}
        isHideInOtherLanguages={isHideInOtherLanguages}
        translateField={true}
        extraContainerClasses="mt-5"
      />
    </>
  );
};

export default AboutSectionFormFields;
