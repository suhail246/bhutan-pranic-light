"use client";

import { globalStyleObj } from "@/app/assets/styles";
import {
  CommonSelectInputField,
  CommonTextAreaField,
  CommonTextInputField,
  FileReuseDialog,
  LabelText,
  SubmitButton,
} from "@/components";
import { Input } from "@/components/ui/input";
import JoditEditor from "jodit-react";
import { BiNews } from "react-icons/bi";
import { MdClose } from "react-icons/md";

const PostFormDetails = ({
  userId,
  adminRole,
  permissionsList,
  isPostDetailsExist,
  isSubmitting,
  hasChanges,
  submitFunction,
  control,
  errors,
  categoryList,
  filesList,
  allFiles,
  selectedFileType,
  selectedBannerFileId,
  selectedBannerFileName,
  selectedMetaFileId,
  selectedMetaFileName,
  onChangeBannerImage,
  onChangeMetaImage,
  paginationDetails,
  searchValue,
  watchDescription,
  setValue,
  watchedTags,
  addTag,
  removeTag,
  theme,
  colorGrade,
}) => {
  return (
    <form onSubmit={submitFunction} className={`p-3 sm:p-5`}>
      {/* Blog Title */}
      <CommonTextInputField
        fieldName="title"
        fieldType="text"
        fieldId={`${isPostDetailsExist ? "update-blog-title" : "blog-title"}`}
        control={control}
        errors={errors}
        errorsType={errors?.title}
        placeholderText="Enter Blog Title"
        labelName="Title"
        labelStatus={true}
        translateField={isPostDetailsExist}
      />

      {/* Slug */}
      <CommonTextInputField
        fieldName="slug"
        fieldType="text"
        fieldId={`${isPostDetailsExist ? "update-blog-slug" : "blog-slug"}`}
        control={control}
        errors={errors}
        errorsType={errors?.slug}
        placeholderText="Enter Slug"
        labelName="Slug"
        labelStatus={true}
        extraClass="mt-5"
      />

      {/* Category */}
      <CommonSelectInputField
        fieldName="category"
        fieldId="blog-category"
        fieldId={`${isPostDetailsExist ? "update-blog-slug" : "blog-slug"}`}
        control={control}
        errors={errors}
        errorsType={errors?.category}
        itemList={categoryList}
        notFoundText="Category does not created yet"
        labelName="Category"
        labelStatus={true}
        extraClass="mt-5"
      />

      {/* Banner (1300 x 650) */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Banner (1300 x 650)"
          htmlForId="blog-banner-img"
          star={true}
        />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          {!isPostDetailsExist ? (
            <FileReuseDialog
              htmlId="blog-banner-img"
              userId={userId}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              onChangeBannerImage={onChangeBannerImage}
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          ) : (
            <FileReuseDialog
              htmlId="update-blog-banner-img"
              userId={userId}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              onChangeBannerImage={onChangeBannerImage}
              selectedBannerFileId={selectedBannerFileId}
              selectedBannerFileName={selectedBannerFileName}
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          )}
          {errors && errors.bannerImage && (
            <p className="text-red-500 text-[13px] font-poppins-rg">
              {errors.bannerImage.message}
            </p>
          )}
        </div>
      </div>

      {/* Short Description */}
      <CommonTextAreaField
        fieldName="shortDescription"
        fieldId={`${isPostDetailsExist ? "update-blog-short-description" : "blog-short-description"}`}
        control={control}
        errors={errors}
        errorsType={errors?.shortDescription}
        labelName="Short Description"
        labelStatus={true}
        extraClass="mt-5"
        translateField={isPostDetailsExist}
      />

      {/* Description */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Description"
          htmlForId={`${isPostDetailsExist ? "update-blog-description" : "blog-description"}`}
          star={false}
          translateField={isPostDetailsExist}
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
            id={`${isPostDetailsExist ? "update-blog-description" : "blog-description"}`}
            value={watchDescription}
            name="description"
            onBlur={(newContent) => {
              setValue("description", newContent);
            }}
          />
        </div>
      </div>

      {/* Tags */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Tags"
          htmlForId={`${isPostDetailsExist ? "update-blog-tags" : "blog-tags"}`}
          star={false}
          translateField={isPostDetailsExist}
        />
        <div className="flex flex-col w-full max-w-[800px]">
          <Input
            id={`${isPostDetailsExist ? "update-blog-tags" : "blog-tags"}`}
            placeholder="Enter tag"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value) {
                e.preventDefault();
                addTag(e.target.value);
                e.target.value = "";
              }
            }}
            className={globalStyleObj.commonDefaultInputFieldClass}
          />
          {watchedTags.length === 0 && (
            <p className="text-[12px] italic font-poppins-rg text-light-weight-450 mt-1">
              Press{" "}
              <span className="text-dark-weight-350 dark:text-light-weight-800 font-poppins-md">
                ENTER
              </span>{" "}
              to add new tag.
            </p>
          )}

          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {watchedTags.map((tag, index) => (
              <div
                key={index}
                className="bg-[#000]/20 text-dark-weight-550 dark:text-light-weight-450 text-[12px] font-poppins-rg px-2 py-1 rounded flex items-center gap-1"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="text-red-500 hover:scale-[1.2] transition-all duration-300 ease-in-out"
                >
                  <MdClose />
                </button>
              </div>
            ))}
          </div>
          {errors && errors.tags && (
            <p className="text-red-500 text-[13px] font-poppins-rg">
              {errors.tags.message}
            </p>
          )}
        </div>
      </div>

      {/* Source */}
      <CommonTextInputField
        fieldName="source"
        fieldType="text"
        fieldId={`${isPostDetailsExist ? "update-blog-source" : "blog-source"}`}
        control={control}
        errors={errors}
        errorsType={errors?.source}
        placeholderText="Provide Blog Source Link"
        labelName="Blog Source"
        labelStatus={false}
        extraClass="mt-5"
      />

      {/* Meta Title */}
      <CommonTextInputField
        fieldName="metaTitle"
        fieldType="text"
        fieldId={`${isPostDetailsExist ? "update-blog-meta-title" : "blog-meta-title"}`}
        control={control}
        errors={errors}
        errorsType={errors?.metaTitle}
        placeholderText="Enter Meta Title"
        labelName="Meta Title"
        labelStatus={false}
        extraClass="mt-5"
      />

      {/* Meta Image (200 x 200) */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Meta Image (200 x 200)"
          htmlForId={`${isPostDetailsExist ? "update-blog-meta-img" : "blog-meta-img"}`}
          star={false}
        />

        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          {!isPostDetailsExist ? (
            <FileReuseDialog
              htmlId="blog-meta-img"
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
              htmlId="update-blog-meta-img"
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

      {/* Meta Description */}
      <CommonTextAreaField
        fieldName="metaDescription"
        fieldId={`${isPostDetailsExist ? "update-blog-meta-description" : "blog-meta-description"}`}
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
        isDetailsExist={isPostDetailsExist}
        colorGrade={colorGrade}
        label={isPostDetailsExist ? "Update Post" : "Create Post"}
        icon={<BiNews />}
      />
    </form>
  );
};

export default PostFormDetails;
