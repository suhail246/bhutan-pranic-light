"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const FooterLinks = ({
  settingsFieldsData,
  titleKey,
  labelKey,
  valueKey,
  margedItemLabels = [],
  margedItemValues = [],
  extraClasses,
  isMerged = false,
}) => {
  const [open, setOpen] = useState(false);

  const updateOpenStatus = useCallback(() => {
    if (window.innerWidth >= 641) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    updateOpenStatus();

    window.addEventListener("resize", updateOpenStatus);
    return () => {
      window.removeEventListener("resize", updateOpenStatus);
    };
  }, [updateOpenStatus]);

  return (
    <>
      {settingsFieldsData && Object.keys(settingsFieldsData).length > 0 && (
        <div
          className={`${isMerged ? `hidden w-full sm:flex flex-col gap-[16px] ${extraClasses}` : `w-full flex flex-col gap-[16px] ${extraClasses}`} `}
        >
          {settingsFieldsData[titleKey] && (
            <>
              <h6 className="hidden sm:block text-[20px] text-[#fff] font-candara-rg font-bold leading-[30px] tracking-wide">
                {settingsFieldsData[titleKey]}
              </h6>

              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="sm:hidden flex items-center justify-between gap-[8px] w-full"
              >
                <h6 className="text-[20px] text-[#fff] font-candara-rg font-bold leading-[30px] tracking-wide">
                  {settingsFieldsData[titleKey]}
                </h6>

                <div className="size-[24px] relative">
                  <Image
                    src="/bin-yaber-assets/icons/arrows-down/arrow-down-linear-light.png"
                    alt="arrow down"
                    fill
                    sizes="(max-width: 768px) 24px, 24px"
                    className={`${open ? "rotate-[180deg]" : ""}`}
                  />
                </div>
              </button>
            </>
          )}

          {open && settingsFieldsData[labelKey].length > 0 && (
            <ul className="flex flex-col gap-[8px]">
              {settingsFieldsData[labelKey].map((label, index) => (
                <Link
                  key={`${label}-${index + 1}`}
                  target={
                    settingsFieldsData[valueKey][index].startsWith("https://")
                      ? "_blank"
                      : "_self"
                  }
                  href={settingsFieldsData[valueKey][index]}
                >
                  <li className="text-[18px] text-[#fff] font-candara-rg leading-[28px] hover:text-orange-500 transition-300">
                    {label}
                  </li>
                </Link>
              ))}
            </ul>
          )}
          {open &&
            margedItemLabels.length > 0 &&
            margedItemValues.length > 0 && (
              <ul className="sm:hidden flex flex-col gap-[8px]">
                {margedItemLabels.map((item, index) => (
                  <Link
                    key={`${item}-${index + 1}`}
                    href={margedItemValues[index]}
                  >
                    <li className="text-[18px] text-[#fff] font-candara-rg leading-[28px] hover:text-orange-500 transition-300">
                      {item}
                    </li>
                  </Link>
                ))}
              </ul>
            )}
        </div>
      )}
    </>
  );
};

export default FooterLinks;
