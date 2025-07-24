import { CommonTextInputField, NormalTextEditorInputFiled } from "@/components";

const CourseCategoryConditionFormSection = ({
  control,
  errors,
  formData,
  handleOnChangeTextEditor,
  isCourseDetailsExist = false,
}) => {
  return (
    <>
      {/* Title */}
      <CommonTextInputField
        fieldName="categoryConditionTitle"
        fieldType="text"
        fieldId="course-details-category-condition-title"
        control={control}
        errors={errors}
        errorsType={errors?.categoryConditionTitle}
        placeholderText="Title"
        labelName="Category/Condition Title"
        extraClass="mb-5"
        extraInformationText="Title name will be shown as tag in the course details page"
        inputBoxMaxWidth="xl:max-w-[500px]"
        translateField={isCourseDetailsExist}
      />

      {/* Heading */}
      <CommonTextInputField
        fieldName="categoryConditionHeading"
        fieldType="text"
        fieldId="course-details-category-condition-heading"
        control={control}
        errors={errors}
        errorsType={errors?.categoryConditionHeading}
        placeholderText="Heading"
        labelName="Category/Condition Heading"
        extraClass="mb-5"
        inputBoxMaxWidth="xl:max-w-[500px]"
        translateField={isCourseDetailsExist}
      />

      {/* Desctiption */}
      <NormalTextEditorInputFiled
        labelText="Category/Condition Description"
        fieldId="course-details-category-condition-description"
        fieldName="categoryConditionDescription"
        placeholderText="Description"
        inputValue={formData?.categoryConditionDescription || ""}
        toolbarButtons="all"
        onChangeTextEditorFiled={handleOnChangeTextEditor}
        textEditorMaxWidth="xl:max-w-[500px]"
        translateField={isCourseDetailsExist}
      />
    </>
  );
};

export default CourseCategoryConditionFormSection;
