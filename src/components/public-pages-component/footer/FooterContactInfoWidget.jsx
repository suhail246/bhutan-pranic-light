import { getFESettingsFieldValues } from "@/utils/website-settings-helper";
import { useTranslations } from "next-intl";
import Link from "next/link";

const FooterContactInfoWidget = () => {
  // const settingsFields = getFESettingsFieldValues(
  //   settingsData,
  //   ["contact_address", "contact_number", "whatsapp_number", "contact_email"],
  //   currentLanguage
  // );
  // const translate = useTranslations();

  return (
    <>
      {settingsFields && Object.keys(settingsFields).length > 0 && (
        <div className="w-full md:max-w-[264px] flex flex-col gap-[12px] md:gap-[16px]">
          <h6 className="hidden md:block text-[20px] text-[#fff] font-candara-rg font-bold leading-[30px] tracking-wide">
            {translate("Contact Info")}
          </h6>

          {/* Contact Address */}
          {settingsFields.contact_address ? (
            <div className="flex flex-col gap-[4px]">
              <span className="md:hidden text-[20px] text-[#fff] font-candara-rg font-bold leading-[24.41px] tracking-wide">
                {translate("Address")}
              </span>
              <p className="w-full max-w-[210px] text-[18px] text-[#fff] font-candara-rg leading-[21.97px]">
                {settingsFields.contact_address}
              </p>
            </div>
          ) : null}

          {/* Free Call */}
          {settingsFields.whatsapp_number ? (
            <p className="hidden md:block text-[18px] text-[#fff] font-candara-rg leading-[28px]">
              <span className="mr-1">{translate("Free call")}</span>
              <span dir="ltr">{settingsFields.whatsapp_number}</span>
            </p>
          ) : null}

          {/* Contact Number */}
          {settingsFields.contact_number ? (
            <div className="flex flex-col gap-[4px]">
              <span className="md:hidden text-[20px] text-[#fff] font-candara-rg font-bold leading-[24.41px] tracking-wide">
                {translate("Call us")}
              </span>
              <Link
                href={`tel:${settingsFields.contact_number}`}
                className="text-[18px] text-[#fff] font-candara-rg leading-[21.97px] group hover:text-orange-500 transition-300"
              >
                <span
                  className="group-hover:border-b group-hover:border-orange-500"
                  dir="ltr"
                >
                  {settingsFields.contact_number}
                </span>
              </Link>
            </div>
          ) : null}

          {/* Contct Email */}
          {settingsFields.contact_email ? (
            <div className="flex flex-col gap-[4px]">
              <span className="md:hidden text-[20px] text-[#fff] font-candara-rg font-bold leading-[24.41px] tracking-wide">
                {translate("Email")}
              </span>
              <Link
                href={`mailto:${settingsFields.contact_email}`}
                className="text-[18px] text-[#fff] font-candara-rg leading-[21.97px] group hover:text-orange-500 transition-300"
              >
                <span className="group-hover:border-b group-hover:border-orange-500">
                  {settingsFields.contact_email}
                </span>
              </Link>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default FooterContactInfoWidget;
