import ROUTES from "@/constants/routes";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const CommonContactDetailsData = ({
  contactDetails = {},
  branchName = "",
  branchAddress = "",
  openingHoursLabels = [],
  redirectionStatus = false,
  emailVisibility = false,
}) => {
  const translate = useTranslations();
  const openingHoursOrder = [0, 1, 0, 1];

  return (
    <>
      {/* Heading with Icon */}
      <div className="flex items-center gap-[12px]">
        <div className="size-[40px] rounded-[10px] bg-[#0A0A0A] overflow-hidden flex items-center justify-center">
          <div className="size-[24px] relative">
            <Image
              src="/bin-yaber-assets/icons/location.png"
              alt="Location Icon"
              fill
              sizes="(max-width: 768px) 100vw, 100vw"
            />
          </div>
        </div>

        {branchName && (
          <h2 className="text-[28px] md:text-[40px] text-[#212121] font-candara-rg font-bold">
            {branchName}
          </h2>
        )}
      </div>

      {/* Address */}
      {branchAddress && (
        <div className="flex flex-col gap-3">
          <h5 className="text-[20px] md:text-[24px] text-[#212121] font-candara-rg font-bold">
            {translate("Address")}
          </h5>

          {redirectionStatus ? (
            <Link
              href={
                contactDetails?.slug
                  ? `${ROUTES.CONTACT_US}/${contactDetails?.slug}`
                  : "#"
              }
              className="w-full text-[18px] text-black-300 hover:text-orange-500 group transition-300 font-candara-rg leading-[100%]"
            >
              <span className="group-hover:border-b group-hover:border-orange-500">
                {branchAddress}
              </span>
            </Link>
          ) : (
            <p className="w-full text-[18px] text-black-300 font-candara-rg leading-[100%]">
              {branchAddress}
            </p>
          )}
        </div>
      )}

      {/* Contact Number */}
      {contactDetails?.contactNumber && (
        <div className="flex flex-col gap-3">
          <h5 className="text-[20px] md:text-[24px] text-[#212121] font-candara-rg font-bold">
            {translate("Call us")}
          </h5>
          <Link
            href={`tel:${contactDetails.contactNumber}`}
            className="w-full text-[18px] text-black-300 font-candara-rg leading-[100%] group hover:text-orange-500 transition-300"
          >
            <span
              className="group-hover:border-b group-hover:border-orange-500"
              dir="ltr"
            >
              {contactDetails.contactNumber}
            </span>
          </Link>
        </div>
      )}

      {/* Contact Email */}
      {contactDetails?.contactEmail && emailVisibility && (
        <div className="flex flex-col gap-3">
          <h5 className="text-[20px] md:text-[24px] text-[#212121] font-candara-rg font-bold">
            {translate("Email")}
          </h5>
          <Link
            href={`mailto:${contactDetails.contactEmail}`}
            className="w-full text-[18px] text-black-300 font-candara-rg leading-[100%] group hover:text-orange-500 transition-300"
          >
            <span className="group-hover:border-b group-hover:border-orange-500">
              {contactDetails.contactEmail}
            </span>
          </Link>
        </div>
      )}

      {/* Opening Hours */}
      {openingHoursLabels.length > 0 && (
        <div className="flex flex-col gap-3">
          <h5 className="text-[20px] md:text-[24px] text-[#212121] font-candara-rg font-bold">
            {translate("Opening Hours")}
          </h5>

          <ul className="w-full grid grid-cols-2 gap-4">
            {openingHoursLabels.map((label, index) => {
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

                  {contactDetails?.openingHours?.values?.[index] && (
                    <p
                      className="text-[18px] text-[#212121] font-candara-rg font-bold leading-[28px] mt-[2px]"
                      dir="ltr"
                    >
                      {contactDetails.openingHours.values[index]}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default CommonContactDetailsData;
