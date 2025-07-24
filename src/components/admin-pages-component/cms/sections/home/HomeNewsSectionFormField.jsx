import { NormalTextInputField } from "@/components";

const HomeNewsSectionFormField = ({
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
        fieldId="home-section-6-news-title"
        fieldName="home-section-6-news-title"
        placeholderText="Tag Name"
        inputValue={stateDetails?.["home-section-6-news-title"] || ""}
        onChangeTextInputField={handleTextInputChange}
        translateField={true}
      />

      {/* Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading"
        fieldId="home-section-6-news-heading"
        fieldName="home-section-6-news-heading"
        placeholderText="Heading"
        inputValue={stateDetails?.["home-section-6-news-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />
    </>
  );
};

export default HomeNewsSectionFormField;
