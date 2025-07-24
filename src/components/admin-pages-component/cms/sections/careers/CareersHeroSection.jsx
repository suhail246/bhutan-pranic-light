"use client";

import { NormalTextInputField } from "@/components";

const CareersHeroSection = ({
  isFetching,
  stateDetails,
  handleTextInputChange,
}) => {
  return (
    <>
      {/* Tag Name */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Title"
        fieldId="careers-section-1-title"
        fieldName="careers-section-1-title"
        placeholderText="Tag Title"
        inputValue={stateDetails?.["careers-section-1-title"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraFiledInfo="Section tag name."
        translateField={true}
      />

      {/* Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading"
        fieldId="careers-section-1-heading"
        fieldName="careers-section-1-heading"
        placeholderText="Heading"
        inputValue={stateDetails?.["careers-section-1-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />

      {/* SubHeaing */}
      <NormalTextInputField
        isFetching={isFetching}
        isTextArea={true}
        labelText="Sub Heading"
        fieldId="careers-section-1-sub-heading"
        fieldName="careers-section-1-sub-heading"
        placeholderText="Sub Heading"
        inputValue={stateDetails?.["careers-section-1-sub-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />
    </>
  );
};

export default CareersHeroSection;
