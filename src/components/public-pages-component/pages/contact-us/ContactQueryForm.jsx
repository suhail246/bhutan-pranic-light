"use client";

import { submitContactQuery } from "@/actions/frontEndActions/action";
import { useErrorToast, useSuccessToast } from "@/lib/hooks";
import { ContactQueryMessageSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";

const ContactQueryForm = ({ currentLanguage = "en" }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(ContactQueryMessageSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      mobileNumber: "",
      email: "",
      problemDescription: "",
    },
  });
  const translate = useTranslations();

  // Handle Validation Errors
  const handleValidationErrors = useCallback(
    (errors) => {
      Object.keys(errors).forEach((field) => {
        setError(field, {
          type: "server",
          message: translate(errors[field].message),
        });
      });
    },
    [setError]
  );

  // Handle Form Submit Functionality
  const onSubmit = async (data) => {
    const response = await submitContactQuery(data, currentLanguage);

    if (response.success) {
      useSuccessToast(
        response?.message || translate("Contact Query Submitted Successfully")
      );
      reset();
    } else {
      if (response.errors) {
        handleValidationErrors(response.errors);
      } else {
        useErrorToast(response?.message || translate("Something went wrong"));
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`w-full h-fit bg-white rounded-[24px] p-[32px] flex flex-col gap-[24px]`}
    >
      {/* First name and Last name */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* First Name */}
        <div>
          <label
            htmlFor="contect-query-firstname"
            className={`text-[14px] font-candara-rg font-bold leading-[160%] tracking-[-2%] ${errors && errors.firstName ? "text-red-500" : "text-[#818898]"}`}
          >
            {translate("First name")}
          </label>

          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="contect-query-firstname"
                type="text"
                value={field.value || ""}
                placeholder={translate("First name")}
                className={`w-full px-[12px] py-[6px] rounded-[12px] text-[16px] text-black-500 font-candara-rg leading-[150%] tracking-[-2%] focus:border-orange-500 focus:outline-none focus:ring-0 mt-[4px] ${
                  errors && errors.firstName
                    ? "border border-red-500"
                    : "border border-[#E5E5E5]"
                }`}
              />
            )}
          />

          {errors && errors.firstName && (
            <p className="text-[12px] text-red-500 font-candara-rg mt-1">
              {translate(errors.firstName.message)}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label
            htmlFor="contect-query-lastname"
            className={`text-[14px] text-[#818898] font-candara-rg font-bold leading-[160%] tracking-[-2%]`}
          >
            {translate("Last name")}
          </label>

          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="contect-query-lastname"
                type="text"
                value={field.value || ""}
                placeholder={translate("Last name")}
                className={`w-full px-[12px] py-[6px] rounded-[12px] border border-[#E5E5E5] text-[16px] text-black-500 font-candara-rg leading-[150%] tracking-[-2%] focus:border-orange-500 focus:outline-none focus:ring-0 mt-[4px]`}
              />
            )}
          />
        </div>
      </div>

      {/* Mobile Number */}
      <div>
        <label
          htmlFor="contect-query-mobile-number"
          className={`text-[14px] font-candara-rg font-bold leading-[160%] tracking-[-2%] ${errors && errors.mobileNumber ? "text-red-500" : "text-[#818898]"}`}
        >
          {translate("Mobile number")}
        </label>

        <Controller
          name="mobileNumber"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="contect-query-mobile-number"
              type="text"
              value={field.value || ""}
              placeholder={translate("Mobile number")}
              className={`w-full px-[12px] py-[6px] rounded-[12px] text-[16px] text-black-500 font-candara-rg leading-[150%] tracking-[-2%] focus:border-orange-500 focus:outline-none focus:ring-0 mt-[4px] ${
                errors && errors.mobileNumber
                  ? "border border-red-500"
                  : "border border-[#E5E5E5]"
              }`}
            />
          )}
        />

        {errors && errors.mobileNumber && (
          <p className="text-[12px] text-red-500 font-candara-rg mt-1">
            {translate(errors.mobileNumber.message)}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="contect-query-email"
          className={`text-[14px] font-candara-rg font-bold leading-[160%] tracking-[-2%] ${errors && errors.email ? "text-red-500" : "text-[#818898]"}`}
        >
          {translate("Email")}
        </label>

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="contect-query-email"
              type="text"
              value={field.value || ""}
              placeholder={translate("Email")}
              className={`w-full px-[12px] py-[6px] rounded-[12px] text-[16px] text-black-500 font-candara-rg leading-[150%] tracking-[-2%] focus:border-orange-500 focus:outline-none focus:ring-0 mt-[4px] ${
                errors && errors.email
                  ? "border border-red-500"
                  : "border border-[#E5E5E5]"
              }`}
            />
          )}
        />

        {errors && errors.email && (
          <p className="text-[12px] text-red-500 font-candara-rg mt-1">
            {translate(errors.email.message)}
          </p>
        )}
      </div>

      {/* Problem Description */}
      <div>
        <label
          htmlFor="contect-query-problem-description"
          className={`text-[14px] text-[#818898] font-candara-rg font-bold leading-[160%] tracking-[-2%]`}
        >
          {translate("Problem Description")}
        </label>

        <Controller
          name="problemDescription"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              id="contect-query-problem-description"
              type="text"
              rows={5}
              value={field.value || ""}
              placeholder={translate("Message")}
              className={`w-full min-h-[200px] px-[12px] py-[6px] rounded-[12px] border border-[#E5E5E5] text-[16px] text-black-500 font-candara-rg leading-[150%] tracking-[-2%] focus:border-orange-500 focus:outline-none focus:ring-0 mt-[4px]`}
            />
          )}
        />
      </div>

      {/* Submit Button */}
      <div
        className={`w-full hover:bg-orange-500 rounded-[16px] group mt-[16px]`}
      >
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full rounded-[16px] bg-black-500 text-[16px] font-candara-rg font-bold text-[#fff] leading-[150%] tracking-[-2%] px-[24px] py-[16px] group-hover:translate-x-[5px] group-hover:translate-y-[-5px] transition-300 flex justify-center items-center gap-2 ${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          {isSubmitting ? (
            <>
              <ClipLoader color="#fff" size={14} />
              <span>{translate("Sending")}...</span>
            </>
          ) : (
            translate("Send message")
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactQueryForm;
