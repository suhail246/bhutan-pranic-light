"use client";

import {
  CommonTextInputField,
  PageRefresh,
  PermissionsGroup,
  SubmitButton,
} from "@/components";
import { useAppSelector } from "@/store/hooks";
import { useForm } from "react-hook-form";
import { FaUserShield } from "react-icons/fa";

import {
  createNewRole,
  updatePerticularRole,
} from "@/actions/apiClientActions/user";
import { useErrorToast, useSuccessToast } from "@/lib/hooks";
import { AllUserRolesSchema } from "@/schemas";
import { getCustomTheme } from "@/utils/colors";
import { usePageRefresh } from "@/utils/refreshPage";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import mongoose from "mongoose";
import { useCallback, useEffect, useMemo } from "react";

const RoleForm = ({
  sessionUserId,
  groupPermission,
  targetRoleDetails = {},
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
    reset,
    setValue,
    setError,
    watch,
    clearErrors,
  } = useForm({
    resolver: zodResolver(AllUserRolesSchema),
    defaultValues: {
      name: targetRoleDetails?.name || "",
      permissionIds: targetRoleDetails?.selectedpermissionIds || [],
    },
  });
  const watchedPermissionIds = watch("permissionIds");

  // Relevant fields for comparison with the roleDetails object
  const relevantFields = {
    name: targetRoleDetails?.name || "",
    permissionIds: targetRoleDetails?.selectedpermissionIds || [],
  };
  const hasChanges = !isEqual(relevantFields, watch());

  useEffect(() => {
    if (isSubmitting && watchedPermissionIds.length === 0) {
      setError("permissionIds", {
        type: "manual",
        message: "At least one permission is required.",
      });
    } else if (
      watchedPermissionIds.some((id) => !mongoose.Types.ObjectId.isValid(id))
    ) {
      setError("permissionIds", {
        type: "manual",
        message: "Invalid permission ID.",
      });
    } else {
      clearErrors("permissionIds");
    }
  }, [watchedPermissionIds]);

  // Handle Permission Change
  const handlePermissionChange = useCallback(
    (permissionId, status) => {
      if (status) {
        setValue("permissionIds", [...watchedPermissionIds, permissionId]);
      } else {
        setValue(
          "permissionIds",
          watchedPermissionIds.filter((id) => id !== permissionId)
        );
      }
    },
    [setValue, watchedPermissionIds]
  );

  // Handle Validation Errors
  const handleValidationErrors = useCallback(
    (errors) => {
      Object.keys(errors).forEach((field) => {
        setError(field, {
          type: "server",
          message: errors[field].message,
        });
      });
    },
    [setError]
  );

  // Handle Submit functionality
  const onSubmit = async (data) => {
    // For Create New Role
    if (Object.keys(targetRoleDetails).length === 0) {
      const response = await createNewRole(data, sessionUserId);

      if (response.success) {
        useSuccessToast(response.message || "Role created successfully.");
        reset();
      } else {
        if (response.errors) {
          handleValidationErrors(response.errors);
        } else {
          useErrorToast(response.message || "Something went wrong.");
        }
      }
    }
    // For Update Role
    else {
      const response = await updatePerticularRole(
        data,
        sessionUserId,
        targetRoleDetails.targetId
      );

      if (response.success) {
        useSuccessToast(response.message || "Role updated successfully.");
        pageRefresh();
      } else {
        if (response.errors) {
          handleZodValidationErrors(response.errors);
        } else {
          useErrorToast(response.message || "Something went wrong.");
        }
      }
    }
  };

  if (isPending) {
    return <PageRefresh />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-5 py-3">
      {/* Role Name */}
      <CommonTextInputField
        fieldName="name"
        fieldType="text"
        fieldId="role-name"
        control={control}
        errors={errors}
        errorsType={errors?.name}
        placeholderText="Enter role name"
        labelName="Name"
        labelStatus={true}
      />

      <div className="p-3 mt-5 border-b dark:border-[#fff]/10 flex flex-col md:flex-row md:items-center gap-2 md:gap-5">
        <h1 className="text-[15px] text-dark-weight-400 dark:text-light-weight-550 font-poppins-rg">
          Permissions
        </h1>

        {errors && errors.permissionIds && (
          <p className="text-red-500 text-[13px] font-poppins-rg">
            {errors.permissionIds.message}
          </p>
        )}
      </div>

      <PermissionsGroup
        groupPermission={groupPermission}
        handlePermissionChange={handlePermissionChange}
        watchedPermissionIds={watchedPermissionIds}
      />

      <SubmitButton
        isSubmitting={isSubmitting}
        hasChanges={hasChanges}
        isDetailsExist={Object.keys(targetRoleDetails).length > 0}
        colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
        label={
          Object.keys(targetRoleDetails).length > 0
            ? "Update Role"
            : "Create Role"
        }
        icon={<FaUserShield />}
      />
    </form>
  );
};

export default RoleForm;
