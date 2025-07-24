"use client";

import ROUTES from "@/constants/routes";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { CarouselButtons, DarkButton, PageNavigationButton } from "../..";

const CoursesSection = ({
  contentData,
  currentLanguage = "en",
  coursesList = [],
}) => {
  const [sliderRef, setSliderRef] = useState(null);
  const translate = useTranslations();

  const title = contentData?.["home-section-4-courses-title"] || "";
  const heading = contentData?.["home-section-4-courses-heading"] || "";
  const description = contentData?.["home-section-4-courses-description"] || "";

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: coursesList.length < 3 ? coursesList.length : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024, // Below lg
        settings: {
          slidesToShow: coursesList.length < 2 ? 1 : 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // OnClick Next Slide Function
  const nextSlide = () => {
    sliderRef?.slickNext();
  };

  // OnClick Previous Slide Function
  const prevSlide = () => {
    sliderRef?.slickPrev();
  };

  return (
    <>
      <section id="home-page-courses-section" className="w-full pt-[80px]">
        {(title || heading) && (
          <div className="flex flex-col items-center gap-3 md:gap-5">
            {title && <PageNavigationButton btnText={title} />}

            {heading && (
              <h1 className="w-full max-w-[889px] text-[28px] md:text-[64px] leading-[34.18px] md:leading-[78.13px] font-candara-rg font-bold text-black-500 text-center">
                {heading}
              </h1>
            )}
          </div>
        )}

        <div className="flex items-center justify-between gap-3 md:gap-5 md:px-[60px] mt-5 md:mt-[79px]">
          {description && (
            <p className="w-full max-w-[525px] text-[16px] md:text-[20px] text-black-500 font-candara-rg leading-[19.53px] md:leading-[24.41px]">
              {description}
            </p>
          )}

          <div className="hidden md:flex gap-5">
            <CarouselButtons
              previousSlideFnc={prevSlide}
              nextSlideFnc={nextSlide}
            />
          </div>
        </div>

        {coursesList.length > 0 && (
          <>
            <div className="overflow-hidden w-full mt-5 md:mt-[79px] relative">
              <Slider ref={setSliderRef} {...settings}>
                {coursesList.map((eachCourse) => (
                  <div key={eachCourse._id} className="px-3">
                    <div className="w-full">
                      {eachCourse?.image?.fileUrl && (
                        <div className="relative rounded-[20px] md:rounded-[24px] overflow-hidden w-full h-[295px] md:h-[392px]">
                          <Image
                            src={eachCourse.image.fileUrl}
                            alt={eachCourse?.title?.en || "Course Image"}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 100vw"
                            className="object-cover hover:scale-[1.05] transition-300"
                          />
                        </div>
                      )}

                      {(eachCourse?.title?.[currentLanguage] ||
                        eachCourse?.shortDescription?.[currentLanguage] ||
                        eachCourse?.slug) && (
                        <div className="mt-[8px] md:mt-[12px]">
                          {(eachCourse?.title?.[currentLanguage] ||
                            eachCourse?.slug) && (
                            <div className="flex items-center justify-between gap-5">
                              {eachCourse?.title?.[currentLanguage] && (
                                <h5 className="text-[24px] font-candara-rg leading-[29.3px] text-black-500 font-[700] rtl:order-2">
                                  {eachCourse.title[currentLanguage]}
                                </h5>
                              )}

                              {eachCourse?.slug && (
                                <Link
                                  href={`/courses/${eachCourse.slug}`}
                                  className="size-[40px] md:size-[48px] bg-white hover:bg-black-500 transition-300 border border-black-100 rounded-full flex justify-center items-center group"
                                >
                                  <ArrowRight
                                    size={24}
                                    className="rotate-[-25.5deg] text-black-300 group-hover:text-white group-hover:rotate-0 transition-300"
                                  />
                                </Link>
                              )}
                            </div>
                          )}

                          {eachCourse?.shortDescription?.[currentLanguage] && (
                            <div className="text-[14px] xl:text-[18px] leading-[17.09px] xl:leading-[21.97px] text-[#666D80] font-candara-rg mt-[4px] rtl:text-right">
                              {eachCourse.shortDescription[currentLanguage]}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </Slider>
            </div>

            <DarkButton
              btnText={translate("See more courses")}
              targetLink={ROUTES.COURSES}
              containerClasses="w-full flex md:hidden mt-[32px]"
            />
          </>
        )}
      </section>
    </>
  );
};

export default CoursesSection;
