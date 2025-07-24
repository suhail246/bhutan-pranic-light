"use client";

import {
  getPerticularCMSPageSectionsContent,
  updatePerticularCMSPageSections,
} from "@/actions/apiClientActions/cms";
import { globalStyleObj } from "@/app/assets/styles";
import {
  AboutPageCMSForm,
  CareersCMSForm,
  ContactUsCMSForm,
  CoursesCMSForm,
  HomePageCMSForm,
  LanguageTabs,
  NewsAndBlogsCMSForm,
  OffersCMSForm,
} from "@/components";
import { Skeleton } from "@/components/ui/skeleton";
import { useErrorToast, useSuccessToast } from "@/lib/hooks";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ClipLoader } from "react-spinners";

const MainSectionForm = ({
  userId,
  linkId,
  languages,
  allFilesResponse,
  searchValue,
  selectedFileType,
  adminRole,
  permissionsList,
}) => {
  // States
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState("en");
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetching search parameters from the URL
  const searchParams = useSearchParams();
  const selectedTab = searchParams.get("tab");

  // Filtering active languages from the provided language list
  const activeLanguages = languages.filter((lang) => lang.status);

  // Extracting theme-related properties from the Redux store
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const { bgColor, hoverBgColor, textColor, hexCode } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  // Function to fetch CMS content based on the active language tab
  const getCMSContent = async () => {
    try {
      setIsFetching(true);

      const response = await getPerticularCMSPageSectionsContent(
        userId,
        linkId,
        activeTab
      );

      const data =
        response?.success && response?.contentDetails
          ? response.contentDetails
          : {};

      setFormData(data);
    } catch (error) {
      console.log("Failed to fetch CMS page sections content:", error);
      setFormData({});
    } finally {
      setIsFetching(false);
    }
  };

  // Effect to fetch content whenever the active language tab changes
  useEffect(() => {
    if (!isSubmitting) {
      getCMSContent();
    }
  }, [activeTab, isSubmitting]);

  // Handle Iamge Change
  const handleImageChange = (keyName, value) => {
    setFormData({ ...formData, [keyName]: value });
  };

  // Handle Text Input Change
  const handleTextInputChange = (e) => {
    const keyName = e.target.name;
    const value = e.target.value;

    setFormData({ ...formData, [keyName]: value });
  };

  // Handle Text Editor Change
  const handleTextEditorInputChange = (content, keyName) => {
    setFormData({ ...formData, [keyName]: content });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    if (Object.keys(formData).length === 0) {
      useErrorToast("Please fill fields before submitting.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await updatePerticularCMSPageSections(
        userId,
        linkId,
        formData,
        activeTab
      );

      if (response.success) {
        useSuccessToast(
          response?.message || "CMS Page sections updated successfully."
        );
      } else {
        useErrorToast(response?.message || "Something went wrong.");
      }
    } catch (error) {
      console.log("Failed to update CMS page sections:", error);
      useErrorToast("Failed to update CMS page sections.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`${globalStyleObj.backgroundLight900Dark300} w-full rounded-sm shadow-light`}
    >
      {activeLanguages.length > 1 && (
        <LanguageTabs
          languages={activeLanguages}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
        />
      )}

      <form onSubmit={handleSubmit} className={`p-3 sm:p-5`}>
        {linkId === "home" && (
          <HomePageCMSForm
            activeTab={activeTab}
            isFetching={isFetching}
            formData={formData}
            selectedTab={selectedTab}
            allFilesResponse={allFilesResponse}
            searchValue={searchValue}
            selectedFileType={selectedFileType}
            handleTextInputChange={handleTextInputChange}
            handleTextEditorInputChange={handleTextEditorInputChange}
            handleImageChange={handleImageChange}
            adminRole={adminRole}
            permissionsList={permissionsList}
          />
        )}

        {linkId === "about-us" && (
          <AboutPageCMSForm
            activeTab={activeTab}
            isFetching={isFetching}
            formData={formData}
            selectedTab={selectedTab}
            allFilesResponse={allFilesResponse}
            searchValue={searchValue}
            selectedFileType={selectedFileType}
            handleTextInputChange={handleTextInputChange}
            handleTextEditorInputChange={handleTextEditorInputChange}
            handleImageChange={handleImageChange}
            adminRole={adminRole}
            permissionsList={permissionsList}
          />
        )}

        {linkId === "news-blogs" && (
          <NewsAndBlogsCMSForm
            activeTab={activeTab}
            isFetching={isFetching}
            formData={formData}
            selectedTab={selectedTab}
            allFilesResponse={allFilesResponse}
            searchValue={searchValue}
            selectedFileType={selectedFileType}
            handleTextInputChange={handleTextInputChange}
            handleImageChange={handleImageChange}
            adminRole={adminRole}
            permissionsList={permissionsList}
          />
        )}

        {linkId === "careers" && (
          <CareersCMSForm
            activeTab={activeTab}
            isFetching={isFetching}
            formData={formData}
            selectedTab={selectedTab}
            allFilesResponse={allFilesResponse}
            searchValue={searchValue}
            selectedFileType={selectedFileType}
            handleTextInputChange={handleTextInputChange}
            handleImageChange={handleImageChange}
            adminRole={adminRole}
            permissionsList={permissionsList}
          />
        )}

        {linkId === "contact-us" && (
          <ContactUsCMSForm
            isFetching={isFetching}
            formData={formData}
            handleTextInputChange={handleTextInputChange}
          />
        )}

        {linkId === "offers" && (
          <OffersCMSForm
            activeTab={activeTab}
            isFetching={isFetching}
            formData={formData}
            selectedTab={selectedTab}
            allFilesResponse={allFilesResponse}
            searchValue={searchValue}
            selectedFileType={selectedFileType}
            handleTextInputChange={handleTextInputChange}
            handleTextEditorInputChange={handleTextEditorInputChange}
            handleImageChange={handleImageChange}
            adminRole={adminRole}
            permissionsList={permissionsList}
          />
        )}

        {linkId === "courses" && (
          <CoursesCMSForm
            activeTab={activeTab}
            isFetching={isFetching}
            formData={formData}
            selectedTab={selectedTab}
            allFilesResponse={allFilesResponse}
            searchValue={searchValue}
            selectedFileType={selectedFileType}
            handleTextInputChange={handleTextInputChange}
            handleImageChange={handleImageChange}
            adminRole={adminRole}
            permissionsList={permissionsList}
          />
        )}

        <div className="mt-10">
          {isFetching ? (
            <Skeleton className="w-[180px] h-[40px] rounded-md" />
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className={`min-w-[180px] ${bgColor} ${hoverBgColor} ${textColor} hover:text-white transition-300 px-5 py-2 rounded-md text-[14px] font-poppins-rg group flex items-center justify-center gap-2 ${isSubmitting ? "cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? (
                <>
                  <ClipLoader color={hexCode} size={13} />
                  <span>Processing...</span>
                </>
              ) : (
                <span>Update</span>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MainSectionForm;
