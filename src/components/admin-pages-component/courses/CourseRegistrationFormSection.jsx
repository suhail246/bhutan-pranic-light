import {
  CommonTextInputField,
  RepeatableThreeInputsWithImage,
} from "@/components";

const CourseRegistrationFormSection = ({
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
        fieldName="registrationTitle"
        fieldType="text"
        fieldId="course-details-registration-title"
        control={control}
        errors={errors}
        errorsType={errors?.registrationTitle}
        placeholderText="Title"
        labelName="Registration Title"
        extraClass="mb-5"
        inputBoxMaxWidth="xl:max-w-[500px]"
        translateField={isCourseDetailsExist}
        extraInformationText="Title name will be shown as tag in the course details page"
      />

      {/* Heading */}
      <CommonTextInputField
        fieldName="registrationHeading"
        fieldType="text"
        fieldId="course-details-registration-heading"
        control={control}
        errors={errors}
        errorsType={errors?.registrationHeading}
        placeholderText="Heading"
        labelName="Registration Heading"
        extraClass="mb-5"
        inputBoxMaxWidth="xl:max-w-[500px]"
        translateField={isCourseDetailsExist}
      />

      {/* Options Card Repeater */}
      <RepeatableThreeInputsWithImage
        formData={formData}
        labelText="Registration Cards"
        fieldId="course-details-registration-card"
        translateField={isCourseDetailsExist}
        repeatableKeyname="registrationCards"
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

export default CourseRegistrationFormSection;
