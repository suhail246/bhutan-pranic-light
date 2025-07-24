import { NormalTextInputField } from "@/components";

const CoursesHeroSection = ({
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
        fieldId="courses-section-1-title"
        fieldName="courses-section-1-title"
        placeholderText="Tag Title"
        inputValue={stateDetails?.["courses-section-1-title"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraFiledInfo="Section tag name."
        translateField={true}
      />

      {/* Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading"
        fieldId="courses-section-1-heading"
        fieldName="courses-section-1-heading"
        placeholderText="Heading"
        inputValue={stateDetails?.["courses-section-1-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />

      {/* SubHeaing */}
      <NormalTextInputField
        isFetching={isFetching}
        isTextArea={true}
        labelText="Sub Heading"
        fieldId="courses-section-1-sub-heading"
        fieldName="courses-section-1-sub-heading"
        placeholderText="Sub Heading"
        inputValue={stateDetails?.["courses-section-1-sub-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />
    </>
  );
};

export default CoursesHeroSection;
