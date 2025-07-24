import { fetchWebsiteFooterSettingsPageData } from "@/actions/pageDataActions";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import {
  Breadcrumb,
  Error403,
  FooterSettings,
  HandleSessionEnd,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";

export const metadata = {
  title: titlesObject.footerSettings.title,
};

const WebsiteFooterSettings = async ({ searchParams }) => {
  const {
    allFilesResponse,
    languagesResponse,
    userId,
    adminRole,
    permissionsList,
    searchName,
    selectedFileType,
    error,
  } = await fetchWebsiteFooterSettingsPageData(
    searchParams,
    PERMISSIONS.WEBSITE_SETUP.FOOTER_SETUP
  );

  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
  }

  return (
    <>
      <Breadcrumb currentTab="Footer" mainParentTab="Website Setup" />

      <FooterSettings
        userId={userId}
        allFilesResponse={allFilesResponse}
        languagesResponse={languagesResponse}
        adminRole={adminRole}
        permissionsList={permissionsList}
        searchValue={searchName}
        selectedFileType={selectedFileType}
      />
    </>
  );
};

export default WebsiteFooterSettings;
