import { RepeatableOneImageInput } from "@/components";

const CourseGalaryFormSection = ({
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
}) => {
  return (
    <>
      {/* Images Repeatable */}
      <RepeatableOneImageInput
        formData={formData}
        labelText="Images Galary"
        fieldId="course-details-images-galary"
        repeatableKeyname="galaryImages"
        repeatableKeys={["image"]}
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
        isCourseDetailsExist={isCourseDetailsExist}
        inputBoxMaxWidth="xl:max-w-[500px]"
      />
    </>
  );
};

export default CourseGalaryFormSection;
