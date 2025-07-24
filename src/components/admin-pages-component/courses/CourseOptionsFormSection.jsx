import {
  CommonTextAreaField,
  CommonTextInputField,
  RepeatableThreeInputsWithImage,
} from "@/components";

const CourseOptionsFormSection = ({
  control,
  errors,
  formData,
  filesList,
  allFiles,
  paginationDetails,
  handleAddRepeatableField,
  handleOnChangeRepeatableFields,
  handleRemoveRepeatableField,
  adminRole,
  permissionsList,
  searchValue,
  selectedFileType,
  isCourseDetailsExist,
  isHideInOtherLanguages = false,
}) => {
  return (
    <>
      {/* Title */}
      <CommonTextInputField
        fieldName="optionsTitle"
        fieldType="text"
        fieldId="course-details-options-title"
        control={control}
        errors={errors}
        errorsType={errors?.optionsTitle}
        placeholderText="Title"
        labelName="Options Title"
        extraClass="mb-5"
        inputBoxMaxWidth="xl:max-w-[500px]"
        translateField={isCourseDetailsExist}
        extraInformationText="Title name will be shown as tag in the course details page"
      />

      {/* Heading */}
      <CommonTextInputField
        fieldName="optionsHeading"
        fieldType="text"
        fieldId="course-details-options-heading"
        control={control}
        errors={errors}
        errorsType={errors?.optionsHeading}
        placeholderText="Heading"
        labelName="Options Heading"
        extraClass="mb-5"
        inputBoxMaxWidth="xl:max-w-[500px]"
        translateField={isCourseDetailsExist}
      />

      {/* Sub Heading */}
      <CommonTextAreaField
        fieldName="optionsSubHeading"
        fieldType="text"
        fieldId="course-details-options-sub-heading"
        control={control}
        errors={errors}
        errorsType={errors?.optionsSubHeading}
        placeholderText="Sub Heading"
        labelName="Options Sub Heading"
        extraClass="mb-5"
        inputBoxMaxWidth="xl:max-w-[500px]"
        translateField={isCourseDetailsExist}
      />

      {/* Options Card Repeater */}
      <RepeatableThreeInputsWithImage
        formData={formData}
        labelText="Options Card"
        fieldId="course-details-options-card"
        translateField={isCourseDetailsExist}
        repeatableKeyname="optionsCard"
        repeatableKeys={["icon", "title", "description"]}
        addNewField={handleAddRepeatableField}
        removeField={handleRemoveRepeatableField}
        onChangeField={handleOnChangeRepeatableFields}
        filesList={filesList}
        allFiles={allFiles}
        paginationDetails={paginationDetails}
        searchValue={searchValue}
        selectedFileType={selectedFileType}
        adminRole={adminRole}
        permissionsList={permissionsList}
        isDetailsExist={isCourseDetailsExist}
        isHideInOtherLanguages={isHideInOtherLanguages}
        inputBoxMaxWidth="xl:max-w-[500px]"
      />
    </>
  );
};

export default CourseOptionsFormSection;
