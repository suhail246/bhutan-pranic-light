import { useFilterActiveItems, useTransformDate } from "@/lib/hooks";
import { Minus } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import {
  CalculateReadTime,
  DataNotFound,
  LightHoverRedirectionButton,
  SearchContentBox,
} from "../..";

const NewsArticleListingSection = ({
  currentLanguage,
  newsArticleResponse,
  search,
  newsTitle,
}) => {
  // Filter Active News Articles
  const activeNewsArticles = useFilterActiveItems(
    newsArticleResponse?.fetchData || [],
    "isActive"
  );
  const translate = useTranslations();

  return (
    <>
      <div className="w-full flex flex-col gap-[24px] md:gap-[40px]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-5">
          {newsTitle && (
            <h6 className="text-[24px] text-black-500 font-candara-rg font-bold leading-[100%]">
              {newsTitle}
            </h6>
          )}

          {/* Search Box */}
          <SearchContentBox />
        </div>

        {activeNewsArticles.length > 0 ? (
          <ul className="flex flex-col gap-4 md:gap-[24px]">
            {activeNewsArticles.map((article) => (
              <li
                key={article._id}
                className="w-full rounded-[16px] border border-[#E5E5E5] p-[16px] flex flex-col lg:flex-row lg:items-center gap-4 md:gap-[24px] bg-white"
              >
                {/* Screen > 768px */}
                {article?.bannerImage?.fileUrl &&
                  article?.bannerImage?.fileName && (
                    <div className="hidden md:block min-w-[350px] md:h-[240px] rounded-[12px] overflow-hidden relative">
                      <Image
                        src={article.bannerImage.fileUrl}
                        alt={article.bannerImage.fileName}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 100vw"
                        className="object-cover hover:scale-[1.1] transition-300"
                      />
                    </div>
                  )}

                {/* Screen < 768px */}
                {article?.bannerImage?.fileUrl &&
                  article?.bannerImage?.fileName && (
                    <Link
                      href={`/news/${article.slug}`}
                      className="md:hidden w-full"
                    >
                      <div className="md:hidden w-full h-[180px] rounded-[12px] overflow-hidden relative">
                        <Image
                          src={article.bannerImage.fileUrl}
                          alt={article.bannerImage.fileName}
                          fill
                          priority
                          sizes="(max-width: 768px) 100vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    </Link>
                  )}

                <div className="p-[12px] flex flex-col gap-4 md:gap-[32px]">
                  <div className="flex flex-col gap-[8px]">
                    <div className="flex items-center gap-1">
                      {/* Read Time */}
                      {article?.description && (
                        <CalculateReadTime
                          text={article.description}
                          textSize="text-[12px]"
                        />
                      )}

                      {/* Render date if available */}
                      {article?.updatedAt ? (
                        <>
                          <Minus
                            size={16}
                            className="rotate-[90deg] text-[#737373]"
                          />

                          <span className="text-[12px] text-[#737373] font-candara-rg leading-[160%] tracking-[-2%]">
                            {`${translate("Last updated")}: ${useTransformDate(article.updatedAt)}`}
                          </span>
                        </>
                      ) : null}
                    </div>

                    {article?.title?.[currentLanguage] && (
                      <h1 className="text-[24px] text-[#0A0A0A] font-candara-rg font-bold">
                        {article.title[currentLanguage]}
                      </h1>
                    )}

                    {article?.shortDescription?.[currentLanguage] && (
                      <p className="text-[14px] text-black-300 font-candara-rg">
                        {`${article.shortDescription[currentLanguage].slice(
                          0,
                          150
                        )}...`}
                      </p>
                    )}
                  </div>

                  <LightHoverRedirectionButton
                    redirectionLink={`/news/${article.slug}`}
                    btnText={translate("Read More")}
                    icon={true}
                    extraClasses="hidden md:flex"
                    btnClasses="text-[16px] border border-black-100"
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <DataNotFound notFoundText={translate("No News Found")} />
        )}
      </div>
    </>
  );
};

export default NewsArticleListingSection;
