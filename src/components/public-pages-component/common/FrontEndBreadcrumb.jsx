"use client";

import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const FrontEndBreadcrumb = ({
  fields,
  currentTabName = "",
  isCurrentTabTranslated = false,
  navContainerClass = "",
}) => {
  const t = useTranslations();

  return (
    <nav aria-label="Breadcrumb" className={navContainerClass}>
      {fields.map((field, index) => (
        <div
          key={`${field.label}-${index + 1}`}
          className="flex items-center gap-2"
        >
          {/* Separator */}
          {index > 0 && <ChevronRight size={20} className="text-black-300" />}

          {/* Render the breadcrumb item */}
          <Link
            href={field.link}
            className={`text-[18px] text-black-500 font-candara-rg leading-[100%] hover:text-orange-500 transition-300`}
          >
            {t(`${field.label}`)}
          </Link>
        </div>
      ))}

      {/* Current Tab */}
      {currentTabName && (
        <div className="flex items-center gap-2">
          {/* Separator */}
          <ChevronRight
            size={20}
            className="text-black-300 rtl:rotate-[180deg]"
          />

          {/* Render the breadcrumb item in SM Devices */}
          <Link
            href="#"
            className={`md:hidden text-[18px] text-black-500 font-candara-rg leading-[100%] hover:text-orange-500 transition-300`}
          >
            {isCurrentTabTranslated
              ? currentTabName.length > 15
                ? currentTabName.slice(0, 15) + "..."
                : currentTabName
              : t(currentTabName).length > 15
                ? t(currentTabName).slice(0, 15) + "..."
                : t(currentTabName)}
          </Link>

          {/* Render the breadcrumb item other Devices */}
          <Link
            href="#"
            className={`hidden md:inline-block text-[18px] text-black-500 font-candara-rg leading-[100%] hover:text-orange-500 transition-300`}
          >
            {isCurrentTabTranslated
              ? currentTabName.length > 50
                ? currentTabName.slice(0, 50) + "..."
                : currentTabName
              : t(currentTabName).length > 50
                ? t(currentTabName).slice(0, 50) + "..."
                : t(currentTabName)}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default FrontEndBreadcrumb;
