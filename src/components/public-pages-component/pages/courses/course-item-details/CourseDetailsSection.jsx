import {
  CourseDetailsJumpingLinks,
  DarkButton,
} from "@/components/public-pages-component";
import { getFileSettingsValue } from "@/utils/website-settings-helper";
import Image from "next/image";

const CourseDetailsSection = ({
  detailsData = {},
  files = [],
  subTitle = "",
  description = "",
  courseImage = "",
  buttonLabel = "",
  currentLanguage = "en",
  slug = "",
}) => {
  // Jumping links conditions
  const isOptionsExists = detailsData?.optionsHeading?.length > 0 || false;
  const isPricingExists = detailsData?.packagesHeading?.length > 0 || false;
  const isTrainingDetailsExists =
    detailsData?.trainingHeading?.length > 0 || false;
  const isFAQsExists = detailsData?.faqHeading?.length > 0 || false;

  // Extract course image url by its id
  const courseImageUrl = courseImage
    ? getFileSettingsValue(files, courseImage)?.fileUrl
    : "";

  return (
    <section
      id={`${slug}-course-top-details-section`}
      className="w-full grid grid-cols-1 lg:grid-cols-2 gap-[24px] lg:gap-[53px]"
    >
      {/* Image */}
      <div className="w-full">
        {courseImageUrl && (
          <div className="w-full h-[378px] md:h-[652px] relative rounded-[20px] overflow-hidden">
            <Image
              src={courseImageUrl}
              alt={subTitle ? subTitle : "Course Image"}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 100vw"
              className="object-cover hover:scale-[1.05] transition-300"
            />
          </div>
        )}

        {/* Jumping Links */}
        <CourseDetailsJumpingLinks
          isOptionsExists={isOptionsExists}
          isPricingExists={isPricingExists}
          isTrainingDetailsExists={isTrainingDetailsExists}
          isFAQsExists={isFAQsExists}
          slug={slug || ""}
        />
      </div>

      {/* Details */}
      {(subTitle || description || buttonLabel) && (
        <div className="w-full lg:pt-[56px] px-[8px] lg:px-0">
          {subTitle && (
            <h1 className="text-[32px] md:text-[50px] text-black-500 font-candara-rg font-bold">
              {subTitle}
            </h1>
          )}

          {description && (
            <div
              dangerouslySetInnerHTML={{
                __html: description,
              }}
              className="course-details-description"
            ></div>
          )}

          {buttonLabel && (
            <DarkButton
              btnText={buttonLabel}
              targetLink={`#${slug}-course-details-pricing-section`}
              isJumpingLink={true}
              containerClasses="w-full md:max-w-[260px] flex mt-[24px] md:mt-[52px]"
            />
          )}
        </div>
      )}
    </section>
  );
};

export default CourseDetailsSection;
