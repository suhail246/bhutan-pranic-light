import { NormalBrowseFileInputFiled, NormalTextInputField } from "@/components";
import { useMemo } from "react";

const GetInTouchFiledSection = ({
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
  imageKey = "",
  titleKey = "",
  headingKey = "",
  subHeadingKey = "",
  buttonLabelKey = "",
  buttonLinkKey = "",
}) => {
  const isHideInOtherLanguages = useMemo(() => {
    return activeLang === "en";
  }, [activeLang]);

  const getSelectedImageId = (id) => {
    if (id) {
      onChangeImage(imageKey, id);
    } else {
      onChangeImage(imageKey, "");
    }
  };

  return (
    <>
      {/* Image 1 */}
      {isHideInOtherLanguages && (
        <NormalBrowseFileInputFiled
          isFetching={isFetching}
          labelText="Image"
          fieldId={imageKey}
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImageFunction={getSelectedImageId}
          selectedFileId={stateDetails?.[imageKey] || ""}
          adminRole={adminRole}
          permissionsList={permissionsList}
          extraContainerClasses="mb-5"
        />
      )}

      {/* Title */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Title"
        fieldId={titleKey}
        fieldName={titleKey}
        placeholderText="Tag Name"
        inputValue={stateDetails?.[titleKey] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraFiledInfo="Section tag name"
        extraContainerClasses="mb-5"
        translateField={true}
      />

      {/* Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading"
        fieldId={headingKey}
        fieldName={headingKey}
        placeholderText="Heading"
        inputValue={stateDetails?.[headingKey] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mb-5"
        translateField={true}
      />

      {/* Sub Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        isTextArea={true}
        labelText="Sub Heading"
        fieldId={subHeadingKey}
        fieldName={subHeadingKey}
        placeholderText="Sub Heading"
        inputValue={stateDetails?.[subHeadingKey] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mb-5"
        translateField={true}
      />

      {/* Button Label */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Button Label"
        fieldId={buttonLabelKey}
        fieldName={buttonLabelKey}
        placeholderText="Label Name"
        inputValue={stateDetails?.[buttonLabelKey] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mb-5"
        translateField={true}
      />

      {/* Button Link */}
      {isHideInOtherLanguages && (
        <NormalTextInputField
          isFetching={isFetching}
          labelText="Button Link"
          fieldId={buttonLinkKey}
          fieldName={buttonLinkKey}
          placeholderText="Link"
          inputValue={stateDetails?.[buttonLinkKey] || ""}
          onChangeTextInputField={handleTextInputChange}
          extraFiledInfo="Redirection path"
        />
      )}
    </>
  );
};

export default GetInTouchFiledSection;
