import { globalStyleObj } from "@/app/assets/styles";
import {
  CommonTextAreaField,
  CommonTextInputField,
  FileReuseDialog,
  LabelText,
  NormalTextEditorInputFiled,
} from "@/components";
import { getFileSettingsValue } from "@/utils/website-settings-helper";

const CourseInfoFormSection = ({
  control,
  errors,
  formData,
  filesList,
  allFiles,
  paginationDetails,
  handleOnChangeTextEditor,
  handleOnChangeFile,
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
        fieldName="title"
        fieldType="text"
        fieldId="course-details-title"
        control={control}
        errors={errors}
        errorsType={errors?.title}
        placeholderText="Title"
        labelName="Title"
        labelStatus={true}
        extraClass="mb-5"
        inputBoxMaxWidth="xl:max-w-[500px]"
        translateField={isCourseDetailsExist}
      />

      {/* Sub Title */}
      <CommonTextInputField
        fieldName="subTitle"
        fieldType="text"
        fieldId="course-details-sub-title"
        control={control}
        errors={errors}
        errorsType={errors?.subTitle}
        placeholderText="Subtitle"
        labelName="Subtitle"
        labelStatus={true}
        extraClass="mb-5"
        inputBoxMaxWidth="xl:max-w-[500px]"
        translateField={isCourseDetailsExist}
        extraInformationText="Subtitle will be shown in details page"
      />

      {/* Slug */}
      {isHideInOtherLanguages && (
        <CommonTextInputField
          fieldName="slug"
          fieldType="text"
          fieldId="course-details-title"
          control={control}
          errors={errors}
          errorsType={errors?.slug}
          placeholderText="Slug"
          labelName="Slug"
          labelStatus={true}
          extraClass="mb-5"
          inputBoxMaxWidth="xl:max-w-[500px]"
        />
      )}

      {/* Order Number */}
      {isHideInOtherLanguages && (
        <CommonTextInputField
          fieldName="orderNumber"
          fieldType="text"
          fieldId="course-details-order-number"
          control={control}
          errors={errors}
          errorsType={errors?.orderNumber}
          placeholderText="Order Number"
          labelName="Order No."
          labelStatus={true}
          extraClass="mb-5"
          inputBoxMaxWidth="xl:max-w-[500px]"
          extraInformationText="Enter higher number for the course to be shown on top OR default is 1"
        />
      )}

      {/* Short Description */}
      <CommonTextAreaField
        fieldName="shortDescription"
        fieldId="course-details-short-description"
        control={control}
        errors={errors}
        errorsType={errors?.shortDescription}
        labelName="Short Description"
        placeholderText="Short Description"
        extraClass="mb-5"
        inputBoxMaxWidth="xl:max-w-[500px]"
        translateField={isCourseDetailsExist}
      />

      {/* Desctiption */}
      <NormalTextEditorInputFiled
        labelText="Description"
        fieldId="course-details-description"
        fieldName="description"
        placeholderText="Description"
        inputValue={formData?.description || ""}
        toolbarButtons="all"
        onChangeTextEditorFiled={handleOnChangeTextEditor}
        extraContainerClasses="mb-5"
        textEditorMaxWidth="xl:max-w-[500px]"
        translateField={isCourseDetailsExist}
      />

      {/* Course Image */}
      {isHideInOtherLanguages && (
        <div className={`mb-5 ${globalStyleObj.commonInputContainerClass}`}>
          <LabelText text="Course Image" htmlForId="course-details-image" />

          <div className="flex flex-col gap-2 w-full xl:max-w-[500px]">
            <FileReuseDialog
              htmlId="course-details-image"
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              onChangeBannerImage={(id) => handleOnChangeFile("image", id)}
              selectedBannerFileId={
                isCourseDetailsExist
                  ? (getFileSettingsValue(allFiles, formData?.image || "")
                      ?._id ?? null)
                  : null
              }
              selectedBannerFileName={
                isCourseDetailsExist
                  ? (getFileSettingsValue(allFiles, formData?.image || "")
                      ?.fileName ?? null)
                  : null
              }
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          </div>
        </div>
      )}

      {/* Button Label */}
      <CommonTextInputField
        fieldName="buttonLabel"
        fieldType="text"
        fieldId="course-details-button-label"
        control={control}
        errors={errors}
        errorsType={errors?.buttonLabel}
        placeholderText="Button Text"
        labelName="Button Label"
        inputBoxMaxWidth="xl:max-w-[500px]"
        translateField={isCourseDetailsExist}
      />
    </>
  );
};

export default CourseInfoFormSection;
