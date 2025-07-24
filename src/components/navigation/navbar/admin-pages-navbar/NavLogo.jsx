import { useTheme } from "next-themes";
import Image from "next/image";

import { topbarColor } from "@/app/assets/data/layoutCustomizerData/layoutCustomizerData";
import { TransitionLink } from "@/components";
import ROUTES from "@/constants/routes";

const NavLogo = ({ topbarColorType }) => {
  const { theme } = useTheme();

  return (
    <TransitionLink href={ROUTES.ADMIN_DASHBOARD_ECOMMERCE}>
      <Image
        src={
          theme === "light" && topbarColorType === topbarColor.LIGHT_COLOR
            ? "/assets/logo-bhutan.jpg"
            : "/assets/logo-bhutan.jpg"
        }
        alt="logo"
        width={50}
        height={22}
        className="mr-2 hidden md:inline"
      />
    </TransitionLink>
  );
};

export default NavLogo;
