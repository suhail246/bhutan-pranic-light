import ROUTES from "@/constants/routes";
import {
  getFESettingsFieldValues,
  getFileSettingsValue,
} from "@/utils/website-settings-helper";
import Image from "next/image";
import Link from "next/link";

const AppLogo = () => {
  // const settingFieldValues = getFESettingsFieldValues(settingsData, [
  //   "logo_white_image",
  //   "logo_dark_image",
  // ]);

  // const logoWhiteImage =
  //   getFileSettingsValue(filesList, settingFieldValues.logo_white_image)
  //     ?.fileUrl || "/bin-yaber-assets/website-logo-light.png";
  // const logoDarkImage =
  //   getFileSettingsValue(filesList, settingFieldValues.logo_dark_image)
  //     ?.fileUrl || "/bin-yaber-assets/website-logo-dark.png";

  return (
    <Link href={ROUTES.HOME}>
      <div className="relative w-[100px] h-[100px] overflow-hidden border">
        <Image
          src="/bhutan-pranic/app-logo/app-logo.jpg"
          alt="website logo"
          fill
          sizes="(max-width: 768px) 100vw, 100vw"
          quality={100}
          priority
          className="object-contain"
        />

        {/* <Image
          src={logoWhiteImage}
          alt="website logo"
          fill
          sizes="(max-width: 768px) 100vw, 100vw"
          quality={100}
          priority
          className="object-contain lg:hidden"
        /> */}
      </div>
    </Link>
  );
};

export default AppLogo;
