import {
  CommonTextInputField,
  RepeatableTwoInputsWithTextEditor,
} from "@/components";

const CourseTrainingFormSection = ({
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
      {/* Heading */}
      <CommonTextInputField
        fieldName="trainingHeading"
        fieldType="text"
        fieldId="course-details-training-heading"
        control={control}
        errors={errors}
        errorsType={errors?.trainingHeading}
        placeholderText="Heading"
        labelName="Training Heading"
        extraClass="mb-5"
        inputBoxMaxWidth="xl:max-w-[500px]"
        translateField={isCourseDetailsExist}
      />

      {/* Training Details Repeater */}
      <RepeatableTwoInputsWithTextEditor
        formData={formData}
        labelText="Training Details"
        fieldId="course-details-training-details-repeater"
        translateField={isCourseDetailsExist}
        repeatableKeyname="trainingDetails"
        repeatableKeys={["title", "description"]}
        addNewField={handleAddRepeatableField}
        removeField={handleRemoveRepeatableField}
        onChangeField={handleOnChangeRepeatableFields}
        inputBoxMaxWidth="xl:max-w-[500px]"
      />
    </>
  );
};

export default CourseTrainingFormSection;
