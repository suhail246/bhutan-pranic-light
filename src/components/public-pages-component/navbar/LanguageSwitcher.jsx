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

const LanguageSwitcher = ({
  pathname,
  languageList,
  currentLanguage,
  enable_sticky_header = 0,
}) => {
  return (
    <>
      {/* Lang Logo */}
      <div className="size-[38px] rounded-full border border-grey relative overflow-hidden">
        <Image
          src={`/assets/flags/${currentLanguage || "en"}.svg`}
          alt={currentLanguage || "en"}
          fill
          priority={false}
        />
      </div>
      {/* Lang Select */}
      {languageList.length > 0 && (
        <Select
          key="language-selection"
          value={currentLanguage || "en"}
          onValueChange={(value) => setLanguageAction(value)}
        >
          <SelectTrigger
            className={`size-fit p-0 text-[15px] ${pathname === "/" ? (enable_sticky_header === 1 ? "text-black-500" : "text-black-500 lg:text-[#fff]") : "text-black-500"} font-candara-rg font-bold border-none outline-none focus:ring-0 focus:outline-none gap-2 shadow-none`}
          >
            <SelectValue placeholder="Lanugage" />
          </SelectTrigger>
          <SelectContent align="end" className="text-3 bg-white z-[999]">
            {languageList.map(
              (eachLang) =>
                eachLang.status && (
                  <SelectItem key={eachLang._id} value={eachLang.code}>
                    {eachLang.name[0].toUpperCase() + eachLang.name.slice(1)}
                  </SelectItem>
                )
            )}
          </SelectContent>
        </Select>
      )}
    </>
  );
};

export default LanguageSwitcher;
