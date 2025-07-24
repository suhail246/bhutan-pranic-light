"use client";

import { globalStyleObj } from "@/app/assets/styles";
import {
  CommonTextInputField,
  FileReuseDialog,
  LabelText,
  SubmitButton,
} from "@/components";
import JoditEditor from "jodit-react";
import { MdFeedback } from "react-icons/md";

const TestimonialFormDetails = ({
  userId,
  adminRole,
  permissionsList,
  isTestimonialDetailsExist,
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
  onChangeImage,
  paginationDetails,
  searchValue,
  watchMessage,
  setValue,
  theme,
  colorGrade,
}) => {
  return (
    <form onSubmit={submitFunction} className={`p-3 sm:p-5`}>
      {/* Name */}
      <CommonTextInputField
        fieldName="name"
        fieldType="text"
        fieldId={`${isTestimonialDetailsExist ? "update-testimonial-name" : "testimonial-name"}`}
        control={control}
        errors={errors}
        errorsType={errors?.name}
        placeholderText="Name"
        labelName="Name"
        labelStatus={true}
        translateField={isTestimonialDetailsExist}
      />

      {/* Designation */}
      <CommonTextInputField
        fieldName="designation"
        fieldType="text"
        fieldId={`${isTestimonialDetailsExist ? "update-testimonial-designation" : "testimonial-designation"}`}
        control={control}
        errors={errors}
        errorsType={errors?.designation}
        placeholderText="Designation"
        labelName="Designation"
        translateField={isTestimonialDetailsExist}
        extraClass="mt-5"
      />

      {/* Message */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Message"
          htmlForId={`${isTestimonialDetailsExist ? "update-testimonial-message" : "testimonial-message"}`}
          star={true}
          translateField={isTestimonialDetailsExist}
        />

        <div
          className={`w-full max-w-[800px] rounded-sm border ${
            errors && errors.message
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
            id={`${isTestimonialDetailsExist ? "update-testimonial-message" : "testimonial-message"}`}
            value={watchMessage}
            name="message"
            onBlur={(newContent) => {
              setValue("message", newContent);
            }}
          />
        </div>
      </div>

      {/* Order Number */}
      <CommonTextInputField
        fieldName="orderNumber"
        fieldType="text"
        fieldId={`${isTestimonialDetailsExist ? "update-testimonial-order-number" : "testimonial-order-number"}`}
        control={control}
        errors={errors}
        errorsType={errors?.orderNumber}
        placeholderText="Order Number"
        labelName="Order No."
        extraClass="mt-5"
        extraInformationText="Enter higher number for the testimonial to be shown on top OR default is 1"
      />

      {/* Rating */}
      <CommonTextInputField
        fieldName="rating"
        fieldType="text"
        fieldId={`${isTestimonialDetailsExist ? "update-testimonial-rating" : "testimonial-rating"}`}
        control={control}
        errors={errors}
        errorsType={errors?.rating}
        placeholderText="Rating"
        labelName="Rating"
        extraClass="mt-5"
        extraInformationText="Rating must be (1-5)"
      />

      {/* Image */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Image"
          htmlForId={`${isTestimonialDetailsExist ? "update-testimonial-image" : "testimonial-image"}`}
        />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          {!isTestimonialDetailsExist ? (
            <FileReuseDialog
              htmlId="testimonial-image"
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
              htmlId="update-testimonial-image"
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

      {/* Submit Button */}
      <SubmitButton
        isSubmitting={isSubmitting}
        hasChanges={hasChanges}
        isDetailsExist={isTestimonialDetailsExist}
        colorGrade={colorGrade}
        label={
          isTestimonialDetailsExist
            ? "Update Testimonial"
            : "Create Testimonial"
        }
        icon={<MdFeedback />}
        extraButtonStyle="sm:max-w-[250px]"
      />
    </form>
  );
};

export default TestimonialFormDetails;
