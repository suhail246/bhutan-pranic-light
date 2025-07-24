import { CareersHeroSection, GetInTouchFiledSection } from "@/components";

const CareersCMSForm = ({
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
        <CareersHeroSection
          isFetching={isFetching}
          stateDetails={formData}
          handleTextInputChange={handleTextInputChange}
        />
      )}

      {selectedTab === "section-2" && (
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
          imageKey="careers-section-2-booking-image"
          titleKey="careers-section-2-booking-title"
          headingKey="careers-section-2-booking-heading"
          subHeadingKey="careers-section-2-booking-sub-heading"
          buttonLabelKey="careers-section-2-booking-button-label"
          buttonLinkKey="careers-section-2-booking-button-link"
        />
      )}
    </>
  );
};

export default CareersCMSForm;
