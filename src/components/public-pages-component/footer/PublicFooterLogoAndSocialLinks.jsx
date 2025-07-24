"use server";

import {
  getFESettingsFieldValues,
  getFileSettingsValue,
} from "@/utils/website-settings-helper";
import Image from "next/image";
import Link from "next/link";

const PublicFooterLogoAndSocialLinks = () => {
  // Get Settings Data
  // const settingsFieldsData = getFESettingsFieldValues(settingsData, [
  //   "footer_logo",
  //   "show_social_links",
  //   "social_twitter",
  //   "social_facebook",
  //   "social_instagram",
  // ]);

  // // Get the footer_logo details
  // const logoDarkImage =
  //   getFileSettingsValue(filesList, settingsFieldsData.footer_logo)?.fileUrl ??
  //   "/bin-yaber-assets/website-logo-dark.png";

  // // Generate social links array
  // const socialsKeys = Object.keys(settingsFieldsData).filter((key) =>
  //   key.startsWith("social_")
  // );

  return (
    <div className="flex items-center justify-between gap-4 md:gap-5">
      <div className="w-[113px] h-[40px] md:w-[167px] md:h-[50px] relative">
        <Image
          alt="Footer Logo"
          fill
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-contain"
        />
      </div>

      {/* {settingsFieldsData?.show_social_links &&
      settingsFieldsData?.show_social_links === 1
        ? socialsKeys.length > 0 && (
            <ul className="flex items-center gap-[8px]">
              {socialsKeys.map((social, index) => (
                <Link
                  href={settingsFieldsData[social] || ""}
                  target={
                    settingsFieldsData[social] === "#" ||
                    !settingsFieldsData[social]
                      ? "_self"
                      : "_blank"
                  }
                  key={`${social}-${index + 1}`}
                >
                  <li className="size-[40px] rounded-[10px] border border-[#fff] hover:bg-orange-500 transition-all duration-300 ease-in-out px-[16px] py-[8px] flex items-center justify-center">
                    <div className="relative min-w-[18px] min-h-[16px]">
                      <Image
                        src={`/bin-yaber-assets/socials/${social}.png`}
                        alt={social.split("_")[1].toUpperCase() || "Social"}
                        fill
                        priority
                        sizes="(max-width: 768px) 40px, 40px"
                        className="object-cover"
                      />
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          )
        : null} */}
    </div>
  );
};

export default PublicFooterLogoAndSocialLinks;
