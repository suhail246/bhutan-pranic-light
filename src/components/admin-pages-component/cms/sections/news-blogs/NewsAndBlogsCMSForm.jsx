"use client";

import {
  GetInTouchFiledSection,
  NewsAndBlogsHeroSection,
  NewsAndBlogsListingSection,
} from "@/components";

const NewsAndBlogsCMSForm = ({
  activeTab,
  isFetching,
  formData,
  selectedTab,
  allFilesResponse,
  searchValue,
  selectedFileType,
  handleTextInputChange,
  handleImageChange,
  adminRole,
  permissionsList,
}) => {
  return (
    <>
      {selectedTab === "section-1" && (
        <NewsAndBlogsHeroSection
          isFetching={isFetching}
          stateDetails={formData}
          handleTextInputChange={handleTextInputChange}
        />
      )}

      {selectedTab === "section-2" && (
        <NewsAndBlogsListingSection
          isFetching={isFetching}
          stateDetails={formData}
          handleTextInputChange={handleTextInputChange}
        />
      )}

      {selectedTab === "section-3" && (
        <GetInTouchFiledSection
          activeLang={activeTab}
          isFetching={isFetching}
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImage={handleImageChange}
          handleTextInputChange={handleTextInputChange}
          stateDetails={formData}
          adminRole={adminRole}
          permissionsList={permissionsList}
          imageKey="news-blogs-section-3-booking-image"
          titleKey="news-blogs-section-3-booking-title"
          headingKey="news-blogs-section-3-booking-heading"
          subHeadingKey="news-blogs-section-3-booking-sub-heading"
          buttonLabelKey="news-blogs-section-3-booking-button-label"
          buttonLinkKey="news-blogs-section-3-booking-button-link"
        />
      )}
    </>
  );
};

export default NewsAndBlogsCMSForm;
