"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import setLanguageAction from "@/i18n/set-language-action";
import Image from "next/image";

const FooterLanguageSwitcher = ({ languageList, currentLanguage }) => {
  return (
    <div className="w-full md:w-fit flex items-center gap-[12px] bg-[#1A1B25] py-[8px] px-[10px] rounded-[10px]">
      <div className="size-[20px] relative rounded-full overflow-hidden">
        <Image
          src={`/assets/flags/${currentLanguage || "en"}.svg`}
          alt={currentLanguage || "en"}
          fill
          priority={false}
        />
      </div>
      {languageList.length > 0 && (
        <Select
          key="footer-language-selection"
          value={currentLanguage || "en"}
          onValueChange={(value) => setLanguageAction(value)}
        >
          <SelectTrigger className="w-full md:w-fit text-[16px] font-pp-neue-montreal-md text-[#fff] leading-[24px] tracking-[-2%] gap-[12px] border-none outline-none focus:ring-0 focus:outline-none p-0">
            <SelectValue placeholder="Lanugage" />
          </SelectTrigger>
          <SelectContent className="text-[18px] text-black-500 font-pp-neue-montreal-md bg-white z-[999]">
            {languageList.map(
              (eachLang) =>
                eachLang.status && (
                  <SelectItem key={eachLang._id} value={eachLang.code}>
                    {eachLang.name}
                  </SelectItem>
                )
            )}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default FooterLanguageSwitcher;
