import { getPublicPageCMSContent } from "@/actions/frontEndActions/action";
import { fetchPublicHomePageData } from "@/actions/frontEndPageDataActions";
import {
  AboutSection,
  CoursesSection,
  GetInTouchSection,
  HeroSection,
  InfoSecion,
  NewsSection,
  PricesSection,
} from "@/components/public-pages-component";
import {
  useFilterActiveFeaturedItems,
  useFilterActiveItems,
} from "@/lib/hooks";
import { getLanguageFromCookie } from "@/utils/lanugage-action-utils";
import BhuHeroSection from "@/components/public-pages-component/pages/home/bhutan-pranic/BhuHeroSection ";
import ConferenceSection from "@/components/public-pages-component/pages/home/bhutan-pranic/ConferenceSection";
import EventSchedule from "@/components/public-pages-component/pages/home/bhutan-pranic/EventSchedule";
import TestimonialSection from "@/components/public-pages-component/pages/home/bhutan-pranic/TestimonialSection";
import MemoriesSection from "@/components/public-pages-component/pages/home/bhutan-pranic/MemoriesSection";
import SponsorsSection from "@/components/public-pages-component/pages/home/bhutan-pranic/SponsorsSection";
// Handle dynamic meta data
// export const generateMetadata = async () => {
//   const { otherInfoData } = await getPublicPageCMSContent("home");
//   const isPageInfoExist = Object.keys(otherInfoData).length > 0;

//   if (
//     !isPageInfoExist ||
//     !otherInfoData.pageMetaTitle ||
//     !otherInfoData.pageMetaDescription
//   ) {
//     return {
//       title: process.env.NEXT_PUBLIC_DEFAULT_META_APP_NAME || "Default Title",
//       description:
//         process.env.NEXT_PUBLIC_DEFAULT_META_APP_DESCRIPTION ||
//         "Default Description",
//     };
//   }

//   return {
//     title: otherInfoData.pageMetaTitle,
//     description: otherInfoData.pageMetaDescription,
//   };
// };

export const metadata = {
  title: process.env.NEXT_PUBLIC_DEFAULT_META_APP_NAME,
  description: process.env.NEXT_PUBLIC_DEFAULT_META_APP_DESCRIPTION,
};

const HomePage = async () => {
  // const currentLanguage = await getLanguageFromCookie();

  // // Fetch necessary data
  // const {
  //   newsResponse,
  //   testimonialResponse,
  //   coursesResponse,
  //   filesList,
  //   contentData,
  //   otherInfoData,
  // } = await fetchPublicHomePageData("home", currentLanguage);

  // // Filter latest active news articles items
  // const latestFourNews = useFilterActiveItems(
  //   newsResponse?.fetchData?.length > 0 ? newsResponse.fetchData : [],
  //   "isActive",
  //   4
  // );

  // // Filter active testimonials items
  // const activeTestimonials = useFilterActiveItems(
  //   testimonialResponse?.fetchData?.length > 0
  //     ? testimonialResponse.fetchData
  //     : [],
  //   "isActive"
  // ).sort((a, b) => Number(b.orderNumber || 1) - Number(a.orderNumber || 1));

  // // Filter the active featured courses
  // const featuredCourses =
  //   coursesResponse?.fetchData?.length > 0
  //     ? useFilterActiveFeaturedItems(
  //         coursesResponse.fetchData,
  //         "isActive",
  //         "isFeatured"
  //       )
  //     : [];

  return (
    // <div className="w-full">
    <>
      <BhuHeroSection />

      <ConferenceSection />
      <EventSchedule />
      <TestimonialSection />
      <MemoriesSection />
      <SponsorsSection />
    </>

    //   <AboutSection filesList={filesList} contentData={contentData} />

    //   <CoursesSection
    //     contentData={contentData}
    //     currentLanguage={currentLanguage}
    //     coursesList={featuredCourses}
    //   />

    //   <PricesSection contentData={contentData} />

    //   <NewsSection
    //     currentLanguage={currentLanguage}
    //     latestFourNews={latestFourNews}
    //     contentData={contentData}
    //   />

    //   <TestimonialSection
    //     currentLanguage={currentLanguage}
    //     activeTestimonials={activeTestimonials}
    //     contentData={contentData}
    //   />

    //   <GetInTouchSection
    //     filesList={filesList}
    //     contentData={contentData}
    //     sectionId="home-page-get-in-touch-section"
    //     imageKey="home-section-8-booking-image"
    //     titleKey="home-section-8-booking-title"
    //     headingKey="home-section-8-booking-heading"
    //     subHeadingKey="home-section-8-booking-sub-heading"
    //     buttonLabelKey="home-section-8-booking-button-label"
    //     buttonLinkKey="home-section-8-booking-button-link"
    //   />
    // </div>
    // <></>
  );
};

export default HomePage;
