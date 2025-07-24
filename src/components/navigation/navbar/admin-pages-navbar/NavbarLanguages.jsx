"use client";

import Cookies from "js-cookie";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { getAllLanguages } from "@/actions/apiClientActions/languages";
import { topbarColor } from "@/app/assets/data/layoutCustomizerData/layoutCustomizerData";
import { globalStyleObj } from "@/app/assets/styles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import setLanguageAction from "@/i18n/set-language-action";
import { useAppSelector } from "@/store/hooks";
import { RefreshCcw } from "lucide-react";

const NavbarLanguages = ({ userDetails }) => {
  const { topbarColorType } = useAppSelector((state) => state.layout);
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // Trigger for re-fetching data

  // Fetch all available languages
  const fetchAllLanguages = useCallback(async () => {
    setIsProcessing(true);

    try {
      const response = await getAllLanguages(userDetails._id);
      if (response.success) {
        setLanguages(response.fetchData);
      }
    } catch (error) {
      console.log(`❌ Error in fetching all languages CLIENT: ${error}`);
    } finally {
      setIsProcessing(false);
    }
  }, [userDetails._id]);

  // Fetch languages when the component mounts
  useEffect(() => {
    fetchAllLanguages();
  }, [fetchAllLanguages, refreshKey]);

  // Effect to set the selected language based on cookies or default language.
  useEffect(() => {
    if (languages.length > 0) {
      const selectedLanguageCode = Cookies.get("language");
      if (selectedLanguageCode) {
        const selectedLanguage = languages.find(
          (language) => language.code === selectedLanguageCode
        );
        setSelectedLanguage(selectedLanguage);
      } else {
        const defaultLanguage = languages.find((language) => language.default);
        setSelectedLanguage(defaultLanguage);
      }
    }
  }, [languages]);

  // Show a loading spinner while fetching languages
  if (isProcessing || !selectedLanguage || !languages.length) {
    return (
      <RefreshCcw
        size={18}
        className={`${topbarColorType === topbarColor.LIGHT_COLOR ? `${globalStyleObj.iconLight450Dark350}` : `${globalStyleObj.topbarDarkIconColor}`} animate-spin`}
      />
    );
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        className={`${topbarColorType === topbarColor.LIGHT_COLOR ? `hover:bg-light-dencity-400 dark:hover:bg-dark-dencity-100` : `hover:bg-[#fff]/5`} rounded-full p-[5px] sm:p-[10px] border-none outline-none focus:ring-0 focus:outline-none`}
      >
        <Image
          src={`/assets/flags/${selectedLanguage.code}.svg`}
          alt={selectedLanguage.name}
          width={18}
          height={18}
          className="rounded-[3px]"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className={`${globalStyleObj.backgroundLight900Dark200} w-screen border-none sm:w-fit`}
      >
        {languages.map((language) => {
          if (language.status) {
            return (
              <DropdownMenuItem
                key={language._id}
                className={`${globalStyleObj.flexStart} cursor-pointer gap-4`}
                onSelect={() => {
                  setSelectedLanguage(language);
                  setLanguageAction(language.code);
                  setRefreshKey((prev) => prev + 1);
                }}
              >
                <Image
                  src={`/assets/flags/${language.code}.svg`}
                  alt={language.name}
                  width={15}
                  height={15}
                  className="rounded-[3px]"
                />
                <span
                  className={`${globalStyleObj.text13Light550Dark550} pr-8`}
                >
                  {language.name}
                </span>
              </DropdownMenuItem>
            );
          }
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarLanguages;
