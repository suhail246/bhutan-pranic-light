import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CoursesListing = ({ currentLanguage = "en", coursesList = [] }) => {
  if (coursesList.length === 0) {
    return null;
  }

  return (
    <section
      id="courses-listing-section"
      className="w-full px-[8px] md:px-0 pt-[40px] md:pt-[14px]"
    >
      <ul
        className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5"
        dir="ltr"
      >
        {coursesList.map((eachCourse, index) => (
          <li key={eachCourse._id}>
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
                    <p className="text-[14px] xl:text-[18px] leading-[17.09px] xl:leading-[21.97px] text-[#666D80] font-candara-rg mt-[4px] rtl:text-right">
                      {eachCourse.shortDescription[currentLanguage]}
                    </p>
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CoursesListing;
