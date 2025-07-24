import { NormalTextInputField } from "@/components";

const HomeTestimonialSectionFormField = ({
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
        fieldId="home-section-7-testimonial-title"
        fieldName="home-section-7-testimonial-title"
        placeholderText="Tag Name"
        inputValue={stateDetails?.["home-section-7-testimonial-title"] || ""}
        onChangeTextInputField={handleTextInputChange}
        translateField={true}
      />

      {/* Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading"
        fieldId="home-section-7-testimonial-heading"
        fieldName="home-section-7-testimonial-heading"
        placeholderText="Heading"
        inputValue={stateDetails?.["home-section-7-testimonial-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />
    </>
  );
};

export default HomeTestimonialSectionFormField;
