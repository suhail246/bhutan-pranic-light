import { PageNavigationButton } from "@/components/public-pages-component";

const CourseDetailsCategoryOrConditionsSection = ({
  title,
  heading,
  description,
  slug,
}) => {
  const isTitleMissing = title === "";
  const isHeadingMissing = heading === "";
  const isDescriptionMissing = description === "";

  // If any of the required data is missing, return null
  if (isTitleMissing && isHeadingMissing && isDescriptionMissing) {
    return null;
  }

  return (
    <section
      id={`${slug}-course-details-category-or-conditions-section`}
      className="w-full px-[8px] lg:px-[46px] mt-[40px] md:mt-[80px] flex flex-col lg:flex-row lg:justify-between gap-[14px] md:gap-5"
    >
      {/* Category / Conditions Text details */}
      {!isTitleMissing || !isHeadingMissing ? (
        <div className="flex flex-col md:items-center lg:items-start gap-3 md:gap-5">
          {/* Title */}
          {!isTitleMissing && (
            <PageNavigationButton btnText={title} extraClasses="w-fit h-fit" />
          )}

          {!isHeadingMissing && (
            // Heading
            <h1 className="text-[32px] md:text-[50px] font-candara-rg font-bold text-black-500">
              {heading}
            </h1>
          )}
        </div>
      ) : null}

      {/* Category / Conditions Description details */}
      {!isDescriptionMissing && (
        <div
          dangerouslySetInnerHTML={{
            __html: description,
          }}
          className="course-details-category-or-conditions-section-description md:max-w-[847px] flex flex-col gap-5"
        ></div>
      )}
    </section>
  );
};

export default CourseDetailsCategoryOrConditionsSection;
