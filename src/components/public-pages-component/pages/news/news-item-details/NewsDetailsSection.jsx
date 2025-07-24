import {
  CalculateReadTime,
  DataNotFound,
  NewsContentNavigation,
} from "@/components/public-pages-component";
import { useTransformDate } from "@/lib/hooks";
import { Minus } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const NewsDetailsSection = ({
  currentLanguage,
  newsArticleDetailsResponse,
}) => {
  const { newsArticleData, translationDetails } = newsArticleDetailsResponse;
  const translate = useTranslations();

  // Check if data is available
  const hasNewsArticleData = Object.keys(newsArticleData).length > 0;
  const hasTranslationDetails = Object.keys(translationDetails).length > 0;

  // Transform the date
  const transformedDate = hasNewsArticleData
    ? useTransformDate(newsArticleData.updatedAt)
    : null;

  // Extract translated title and short description
  const title = translationDetails?.[currentLanguage]?.title;
  const shortDescription =
    translationDetails?.[currentLanguage]?.shortDescription;
  const description = translationDetails?.[currentLanguage]?.description;
  const banner = newsArticleData?.bannerImage?.fileUrl;

  // Render the component only if data is available
  if (!hasNewsArticleData || !hasTranslationDetails) {
    return (
      <DataNotFound
        notFoundText="News Article Details not found."
        extraClasses="px-[8px] md:px-[60px] mb-[80px]"
      />
    );
  }

  return (
    <div className="w-full px-[8px] md:px-[60px] flex flex-col gap-[20px] lg:gap-[40px]">
      <div className="flex flex-col gap-[16px]">
        <div className="flex items-center gap-1">
          {/* Read Time */}
          <CalculateReadTime elementId="news-article-item-details-container" />

          {/* Render date if available */}
          {transformedDate ? (
            <>
              <Minus size={16} className="rotate-[90deg] text-[#737373]" />

              <span className="text-[16px] text-[#737373] font-candara-rg leading-[150%] tracking-[-2$%]">
                {`${translate("Last updated")}: ${transformedDate}`}
              </span>
            </>
          ) : null}
        </div>

        {/* Render title if available */}
        {title ? (
          <h1 className="text-[32px] md:text-[64px] text-black-500 font-candara-rg font-bold md:font-normal leading-[100%]">
            {title}
          </h1>
        ) : null}

        {/* Render short description if available */}
        {shortDescription ? (
          <p className="hidden md:block text-[18px] text-black-300 font-candara-rg leading-[150%] tracking-[-2%]">
            {`${shortDescription.slice(0, 211)}...`}
          </p>
        ) : null}
      </div>

      {/* Render banner image if available */}
      {banner ? (
        <div className="w-full h-[180px] md:h-[600px] relative rounded-[16px] md:rounded-[24px] overflow-hidden group">
          <Image
            src={banner}
            alt="News Article Banner"
            quality={100}
            priority
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover group-hover:scale-[1.1] transition-300"
          />
        </div>
      ) : null}

      {/* Render Content Navigation in < 1240px */}
      {description && shortDescription ? (
        <NewsContentNavigation
          currentLanguage={currentLanguage}
          newsArticleDetailsResponse={newsArticleDetailsResponse}
          isSmallScreen={true}
        />
      ) : null}

      {/* Render Content if available */}
      {description && shortDescription ? (
        <div className="flex gap-[48px] lg:px-[54px]">
          <div>
            {/* Render Short Description */}
            {shortDescription.includes("\n") ? (
              <div className="flex flex-col gap-4">
                {shortDescription.split("\n").map((eachItem, index) => (
                  <p
                    key={`short-description-${index}`}
                    className="text-[18px] text-black-300 font-candara-rg"
                  >
                    {eachItem}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-[18px] text-black-300 font-candara-rg">
                {shortDescription}
              </p>
            )}

            <hr className="w-full my-[32px] border border-black-100" />

            {/* Render Description */}
            <div
              dangerouslySetInnerHTML={{
                __html: description,
              }}
              id="news-article-item-details-container"
              className="news-article-item-details-style flex flex-col gap-[32px]"
            ></div>
          </div>

          {/* Render Content Navigation */}
          <NewsContentNavigation
            currentLanguage={currentLanguage}
            newsArticleDetailsResponse={newsArticleDetailsResponse}
          />
        </div>
      ) : null}
    </div>
  );
};

export default NewsDetailsSection;

{
  /* <section id="Dubai RTA Theory Test (Knowledge Test) Checklist">
    <h1>Dubai RTA Theory Test (Knowledge Test) Checklist</h1>

    <p>You must pass the RTA driving theory exam in order to appear for the final RTA road test. Join forces with Bin Yaber and tick the boxes for the following checklist items to pass the RTA Theory Test.</p>

    <ul>
        <li>Attend the mandatory driving lessons and abide by all guidelines.</li>
        <li>Attain access to multiple RTA driving theory mock exams to practice and prepare yourself for what is to come.</li>
        <li>With Bin Yaber, you can strategically start with the easier RTA driving exam questions and work your way up to the more challenging ones with proper guidance.</li>
        <li>Prepare yourself for the RTA Theory Test and everything you need to know about it with Bin Yaber</li>
    </ul>
</section>


<section id="Dubai RTA Road Test Checklist">
    <h1>Dubai RTA Road Test Checklist</h1>

    <p>Once you pass the RTA driving theory test, you will be eligible to appear for the Dubai RTA Road Test. For this test, consider the checklists below.</p>


    <h4>Pre-Driving Checklist</h4>

    <p>The moment you step foot in the car the examiner will be on the lookout for the following:</p>

    <ul>
        <li>Are your doors closed?</li>
        <li>Is your seat adjusted?</li>
        <li>Are your mirrors adjusted?</li>
        <li>Did you fasten your seatbelt?</li>
        <li>Do you know how to operate the windshield wipers?</li>
        <li>Do you know how to operate car lights?</li>
        <li>Did you check that the engine is started?</li>
        <li>Did you check if the horn is working?</li>
    </ul>


    <h4>Mirror Checks</h4>

    <p>When adjusting the mirrors, make sure that you have checked ALL mirrors, no exception. Also, before braking and signalling, you need to check the mirrors, too!</p>


    <h4>Gear Checklist</h4>

    <p>For the gear</p>

    <ul>
        <li>Use the right gear.</li>
        <li>For gear changing, do it as smoothly as possible but do not switch to neutral when moving.</li>
        <li>Once you stop, ensure that the gear is not engaged</li>
        <li>The vehicle should not be stalled.</li>
    </ul>


    <h4>Lane Changing Checklist</h4>

    <p>If you are on the road and want to change lanes, you need to ensure that you do the following:</p>

    <ul>
        <li>Always take an available gap but do not swerve suddenly</li>
        <li>Avoid squeezing your vehicle into gaps that appear to be too small</li>
        <li>If there is no need to reduce speed, then avoid doing so. Instead, move steadily.</li>
        <li>Do a head check, at all times when changing lanes</li>
    </ul>


    <h4>U-turn &amp; Roundabouts Checklist</h4>

    <p>While turns and intersections can be tricky, remember never to press the clutch pedal (for manual category) if you are approaching them and avoid braking too hard. This also means that you need to avoid approaching the turn too slowly or too quickly. Remain as steady as you can be.</p>


    <h4>Stopping a Car Checklist</h4>

    <p>Unless you actually need to stop the car, there is no need to stop it unnecessarily. If you have to stop, ensure that the wheels are under the stop line and that you have stopped in the right position. Also, make sure to use the handbrake when and where required. If it is unavoidable to stop the car on the road, make sure to use hazard lights. Hazard lights are also to be immediately turned on in case of sudden braking</p>


    <h4>Safety Checklist</h4>

    <p>While on the road, you also need to guarantee your safety and those around you. So, make sure you</p>

    <ul>
        <li>Are at a proper distance from the car in front of you and on your sides</li>
        <li>Leave enough space when you pass another car or any object on the road</li>
    </ul>

    <p>Even when you are parking, maintain your distance from other cars.</p>


    <h4>Parking &amp; Reversing Checklist</h4>

    <p>Part of the RTA driving test in Dubai requires you to park the car. In order to do so appropriately, check out the details below:</p>

    <ul>
        <li>Enter through the correct lane.</li>
        <li>Do not stop the car on any of the layby lanes.</li>
        <li>The car needs to be centered in the parking bay without hitting any curb on your way into the parking spot and while exiting.</li>
        <li>Make sure you do a maximum of four moves only to park the car or to leave the parking spot.</li>
        <li>If you are leaving the parking area, signal to the left and make sure to check any blind spots before leaving.</li>
        <li>Exit to the right lane.</li>
    </ul>


    <h4>On Road Driving Checklist</h4>

    <p>Generally, you are asked to drive according to the road conditions and as instructed by your examiner. This also entails the following:</p>

    <ul>
        <li>Not hesitating when it is time to go</li>
        <li>Not releasing the clutch suddenly (for manual category)</li>
        <li>The car needs to be centered in the parking bay without hitting any curb on your way into the parking spot and while exiting.</li>
        <li>Driving in a single lane and using the proper one</li>
        <li>Maintaining proper distance from the curb and not too far right or too far left</li>
    </ul>


    <h4>Follow Examiners Instructions</h4>

    <p>It goes without saying that you need to follow the examiner’s instructions at all times. This shows that you are receptive and can follow necessary driving instructions.</p>
</section>


<section id="Choosing A Reputable Driving School">
    <h1>Choosing A Reputable Driving School</h1>

    <p>
        Passing the RTA Road Test in UAE necessitates your enrollment in a top-tier driving school. The driving school could essentially be your ticket to success.

       Discover a world of safe and confident driving with Bin Yaber Driving School! With a legacy of expertise and a commitment to excellence, Bin Yaber stands out as a premier choice for those embarking on their journey to not only pass the RTA Road Test in UAE but also become skilled and responsible drivers. Our team of experienced and qualified instructors is dedicated to providing you with a comprehensive driving education, ensuring you gain the knowledge and skills needed to drive confidently in the UAE.

       Bin Yaber houses modern facilities, cutting-edge training vehicles, and experienced instructors, providing an immersive learning experience with a focus on safety, flexible scheduling options, and affordable packages.
    </p>
</section>


<section id="Tips to Pass RTA Final Road Test in Dubai">
    <h1>Tips to Pass RTA Final Road Test in Dubai</h1>

    <p>While many consider the RTA Final Road Test challenging, with ample preparation from the driving school you are enrolled in, you should not worry. In addition to what has been mentioned above, consider the following tips to pass the RTA Final Road Test in Dubai:</p>

    <ul>
        <li>Relax! Your low confidence will impact your performance, and your examiner will pick up on that. So, it is important that on the day of the test, you are calm and relaxed.</li>
        <li>Go through the checklists. You are being assessed on your driving skills even before you start the engine. So, make sure to follow the checklist above.</li>
        <li>Remember, not too slow and not too fast. Make sure you abide by the road conditions and accelerate and decelerate where necessary. Otherwise, drive steadily.</li>
        <li>Take it easy when using the brakes. The last thing is your examiner being uncomfortable due to your inconsistency in handling the brake.</li>
        <li>You are in control, not your vehicle. And the examiner will be on the lookout for that, mainly by how you use the brake and the steering wheel as well as how you adjust and check the mirrors.</li>
        <li>Most importantly, follow the driving rules. Getting enough practice is essential for you to remember what to do and how to do it, whether you are switching lanes, entering the main road, or even parking.</li>
    </ul>
</section> */
}
