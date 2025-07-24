import { NormalTextInputField } from "@/components";

const HomeInfoSectionFormField = ({
  isFetching,
  stateDetails,
  handleTextInputChange,
}) => {
  return (
    <>
      {/* Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading"
        fieldId="home-section-2-heading"
        fieldName="home-section-2-heading"
        placeholderText="Heading"
        inputValue={stateDetails?.["home-section-2-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        translateField={true}
      />

      {/* Description */}
      <NormalTextInputField
        isFetching={isFetching}
        isTextArea={true}
        labelText="Description"
        fieldId="home-section-2-description"
        fieldName="home-section-2-description"
        placeholderText="Description"
        inputValue={stateDetails?.["home-section-2-description"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />
    </>
  );
};

export default HomeInfoSectionFormField;
