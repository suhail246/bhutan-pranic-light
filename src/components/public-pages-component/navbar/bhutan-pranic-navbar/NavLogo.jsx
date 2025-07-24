import React from "react";
import Image from "next/image";

const NavLogo = () => {
  return (
    <div className="flex items-center cursor-pointer relative w-[120px] h-[80px] radius-[15px]">
      <Image
        src="/bhutan-pranic/app-logo/logo-white.png"
        alt="web-logo"
        fill
        priority
        quality={100}
        className="object-contain"
      />
    </div>
  );
};

export default NavLogo;
