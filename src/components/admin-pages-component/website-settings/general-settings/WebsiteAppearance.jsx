"use server";

import {
  CookiesAggrentSettings,
  GeneralColorSettings,
  GlobalSEOSettings,
  HeaderSettings,
  SystemGeneralSettings,
  WebsitePopupSettings,
} from "@/components";

const WebsiteAppearanceSettings = ({
  userId,
  allFilesResponse,
  allTimezonesResponse,
  languagesResponse,
  adminRole,
  permissionsList,
  searchValue,
  selectedFileType,
}) => {
  return (
    <>
      <SystemGeneralSettings
        userId={userId}
        allFilesResponse={allFilesResponse}
        allTimezonesResponse={allTimezonesResponse}
        adminRole={adminRole}
        permissionsList={permissionsList}
        searchValue={searchValue}
        selectedFileType={selectedFileType}
      />

      <HeaderSettings userId={userId} />

      <GeneralColorSettings userId={userId} />

      <GlobalSEOSettings
        userId={userId}
        allFilesResponse={allFilesResponse}
        adminRole={adminRole}
        permissionsList={permissionsList}
        searchValue={searchValue}
        selectedFileType={selectedFileType}
      />

      <CookiesAggrentSettings
        userId={userId}
        languagesResponse={languagesResponse}
      />

      <WebsitePopupSettings
        userId={userId}
        languagesResponse={languagesResponse}
      />
    </>
  );
};

export default WebsiteAppearanceSettings;
