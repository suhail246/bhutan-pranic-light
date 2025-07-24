import { CoursesHeroSection, GetInTouchFiledSection } from "@/components";

const CoursesCMSForm = ({
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
        <CoursesHeroSection
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
          imageKey="courses-section-2-booking-image"
          titleKey="courses-section-2-booking-title"
          headingKey="courses-section-2-booking-heading"
          subHeadingKey="courses-section-2-booking-sub-heading"
          buttonLabelKey="courses-section-2-booking-button-label"
          buttonLinkKey="courses-section-2-booking-button-link"
        />
      )}
    </>
  );
};

export default CoursesCMSForm;
