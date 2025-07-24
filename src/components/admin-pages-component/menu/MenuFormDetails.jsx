import {
  CommonSelectInputField,
  CommonTextInputField,
  SubmitButton,
} from "@/components";
import { CgMenuRound } from "react-icons/cg";

const MenuFormDetails = ({
  isMenuDetailsExist = false,
  isSubmitting,
  hasChanges,
  submitFunction,
  control,
  errors,
  menuTree,
  colorGrade,
}) => {
  return (
    <form onSubmit={submitFunction} className={`p-3 sm:p-5`}>
      {/* Menu Name */}
      <CommonTextInputField
        fieldName="name"
        fieldType="text"
        fieldId={`${isMenuDetailsExist ? "update-menu-name" : "menu-name"}`}
        control={control}
        errors={errors}
        errorsType={errors?.name}
        placeholderText="Menu Name"
        labelName="Menu Name"
        labelStatus={true}
        translateField={isMenuDetailsExist}
      />

      {/* Menu Link */}
      <CommonTextInputField
        fieldName="link"
        fieldType="text"
        fieldId={`${isMenuDetailsExist ? "update-menu-link" : "menu-link"}`}
        control={control}
        errors={errors}
        errorsType={errors?.link}
        placeholderText="Menu Link"
        labelName="Menu Link"
        labelStatus={true}
        extraClass="mt-5"
        extraInformationText="Pathname must be match with folder structure"
      />

      {/* Parent Menu */}
      <CommonSelectInputField
        fieldName="parentMenu"
        fieldId={`${isMenuDetailsExist ? "update-parent-menu-id" : "parent-menu-id"}`}
        control={control}
        errors={errors}
        errorsType={errors?.parentMenu}
        itemList={menuTree}
        notFoundText="Menu does not created yet"
        labelName="Select Parent Menu"
        labelStatus={false}
        extraClass="mt-5"
        extraItemName="None"
        placeholderText="No Parent"
      />

      {/* Ordering Number */}
      <CommonTextInputField
        fieldName="orderNumber"
        fieldType="number"
        fieldId={`${isMenuDetailsExist ? "update-menu-link" : "menu-link"}`}
        control={control}
        errors={errors}
        errorsType={errors?.orderNumber}
        placeholderText="Ordering Number"
        labelName="Ordering Nummber"
        labelStatus={false}
        extraClass="mt-5"
        extraInformationText="Use higher no for heigh priority"
      />

      <SubmitButton
        isSubmitting={isSubmitting}
        hasChanges={hasChanges}
        isDetailsExist={isMenuDetailsExist}
        colorGrade={colorGrade}
        label={isMenuDetailsExist ? "Update Menu" : "Create Menu"}
        icon={<CgMenuRound />}
      />
    </form>
  );
};

export default MenuFormDetails;
