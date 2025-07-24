"use client";

import { globalStyleObj } from "@/app/assets/styles";
import { debounce } from "lodash";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const Tab = ({ langDetails, activeLanguageTab, colorGrade, onTabChange }) => {
  return (
    <li
      className={`cursor-pointer px-3 py-1.5 md:px-5 md:py-3 flex-1 rounded-md transition-300 ${activeLanguageTab === langDetails.code ? `${colorGrade.bgColor} ${colorGrade.hoverBgColor} ${colorGrade.textColor} hover:text-white` : "text-dark-weight-400 dark:text-light-weight-800"}`}
      onClick={() => onTabChange(langDetails.code)}
    >
      <div className="flex items-center justify-center gap-1 text-[13px] md:text-[15px] font-poppins-md tracking-wide uppercase">
        <Image
          src={`/assets/flags/${langDetails.code}.svg`}
          alt={langDetails.name}
          width={12}
          height={12}
          className="rounded-[2px]"
        />
        {langDetails.name}
      </div>
    </li>
  );
};

const SlideTabs = ({
  languageList,
  activeLanguageTab,
  colorGrade,
  onTabChange,
}) => {
  return (
    <ul
      className={`flex border-b border-[#000]/20 dark:border-[#fff]/10 p-1 ${globalStyleObj.backgroundLight900Dark300}`}
    >
      {languageList.map(
        (lang) =>
          lang.status && (
            <Tab
              key={lang._id}
              langDetails={lang}
              activeLanguageTab={activeLanguageTab}
              colorGrade={colorGrade}
              onTabChange={onTabChange}
            />
          )
      )}
    </ul>
  );
};

const LanguageTabSwitcher = ({ languages, colorGrade }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeLanguageTab = searchParams.get("lang");
  const activeLanguageList = languages.filter((language) => language.status);

  const debouncedTabChange = useCallback(
    debounce((query) => {
      const params = new URLSearchParams(searchParams);
      if (query) {
        params.set("lang", query);
      } else {
        params.set("lang", "en");
      }
      router.push(`?${params.toString()}`);
    }, 250),
    [searchParams, router]
  );

  return activeLanguageList.length > 1 ? (
    <SlideTabs
      languageList={activeLanguageList}
      activeLanguageTab={activeLanguageTab}
      colorGrade={colorGrade}
      onTabChange={debouncedTabChange}
    />
  ) : null;
};

export default LanguageTabSwitcher;
