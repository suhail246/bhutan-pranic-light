"use client";

import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

import { globalStyleObj } from "@/app/assets/styles";
import ROUTES from "@/constants/routes";
import { useErrorToast, useSuccessToast } from "@/lib/hooks";
import { SignInSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LabelText, PasswordInputFiled, TextInputField } from "..";

const LoginForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: "", password: "" },
  });

  const router = useRouter();

  // Error handling function
  const handleZodValidationErrors = (errors) => {
    Object.keys(errors).forEach((field) => {
      setError(field, {
        type: "server",
        message: errors[field].message,
      });
    });
  };

  // Handle onSubmit function
  const onSubmit = async (data) => {
    try {
      const response = await signIn("credentials", {
        redirect: false,
        identifier: data.email,
        password: data.password,
      });

      if (response.error || !response.ok) {
        useErrorToast(response.error);
        return;
      }

      reset();
      useSuccessToast("You have successfully logged in. Redirecting...");
      router.push(ROUTES.ADMIN_DASHBOARD_ECOMMERCE);
    } catch (error) {
      console.log("Error in signIn: ", error);
      useErrorToast("An unexpected error occurred during login.");
    }
  };

  return (
    <>
      {/* Form Element */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Input */}
        <div className="mb-5">
          <LabelText
            text="Email"
            htmlForId="login-email"
            star={true}
            darkTheme="NO_DARK"
          />

          <TextInputField
            fieldName="email"
            fieldType="email"
            fieldId="login-email"
            control={control}
            errors={errors}
            errorsType={errors?.email}
            placeholderText="Enter email address"
          />
        </div>

        {/* Password Input */}
        <div className="mb-5">
          <div className="flex items-center justify-between gap-2">
            <LabelText
              text="Password"
              htmlForId="login-password"
              star={true}
              darkTheme="NO_DARK"
            />
          </div>

          <PasswordInputFiled
            fieldName="password"
            fieldId="login-password"
            control={control}
            errors={errors}
            errorsType={errors?.password}
            placeholderText="Enter your password"
          />
        </div>

        {/* Sign in Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${globalStyleObj.authButton} mt-3 w-full ${
            isSubmitting ? "cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-4 font-poppins-rg">
              <ClipLoader color="#ffffff" size={16} />
              <span className="text-light-weight-850">Processing...</span>
            </span>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
