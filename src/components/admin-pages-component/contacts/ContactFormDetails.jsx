import { globalStyleObj } from "@/app/assets/styles";
import {
  CommonRepeatableInputFields,
  CommonTextAreaField,
  CommonTextInputField,
  FileReuseDialog,
  LabelText,
  SubmitButton,
} from "@/components";
import { FaMapLocationDot } from "react-icons/fa6";

const ContactFormDetails = ({
  userId,
  adminRole,
  permissionsList,
  isContactDetailsExist,
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
  watchedRepeatableField,
  addLabelField,
  addValueField,
  handleAddRepeatableField,
  handleRemoveRepeatableField,
  setValue,
  watchedSlug,
  colorGrade,
}) => {
  return (
    <form onSubmit={submitFunction} className={`p-3 sm:p-5`}>
      {/* Title Heading */}
      <CommonTextInputField
        fieldName="title"
        fieldType="text"
        fieldId={`${isContactDetailsExist ? "update-contact-title-heading" : "contact-title-heading"}`}
        control={control}
        errors={errors}
        errorsType={errors?.title}
        placeholderText="Title Heading"
        labelName="Title"
        labelStatus={true}
        translateField={isContactDetailsExist}
      />

      {/* Branch Name */}
      <CommonTextInputField
        fieldName="branchName"
        fieldType="text"
        fieldId={`${isContactDetailsExist ? "update-contact-branch-name" : "contact-branch-name"}`}
        control={control}
        errors={errors}
        errorsType={errors?.branchName}
        placeholderText="Branch Name"
        labelName="Branch"
        labelStatus={true}
        extraClass="mt-5"
        translateField={isContactDetailsExist}
      />

      {/* Slug */}
      <CommonTextInputField
        fieldName="slug"
        fieldType="text"
        fieldId={`${isContactDetailsExist ? "update-contact-branch-slug" : "contact-branch-slug"}`}
        control={control}
        errors={errors}
        errorsType={errors?.slug}
        placeholderText="Slug"
        labelName="Slug"
        labelStatus={true}
        extraClass="mt-5"
      />

      {/* Order Number */}
      <CommonTextInputField
        fieldName="orderNumber"
        fieldType="text"
        fieldId={`${isContactDetailsExist ? "update-contact-order-number" : "contact-order-number"}`}
        control={control}
        errors={errors}
        errorsType={errors?.orderNumber}
        placeholderText="Order Number"
        labelName="Order No."
        labelStatus={false}
        extraClass="mt-5"
        extraInformationText="Enter higher number for the contact to be shown on top OR default is 1"
      />

      {/* Branch Address */}
      <CommonTextAreaField
        fieldName="branchAddress"
        fieldId={`${isContactDetailsExist ? "update-contact-branch-address" : "contact-branch-address"}`}
        control={control}
        errors={errors}
        errorsType={errors?.branchAddress}
        labelName="Address"
        labelStatus={false}
        extraClass="mt-5"
        translateField={isContactDetailsExist}
      />

      {/* Contact Number */}
      <CommonTextInputField
        fieldName="contactNumber"
        fieldType="text"
        fieldId={`${isContactDetailsExist ? "update-contact-branch-number" : "contact-branch-number"}`}
        control={control}
        errors={errors}
        errorsType={errors?.contactNumber}
        placeholderText="Contact Number"
        labelName="Contact Number"
        labelStatus={false}
        extraClass="mt-5"
      />

      {/* Contact Email */}
      <CommonTextInputField
        fieldName="contactEmail"
        fieldType="text"
        fieldId={`${isContactDetailsExist ? "update-contact-branch-email" : "contact-branch-email"}`}
        control={control}
        errors={errors}
        errorsType={errors?.contactEmail}
        placeholderText="Contact Email"
        labelName="Contact Email"
        labelStatus={false}
        extraClass="mt-5"
      />

      {/* Opening Hours */}
      <CommonRepeatableInputFields
        labelText="Opening Hours"
        fieldId={`${isContactDetailsExist ? "update-contact-opening-timings" : "contact-opening-timings"}`}
        lableStatus={false}
        itemDetailsExist={isContactDetailsExist}
        repeatableField={watchedRepeatableField}
        repeatableLabelInputType="text"
        repeatableLabelFieldName="labels"
        repeatableLabelFieldPlaceholder="Days"
        repeatableValueInputType="text"
        repeatableValueFieldName="values"
        repeatableValueFieldPlaceholder="Timings"
        addLabelField={addLabelField}
        addValueField={addValueField}
        handleAddRepeatableField={handleAddRepeatableField}
        handleRemoveRepeatableField={handleRemoveRepeatableField}
        colorGrade={colorGrade}
        extraContainerClasses="mt-5"
      />

      {/* Latitude */}
      <CommonTextInputField
        fieldName="latitude"
        fieldType="text"
        fieldId={`${isContactDetailsExist ? "update-contact-google-direction-latitude" : "contact-google-direction-latitude"}`}
        control={control}
        errors={errors}
        errorsType={errors?.latitude}
        placeholderText="Latitude Direction"
        labelName="Latitude"
        labelStatus={true}
        extraClass="mt-5"
      />

      {/* Longitude */}
      <CommonTextInputField
        fieldName="longitude"
        fieldType="text"
        fieldId={`${isContactDetailsExist ? "update-contact-google-direction-longitude" : "contact-google-direction-longitude"}`}
        control={control}
        errors={errors}
        errorsType={errors?.longitude}
        placeholderText="Longitude Direction"
        labelName="Longitude"
        labelStatus={true}
        extraClass="mt-5"
      />

      {/* Meta Title */}
      <CommonTextInputField
        fieldName="metaTitle"
        fieldType="text"
        fieldId={`${isContactDetailsExist ? "update-contact-meta-title" : "contact-meta-title"}`}
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
          htmlForId={`${isContactDetailsExist ? "update-contact-meta-image" : "contact-meta-image"}`}
          star={false}
        />

        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          {!isContactDetailsExist ? (
            <FileReuseDialog
              htmlId="contact-meta-image"
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
              htmlId="update-contact-meta-image"
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
        fieldId={`${isContactDetailsExist ? "update-contact-meta-keywords" : "contact-meta-keywords"}`}
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
        fieldId={`${isContactDetailsExist ? "update-contact-meta-description" : "contact-meta-description"}`}
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
        isDetailsExist={isContactDetailsExist}
        colorGrade={colorGrade}
        label={isContactDetailsExist ? "Update Contact" : "Add New Contact"}
        icon={<FaMapLocationDot />}
      />
    </form>
  );
};

export default ContactFormDetails;
