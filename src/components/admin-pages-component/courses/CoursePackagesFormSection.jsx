import { globalStyleObj } from "@/app/assets/styles";
import {
  CommonTextAreaField,
  CommonTextInputField,
  LabelText,
  RepeatableTwoTextInputFields,
} from "@/components";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const CoursePackagesFormSection = ({
  control,
  errors,
  formData,
  handleOnChangePackageCategoriesSwitchField,
  handleOnChangePackagesCategories,
  handleAddRepeatableField,
  handleOnChangeRepeatableFields,
  handleRemoveRepeatableField,
  isCourseDetailsExist = false,
  courseStaticId = "",
}) => {
  return (
    <>
      {/* Title */}
      <CommonTextInputField
        fieldName="packagesTitle"
        fieldType="text"
        fieldId="course-details-packages-title"
        control={control}
        errors={errors}
        errorsType={errors?.packagesTitle}
        placeholderText="Title"
        labelName="Packages Title"
        extraClass="mb-5"
        extraInformationText="Title name will be shown as tag in the course details page"
        inputBoxMaxWidth="xl:max-w-[500px]"
        translateField={isCourseDetailsExist}
      />

      {/* Heading */}
      <CommonTextInputField
        fieldName="packagesHeading"
        fieldType="text"
        fieldId="course-details-packages-heading"
        control={control}
        errors={errors}
        errorsType={errors?.packagesHeading}
        placeholderText="Heading"
        labelName="Packages Heading"
        extraClass="mb-5"
        inputBoxMaxWidth="xl:max-w-[500px]"
        translateField={isCourseDetailsExist}
      />

      {/* Sub Heading */}
      <CommonTextAreaField
        fieldName="packagesSubHeading"
        fieldType="text"
        fieldId="course-details-packages-sub-heading"
        control={control}
        errors={errors}
        errorsType={errors?.packagesSubHeading}
        placeholderText="Sub Heading"
        labelName="Packages Sub Heading"
        extraClass="mb-5"
        inputBoxMaxWidth="xl:max-w-[500px]"
        translateField={isCourseDetailsExist}
      />

      {/* Packages Categories */}
      <div className={`${globalStyleObj.commonInputContainerClass} mb-5`}>
        <LabelText
          text="Packages Categories"
          htmlForId="course-details-packages-categories-switch"
          translateField={isCourseDetailsExist}
        />

        <div className="w-full xl:max-w-[500px]">
          <Switch
            id="course-details-packages-categories-switch"
            name="packageCategoriesSwitch"
            checked={formData?.packageCategoriesSwitch || false}
            onCheckedChange={(checked) =>
              handleOnChangePackageCategoriesSwitchField(
                "packageCategoriesSwitch",
                checked
              )
            }
            className={`data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-slate-200 dark:data-[state=checked]:bg-green-500 dark:data-[state=unchecked]:bg-[#000]/20 h-5 w-9`}
            thumbClassName={`data-[state=checked]:bg-[#fff] data-[state=unchecked]:bg-[#fff] dark:data-[state=checked]:bg-[#fff] dark:data-[state=unchecked]:bg-[#fff]/20 h-4 w-4`}
          />

          {formData?.packageCategories?.length > 0 && (
            <div className={`w-full mt-3 flex flex-col gap-3`}>
              {formData.packageCategories.map((item, index) => (
                <Input
                  key={`packages-category-${index + 1}`}
                  type="text"
                  value={formData?.packageCategories?.[index] || ""}
                  onChange={(e) =>
                    handleOnChangePackagesCategories(index, e.target.value)
                  }
                  placeholder={`Category ${index + 1}`}
                  className="w-full border border-[#000]/20 font-poppins-rg text-[13px] text-light-weight-400 focus-visible:outline-none focus-visible:ring-0 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Package Fee Structure Repeater onlt for courseStaticId = golden-visa-driving-license */}
      {courseStaticId === "golden-visa-driving-license" && (
        <RepeatableTwoTextInputFields
          formData={formData}
          labelText="Fee Structure"
          fieldId="course-details-package-fee-structure"
          translateField={isCourseDetailsExist}
          repeatableKeyname="packageFeeStructure"
          repeatableKeys={["services", "amounts"]}
          addNewField={handleAddRepeatableField}
          removeField={handleRemoveRepeatableField}
          onChangeField={handleOnChangeRepeatableFields}
          firstInputFieldPlaceholder="Service"
          secondInputFieldPlaceholder="Amount"
          inputBoxMaxWidth="xl:max-w-[500px]"
        />
      )}
    </>
  );
};

export default CoursePackagesFormSection;
