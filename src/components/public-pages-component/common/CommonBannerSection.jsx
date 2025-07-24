import { useTransformDate } from "@/lib/hooks";
import { useTranslations } from "next-intl";
import { PageNavigationButton } from "..";

const CommonBannerSection = ({
  sectionId = "",
  title = "",
  heading = "",
  subHeading = "",
  updatedAt = "",
  isTitleTranslated = true,
}) => {
  if (!title && !heading && !subheading && !updatedAt) return null;

  const translate = useTranslations();

  const transformedDate = updatedAt ? useTransformDate(updatedAt) : null;

  return (
    <section
      id={sectionId}
      className="w-full rounded-[24px] md:rounded-[32px] bg-white px-[16px] py-[40px] md:p-[104px] flex flex-col justify-center items-center gap-[16px] md:gap-[20px]"
    >
      {title && (
        <PageNavigationButton
          btnText={isTitleTranslated ? title : translate(title)}
          extraClasses="w-fit h-fit"
        />
      )}

      {heading && (
        <h1 className="text-[34px] md:text-[64px] text-black-500 font-candara-rg font-bold leading-[100%] text-center">
          {heading}
        </h1>
      )}

      {subHeading && (
        <p className="w-full max-w-[598px] text-[18px] md:text-[20px] text-black-500 font-candara-rg leading-[100%] text-center">
          {subHeading}
        </p>
      )}

      {transformedDate && updatedAt && (
        <p className="w-full max-w-[598px] text-[18px] md:text-[20px] text-black-500 font-candara-rg leading-[100%] text-center">
          {`${translate("Last updated")}: ${transformedDate}`}
        </p>
      )}
    </section>
  );
};

export default CommonBannerSection;
