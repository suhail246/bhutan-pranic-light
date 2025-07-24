import { getPublicCourseDetails } from "@/actions/frontEndActions/action";
import { fetchPublicCourseDetailsPageData } from "@/actions/frontEndPageDataActions";
import {
  CommingSoonPage,
  CourseDetailsCategoryOrConditionsSection,
  CourseDetailsFAQsSection,
  CourseDetailsGalarySection,
  CourseDetailsOptionsSection,
  CourseDetailsPricingSection,
  CourseDetailsRegistrationForTrainingsSection,
  CourseDetailsSection,
  CourseDetailsTraingDetailsSection,
  FrontEndBreadcrumb,
  GetInTouchSection,
  TestimonialSection,
} from "@/components/public-pages-component";
import ROUTES from "@/constants/routes";
import { useFilterActiveItems } from "@/lib/hooks";
import { getLanguageFromCookie } from "@/utils/lanugage-action-utils";

// Handle dynamic meta data
export const generateMetadata = async ({ params }) => {
  const { slug } = await params;

  // If slug is not provide, return default metadata
  if (!slug) {
    return {
      title: `Default Course ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
      description: "Course not found.",
    };
  }

  // Fetch the course details
  const { courseDetails } = await getPublicCourseDetails(slug);
  const isCourseDataAvailable = Object.keys(courseDetails).length > 0;

  return {
    title: !isCourseDataAvailable
      ? `Default Course ${process.env.NEXT_PUBLIC_META_APP_NAME}`
      : courseDetails?.metaTitle ||
        `Default Course ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
    description: !isCourseDataAvailable
      ? "Course not found."
      : courseDetails?.metaDescription || "Default Course page details.",
  };
};

const CourseDetailsPage = async ({ params }) => {
  const { slug } = await params;
  const currentLanguage = await getLanguageFromCookie();

  // Fetch nessesary data
  const {
    testimonialResponse,
    courseDetailsResponse,
    filesResponse,
    contentData,
    courseContentData,
  } = await fetchPublicCourseDetailsPageData(slug, currentLanguage);

  // Filter active testimonials items
  const activeTestimonials = useFilterActiveItems(
    testimonialResponse?.fetchData?.length > 0
      ? testimonialResponse.fetchData
      : [],
    "isActive"
  ).sort((a, b) => Number(b.orderNumber || 1) - Number(a.orderNumber || 1));

  const detailsData = courseDetailsResponse?.courseDetails || {};
  const isDetailsDataAvailable = Object.keys(detailsData).length > 0;

  // If details data is not available, show the coming soon page
  if (!isDetailsDataAvailable) {
    return <CommingSoonPage />;
  }

  // If details data is available, render the course details page
  return (
    <div className="w-full">
      <div className="w-full px-[8px] lg:px-[46px]">
        <FrontEndBreadcrumb
          fields={[
            { label: "Home", link: ROUTES.HOME },
            { label: "Courses", link: ROUTES.COURSES },
          ]}
          currentTabName={detailsData?.subTitle || detailsData?.title || ""}
          isCurrentTabTranslated={true}
          navContainerClass="flex flex-wrap items-center gap-2 mb-[16px]"
        />

        {/* Course Details Image, SubHeading and Description */}
        <CourseDetailsSection
          detailsData={detailsData}
          files={
            filesResponse?.filesList?.length > 0 ? filesResponse.filesList : []
          }
          subTitle={detailsData?.subTitle || ""}
          description={detailsData?.description || ""}
          courseImage={detailsData?.image || ""}
          buttonLabel={detailsData?.buttonLabel || ""}
          slug={slug || ""}
        />
      </div>

      {/* Options Section */}
      <CourseDetailsOptionsSection
        files={
          filesResponse?.filesList?.length > 0 ? filesResponse.filesList : []
        }
        optionTitle={detailsData?.optionsTitle || ""}
        optionHeading={detailsData?.optionsHeading || ""}
        optionSubHeading={detailsData?.optionsSubHeading || ""}
        iconLists={
          detailsData?.optionsCard?.icon?.length > 0
            ? detailsData.optionsCard.icon
            : []
        }
        titleLists={
          detailsData?.optionsCard?.title?.length > 0
            ? detailsData.optionsCard.title
            : []
        }
        descriptionLists={
          detailsData?.optionsCard?.description?.length > 0
            ? detailsData.optionsCard.description
            : []
        }
        slug={slug || ""}
      />

      {/* Pricing Section */}
      <CourseDetailsPricingSection
        detailsData={detailsData}
        pricingTitle={detailsData?.packagesTitle || ""}
        pricingHeading={detailsData?.packagesHeading || ""}
        pricingSubHeading={detailsData?.packagesSubHeading || ""}
        pricingTypes={
          detailsData?.packageCategoriesSwitch &&
          detailsData?.packageCategories?.length > 0
            ? detailsData.packageCategories
            : []
        }
        pricingPackages={
          courseDetailsResponse?.packagesDetails?.length > 0
            ? courseDetailsResponse.packagesDetails
            : []
        }
        files={
          filesResponse?.filesList?.length > 0 ? filesResponse.filesList : []
        }
        currentLanguage={currentLanguage}
        slug={slug || ""}
      />

      {/* Category OR Conditions Sections */}
      <CourseDetailsCategoryOrConditionsSection
        title={detailsData?.categoryConditionTitle || ""}
        heading={detailsData?.categoryConditionHeading || ""}
        description={detailsData?.categoryConditionDescription || ""}
        slug={slug || ""}
      />

      {/* Registration for trainging Section */}
      <CourseDetailsRegistrationForTrainingsSection
        currentLanguage={currentLanguage}
        files={
          filesResponse?.filesList?.length > 0 ? filesResponse.filesList : []
        }
        title={detailsData?.registrationTitle || ""}
        heading={detailsData?.registrationHeading || ""}
        itemList={detailsData?.registrationForTrainings?.itemList || []}
        iconLists={
          detailsData?.registrationCards?.icon?.length > 0
            ? detailsData.registrationCards.icon
            : []
        }
        titleLists={
          detailsData?.registrationCards?.title?.length > 0
            ? detailsData.registrationCards.title
            : []
        }
        descriptionLists={
          detailsData?.registrationCards?.description?.length > 0
            ? detailsData.registrationCards.description
            : []
        }
        slug={slug || ""}
      />

      {/* Training Details Section */}
      <CourseDetailsTraingDetailsSection
        heading={detailsData?.trainingHeading || ""}
        titleLists={
          detailsData?.trainingDetails?.title?.length > 0
            ? detailsData.trainingDetails.title
            : []
        }
        descriptionLists={
          detailsData?.trainingDetails?.description?.length > 0
            ? detailsData.trainingDetails.description
            : []
        }
        slug={slug || ""}
      />

      {/* Galary Section */}
      <CourseDetailsGalarySection
        files={
          filesResponse?.filesList?.length > 0 ? filesResponse.filesList : []
        }
        itemList={
          detailsData?.galaryImages?.image?.length > 0
            ? detailsData.galaryImages.image
            : []
        }
        slug={slug || ""}
      />

      {/* FAQs Section */}
      <CourseDetailsFAQsSection
        title={detailsData?.faqTitle || ""}
        heading={detailsData?.faqHeading || ""}
        subHeading={detailsData?.faqSubHeading || ""}
        itemList={detailsData?.faqs?.itemList || []}
        questionsList={
          detailsData?.faqQNA?.question?.length > 0
            ? detailsData.faqQNA.question
            : []
        }
        answersList={
          detailsData?.faqQNA?.answer?.length > 0
            ? detailsData.faqQNA.answer
            : []
        }
        slug={slug || ""}
      />

      {/* Testimonial Section */}
      <TestimonialSection
        currentLanguage={currentLanguage}
        activeTestimonials={activeTestimonials}
        contentData={contentData}
        extraClasses="px-[8px] lg:px-[46px] mt-[40px] md:mt-[80px]"
      />

      {/* Get In Touch Section */}
      <GetInTouchSection
        filesList={filesResponse?.filesList || []}
        contentData={courseContentData}
        sectionId={`${detailsData?.title?.toLowerCase() || detailsData?.subTitle?.toLowerCase() || "none"}-details-page-get-in-touch-section`}
        imageKey="courses-section-2-booking-image"
        titleKey="courses-section-2-booking-title"
        headingKey="courses-section-2-booking-heading"
        subHeadingKey="courses-section-2-booking-sub-heading"
        buttonLabelKey="courses-section-2-booking-button-label"
        buttonLinkKey="courses-section-2-booking-button-link"
      />
    </div>
  );
};

export default CourseDetailsPage;
