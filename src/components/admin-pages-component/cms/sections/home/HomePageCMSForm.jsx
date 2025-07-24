import {
  GetInTouchFiledSection,
  HomeAboutUsSectionFormField,
  HomeBannerSectionFormFields,
  HomeCoursesSectionFormField,
  HomeInfoSectionFormField,
  HomeNewsSectionFormField,
  HomePricingSectionFormField,
  HomeTestimonialSectionFormField,
} from "@/components";

const HomePageCMSForm = ({
  activeTab,
  isFetching,
  formData,
  selectedTab,
  allFilesResponse,
  searchValue,
  selectedFileType,
  handleTextInputChange,
  handleTextEditorInputChange,
  handleImageChange,
  adminRole,
  permissionsList,
}) => {
  return (
    <>
      {/* Banner Section */}
      {selectedTab === "section-1" && (
        <HomeBannerSectionFormFields
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
        />
      )}

      {/* Info Section */}
      {selectedTab === "section-2" && (
        <HomeInfoSectionFormField
          isFetching={isFetching}
          stateDetails={formData}
          handleTextInputChange={handleTextInputChange}
        />
      )}

      {/* About us Section */}
      {selectedTab === "section-3" && (
        <HomeAboutUsSectionFormField
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
        />
      )}

      {/* Courses Section */}
      {selectedTab === "section-4" && (
        <HomeCoursesSectionFormField
          isFetching={isFetching}
          stateDetails={formData}
          handleTextInputChange={handleTextInputChange}
        />
      )}

      {/* Pricing Section */}
      {selectedTab === "section-5" && (
        <HomePricingSectionFormField
          activeLang={activeTab}
          isFetching={isFetching}
          stateDetails={formData}
          handleTextInputChange={handleTextInputChange}
        />
      )}

      {/* News Section */}
      {selectedTab === "section-6" && (
        <HomeNewsSectionFormField
          isFetching={isFetching}
          stateDetails={formData}
          handleTextInputChange={handleTextInputChange}
        />
      )}

      {/* Testimonial Section */}
      {selectedTab === "section-7" && (
        <HomeTestimonialSectionFormField
          isFetching={isFetching}
          stateDetails={formData}
          handleTextInputChange={handleTextInputChange}
        />
      )}

      {/* Booking Section */}
      {selectedTab === "section-8" && (
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
          imageKey="home-section-8-booking-image"
          titleKey="home-section-8-booking-title"
          headingKey="home-section-8-booking-heading"
          subHeadingKey="home-section-8-booking-sub-heading"
          buttonLabelKey="home-section-8-booking-button-label"
          buttonLinkKey="home-section-8-booking-button-link"
        />
      )}
    </>
  );
};

export default HomePageCMSForm;
