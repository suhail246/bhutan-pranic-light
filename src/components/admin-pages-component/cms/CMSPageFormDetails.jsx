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
import { MdPages } from "react-icons/md";

const CMSPageFormDetails = ({
  userId,
  adminRole,
  permissionsList,
  isPageDetailsExist,
  isSubmitting,
  hasChanges,
  submitFunction,
  control,
  errors,
  filesList,
  allFiles,
  selectedFileType,
  selectedMetaFileId,
  selectedMetaFileName,
  onChangeMetaImage,
  paginationDetails,
  searchValue,
  watchDescription,
  setValue,
  theme,
  colorGrade,
}) => {
  return (
    <form onSubmit={submitFunction} className={`p-3 sm:p-5`}>
      {/* Blog Title */}
      <CommonTextInputField
        fieldName="pageName"
        fieldType="text"
        fieldId={`${isPageDetailsExist ? "update-cms-page-name" : "cms-page-name"}`}
        control={control}
        errors={errors}
        errorsType={errors?.pageName}
        placeholderText="Page Name"
        labelName="Page Name"
        labelStatus={true}
        translateField={isPageDetailsExist}
      />

      {/* Slug */}
      <CommonTextInputField
        fieldName="slug"
        fieldType="text"
        fieldId={`${isPageDetailsExist ? "update-cms-page-slug" : "cms-page-slug"}`}
        control={control}
        errors={errors}
        errorsType={errors?.slug}
        placeholderText="Slug"
        labelName="Slug"
        labelStatus={true}
        extraClass="mt-5"
      />

      {/* Description */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Description"
          htmlForId={`${isPageDetailsExist ? "update-cms-page-description" : "cms-page-description"}`}
          star={false}
          translateField={isPageDetailsExist}
        />

        <div className="w-full max-w-[800px] rounded-sm border border-[#000]/20 dark:border-[#fff]/10">
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
            id={`${isPageDetailsExist ? "update-cms-page-description" : "cms-page-description"}`}
            value={watchDescription}
            name="description"
            onBlur={(newContent) => {
              setValue("description", newContent);
            }}
          />
        </div>
      </div>

      {/* Meta Title */}
      <CommonTextInputField
        fieldName="metaTitle"
        fieldType="text"
        fieldId={`${isPageDetailsExist ? "update-cms-page-meta-title" : "cms-page-meta-title"}`}
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
          htmlForId={`${isPageDetailsExist ? "update-cms-page-meta-image" : "cms-page-meta-image"}`}
          star={false}
        />

        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          {!isPageDetailsExist ? (
            <FileReuseDialog
              htmlId="cms-page-meta-image"
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
              htmlId="update-cms-page-meta-image"
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
        fieldId={`${isPageDetailsExist ? "update-cms-page-meta-keywords" : "cms-page-meta-keywords"}`}
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
        fieldId={`${isPageDetailsExist ? "update-cms-page-meta-description" : "cms-page-meta-description"}`}
        control={control}
        errors={errors}
        errorsType={errors?.metaDescription}
        labelName="Meta Description"
        labelStatus={false}
        extraClass="mt-5"
      />

      <SubmitButton
        isSubmitting={isSubmitting}
        hasChanges={hasChanges}
        isDetailsExist={isPageDetailsExist}
        colorGrade={colorGrade}
        label={isPageDetailsExist ? "Update Page" : "Add New Page"}
        icon={<MdPages />}
      />
    </form>
  );
};

export default CMSPageFormDetails;
