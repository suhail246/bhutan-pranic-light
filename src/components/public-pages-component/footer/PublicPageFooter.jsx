"use server";

import {
  FooterContactInfoWidget,
  FooterLanguageSwitcher,
  FooterLinks,
  FooterOpeningHoursWidget,
  PublicFooterLogoAndSocialLinks,
} from "@/components/public-pages-component";
import { getFESettingsFieldValues } from "@/utils/website-settings-helper";
import Footer from "./bhutan-pranic-footer/BhuFooter";

const PublicPageFooter = async () => {
  // const branchOneSettingsFields = getFESettingsFieldValues(
  //   settingsData,
  //   ["link_one_title", "link_one_label", "link_one_value"],
  //   currentLanguage
  // );
  // const branchTwoSettingsFields = getFESettingsFieldValues(
  //   settingsData,
  //   ["link_two_title", "link_two_label", "link_two_value"],
  //   currentLanguage
  // );
  // const usefullLinkSettingsFields = getFESettingsFieldValues(
  //   settingsData,
  //   ["link_three_title", "link_three_label", "link_three_value"],
  //   currentLanguage
  // );
  // const copyRightSettingsData = getFESettingsFieldValues(
  //   settingsData,
  //   ["copywrite_text"],
  //   currentLanguage
  //

  return (
    <Footer />
    // <footer
    //   aria-label="Footer"
    //   className="w-full h-[200px] border border-blue-800"
    // >
    //   {/* Footer Logo and Social Links */}
    //   {/* <PublicFooterLogoAndSocialLinks
    //       filesList={filesList}
    //      settingsData={settingsData}
    //    /> */}

    //   {/* Footer Widgets */}
    //   <div className="flex flex-col md:flex-row md:justify-between md:flex-wrap xl:flex-nowrap gap-[28px] md:gap-5">
    //     {/* Footer Contact Info */}
    //     {/* <FooterContactInfoWidget
    //        currentLanguage={currentLanguage}
    //        settingsData={settingsData}
    //     /> */}

    //     {/* Opening Hours */}
    //     {/* <FooterOpeningHoursWidget
    //       currentLanguage={currentLanguage}
    //       settingsData={settingsData}
    //     /> */}

    //     {/* Brancches One */}
    //     {/* <FooterLinks
    //       settingsFieldsData={branchOneSettingsFields}
    //       titleKey="link_one_title"
    //       labelKey="link_one_label"
    //       valueKey="link_one_value"
    //       margedItemLabels={branchTwoSettingsFields.link_two_label}
    //       margedItemValues={branchTwoSettingsFields.link_two_value}
    //       extraClasses="md:max-w-[238px]"
    //     /> */}

    //     {/* Brancches Two */}
    //     {/* <FooterLinks
    //       settingsFieldsData={branchTwoSettingsFields}
    //       titleKey="link_two_title"
    //       labelKey="link_two_label"
    //       valueKey="link_two_value"
    //       extraClasses="md:max-w-[213px]"
    //       isMerged={true}
    //     /> */}

    //     {/* Useful Links */}
    //     {/* <FooterLinks
    //       settingsFieldsData={usefullLinkSettingsFields}
    //       titleKey="link_three_title"
    //       labelKey="link_three_label"
    //       valueKey="link_three_value"
    //       extraClasses="md:max-w-[213px]"
    //     /> */}
    //   </div>

    //   <hr className="w-full" />

    //   {/* Copyright Section */}
    //   <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 md:gap-5">
    //     {/* <FooterLanguageSwitcher
    //       languageList={languageList}
    //       currentLanguage={currentLanguage}
    //     /> */}

    //     {/* {Object.keys(copyRightSettingsData).length > 0 &&
    //       copyRightSettingsData.copywrite_text && (
    //         <>
    //           <div
    //             dangerouslySetInnerHTML={{
    //               __html:
    //                 copyRightSettingsData &&
    //                 copyRightSettingsData.copywrite_text,
    //             }}
    //             className="text-[16px] text-[#fff] font-candara-rg leading-[24px] tracking-[-2%]"
    //           ></div>
    //         </>
    //       )} */}
    //   </div>
    // </footer>
  );
};

export default PublicPageFooter;
