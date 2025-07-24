import { getFileSettingsValue } from "@/utils/website-settings-helper";
import Image from "next/image";

const OurVisionSection = ({ filesList, contentData }) => {
  // Set the in-comming 3 About Us widget list ids
  const cardList = [{ id: 0 }, { id: 1 }, { id: 2 }];

  // Extract the image URL based on image _id
  const getWidgetIconURL = (id) => {
    const iconURL =
      getFileSettingsValue(
        filesList,
        contentData?.[`about-us-section-2-widget-card-icon-${id}`] || ""
      )?.fileUrl || null;

    return iconURL;
  };

  // Render the widget icon based on the widget card id
  const renderWidgetIcon = (id) => {
    const url = getWidgetIconURL(id);

    if (url) {
      return (
        <div className="size-[44px] p-[6px] rounded-[10px] bg-black-500 flex items-center justify-center">
          <div className="relative size-[28px]">
            <Image
              src={url}
              alt={`Widget Icon ${id}`}
              fill
              sizes="(max-width: 768px) 100vw, 28px"
              className="object-cover"
            />
          </div>
        </div>
      );
    }
  };

  return (
    <ul className="w-full pb-[100px] md:pb-[130px] md:max-w-[1192px] mx-auto flex flex-col md:flex-row md:justify-between gap-4 md:gap-5">
      {cardList.map((card, index) => (
        <li
          key={`about-us-widget-card-${card.id}`}
          className="w-full md:max-w-[384px] border border-black-100 rounded-[24px] flex flex-col gap-[32px] p-[32px] shadow-light hover:translate-y-[-10px] hover:shadow-lg transition-300"
          style={{
            backgroundColor: `${contentData?.[`about-us-section-2-widget-card-color-${card.id}`] || "#fff"}`,
          }}
        >
          {/* Icon */}
          {contentData?.[`about-us-section-2-widget-card-icon-${card.id}`] &&
            renderWidgetIcon(card.id)}

          {/* Title */}
          {(contentData?.[`about-us-section-2-widget-card-title-${card.id}`] ||
            contentData?.[
              `about-us-section-2-widget-card-description-${card.id}`
            ]) && (
            <div className="flex flex-col gap-[8px]">
              {contentData?.[
                `about-us-section-2-widget-card-title-${card.id}`
              ] && (
                <h5 className="text-[24px] text-black-500 font-candara-rg font-bold leading-[29.3px]">
                  {
                    contentData?.[
                      `about-us-section-2-widget-card-title-${card.id}`
                    ]
                  }
                </h5>
              )}

              {/* Description */}
              {contentData?.[
                `about-us-section-2-widget-card-description-${card.id}`
              ] && (
                <p className="text-[16px] leading-[19.53px] text-[#666D80] font-candara-rg">
                  {
                    contentData?.[
                      `about-us-section-2-widget-card-description-${card.id}`
                    ]
                  }
                </p>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default OurVisionSection;
