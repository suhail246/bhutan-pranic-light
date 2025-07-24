"use client";

import {
  createNewAdminStaff,
  updatePerticularUser,
} from "@/actions/apiClientActions/user";
import { globalStyleObj } from "@/app/assets/styles";
import { PageRefresh, UserForm } from "@/components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PERMISSIONS } from "@/constants/permissions";
import {
  useErrorToast,
  useSuccessToast,
  useUIPermissionCheck,
} from "@/lib/hooks";
import { AdminStaffSchema, UserUpdateSchema } from "@/schemas";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { usePageRefresh } from "@/utils/refreshPage";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { RefreshCw, UserCog } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const AdminStaff = ({
  sessionId,
  targetId,
  roleLists,
  userDetails = {},
  adminRole,
  permissionsList,
}) => {
  const { isPending, pageRefresh } = usePageRefresh();
  const [open, setOpen] = useState(false);
  const isUserDetailsPresent = Object.keys(userDetails).length > 0;

  // Theme Colors
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );

  const { bgColor, hoverBgColor, textColor, hexCode } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  // Form Controls
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
    setError,
  } = useForm({
    resolver: zodResolver(
      isUserDetailsPresent ? UserUpdateSchema : AdminStaffSchema
    ),
    defaultValues: {
      name: userDetails?.username || "",
      email: userDetails?.email || "",
      password: "",
      roleId: isUserDetailsPresent
        ? userDetails?.adminAsignedRole?._id || null
        : "",
    },
  });
  const relevantFields = {
    name: userDetails?.username || "",
    email: userDetails?.email || "",
    password: "",
    roleId: isUserDetailsPresent
      ? userDetails?.adminAsignedRole?._id || null
      : "",
  };
  const hasChanges = !isEqual(relevantFields, watch());

  useEffect(() => {
    // Reset the form only when the modal closes
    const resetForm = () => {
      if (!open) reset();
    };

    if (!isUserDetailsPresent) resetForm();
  }, [open, reset]);

  // Form Validation Errors
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

  // Form Submit Function
  const onSubmit = async (data) => {
    if (!isUserDetailsPresent) {
      const response = await createNewAdminStaff(sessionId, data);

      if (response.success) {
        useSuccessToast(response.message || "Staff created successfully.");
        setOpen(false);
        pageRefresh();
      } else {
        if (response.errors) {
          handleValidationErrors(response.errors);
        } else {
          useErrorToast(response.message || "Something went wrong.");
        }
      }
    } else {
      const response = await updatePerticularUser(sessionId, targetId, data);

      if (response.success) {
        useSuccessToast(response.message || "Staff updated successfully.");
        setOpen(false);
        setValue("password", "");
        pageRefresh();
      } else {
        if (response.errors) {
          handleValidationErrors(response.errors);
        } else {
          useErrorToast(response.message || "Something went wrong.");
        }
      }
    }
  };

  // Render Only Update User Form
  if (isUserDetailsPresent) {
    if (isPending) {
      return <PageRefresh />;
    }

    return (
      <UserForm
        control={control}
        errors={errors}
        formSubmit={handleSubmit(onSubmit)}
        roleLists={roleLists}
        isSubmitting={isSubmitting}
        themeObj={{
          bgColor,
          hoverBgColor,
          textColor,
          hexCode,
        }}
        isUserDetailsPresent={isUserDetailsPresent}
        hasChanges={hasChanges}
        adminAsignRoleName={userDetails?.adminAsignedRole?.name || ""}
      />
    );
  }

  // Render Create Staff Form
  const renderCreateStaffForm = useCallback(() => {
    return (
      <ScrollArea className="h-[200px]">
        <UserForm
          control={control}
          errors={errors}
          formSubmit={handleSubmit(onSubmit)}
          roleLists={roleLists}
          isSubmitting={isSubmitting}
          themeObj={{
            bgColor,
            hoverBgColor,
            textColor,
            hexCode,
          }}
          isUserDetailsPresent={isUserDetailsPresent}
          hasChanges={hasChanges}
          adminAsignRoleName={userDetails?.adminAsignedRole?.name || ""}
        />
      </ScrollArea>
    );
  }, [
    bgColor,
    control,
    errors,
    handleSubmit,
    hasChanges,
    hoverBgColor,
    isSubmitting,
    isUserDetailsPresent,
    roleLists,
    textColor,
    userDetails,
  ]);

  // Main Dialog
  if (
    useUIPermissionCheck(
      adminRole,
      permissionsList,
      PERMISSIONS.STAFF.ADD_STAFF
    )
  ) {
    return (
      <Dialog
        key="create-admin-staff-dialog"
        open={open}
        onOpenChange={setOpen}
      >
        <DialogTrigger asChild>
          <button
            type="button"
            className={`flex items-center justify-center gap-2 ${bgColor} ${hoverBgColor} ${textColor} px-5 py-2 font-poppins-rg text-[13px] hover:text-white rounded-full transition-300 max-w-[180px]`}
          >
            {isPending ? (
              <>
                <RefreshCw size={14} className="animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <UserCog size={15} />
                Create Staff
              </>
            )}
          </button>
        </DialogTrigger>
        <DialogContent
          className={`${globalStyleObj.backgroundLight800Dark600}`}
        >
          <DialogHeader>
            <DialogTitle className="text-left font-poppins-rg text-[14px] md:text-[16px] text-dark-weight-400 dark:text-light-weight-550 tracking-wide">
              Staff Information
            </DialogTitle>
            <DialogDescription className="text-left font-poppins-rg text-[13px] text-light-weight-400">
              Create a new staff member. And assign the staff to a role.
            </DialogDescription>

            {renderCreateStaffForm()}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }
};

export default AdminStaff;
