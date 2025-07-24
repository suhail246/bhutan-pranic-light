import { getFileSettingsValue } from "@/utils/website-settings-helper";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";

const CoursePriceCard = ({ priceDetails = {}, files = [] }) => {
  const isPriceDetailsExits = Object.keys(priceDetails).length > 0;

  if (!isPriceDetailsExits) {
    return null;
  }

  const packageFeaturesIconUrl = priceDetails?.packageFeaturesIcon
    ? getFileSettingsValue(files, priceDetails.packageFeaturesIcon)?.fileUrl
    : null;

  const tagIconUrl = priceDetails?.packageTagIcon
    ? getFileSettingsValue(files, priceDetails.packageTagIcon)?.fileUrl
    : null;

  const getFeatureIconUrl = useCallback((id, index) => {
    const url = getFileSettingsValue(files, id)?.fileUrl || null;

    if (url) {
      return (
        <Image src={url} alt={`check-${index + 1}`} width={16} height={16} />
      );
    }
  }, []);

  return (
    <li
      key={priceDetails._id}
      className={`w-full md:max-w-[384px] p-[32px] md:p-[22px] lg:p-[32px] rounded-[24px] flex flex-col gap-[24px] bg-[#fff] border border-black-100 group hover:bg-black-500 hover:border-none transition-all duration-700 ease-in-out shadow-light hover:translate-y-[-10px] hover:shadow-lg`}
    >
      <div className="flex flex-col gap-[8px]">
        {(priceDetails?.packageTitle ||
          priceDetails?.packageTagIcon ||
          priceDetails?.packageTagName) && (
          <div className="flex items-center justify-between gap-5">
            {priceDetails?.packageTitle && (
              <h6
                className={`text-[16px] font-candara-rg font-bold leading-[19.53px] text-black-500 group-hover:text-white`}
              >
                {priceDetails.packageTitle}
              </h6>
            )}

            {(priceDetails?.packageTagIcon || priceDetails?.packageTagName) && (
              <div
                className={`py-[4px] px-[8px] bg-[#F9EFE4] rounded-[32px] border border-[#F7EADB] text-[12px] lg:text-[14px] text-orange-500 font-pp-neue-montreal-md leading-[21px] flex items-center gap-[4px]`}
              >
                {tagIconUrl && (
                  <div className="relative size-[12px] lg:size-[14px]">
                    <Image
                      src={tagIconUrl}
                      alt="Tag Icon"
                      fill
                      sizes="(max-width: 768px) 100vw, 100vw"
                    />
                  </div>
                )}
                <span>{priceDetails.packageTagName}</span>
              </div>
            )}
          </div>
        )}

        {priceDetails?.packagePrice && (
          <h1
            className={`text-[20px] font-candara-rg font-bold leading-[24.41px] text-black-500 group-hover:text-white flex items-center gap-[4px]`}
          >
            {priceDetails.packagePrice.split(",")[0]}
            <span className="text-[40px] leading-[48.83px]" dir="ltr">
              {priceDetails.packagePrice.split(",")?.[1] || ""}
            </span>
          </h1>
        )}

        {priceDetails?.packageTerms && (
          <div
            dangerouslySetInnerHTML={{
              __html: priceDetails.packageTerms,
            }}
            className={`text-[14px] font-candara-rg leading-[17.09px] text-black-300 group-hover:text-white`}
          ></div>
        )}

        {priceDetails?.packageButtonLink &&
          priceDetails?.packageButtonLabel && (
            <Link href={priceDetails.packageButtonLink} target="_blank">
              <button
                type="button"
                className={`w-full rounded-[14px] py-[12px] px-[16px] text-center text-[16px] font-candara-rg leading-[24px] text-black-500 border border-black-100 group-hover:text-white group-hover:bg-orange-500 group-hover:border-0`}
              >
                {priceDetails.packageButtonLabel}
              </button>
            </Link>
          )}
      </div>

      <hr
        className={`border border-dashed border-black-100 group-hover:border-[#424242]`}
      />

      <ul className="flex flex-col gap-[12px]">
        {priceDetails?.packageFeaturesTitle && (
          <h5
            className={`text-[20px] font-candara-rg leading-[24.41px] text-black-500 group-hover:text-white`}
          >
            {priceDetails.packageFeaturesTitle}
          </h5>
        )}

        {priceDetails?.packageFeatures?.title?.length > 0 &&
          priceDetails.packageFeatures.title.map((title, index) => (
            <li
              key={`feature-${index + 1}`}
              className="flex items-center gap-[12px]"
            >
              {packageFeaturesIconUrl && (
                <div
                  className={`size-[20px] rounded-[5px] p-[2px] bg-[#FFF1EC] group-hover:bg-[#2f2f2f]`}
                >
                  <Image
                    src={packageFeaturesIconUrl}
                    alt={`check-${index + 1}`}
                    width={16}
                    height={16}
                  />
                </div>
              )}
              <span
                className={`text-[16px] font-candara-rg font-bold leading-[19.53px] text-black-500 group-hover:text-white`}
              >
                {title}
              </span>
            </li>
          ))}
      </ul>
    </li>
  );
};

export default CoursePriceCard;
