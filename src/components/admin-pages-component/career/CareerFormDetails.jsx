"use client";

import { globalStyleObj } from "@/app/assets/styles";
import {
  CommonTextAreaField,
  CommonTextInputField,
  FileReuseDialog,
  LabelText,
  SubmitButton,
} from "@/components";
import JoditEditor from "jodit-react";
import { MdWorkHistory } from "react-icons/md";

const CareerFormDetails = ({
  userId,
  adminRole,
  permissionsList,
  isCareerDetailsExist,
  isSubmitting,
  hasChanges,
  submitFunction,
  control,
  errors,
  filesList,
  allFiles,
  selectedFileType,
  selectedImageFileId,
  selectedImageFileName,
  selectedMetaFileId,
  selectedMetaFileName,
  onChangeImage,
  onChangeMetaImage,
  paginationDetails,
  searchValue,
  watchJobDescription,
  setValue,
  theme,
  colorGrade,
}) => {
  return (
    <form onSubmit={submitFunction} className={`p-3 sm:p-5`}>
      {/* Name */}
      <CommonTextInputField
        fieldName="jobName"
        fieldType="text"
        fieldId={`${isCareerDetailsExist ? "update-career-name" : "career-name"}`}
        control={control}
        errors={errors}
        errorsType={errors?.jobName}
        placeholderText="Vacancy Name"
        labelName="Name"
        labelStatus={true}
        translateField={isCareerDetailsExist}
      />

      {/* Description */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Description"
          htmlForId={`${isCareerDetailsExist ? "update-career-description" : "career-description"}`}
          star={true}
          translateField={isCareerDetailsExist}
        />

        <div
          className={`w-full max-w-[800px] rounded-sm border ${
            errors && errors.jobDescripton
              ? "border-red-500"
              : "border-[#000]/20 dark:border-[#fff]/10"
          }`}
        >
          <JoditEditor
            config={{
              placeholder: "",
              showCharsCounter: false,
              showWordsCounter: false,
              showXPathInStatusbar: false,
              height: 300,
              style: {
                backgroundColor: theme === "light" ? "#ffffff" : "#22262A",
                color: theme === "light" ? "#495057" : "#ced4da",
              },
              toolbarAdaptive: true,
              toolbarButtonSize: "middle",
              toolbar: true,
            }}
            id={`${isCareerDetailsExist ? "update-career-description" : "career-description"}`}
            value={watchJobDescription}
            name="jobDescripton"
            onBlur={(newContent) => {
              setValue("jobDescripton", newContent);
            }}
          />
        </div>
      </div>

      {/* Vacancies */}
      <CommonTextInputField
        fieldName="jobVacancies"
        fieldType="text"
        fieldId={`${isCareerDetailsExist ? "update-career-vacancy" : "career-vacancy"}`}
        control={control}
        errors={errors}
        errorsType={errors?.jobVacancies}
        placeholderText="No of Vacancies"
        labelName="Vacancies"
        extraClass="mt-5"
      />

      {/* Vacancies */}
      <CommonTextInputField
        fieldName="orderNumber"
        fieldType="text"
        fieldId={`${isCareerDetailsExist ? "update-career-order-number" : "career-order-number"}`}
        control={control}
        errors={errors}
        errorsType={errors?.orderNumber}
        placeholderText="Order Number"
        labelName="Order No."
        extraClass="mt-5"
      />

      {/* Apply Link */}
      <CommonTextInputField
        fieldName="applyLink"
        fieldType="text"
        fieldId={`${isCareerDetailsExist ? "update-career-link" : "career-link"}`}
        control={control}
        errors={errors}
        errorsType={errors?.applyLink}
        placeholderText="Link"
        labelName="Link"
        extraClass="mt-5"
      />

      {/* Image */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Image"
          htmlForId={`${isCareerDetailsExist ? "update-career-image" : "career-image"}`}
        />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          {!isCareerDetailsExist ? (
            <FileReuseDialog
              htmlId="career-image"
              userId={userId}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              onChangeBannerImage={onChangeImage}
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          ) : (
            <FileReuseDialog
              htmlId="update-career-image"
              userId={userId}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              onChangeBannerImage={onChangeImage}
              selectedBannerFileId={selectedImageFileId}
              selectedBannerFileName={selectedImageFileName}
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          )}
          {errors && errors.image && (
            <p className="text-red-500 text-[13px] font-poppins-rg">
              {errors.image.message}
            </p>
          )}
        </div>
      </div>

      {/* Meta Title */}
      <CommonTextInputField
        fieldName="metaTitle"
        fieldType="text"
        fieldId={`${isCareerDetailsExist ? "update-career-meta-title" : "career-meta-title"}`}
        control={control}
        errors={errors}
        errorsType={errors?.metaTitle}
        placeholderText="Meta Title"
        labelName="Meta Title"
        labelStatus={false}
        extraClass="mt-5"
      />

      {/* Meta Image (200 x 200) */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Meta Image (200 x 200)"
          htmlForId={`${isCareerDetailsExist ? "update-career-meta-image" : "career-meta-image"}`}
          star={false}
        />

        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          {!isCareerDetailsExist ? (
            <FileReuseDialog
              htmlId="career-meta-image"
              userId={userId}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              onChangeMetaImage={onChangeMetaImage}
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          ) : (
            <FileReuseDialog
              htmlId="update-career-meta-image"
              userId={userId}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              onChangeMetaImage={onChangeMetaImage}
              selectedMetaFileId={selectedMetaFileId}
              selectedMetaFileName={selectedMetaFileName}
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          )}
          {errors && errors.metaImage && (
            <p className="text-red-500 text-[13px] font-poppins-rg">
              {errors.metaImage.message}
            </p>
          )}
        </div>
      </div>

      {/* Meta Key Words */}
      <CommonTextInputField
        fieldName="metaKeywords"
        fieldType="text"
        fieldId={`${isCareerDetailsExist ? "update-career-meta-keywords" : "career-meta-keywords"}`}
        control={control}
        errors={errors}
        errorsType={errors?.metaKeywords}
        placeholderText="Meta Keywords"
        labelName="Meta Keywords"
        labelStatus={false}
        extraClass="mt-5"
        extraInformationText="Enter comma separated keywords (e.g. keyword1,keyword2,keyword3)"
      />

      {/* Meta Description */}
      <CommonTextAreaField
        fieldName="metaDescription"
        fieldId={`${isCareerDetailsExist ? "update-career-meta-description" : "career-meta-description"}`}
        control={control}
        errors={errors}
        errorsType={errors?.metaDescription}
        labelName="Meta Description"
        labelStatus={false}
        extraClass="mt-5"
      />

      {/* Submit Button */}
      <SubmitButton
        isSubmitting={isSubmitting}
        hasChanges={hasChanges}
        isDetailsExist={isCareerDetailsExist}
        colorGrade={colorGrade}
        label={isCareerDetailsExist ? "Update Career" : "Create Career"}
        icon={<MdWorkHistory />}
        extraButtonStyle="sm:max-w-[200px]"
      />
    </form>
  );
};

export default CareerFormDetails;
