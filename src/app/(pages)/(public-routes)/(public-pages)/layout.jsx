"use server";

import { fetchPublicParentLayoutData } from "@/actions/frontEndPageDataActions";
import {
  MainChildrenContainer,
  PublicPageFooter,
  PublicPageNavbar,
  TopLoader,
} from "@/components/public-pages-component";
import AOSInitializer from "@/components/public-pages-component/common/AOSInitializer";
import { getLanguageFromCookie } from "@/utils/lanugage-action-utils";

const PublicPageLayout = async ({ children }) => {
  // const currentLanguage = await getLanguageFromCookie();
  // const { settingsData, filesList, languageList } =
  //   await fetchPublicParentLayoutData();

  return (
    <>
      {/* <TopLoader settingsData={settingsData} /> */}

      <main className="min-w-screen min-h-screen bg-white">
        <div className="w-full h-full relative overflow-hidden">
          <PublicPageNavbar
          // currentLanguage={currentLanguage}
          // settingsData={settingsData}
          // filesList={filesList}
          // languageList={languageList}
          />
          {/* <MainChildrenContainer settingsData={settingsData}>
            {children}
          </MainChildrenContainer> */}
          <div className="w-full h-full">
            <AOSInitializer />
            {children}
          </div>
          <PublicPageFooter
          // currentLanguage={currentLanguage}
          // settingsData={settingsData}
          // filesList={filesList}
          // languageList={languageList}
          />
        </div>
      </main>
    </>
  );
};

export default PublicPageLayout;
