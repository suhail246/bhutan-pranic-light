"use client";

import ROUTES from "@/constants/routes";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import {
  CarouselButtons,
  DarkButton,
  DrawOutlineLinkButton,
  PageNavigationButton,
} from "../..";

const NewsSection = ({ currentLanguage, latestFourNews, contentData }) => {
  const [news, setNews] = useState(latestFourNews);
  const translate = useTranslations();

  const title = contentData?.["home-section-6-news-title"] || "";
  const heading = contentData?.["home-section-6-news-heading"] || "";

  // OnClick Next Slide Function
  const nextSlide = () => {
    setNews((prev) => {
      const updatedNews = [...prev];
      const firstItem = updatedNews.shift();
      updatedNews.push(firstItem);
      return updatedNews;
    });
  };

  // OnClick Previous Slide Function
  const prevSlide = () => {
    setNews((prev) => {
      const updatedNews = [...prev];
      const lastItem = updatedNews.pop();
      updatedNews.unshift(lastItem);
      return updatedNews;
    });
  };

  return (
    <>
      <section id="home-page-news-section" className="w-full pt-[80px]">
        {(title || heading) && (
          <div className="md:px-[72px] flex flex-col items-center md:items-start gap-[24px]">
            {title && <PageNavigationButton btnText={title} />}

            {heading && (
              <h1 className="text-[28px] md:text-[56px] font-candara-rg font-bold text-black-500 leading-[34.18px] md:leading-[68.36px]">
                {heading}
              </h1>
            )}
          </div>
        )}

        <div className="flex flex-col md:flex-row md:justify-between gap-[18px] md:gap-[20px] lg:gap-[50px] xl:gap-[69px] mt-[20px] md:mt-[35px]">
          <motion.div
            key={`${news[0]?._id || "none"}-active-image`} // Ensures animation triggers on change
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full max-w-[629px] h-[353px] md:h-[775px] relative rounded-[16px] md:rounded-[20px] overflow-hidden md:flex-1 group"
          >
            <Image
              src={
                news[0]?.bannerImage?.fileUrl ||
                "/bin-yaber-assets/missing-image-url.jpg"
              }
              alt="Latest News Banner"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 100vw"
              className="object-cover group-hover:scale-[1.1] transition-300"
            />
          </motion.div>

          <div className="flex flex-col md:justify-between gap-5 flex-1">
            <div className="hidden md:flex gap-5">
              <CarouselButtons
                previousSlideFnc={prevSlide}
                nextSlideFnc={nextSlide}
              />
            </div>

            <div>
              {news?.[0]?.title?.[currentLanguage] ? (
                <motion.h3
                  key={`${news[0]?._id || "none"}-title`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="text-[24px] md:text-[30px] font-candara-rg font-bold text-black-500 leading-[29.3px] md:leading-[36.62px] mb-[8px] md:mb-[20px]"
                >
                  {news[0].title[currentLanguage]}
                </motion.h3>
              ) : null}

              {news?.[0]?.shortDescription?.[currentLanguage] ? (
                <motion.p
                  key={`${news[0]._id}-description`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="text-[14px] md:text-[20px] font-candara-rg text-[#161922] leading-[17.09px] md:leading-[24.41px] mb-[14px] md:mb-[35px]"
                >
                  {news[0].shortDescription[currentLanguage].slice(0, 323) +
                    "..."}
                </motion.p>
              ) : null}

              <motion.div
                key={`${news?.[0]?._id || "none"}-tags-cta`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-5"
              >
                {news[0]?.tags?.[currentLanguage]?.length > 0 && (
                  <ul className="w-full lg:max-w-[250px] flex flex-wrap gap-[8px]">
                    {news[0].tags[currentLanguage].map((tag, index) => (
                      <li
                        key={index}
                        className="text-[12px] md:text-[14px] font-candara-rg text-black-500 leading-[14.65px] md:leading-[17.09px] py-[8px] px-[14px] border border-black-100 rounded-[12px]"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}

                {news[0]?.slug ? (
                  <DrawOutlineLinkButton
                    redirectionLink={`${ROUTES.NEWS}/${news[0].slug}`}
                    extraClasses="hidden md:flex"
                    btnClasses="p-[12px]"
                  >
                    <span className="text-[16px] md:text-[20px] text-black-500 font-candara-rg flex items-center gap-2">
                      <span>{translate("Read more")}</span>
                      <ArrowRight className="size-[20px] md:size-[24px] text-black-300 rtl:rotate-[180deg]" />
                    </span>
                  </DrawOutlineLinkButton>
                ) : null}
              </motion.div>
            </div>

            <ul className="hidden md:flex gap-[15px]">
              {news.slice(1).map((eachNews) => (
                <li
                  key={eachNews._id}
                  className="w-full max-w-[228px] h-[177px] relative rounded-[20px] overflow-hidden"
                >
                  <Image
                    src={
                      eachNews?.bannerImage?.fileUrl ||
                      "/bin-yaber-assets/missing-image-url.jpg"
                    }
                    alt="News Image"
                    fill
                    sizes="(max-width: 768px) 100vw, 100vw"
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
          </div>

          {news[0]?.slug ? (
            <DarkButton
              btnText={translate("Read more")}
              targetLink={`${ROUTES.NEWS}/${news[0].slug}`}
              containerClasses="md:hidden mt-[14px]"
              extraClasses="flex items-center justify-center gap-[8px]"
              icon={true}
            />
          ) : null}
        </div>
      </section>
    </>
  );
};

export default NewsSection;
