import { NormalTextInputField } from "@/components";

const HomeCoursesSectionFormField = ({
  isFetching,
  stateDetails,
  handleTextInputChange,
}) => {
  return (
    <>
      {/* Tag Title */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Title"
        fieldId="home-section-4-courses-title"
        fieldName="home-section-4-courses-title"
        placeholderText="Tag Name"
        inputValue={stateDetails?.["home-section-4-courses-title"] || ""}
        onChangeTextInputField={handleTextInputChange}
        translateField={true}
      />

      {/* Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading"
        fieldId="home-section-4-courses-heading"
        fieldName="home-section-4-courses-heading"
        placeholderText="Heading"
        inputValue={stateDetails?.["home-section-4-courses-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />

      {/* Description */}
      <NormalTextInputField
        isFetching={isFetching}
        isTextArea={true}
        labelText="Description"
        fieldId="home-section-4-courses-description"
        fieldName="home-section-4-courses-description"
        placeholderText="Description"
        inputValue={stateDetails?.["home-section-4-courses-description"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />
    </>
  );
};

export default HomeCoursesSectionFormField;
