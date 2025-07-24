"use client";

import { globalStyleObj } from "@/app/assets/styles";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Input } from "../ui/input";

const PasswordInputFiled = ({
  fieldName,
  fieldId,
  control,
  errors,
  errorsType,
  placeholderText,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2 overflow-hidden rounded-md border border-[#000]/20 dark:border-[#fff]/10 dark:bg-[#000]/10 pr-3 my-2">
        <Controller
          name={fieldName}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id={fieldId}
              type={isPasswordVisible ? "text" : "password"}
              value={field.value || ""}
              placeholder={placeholderText}
              className="w-full max-w-[800px] border-0 font-poppins-rg text-[13px] text-light-weight-400 focus-visible:outline-none focus-visible:ring-0 dark:text-light-weight-400 py-5"
            />
          )}
        />
        <button
          type="button"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          className="text-[16px] text-light-weight-400"
        >
          {isPasswordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </button>
      </div>
      {errors && errorsType && (
        <p className={globalStyleObj.commonInputErrorClass}>
          {errorsType.message}
        </p>
      )}
    </>
  );
};

export default PasswordInputFiled;
