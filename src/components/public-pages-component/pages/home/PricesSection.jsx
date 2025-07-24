import { pricesSectionData } from "@/app/assets/data/pagesData/home-page-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageNavigationButton, PriceCard } from "../..";

const PricesSection = ({ contentData }) => {
  const title = contentData?.["home-section-5-pricing-title"] || "";
  const headingLG = contentData?.["home-section-5-pricing-heading"] || "";
  const headingSM =
    contentData?.["home-section-5-pricing-sm-screen-heading"] || "";
  const description = contentData?.["home-section-5-pricing-description"] || "";
  const currency = contentData?.["home-section-5-pricing-currency"] || "";
  const currencyList = currency?.split(",") || [];

  return (
    <>
      <section id="home-page-prices-section" className="w-full pt-[80px]">
        {(title || headingLG || headingSM || description || currency) && (
          <div className="w-full max-w-[955px] md:mx-auto">
            {title && (
              <PageNavigationButton
                btnText={title}
                extraClasses="mx-auto md:mx-0"
              />
            )}

            {(headingLG || headingSM || description || currency) && (
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mt-[12px] md:mt-[24px]">
                {headingLG && (
                  <h1 className="hidden md:block w-full max-w-[467px] text-[55px] font-candara-rg font-bold text-black-500 leading-[67.14px]">
                    {headingLG}
                  </h1>
                )}

                {headingSM && (
                  <h1 className="md:hidden w-full max-w-[343px] text-[28px] font-candara-rg font-bold text-black-500 leading-[34.18px]">
                    {headingSM}
                  </h1>
                )}

                {(description || currency) && (
                  <div className="w-full md:max-w-[317px] flex flex-col ltr:md:items-end gap-[14px] md:gap-5">
                    {description && (
                      <p className="w-full md:max-w-[285px] text-[16px] md:text-[20px] font-candara-rg md:text-right text-black-500 leading-[19.53px] md:leading-[24.41px]">
                        {description}
                      </p>
                    )}

                    {currencyList.length > 0 && currency && (
                      <>
                        <Select defaultValue={currencyList[0]}>
                          <SelectTrigger className="w-[69px] h-[33px] md:w-fit md:h-[24px] rounded-[20px] border border-[#98999A] px-[12px] py-[8px] md:py-[4px] md:pl-[8px] md:pr-[4px] flex items-center justify-center gap-[4px] text-[14px] md:text-[12px] text-black-500 font-pp-neue-montreal-md leading-[17.09px] md:leading-[15px] md:tracking-wide outline-none focus:ring-0 focus:outline-none">
                            <SelectValue placeholder="Theme" />
                          </SelectTrigger>
                          <SelectContent className="w-[69px] bg-transparent dark:bg-transparent">
                            {currencyList.map((currencyItem, index) => (
                              <SelectItem
                                key={`currency-${index + 1}`}
                                value={currencyItem}
                              >
                                {currencyItem}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <ul className="w-full max-w-[1192px] flex flex-col md:flex-row gap-4 md:gap-5 mx-auto mt-[20px] md:mt-[60px]">
          {(pricesSectionData || []).map((price) => (
            <PriceCard key={price._id} priceDetails={price} />
          ))}
        </ul>
      </section>
    </>
  );
};

export default PricesSection;
