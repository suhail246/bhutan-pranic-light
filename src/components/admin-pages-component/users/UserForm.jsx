"use client";

import { globalStyleObj } from "@/app/assets/styles";
import {
  LabelText,
  PasswordInputFiled,
  SubmitButton,
  TextInputField,
} from "@/components";
import { UserPen } from "lucide-react";
import { Controller } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MdErrorOutline } from "react-icons/md";

const UserForm = ({
  control,
  errors,
  formSubmit,
  roleLists,
  isSubmitting,
  themeObj,
  isUserDetailsPresent,
  hasChanges,
  adminAsignRoleName,
}) => {
  return (
    <>
      <form
        onSubmit={formSubmit}
        className={`${isUserDetailsPresent ? "" : "ml-2"}`}
      >
        {/* Staff Name */}
        <div
          className={`${isUserDetailsPresent ? globalStyleObj.commonInputContainerClass : "flex flex-col items-start gap-2"}`}
        >
          <LabelText text="Name" htmlForId="staff-name" star={true} />
          <div
            className={`flex flex-col gap-2 w-full ${isUserDetailsPresent ? "max-w-[800px]" : "max-w-[400px]"}`}
          >
            <TextInputField
              fieldName="name"
              fieldId="staff-name"
              control={control}
              errors={errors}
              errorsType={errors?.name}
              placeholderText="Enter name"
            />
          </div>
        </div>

        {/* Staff Email */}
        <div
          className={`${isUserDetailsPresent ? globalStyleObj.commonInputContainerClass : "flex flex-col items-start gap-2"} mt-5`}
        >
          <LabelText text="Email" htmlForId="staff-email" star={true} />
          <div
            className={`flex flex-col gap-2 w-full ${isUserDetailsPresent ? "max-w-[800px]" : "max-w-[400px]"}`}
          >
            <TextInputField
              fieldName="email"
              fieldId="staff-email"
              control={control}
              errors={errors}
              errorsType={errors?.email}
              placeholderText="Enter email"
            />
          </div>
        </div>

        {/* Staff Password */}
        <div
          className={`${isUserDetailsPresent ? globalStyleObj.commonInputContainerClass : "flex flex-col items-start gap-2"} mt-5`}
        >
          <LabelText
            text="Password"
            htmlForId="staff-password"
            star={isUserDetailsPresent ? false : true}
          />
          <div
            className={`flex flex-col gap-2 w-full ${isUserDetailsPresent ? "max-w-[800px]" : "max-w-[400px]"}`}
          >
            <PasswordInputFiled
              fieldName="password"
              fieldId="staff-password"
              control={control}
              errors={errors}
              errorsType={errors?.password}
              placeholderText={
                isUserDetailsPresent ? "Enter New Password" : "Enter Password"
              }
            />
          </div>
        </div>

        {/* Roles */}
        {(!isUserDetailsPresent ||
          (adminAsignRoleName && adminAsignRoleName !== "Super Admin")) && (
          <div
            className={`${isUserDetailsPresent ? globalStyleObj.commonInputContainerClass : "flex flex-col items-start gap-2"} mt-5`}
          >
            <LabelText text="Role" htmlForId="staff-assign-role" star={true} />
            <div
              className={`flex flex-col gap-2 w-full ${isUserDetailsPresent ? "max-w-[800px]" : "max-w-[400px]"}`}
            >
              <Controller
                name="roleId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    id="staff-assign-role"
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger
                      className={globalStyleObj.commonDefaultInputFieldClass}
                    >
                      <SelectValue placeholder="--" />
                    </SelectTrigger>
                    <SelectContent
                      className={`border-0 ${globalStyleObj.backgroundLight900Dark200}`}
                    >
                      <SelectGroup>
                        {roleLists.length > 0 ? (
                          roleLists.map((role) => (
                            <SelectItem
                              key={role._id}
                              value={role._id}
                              className={`text-[12px] font-poppins-rg text-dark-weight-600 dark:text-light-weight-550 cursor-pointer`}
                            >
                              {role.name}
                            </SelectItem>
                          ))
                        ) : (
                          <p className="text-light-weight-400 text-[13px] font-poppins-rg flex items-center justify-center gap-2">
                            <MdErrorOutline size={16} color="#878a99" />
                            Role does not created yet
                          </p>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors && errors.roleId && (
                <p className={globalStyleObj.commonInputErrorClass}>
                  {errors.roleId.message}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <SubmitButton
          isSubmitting={isSubmitting}
          hasChanges={hasChanges}
          isDetailsExist={isUserDetailsPresent}
          colorGrade={themeObj}
          label={isUserDetailsPresent ? "Update User" : "Create User"}
          icon={<UserPen size={16} />}
        />
      </form>
    </>
  );
};

export default UserForm;
