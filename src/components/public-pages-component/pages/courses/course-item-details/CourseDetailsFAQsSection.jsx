import { PageNavigationButton } from "@/components/public-pages-component";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

const CourseDetailsFAQsSection = ({
  title = "",
  heading = "",
  subHeading = "",
  itemList = [],
  questionsList = [],
  answersList = [],
  slug = "",
}) => {
  const isTitleMissing = title === "";
  const isHeadingMissing = heading === "";
  const isSubHeadingMissing = subHeading === "";
  const isItemListMissing =
    questionsList.length === 0 && answersList.length === 0;

  // Check if all required props are available
  if (
    isTitleMissing &&
    isHeadingMissing &&
    isSubHeadingMissing &&
    isItemListMissing
  ) {
    return null;
  }

  return (
    <section
      id={`${slug}-course-details-faqs-section`}
      className="w-full px-[8px] lg:px-[46px] mt-[40px] md:mt-[80px]"
    >
      {/* Options Text details */}
      {!isTitleMissing || !isHeadingMissing || !isSubHeadingMissing ? (
        <div className="flex flex-col md:items-center gap-3 md:gap-5">
          {/* Title */}
          {!isTitleMissing && (
            <PageNavigationButton btnText={title} extraClasses="w-fit h-fit" />
          )}

          {!isHeadingMissing || !isSubHeadingMissing ? (
            <div className="w-full flex flex-col md:items-center gap-[14px]">
              {!isHeadingMissing && (
                // Heading
                <h1 className="text-[32px] md:text-[55px] font-candara-rg font-bold text-black-500 md:text-center">
                  {heading}
                </h1>
              )}

              {!isSubHeadingMissing && (
                // Sub Heading
                <p className="w-full md:max-w-[651px] text-[16px] md:text-[20px] font-candara-rg text-black-500 leading-[100%] md:text-center">
                  {subHeading}
                </p>
              )}
            </div>
          ) : null}
        </div>
      ) : null}

      {/* FAQs Listing Section */}
      {!isItemListMissing && (
        <Accordion
          type="single"
          collapsible
          className="w-full md:max-w-[874px] mx-auto mt-[24px] md:mt-[40px] flex flex-col gap-[16px] md:gap-[14px]"
        >
          {questionsList.map(
            (eachQuestion, index) =>
              eachQuestion &&
              answersList?.[index] && (
                <AccordionItem
                  key={`QNA-${index + 1}`}
                  value={`${eachQuestion}-${index + 1}`}
                  className="rounded-[16px] border border-black-100 p-[20px] bg-white"
                >
                  <AccordionTrigger className="flex items-center justify-between gap-5 hover:no-underline">
                    <ChevronDown className="size-[24px] text-[#0A0A0A] order-2 transition-transform duration-300 flex-shrink-0" />

                    <h5 className="text-[18px] md:text-[24px] font-candara-rg font-bold text-[#0A0A0A]">
                      {eachQuestion}
                    </h5>
                  </AccordionTrigger>

                  <AccordionContent className="mt-4">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: answersList?.[index],
                      }}
                      className="course-details-faqs-answer"
                    ></div>
                  </AccordionContent>
                </AccordionItem>
              )
          )}
        </Accordion>
      )}
    </section>
  );
};

export default CourseDetailsFAQsSection;
