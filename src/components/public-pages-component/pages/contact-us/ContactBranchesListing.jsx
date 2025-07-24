import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ROUTES from "@/constants/routes";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const ContactBranchesListing = ({ contacts, currentLanguage }) => {
  const translate = useTranslations();
  const openingHoursOrder = [0, 1, 0, 1];

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full mt-[32px] flex flex-col gap-[14px]"
    >
      {contacts.map((contact) => (
        <AccordionItem
          key={contact._id}
          value={contact._id}
          className="rounded-[16px] border border-black-100 p-[20px] bg-white"
        >
          <AccordionTrigger className="flex items-center justify-between gap-2 hover:no-underline">
            <ChevronDown className="size-[20px] text-[#0A0A0A] order-2 transition-transform duration-300" />

            {contact?.branchName?.[currentLanguage] && (
              <h5 className="text-[24px] font-candara-rg font-bold text-[#0A0A0A] leading-[30px]">
                {contact.branchName[currentLanguage]}
              </h5>
            )}
          </AccordionTrigger>
          <AccordionContent className="md:max-w-[526px] flex flex-col gap-[22px] mt-[22px]">
            {/* Address */}
            {contact?.branchAddress?.[currentLanguage] && (
              <div className="flex flex-col gap-3">
                <h5 className="text-[20px] text-[#212121] font-candara-rg font-bold">
                  {translate("Address")}
                </h5>
                <Link
                  href={
                    contact?.slug
                      ? `${ROUTES.CONTACT_US}/${contact?.slug}`
                      : "#"
                  }
                  className={`w-full text-[18px] text-black-300 hover:text-orange-500 transition-300 font-candara-rg leading-[100%] group`}
                >
                  <span className="group-hover:border-b group-hover:border-orange-500">
                    {contact.branchAddress[currentLanguage]}
                  </span>
                </Link>
              </div>
            )}

            {/* Contact Number */}
            {contact?.contactNumber && (
              <div className="flex flex-col gap-3">
                <h5 className="text-[20px] text-[#212121] font-candara-rg font-bold">
                  {translate("Call us")}
                </h5>
                <Link
                  href={`tel:${contact.contactNumber}`}
                  className="w-full text-[18px] text-black-300 font-candara-rg leading-[100%] group hover:text-orange-500 transition-300"
                >
                  <span
                    className="group-hover:border-b group-hover:border-orange-500"
                    dir="ltr"
                  >
                    {contact.contactNumber}
                  </span>
                </Link>
              </div>
            )}

            {/* Opening Hours */}
            {contact?.openingHours?.labels?.[currentLanguage].length > 0 && (
              <div className="flex flex-col gap-3">
                <h5 className="text-[20px] text-[#212121] font-candara-rg font-bold">
                  {translate("Opening Hours")}
                </h5>

                <ul className="w-full grid grid-cols-2 gap-4">
                  {contact.openingHours.labels[currentLanguage].map(
                    (label, index) => {
                      // Adjust the order of the opening hours based on the order of the labels
                      const ajustedOrderIndex = openingHoursOrder[index];

                      return (
                        <li
                          key={`opening-days-${index + 1}`}
                          className={`order-${ajustedOrderIndex}`}
                        >
                          <h6 className="text-[18px] text-[#212121] font-candara-rg leading-[28px]">
                            {`${label}:`}
                          </h6>

                          {contact?.openingHours?.values?.[index] && (
                            <p
                              className="text-[18px] text-[#212121] font-candara-rg font-bold leading-[28px] mt-[2px]"
                              dir="ltr"
                            >
                              {contact.openingHours.values[index]}
                            </p>
                          )}
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ContactBranchesListing;
