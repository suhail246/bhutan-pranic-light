"use client";

import { updateProfileDetails } from "@/actions/authActions";
import { globalStyleObj } from "@/app/assets/styles";
import {
  CommonTextInputField,
  FileReuseDialog,
  LabelText,
  PageRefresh,
  SubmitButton,
} from "@/components";
import { Input } from "@/components/ui/input";
import { useErrorToast, useSuccessToast } from "@/lib/hooks";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { usePageRefresh } from "@/utils/refreshPage";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { FaUserCog } from "react-icons/fa";

const AdminUserInfoForm = ({
  userDetails,
  permissionsList,
  filesList,
  allFiles,
  paginationDetails,
  searchValue,
  selectedFileType,
}) => {
  const { isPending, pageRefresh } = usePageRefresh();
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const { bgColor, hoverBgColor, textColor, hexCode } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      ...userDetails,
    },
  });

  // Watched form data
  const formData = watch();

  const isUserDetailsExist = Object.keys(userDetails).length > 0;

  const handleOnChangeFile = (keyName, value) => {
    setValue(keyName, value || null);
  };

  // Handle Form Submit Functionality
  const onSubmit = async (data) => {
    if (data.password && data.password.length < 8) {
      useErrorToast("Password must be at least 8 characters.");
      return;
    }

    try {
      const response = await updateProfileDetails(data);

      if (response.success) {
        useSuccessToast(response?.message || "Profile updated successfully.");
        pageRefresh();
      }
    } catch (error) {
      console.log(`❌ Error in updating the profile CLIENT: ${error}`);
      useErrorToast(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again later."
      );
    }
  };

  // Handle Refresh Page Loading when update API runs
  if (isPending) {
    return <PageRefresh />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${globalStyleObj.backgroundLight900Dark300} w-full md:max-w-[700px] p-3 md:p-5 md:mx-auto mt-[40px] rounded-sm shadow-light overflow-hidden`}
    >
      {/* User Name */}
      <CommonTextInputField
        fieldName="username"
        fieldType="text"
        fieldId={`user-info-username`}
        control={control}
        errors={errors}
        errorsType={errors?.username}
        placeholderText="Full Name"
        labelName="Name"
        inputBoxMaxWidth="xl:max-w-[500px]"
      />

      {/* Email */}
      <CommonTextInputField
        fieldName="email"
        fieldType="text"
        fieldId={`user-info-email`}
        control={control}
        errors={errors}
        errorsType={errors?.email}
        placeholderText="Email"
        labelName="Email"
        extraClass="mt-5"
        inputBoxMaxWidth="xl:max-w-[500px]"
      />

      {/* Profile Image */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText text="Profile Image" htmlForId="user-info-profile-picture" />

        <div className="flex flex-col gap-2 w-full xl:max-w-[500px]">
          <FileReuseDialog
            htmlId="user-info-profile-picture"
            filesList={filesList}
            allFiles={allFiles}
            paginationDetails={paginationDetails}
            searchValue={searchValue}
            selectedFileType={selectedFileType}
            onChangeBannerImage={(id) => handleOnChangeFile("picture", id)}
            selectedBannerFileId={userDetails?.picture?._id || null}
            selectedBannerFileName={userDetails?.picture?.fileName || null}
            adminRole={userDetails?.adminAsignedRole?.name}
            permissionsList={permissionsList}
          />
        </div>
      </div>

      {/* Password */}
      <CommonTextInputField
        fieldName="password"
        fieldType="text"
        fieldId={`user-info-password`}
        control={control}
        errors={errors}
        errorsType={errors?.password}
        placeholderText="New Password"
        labelName="Password"
        extraClass="mt-5"
        inputBoxMaxWidth="xl:max-w-[500px]"
      />

      {/* Role */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText text="Role" htmlForId="user-info-profile-role" />

        <div className="w-full xl:max-w-[500px]">
          <Input
            id="user-info-profile-role"
            type="text"
            value={formData?.adminAsignedRole?.name || ""}
            disabled
            placeholder="Role"
            className={globalStyleObj.commonDefaultInputFieldClass}
          />
        </div>
      </div>

      <SubmitButton
        isSubmitting={isSubmitting}
        colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
        label="Update Profile"
        icon={<FaUserCog />}
      />
    </form>
  );
};

export default AdminUserInfoForm;
