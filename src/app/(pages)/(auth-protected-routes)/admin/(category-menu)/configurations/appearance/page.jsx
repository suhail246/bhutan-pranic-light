import { fetchWebsiteGeneralSettingPageData } from "@/actions/pageDataActions";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import {
  Breadcrumb,
  Error403,
  HandleSessionEnd,
  WebsiteAppearanceSettings,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";

export const metadata = {
  title: titlesObject.generalSettings.title,
};

const WebsiteGeneralSettingsPage = async ({ searchParams }) => {
  const {
    allFilesResponse,
    allTimezonesResponse,
    languagesResponse,
    userId,
    adminRole,
    permissionsList,
    searchName,
    selectedFileType,
    error,
  } = await fetchWebsiteGeneralSettingPageData(
    searchParams,
    PERMISSIONS.WEBSITE_SETUP.GENERAL_SETTINGS
  );

  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
  }

  return (
    <>
      <Breadcrumb currentTab="General Settings" mainParentTab="Website Setup" />

      <WebsiteAppearanceSettings
        userId={userId}
        allFilesResponse={allFilesResponse}
        allTimezonesResponse={allTimezonesResponse}
        languagesResponse={languagesResponse}
        adminRole={adminRole}
        permissionsList={permissionsList}
        searchValue={searchName}
        selectedFileType={selectedFileType}
      />
    </>
  );
};

export default WebsiteGeneralSettingsPage;
