"use client";

import { NormalTextInputField } from "@/components";

const NewsAndBlogsListingSection = ({
  isFetching,
  stateDetails,
  handleTextInputChange,
}) => {
  return (
    <>
      {/* Category Title */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Category Title"
        fieldId="news-and-blogs-section-2-category-title"
        fieldName="news-and-blogs-section-2-category-title"
        placeholderText="Category Title"
        inputValue={
          stateDetails?.["news-and-blogs-section-2-category-title"] || ""
        }
        onChangeTextInputField={handleTextInputChange}
        extraFiledInfo="Categories lisitng title."
        translateField={true}
      />

      {/* News/Blogs Title */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="News/Blogs Title"
        fieldId="news-and-blogs-section-2-news-blogs-title"
        fieldName="news-and-blogs-section-2-news-blogs-title"
        placeholderText="Heading"
        inputValue={
          stateDetails?.["news-and-blogs-section-2-news-blogs-title"] || ""
        }
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        extraFiledInfo="News & Blogs lisitng title."
        translateField={true}
      />
    </>
  );
};

export default NewsAndBlogsListingSection;
