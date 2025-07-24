"use client";

import { globalStyleObj } from "@/app/assets/styles";
import {
  ContactFormDetails,
  LanguageTabs,
  PageRefresh,
  TranslationForm,
} from "@/components";
import { useErrorToast, useGenerateSlug, useSuccessToast } from "@/lib/hooks";
import { AllContactsSchema } from "@/schemas";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { usePageRefresh } from "@/utils/refreshPage";
import { getTranslationDetails } from "@/utils/translation-helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const ContactForm = ({
  userId,
  languages = [],
  contactDetails = {},
  translationDetails = {},
  filesList,
  allFiles,
  paginationDetails,
  createFnc = () => {},
  updateFnc = () => {},
  selectedMetaFileId,
  selectedMetaFileName,
  searchValue,
  selectedFileType,
  adminRole,
  permissionsList,
}) => {
  const [activeTab, setActiveTab] = useState("en");
  const { isPending, pageRefresh } = usePageRefresh();

  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const { bgColor, hoverBgColor, textColor, hexCode } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  const isContactDetailsExist = Object.keys(contactDetails).length > 0;
  const activeLanguages = languages.filter((lang) => lang.status);

  // Handle React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
    setError,
    setValue,
  } = useForm({
    resolver: zodResolver(AllContactsSchema),
    defaultValues: {
      title: getTranslationDetails(translationDetails, "en")?.title || "",
      branchName:
        getTranslationDetails(translationDetails, "en")?.branchName || "",
      slug: contactDetails?.slug || "",
      orderNumber: contactDetails?.orderNumber || "",
      branchAddress:
        getTranslationDetails(translationDetails, "en")?.branchAddress || "",
      contactNumber: contactDetails?.contactNumber || "",
      contactEmail: contactDetails?.contactEmail || "",
      openingHours: {
        labels:
          getTranslationDetails(translationDetails, "en")?.openingHours
            ?.labels || [],
        values: contactDetails?.openingHours?.values || [],
      },
      latitude: contactDetails?.latitude || "",
      longitude: contactDetails?.longitude || "",
      metaTitle: contactDetails?.metaTitle || "",
      metaImage:
        contactDetails?.metaImage !== null
          ? (contactDetails?.metaImage?._id ?? null)
          : null,
      metaKeywords: contactDetails?.metaKeywords || "",
      metaDescription: contactDetails?.metaDescription || "",
    },
  });

  const watchedBranchName = watch("branchName");
  const watchedSlug = watch("slug");
  const watchedOpeningHours = watch("openingHours");

  // Relevant fields for comparison with the contactDetails object (For Update Contact)
  const relevantFields = {
    title: getTranslationDetails(translationDetails, "en")?.title || "",
    branchName:
      getTranslationDetails(translationDetails, "en")?.branchName || "",
    slug: contactDetails?.slug || "",
    orderNumber: contactDetails?.orderNumber || "",
    branchAddress:
      getTranslationDetails(translationDetails, "en")?.branchAddress || "",
    contactNumber: contactDetails?.contactNumber || "",
    contactEmail: contactDetails?.contactEmail || "",
    openingHours: {
      labels:
        getTranslationDetails(translationDetails, "en")?.openingHours?.labels ||
        [],
      values: contactDetails?.openingHours?.values || [],
    },
    latitude: contactDetails?.latitude || "",
    longitude: contactDetails?.longitude || "",
    metaTitle: contactDetails?.metaTitle || "",
    metaImage:
      contactDetails?.metaImage !== null
        ? (contactDetails?.metaImage?._id ?? null)
        : null,
    metaKeywords: contactDetails?.metaKeywords || "",
    metaDescription: contactDetails?.metaDescription || "",
  };
  const hasChanges = !isEqual(relevantFields, watch());

  // Handle Slug value according to the branchName (only if the contact is new)
  useEffect(() => {
    const generateSlugWithBranchName = () => {
      if (watchedBranchName && watchedBranchName.length > 0) {
        setError("slug", "");
        const generatedSlug = useGenerateSlug(watchedBranchName);
        setValue("slug", generatedSlug);
      } else {
        setValue("slug", "");
      }
    };

    if (!isContactDetailsExist) {
      generateSlugWithBranchName();
    }
  }, [watchedBranchName, setValue, isContactDetailsExist]);

  // Handle Add Label Field
  const addLabelField = useCallback(
    (label, index) => {
      const updatedLabels = [...watchedOpeningHours.labels];
      if (index >= 0 && index < updatedLabels.length) {
        // Update the existing label at the specified index
        updatedLabels[index] = label;
      } else {
        // Add a new label to the array
        updatedLabels.push(label);
      }

      // Update the form state with the new labels
      setValue("openingHours", {
        labels: updatedLabels,
        values: watchedOpeningHours.values,
      });
    },
    [watchedOpeningHours, setValue]
  );

  // Handle Add Value Field
  const addValueField = useCallback(
    (value, index) => {
      const updatedValues = [...watchedOpeningHours.values];
      if (index >= 0 && index < updatedValues.length) {
        // Update the existing value at the specified index
        updatedValues[index] = value;
      } else {
        // Add a new value to the array
        updatedValues.push(value);
      }

      // Update the form state with the new values
      setValue("openingHours", {
        labels: watchedOpeningHours.labels,
        values: updatedValues,
      });
    },
    [watchedOpeningHours, setValue]
  );

  // Handle Add Repeatable Field
  const addRepeatableField = useCallback(() => {
    setValue("openingHours", {
      labels: [...watchedOpeningHours.labels, ""],
      values: [...watchedOpeningHours.values, ""],
    });
  }, [watchedOpeningHours, setValue]);

  // Handle Remove Repeatable Field
  const removeRepeatableField = useCallback(
    (index) => {
      setValue("openingHours", {
        labels: watchedOpeningHours.labels.filter((_, i) => i !== index),
        values: watchedOpeningHours.values.filter((_, i) => i !== index),
      });
    },
    [setValue, watchedOpeningHours]
  );

  // Handle Meta Image
  const onChangeMetaImage = useCallback(
    (id) => {
      setValue("metaImage", id);
    },
    [setValue]
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

  // Handle Form Submit Functionality
  const onSubmit = async (data) => {
    // For Create New Contact
    if (!isContactDetailsExist) {
      const response = await createFnc(data, userId);

      if (response.success) {
        useSuccessToast(response?.message || "Contact created successfully.");
        reset();
      } else {
        if (response.errors) {
          handleValidationErrors(response.errors);
        } else {
          useErrorToast(response?.message || "Something went wrong.");
        }
      }
    }

    // For Update Contact
    else {
      const updateResponse = await updateFnc(
        userId,
        contactDetails?.slug || "",
        contactDetails._id,
        data
      );

      if (updateResponse.success) {
        useSuccessToast(
          updateResponse?.message || "Contact updated successfully."
        );
        pageRefresh();
      } else {
        if (updateResponse.errors) {
          handleValidationErrors(updateResponse.errors);
        } else {
          useErrorToast(updateResponse?.message || "Something went wrong.");
        }
      }
    }
  };

  // Handle Translation Form Submit
  const handleTranslationSubmit = async (translateData) => {
    const data = {
      ...watch(),
      translateData: { ...translateData, lang: activeTab },
    };

    await onSubmit(data);
  };

  // Handle Refresh Page Loading when update API runs
  if (isPending) {
    return <PageRefresh />;
  }

  return (
    <div
      className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] rounded-sm shadow-light overflow-hidden`}
    >
      {isContactDetailsExist && activeLanguages.length > 1 && (
        <LanguageTabs
          languages={activeLanguages}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
        />
      )}

      {activeTab === "en" ? (
        <ContactFormDetails
          // User & Role
          userId={userId}
          adminRole={adminRole}
          permissionsList={permissionsList}
          // Contact Details & Form State
          isContactDetailsExist={isContactDetailsExist}
          isSubmitting={isSubmitting}
          hasChanges={hasChanges}
          submitFunction={handleSubmit(onSubmit)}
          control={control}
          errors={errors}
          // File Management
          filesList={filesList}
          allFiles={allFiles}
          selectedFileType={selectedFileType}
          selectedMetaFileId={selectedMetaFileId}
          selectedMetaFileName={selectedMetaFileName}
          onChangeMetaImage={onChangeMetaImage}
          // Pagination & Search
          paginationDetails={paginationDetails}
          searchValue={searchValue}
          // Form Filed Controls
          watchedRepeatableField={watchedOpeningHours}
          addLabelField={addLabelField}
          addValueField={addValueField}
          handleAddRepeatableField={addRepeatableField}
          handleRemoveRepeatableField={removeRepeatableField}
          setValue={setValue}
          watchedSlug={watchedSlug}
          // UI & Theme
          colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
        />
      ) : (
        <TranslationForm
          fields={[
            {
              name: "title",
              lableName: "Title",
              value:
                getTranslationDetails(translationDetails, activeTab)?.title ||
                "",
              placeholderText: "Title Heading",
              fieldId: `translate-${activeTab}-update-contact-title-heading`,
            },
            {
              name: "branchName",
              lableName: "Branch",
              value:
                getTranslationDetails(translationDetails, activeTab)
                  ?.branchName || "",
              placeholderText: "Branch Name",
              fieldId: `translate-${activeTab}-update-contact-branch-name`,
            },
            {
              name: "branchAddress",
              lableName: "Address",
              value:
                getTranslationDetails(translationDetails, activeTab)
                  ?.branchAddress || "",
              placeholderText: "Branch Address",
              fieldId: `translate-${activeTab}-update-contact-branch-address`,
              isAreaInputType: true,
            },
            {
              name: "openingHours",
              lableName: "Opening Hours",
              value: {
                labels:
                  getTranslationDetails(translationDetails, activeTab)
                    ?.openingHours?.labels || [],
              },
              placeholderText: "Days",
              fieldId: `translate-${activeTab}-update-contact-opening-timings`,
              isRepeatableType: true,
            },
          ]}
          isSubmitting={isSubmitting}
          colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
          handleTranslationSubmit={handleTranslationSubmit}
        />
      )}
    </div>
  );
};

export default ContactForm;
