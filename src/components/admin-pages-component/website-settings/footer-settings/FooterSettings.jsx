"use server";

import {
  CopyWriteWidget,
  FooterAboutWidget,
  FooterInfoWidget,
  LinkWidgetOne,
  LinkWidgetThree,
  LinkWidgetTwo,
  OpeningSchedule,
  SocialLinksWidget,
} from "@/components";

const FooterSettings = ({
  userId,
  allFilesResponse,
  languagesResponse,
  adminRole,
  permissionsList,
  searchValue,
  selectedFileType,
}) => {
  return (
    <>
      <FooterAboutWidget
        userId={userId}
        allFilesResponse={allFilesResponse}
        languagesResponse={languagesResponse}
        adminRole={adminRole}
        permissionsList={permissionsList}
        searchValue={searchValue}
        selectedFileType={selectedFileType}
      />

      <FooterInfoWidget userId={userId} languagesResponse={languagesResponse} />

      <OpeningSchedule userId={userId} languagesResponse={languagesResponse} />

      <LinkWidgetOne userId={userId} languagesResponse={languagesResponse} />

      <LinkWidgetTwo userId={userId} languagesResponse={languagesResponse} />

      <LinkWidgetThree userId={userId} languagesResponse={languagesResponse} />

      <CopyWriteWidget userId={userId} languagesResponse={languagesResponse} />

      <SocialLinksWidget userId={userId} />
    </>
  );
};

export default FooterSettings;
