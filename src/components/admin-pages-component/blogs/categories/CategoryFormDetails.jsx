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
import { MdCategory } from "react-icons/md";

const CategoryFormDetails = ({
  userId,
  adminRole,
  permissionsList,
  isCategoryDetailsExist = false,
  isSubmitting,
  hasChanges,
  submitFunction,
  control,
  errors,
  filesList,
  allFiles,
  categoryList,
  paginationDetails,
  searchValue,
  selectedFileType,
  selectedMetaFileId,
  selectedMetaFileName,
  onChangeMetaImage,
  colorGrade,
}) => {
  return (
    <form onSubmit={submitFunction} className={`p-3 sm:p-5`}>
      {/* Category Name */}
      <CommonTextInputField
        fieldName="name"
        fieldType="text"
        fieldId={`${isCategoryDetailsExist ? "update-category-name" : "category-name"}`}
        control={control}
        errors={errors}
        errorsType={errors?.name}
        placeholderText="Enter category name"
        labelName="Name"
        labelStatus={true}
        translateField={isCategoryDetailsExist}
      />

      {/* Category Slug */}
      <CommonTextInputField
        fieldName="slug"
        fieldType="text"
        fieldId={`${isCategoryDetailsExist ? "update-category-slug" : "category-slug"}`}
        control={control}
        errors={errors}
        errorsType={errors?.slug}
        placeholderText="Enter Slug"
        labelName="Slug"
        labelStatus={true}
        extraClass="mt-5"
      />

      {/* Category Description */}
      <CommonTextAreaField
        fieldName="description"
        fieldId={`${isCategoryDetailsExist ? "update-category-description" : "category-description"}`}
        control={control}
        errors={errors}
        errorsType={errors?.description}
        labelName="Description"
        labelStatus={false}
        extraClass="mt-5"
        translateField={isCategoryDetailsExist}
      />

      {/* Category Parent ID */}
      <CommonSelectInputField
        fieldName="parentCategoryId"
        fieldId={`${isCategoryDetailsExist ? "update-parent-category-id" : "parent-category-id"}`}
        control={control}
        errors={errors}
        errorsType={errors?.parentCategoryId}
        itemList={categoryList}
        notFoundText="Category does not created yet"
        labelName="Parent Category"
        labelStatus={false}
        extraClass="mt-5"
        extraItemName="None"
      />

      {/* Meta Title */}
      <CommonTextInputField
        fieldName="metaTitle"
        fieldType="text"
        fieldId={`${isCategoryDetailsExist ? "update-category-meta-title" : "category-meta-title"}`}
        control={control}
        errors={errors}
        errorsType={errors?.metaTitle}
        placeholderText="Enter Meta Title"
        labelName="Meta Title"
        labelStatus={false}
        extraClass="mt-5"
      />

      {/* Meta Image */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Meta Image (200 x 200)"
          htmlForId={`${isCategoryDetailsExist ? "update-category-meta-img" : "category-meta-img"}`}
          star={false}
        />

        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          {!isCategoryDetailsExist ? (
            <FileReuseDialog
              htmlId="category-meta-img"
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
              htmlId="update-category-meta-img"
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
        </div>
      </div>

      {/* Meta Description */}
      <CommonTextAreaField
        fieldName="metaDescription"
        fieldId={`${isCategoryDetailsExist ? "update-category-meta-description" : "category-meta-description"}`}
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
        isDetailsExist={isCategoryDetailsExist}
        colorGrade={colorGrade}
        label={isCategoryDetailsExist ? "Update Category" : "Create Category"}
        icon={<MdCategory />}
      />
    </form>
  );
};

export default CategoryFormDetails;
