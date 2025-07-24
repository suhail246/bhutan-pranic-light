import {
  CoursePackagesCardSection,
  FeeStructureTable,
  PageNavigationButton,
} from "@/components/public-pages-component";

const CourseDetailsPricingSection = ({
  detailsData = {},
  pricingTitle = "",
  pricingHeading = "",
  pricingSubHeading = "",
  pricingTypes = [],
  pricingPackages = [],
  files = [],
  currentLanguage = "en",
  slug = "",
}) => {
  const isTitleMissing = pricingTitle.length === 0;
  const isHeadingMissing = pricingHeading.length === 0;
  const isSubHeadingMissing = pricingSubHeading.length === 0;
  const isPricingTypesMissing = pricingTypes.length === 0;
  const isPricingPackagesMissing = pricingPackages.length === 0;

  // If any of the required data is missing, return null
  if (
    isTitleMissing &&
    isHeadingMissing &&
    isSubHeadingMissing &&
    isPricingTypesMissing &&
    isPricingPackagesMissing
  ) {
    return null;
  }

  return (
    <section
      id={`${slug}-course-details-pricing-section`}
      className="w-full px-[8px] lg:px-[46px] mt-[40px] md:mt-[80px]"
    >
      {/* Options Text details */}
      {!isTitleMissing || !isHeadingMissing || !isSubHeadingMissing ? (
        <div className="flex flex-col md:items-center gap-3 md:gap-5">
          {/* Title */}
          {!isTitleMissing && (
            <PageNavigationButton
              btnText={pricingTitle}
              extraClasses="w-fit h-fit"
            />
          )}

          {!isHeadingMissing || !isSubHeadingMissing ? (
            <div className="w-full flex flex-col md:items-center gap-[14px]">
              {!isHeadingMissing && (
                // Heading
                <h1 className="text-[32px] md:text-[55px] font-candara-rg font-bold text-black-500 md:text-center">
                  {pricingHeading}
                </h1>
              )}

              {!isSubHeadingMissing && (
                // Sub Heading
                <p className="w-full md:max-w-[651px] text-[16px] md:text-[20px] font-candara-rg text-black-500 leading-[100%] md:text-center">
                  {pricingSubHeading}
                </p>
              )}
            </div>
          ) : null}
        </div>
      ) : null}

      <CoursePackagesCardSection
        pricingTypes={pricingTypes}
        pricingPackages={pricingPackages}
        files={files}
        currentLanguage={currentLanguage}
      />

      {/* Excentional Case for Golden Visa Driving License */}
      {detailsData?.courseStaticId &&
        detailsData?.courseStaticId === "golden-visa-driving-license" && (
          <FeeStructureTable detailsData={detailsData} />
        )}
    </section>
  );
};

export default CourseDetailsPricingSection;
