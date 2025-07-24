import { NormalBrowseFileInputFiled, NormalTextInputField } from "@/components";
import { useMemo } from "react";

const HomeAboutUsSectionFormField = ({
  activeLang,
  isFetching,
  allFilesResponse,
  searchValue,
  selectedFileType,
  onChangeImage,
  handleTextInputChange,
  stateDetails,
  adminRole,
  permissionsList,
}) => {
  const isHideInOtherLanguages = useMemo(() => {
    return activeLang === "en";
  }, [activeLang]);

  const getSelectedImage1Id = (id) => {
    if (id) {
      onChangeImage("home-section-3-about-us-image-1", id);
    } else {
      onChangeImage("home-section-3-about-us-image-1", "");
    }
  };

  const getSelectedImage2Id = (id) => {
    if (id) {
      onChangeImage("home-section-3-about-us-image-2", id);
    } else {
      onChangeImage("home-section-3-about-us-image-2", "");
    }
  };

  const getSelectedImage3Id = (id) => {
    if (id) {
      onChangeImage("home-section-3-about-us-image-3", id);
    } else {
      onChangeImage("home-section-3-about-us-image-3", "");
    }
  };

  return (
    <>
      {/* Image 1 */}
      {isHideInOtherLanguages && (
        <NormalBrowseFileInputFiled
          isFetching={isFetching}
          labelText="Image 1"
          fieldId="home-section-3-about-us-image-1"
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImageFunction={getSelectedImage1Id}
          selectedFileId={
            stateDetails?.["home-section-3-about-us-image-1"] || ""
          }
          adminRole={adminRole}
          permissionsList={permissionsList}
          extraContainerClasses="mb-5"
        />
      )}

      {/* Image 2 */}
      {isHideInOtherLanguages && (
        <NormalBrowseFileInputFiled
          isFetching={isFetching}
          labelText="Image 2"
          fieldId="home-section-3-about-us-image-2"
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImageFunction={getSelectedImage2Id}
          selectedFileId={
            stateDetails?.["home-section-3-about-us-image-2"] || ""
          }
          adminRole={adminRole}
          permissionsList={permissionsList}
          extraContainerClasses="mb-5"
        />
      )}

      {/* Image 3 */}
      {isHideInOtherLanguages && (
        <NormalBrowseFileInputFiled
          isFetching={isFetching}
          labelText="Image 3"
          fieldId="home-section-3-about-us-image-3"
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImageFunction={getSelectedImage3Id}
          selectedFileId={
            stateDetails?.["home-section-3-about-us-image-3"] || ""
          }
          adminRole={adminRole}
          permissionsList={permissionsList}
          extraContainerClasses="mb-5"
        />
      )}

      {/* Tag Name */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Title"
        fieldId="home-section-3-about-us-title"
        fieldName="home-section-3-about-us-title"
        placeholderText="Tag Title"
        inputValue={stateDetails?.["home-section-3-about-us-title"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraFiledInfo="Section tag name."
        extraContainerClasses="mb-5"
        translateField={true}
      />

      {/* Description */}
      <NormalTextInputField
        isFetching={isFetching}
        isTextArea={true}
        labelText="Description"
        fieldId="home-section-3-about-us-description"
        fieldName="home-section-3-about-us-description"
        placeholderText="Description"
        inputValue={stateDetails?.["home-section-3-about-us-description"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mb-5"
        translateField={true}
      />

      {/* Button Label */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Button Label"
        fieldId="home-section-3-about-us-button-label"
        fieldName="home-section-3-about-us-button-label"
        placeholderText="Button Label"
        inputValue={
          stateDetails?.["home-section-3-about-us-button-label"] || ""
        }
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mb-5"
        translateField={true}
      />

      {/* Button Link */}
      {isHideInOtherLanguages && (
        <NormalTextInputField
          isFetching={isFetching}
          labelText="Button Link"
          fieldId="home-section-3-about-us-button-link"
          fieldName="home-section-3-about-us-button-link"
          placeholderText="Tag Title"
          inputValue={
            stateDetails?.["home-section-3-about-us-button-link"] || ""
          }
          onChangeTextInputField={handleTextInputChange}
          extraFiledInfo="Redirection path"
        />
      )}
    </>
  );
};

export default HomeAboutUsSectionFormField;
