"use client";

import { NormalTextInputField } from "@/components";

const NewsAndBlogsHeroSection = ({
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
        fieldId="news-and-blogs-section-1-title"
        fieldName="news-and-blogs-section-1-title"
        placeholderText="Tag Title"
        inputValue={stateDetails?.["news-and-blogs-section-1-title"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraFiledInfo="Section tag name."
        translateField={true}
      />

      {/* Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading"
        fieldId="news-and-blogs-section-1-heading"
        fieldName="news-and-blogs-section-1-heading"
        placeholderText="Heading"
        inputValue={stateDetails?.["news-and-blogs-section-1-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />

      {/* SubHeaing */}
      <NormalTextInputField
        isFetching={isFetching}
        isTextArea={true}
        labelText="Sub Heading"
        fieldId="news-and-blogs-section-1-sub-heading"
        fieldName="news-and-blogs-section-1-sub-heading"
        placeholderText="Sub Heading"
        inputValue={
          stateDetails?.["news-and-blogs-section-1-sub-heading"] || ""
        }
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />
    </>
  );
};

export default NewsAndBlogsHeroSection;
