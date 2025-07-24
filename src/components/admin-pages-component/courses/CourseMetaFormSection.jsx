import { globalStyleObj } from "@/app/assets/styles";
import {
  CommonTextAreaField,
  CommonTextInputField,
  FileReuseDialog,
  LabelText,
} from "@/components";
import { getFileSettingsValue } from "@/utils/website-settings-helper";

const CourseMetaFormSection = ({
  control,
  errors,
  formData,
  filesList,
  allFiles,
  paginationDetails,
  handleOnChangeFile,
  adminRole,
  permissionsList,
  searchValue,
  selectedFileType,
  isCourseDetailsExist,
}) => {
  return (
    <>
      {/* MetaTitle */}
      <CommonTextInputField
        fieldName="metaTitle"
        fieldType="text"
        fieldId="course-details-meta-title"
        control={control}
        errors={errors}
        errorsType={errors?.metaTitle}
        placeholderText="Meta Title"
        labelName="Meta Title"
        extraClass="mb-5"
        inputBoxMaxWidth="xl:max-w-[500px]"
      />

      {/* Meta Image */}
      <div className={`mb-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText text="Meta Image" htmlForId="course-details-meta-image" />

        <div className="flex flex-col gap-2 w-full xl:max-w-[500px]">
          <FileReuseDialog
            htmlId="course-details-meta-image"
            filesList={filesList}
            allFiles={allFiles}
            paginationDetails={paginationDetails}
            searchValue={searchValue}
            selectedFileType={selectedFileType}
            onChangeBannerImage={(id) => handleOnChangeFile("metaImage", id)}
            selectedBannerFileId={
              isCourseDetailsExist
                ? (getFileSettingsValue(allFiles, formData?.metaImage || "")
                    ?._id ?? null)
                : null
            }
            selectedBannerFileName={
              isCourseDetailsExist
                ? (getFileSettingsValue(allFiles, formData?.metaImage || "")
                    ?.fileName ?? null)
                : null
            }
            adminRole={adminRole}
            permissionsList={permissionsList}
          />
        </div>
      </div>

      {/* Meta Keywords */}
      <CommonTextInputField
        fieldName="metaKeywords"
        fieldType="text"
        fieldId="course-details-meta-keywords"
        control={control}
        errors={errors}
        errorsType={errors?.metaKeywords}
        placeholderText="Meta Keywords"
        labelName="Meta Keywords"
        extraClass="mb-5"
        extraInformationText="Enter comma separated keywords (e.g. keyword1,keyword2,keyword3)"
        inputBoxMaxWidth="xl:max-w-[500px]"
      />

      {/* Meta Description */}
      <CommonTextAreaField
        fieldName="metaDescription"
        fieldId="course-details-meta-description"
        control={control}
        errors={errors}
        errorsType={errors?.metaDescription}
        labelName="Meta Description"
        placeholderText="Meta Description"
        inputBoxMaxWidth="xl:max-w-[500px]"
      />
    </>
  );
};

export default CourseMetaFormSection;
