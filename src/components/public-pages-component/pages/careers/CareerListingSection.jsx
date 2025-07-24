import { useTranslations } from "next-intl";
import Image from "next/image";
import { DataNotFound, LightHoverRedirectionButton } from "../..";

const CareerListingSection = ({ currentLanguage, careers }) => {
  const translate = useTranslations();

  return (
    <section id="career-listing-section" className="w-full">
      {careers.length > 0 ? (
        <ul className="w-full max-w-[1200px] mx-auto mt-[16px] md:mt-[40px] grid grid-cols-1 md:grid-cols-2 gap-6">
          {careers.map((career) => (
            <li
              key={career._id}
              className="w-full md:max-w-[588px] rounded-[24px] bg-white p-[32px] border border-[#E5E5E5] flex flex-col gap-[32px] shadow-light hover:translate-y-[-10px] hover:shadow-lg transition-300"
            >
              <div className="size-[40px] rounded-[10px] bg-[#0A0A0A] overflow-hidden flex items-center justify-center">
                <div className="size-[20px] relative">
                  <Image
                    src="/bin-yaber-assets/icons/career-icon.png"
                    alt="Career Icon"
                    fill
                    sizes="(max-width: 768px) 100vh, 100vh"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-[8px]">
                {/* Career Job Name */}
                {career?.jobName?.[currentLanguage] ? (
                  <h4 className="text-[28px] text-black-500 font-candara-rg font-bold">
                    {career.jobName[currentLanguage]}
                  </h4>
                ) : null}

                {/* Job Description */}
                {career?.jobDescripton?.[currentLanguage] ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: career.jobDescripton[currentLanguage],
                    }}
                    className="career-job-description"
                  ></div>
                ) : null}
              </div>

              {career?.applyLink ? (
                <LightHoverRedirectionButton
                  redirectionLink={career.applyLink}
                  btnText={translate("Apply Now")}
                  icon={true}
                  btnClasses="text-[16px] border border-black-100"
                />
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <DataNotFound
          notFoundText={translate("No vacancies found")}
          extraClasses="mb-[80px]"
        />
      )}
    </section>
  );
};

export default CareerListingSection;
