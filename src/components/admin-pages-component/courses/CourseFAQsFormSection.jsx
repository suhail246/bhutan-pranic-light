import {
  CommonTextAreaField,
  CommonTextInputField,
  RepeatableTwoInputsWithTextEditor,
} from "@/components";

const CourseFAQsFormSection = ({
  control,
  errors,
  formData,
  handleAddRepeatableField,
  handleOnChangeRepeatableFields,
  handleRemoveRepeatableField,
  isCourseDetailsExist = false,
}) => {
  return (
    <>
      {/* Title */}
      <CommonTextInputField
        fieldName="faqTitle"
        fieldType="text"
        fieldId="course-details-faq-title"
        control={control}
        errors={errors}
        errorsType={errors?.faqTitle}
        placeholderText="Title"
        labelName="FAQs Title"
        extraClass="mb-5"
        extraInformationText="Title name will be shown as tag in the course details page"
        inputBoxMaxWidth="xl:max-w-[500px]"
        translateField={isCourseDetailsExist}
      />

      {/* Heading */}
      <CommonTextInputField
        fieldName="faqHeading"
        fieldType="text"
        fieldId="course-details-faq-heading"
        control={control}
        errors={errors}
        errorsType={errors?.faqHeading}
        placeholderText="Heading"
        labelName="FAQs Heading"
        extraClass="mb-5"
        inputBoxMaxWidth="xl:max-w-[500px]"
        translateField={isCourseDetailsExist}
      />

      {/* Sub Heading */}
      <CommonTextAreaField
        fieldName="faqSubHeading"
        fieldType="text"
        fieldId="course-details-faq-sub-heading"
        control={control}
        errors={errors}
        errorsType={errors?.faqSubHeading}
        placeholderText="Sub Heading"
        labelName="FAQs Sub Heading"
        extraClass="mb-5"
        inputBoxMaxWidth="xl:max-w-[500px]"
        translateField={isCourseDetailsExist}
      />

      {/* Training Details Repeater */}
      <RepeatableTwoInputsWithTextEditor
        formData={formData}
        labelText="FAQs QNAs"
        fieldId="course-details-faq-qna-repeater"
        translateField={isCourseDetailsExist}
        repeatableKeyname="faqQNA"
        repeatableKeys={["question", "answer"]}
        addNewField={handleAddRepeatableField}
        removeField={handleRemoveRepeatableField}
        onChangeField={handleOnChangeRepeatableFields}
        inputBoxMaxWidth="xl:max-w-[500px]"
      />
    </>
  );
};

export default CourseFAQsFormSection;
