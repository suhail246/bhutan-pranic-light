"use client";

import { globalStyleObj } from "@/app/assets/styles";
import {
  FileReuseDialog,
  LabelText,
  NormalTextEditorInputFiled,
  NormalTextInputField,
  RepeatableOneInputField,
} from "@/components";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getFileSettingsValue } from "@/utils/website-settings-helper";
import { useTheme } from "next-themes";
import { MdErrorOutline } from "react-icons/md";

const CoursePackageFormFields = ({
  formData = {},
  coursePackageDetails = {},
  activeLanguageTab = "en",
  packageTypes = [],
  itemList = [],
  handleOnChangeTextInput = () => {},
  handleOnChangeTextEditor = () => {},
  handleOnChangeSelectInput = () => {},
  handleOnChangeFile = () => {},
  handleAddRepeatableField = () => {},
  handleOnChangeRepeatableFields = () => {},
  handleRemoveRepeatableField = () => {},
  filesList = [],
  allFiles = [],
  paginationDetails = {},
  searchValue,
  selectedFileType,
  adminRole,
  permissionsList,
  isCoursePackageDetailsExist,
  isHideInOtherLanguages,
}) => {
  const { theme } = useTheme();

  return (
    <>
      {/* Cours Id */}
      {isHideInOtherLanguages && (
        <div className={`${globalStyleObj.commonInputContainerClass} mb-5`}>
          <LabelText text="Course" htmlForId="course-id" star={true} />
          <div className="flex flex-col gap-2 w-full max-w-[800px]">
            <Select
              key={`course-id-${activeLanguageTab}`}
              id="course-id"
              name="courseId"
              value={formData?.courseId || ""}
              onValueChange={(value) =>
                handleOnChangeSelectInput("courseId", value)
              }
            >
              <SelectTrigger
                className={globalStyleObj.commonDefaultInputFieldClass}
              >
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent
                className={`border-0 ${globalStyleObj.backgroundLight900Dark200}`}
              >
                <SelectGroup>
                  {itemList.length > 0 ? (
                    itemList.map((course) => (
                      <SelectItem
                        key={course._id}
                        value={course._id}
                        className="text-[13px] font-poppins-rg text-light-weight-400 cursor-pointer"
                      >
                        {course?.title?.en || "Default Course"}
                      </SelectItem>
                    ))
                  ) : (
                    <p className="text-light-weight-400 text-[13px] font-poppins-rg flex items-center justify-center gap-2">
                      <MdErrorOutline size={16} color="#878a99" />
                      <span>No Courses Found</span>
                    </p>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Order Number */}
      {isHideInOtherLanguages && (
        <NormalTextInputField
          labelText="Order No."
          labelStatus={true}
          fieldId="course-package-order-number"
          fieldName="orderNumber"
          placeholderText="Order Number"
          inputValue={formData?.orderNumber || ""}
          onChangeTextInputField={handleOnChangeTextInput}
          extraFiledInfo="Enter higher number for the package to be shown on top OR default is 1"
          extraContainerClasses="mb-5"
          inputBoxSize="max-w-[800px]"
        />
      )}

      {/* Package Types */}
      <div className={`${globalStyleObj.commonInputContainerClass} mb-5`}>
        <LabelText
          text="Package Type"
          htmlForId="course-package-type"
          star={false}
          translateField={isCoursePackageDetailsExist}
        />
        <div className="w-full max-w-[800px]">
          <Select
            key={`course-package-type-${activeLanguageTab}`}
            id="course-package-type"
            name="coursePackageType"
            value={
              formData?.coursePackageType ||
              coursePackageDetails?.coursePackageType ||
              ""
            }
            onValueChange={(value) => {
              handleOnChangeSelectInput(
                "coursePackageType",
                value || coursePackageDetails?.coursePackageType || ""
              );
            }}
          >
            <SelectTrigger
              className={globalStyleObj.commonDefaultInputFieldClass}
            >
              <SelectValue placeholder="Select Package Type" />
            </SelectTrigger>
            <SelectContent
              className={`border-0 ${globalStyleObj.backgroundLight900Dark200}`}
            >
              <SelectGroup>
                <SelectItem
                  value={null}
                  className="test-[13px] font-poppins-rg text-light-weight-400"
                >
                  None
                </SelectItem>

                {packageTypes.length > 0 &&
                  packageTypes.map((type, index) => (
                    <SelectItem
                      key={`course-package-type-${index + 1}`}
                      value={type}
                      className="text-[13px] font-poppins-rg text-light-weight-400 cursor-pointer"
                    >
                      {type}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Package Title */}
      <NormalTextInputField
        labelText="Title"
        fieldId="course-package-details-title"
        fieldName="packageTitle"
        placeholderText="Title"
        inputValue={formData?.packageTitle || ""}
        onChangeTextInputField={handleOnChangeTextInput}
        extraContainerClasses="mb-5"
        inputBoxSize="max-w-[800px]"
        translateField={isCoursePackageDetailsExist}
      />

      {/* Package Price */}
      <NormalTextInputField
        labelText="Package Price"
        fieldId="course-package-details-price"
        fieldName="packagePrice"
        placeholderText="Package Price"
        inputValue={formData?.packagePrice || ""}
        onChangeTextInputField={handleOnChangeTextInput}
        extraFiledInfo="Make sure currency and amount must have seperated by comma(,). Example: AED,1000"
        extraContainerClasses="mb-5"
        inputBoxSize="max-w-[800px]"
        translateField={isCoursePackageDetailsExist}
      />

      {/* Package Terms */}
      <NormalTextEditorInputFiled
        labelText="Package Terms"
        fieldId="course-package-details-terms"
        fieldName="packageTerms"
        placeholderText="Package Terms"
        inputValue={formData?.packageTerms || ""}
        toolbarButtons="all"
        onChangeTextEditorFiled={handleOnChangeTextEditor}
        extraContainerClasses="mb-5"
        textEditorMaxWidth="max-w-[800px]"
        translateField={isCoursePackageDetailsExist}
      />

      {/* Tag Icon */}
      {isHideInOtherLanguages && (
        <div className={`mb-5 ${globalStyleObj.commonInputContainerClass}`}>
          <LabelText
            text="Tag Icon"
            htmlForId="course-package-details-tag-icon"
          />

          <div className="flex flex-col gap-2 w-full max-w-[800px]">
            <FileReuseDialog
              htmlId="course-package-details-tag-icon"
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              onChangeBannerImage={(id) =>
                handleOnChangeFile("packageTagIcon", id)
              }
              selectedBannerFileId={
                isCoursePackageDetailsExist
                  ? (getFileSettingsValue(
                      allFiles,
                      formData?.packageTagIcon || ""
                    )?._id ?? null)
                  : null
              }
              selectedBannerFileName={
                isCoursePackageDetailsExist
                  ? (getFileSettingsValue(
                      allFiles,
                      formData?.packageTagIcon || ""
                    )?.fileName ?? null)
                  : null
              }
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          </div>
        </div>
      )}

      {/* Tag Name */}
      <NormalTextInputField
        labelText="Tag Name"
        fieldId="course-package-details-tag-name"
        fieldName="packageTagName"
        placeholderText="Tag Name"
        inputValue={formData?.packageTagName || ""}
        onChangeTextInputField={handleOnChangeTextInput}
        extraContainerClasses="mb-5"
        inputBoxSize="max-w-[800px]"
        translateField={isCoursePackageDetailsExist}
      />

      {/* Button Label */}
      <NormalTextInputField
        labelText="Button Label"
        fieldId="course-package-details-button-label"
        fieldName="packageButtonLabel"
        placeholderText="Button Text"
        inputValue={formData?.packageButtonLabel || ""}
        onChangeTextInputField={handleOnChangeTextInput}
        extraContainerClasses="mb-5"
        inputBoxSize="max-w-[800px]"
        translateField={isCoursePackageDetailsExist}
      />

      {/* Button Link */}
      {isHideInOtherLanguages && (
        <NormalTextInputField
          labelText="Button Link"
          fieldId="course-package-details-button-link"
          fieldName="packageButtonLink"
          placeholderText="Button Link"
          inputValue={formData?.packageButtonLink || ""}
          onChangeTextInputField={handleOnChangeTextInput}
          extraContainerClasses="mb-5"
          inputBoxSize="max-w-[800px]"
        />
      )}

      {/* Features Title */}
      <NormalTextInputField
        labelText="Features Title"
        fieldId="course-package-details-features-title"
        fieldName="packageFeaturesTitle"
        placeholderText="Features Title"
        inputValue={formData?.packageFeaturesTitle || ""}
        onChangeTextInputField={handleOnChangeTextInput}
        extraContainerClasses="mb-5"
        inputBoxSize="max-w-[800px]"
        translateField={isCoursePackageDetailsExist}
      />

      {/* Features Icon */}
      {isHideInOtherLanguages && (
        <div className={`mb-5 ${globalStyleObj.commonInputContainerClass}`}>
          <LabelText
            text="Features Icon"
            htmlForId="course-package-details-features-icon"
          />

          <div className="flex flex-col gap-2 w-full max-w-[800px]">
            <FileReuseDialog
              htmlId="course-package-details-features-icon"
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              onChangeBannerImage={(id) =>
                handleOnChangeFile("packageFeaturesIcon", id)
              }
              selectedBannerFileId={
                isCoursePackageDetailsExist
                  ? (getFileSettingsValue(
                      allFiles,
                      formData?.packageFeaturesIcon || ""
                    )?._id ?? null)
                  : null
              }
              selectedBannerFileName={
                isCoursePackageDetailsExist
                  ? (getFileSettingsValue(
                      allFiles,
                      formData?.packageFeaturesIcon || ""
                    )?.fileName ?? null)
                  : null
              }
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          </div>
        </div>
      )}

      {/* Features Repeater */}
      <RepeatableOneInputField
        formData={formData}
        labelText="Features"
        fieldId="course-package-details-features"
        translateField={isCoursePackageDetailsExist}
        repeatableKeyname="packageFeatures"
        repeatableKeys={["title"]}
        addNewField={handleAddRepeatableField}
        removeField={handleRemoveRepeatableField}
        onChangeField={handleOnChangeRepeatableFields}
        placeHolderText="Text"
        inputBoxMaxWidth="max-w-[800px]"
      />
    </>
  );
};

export default CoursePackageFormFields;
