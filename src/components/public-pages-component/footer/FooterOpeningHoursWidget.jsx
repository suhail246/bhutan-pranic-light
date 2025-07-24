import { getFESettingsFieldValues } from "@/utils/website-settings-helper";

const FooterOpeningHoursWidget = ({ currentLanguage, settingsData }) => {
  const settingsFields = getFESettingsFieldValues(
    settingsData,
    ["opening_title", "opening_days", "opening_timings"],
    currentLanguage
  );

  return (
    <>
      {settingsFields && Object.keys(settingsFields).length > 0 && (
        <div className="w-full md:max-w-[275px] flex flex-col gap-[12px] md:gap-[16px]">
          {settingsFields.opening_title ? (
            <h6 className="text-[20px] text-[#fff] font-candara-rg font-bold leading-[30px] tracking-wide">
              {settingsFields.opening_title}
            </h6>
          ) : null}

          {settingsFields.opening_days.length > 0 &&
          settingsFields.opening_timings.length > 0 ? (
            <ul className="flex flex-col gap-[16px]">
              {settingsFields.opening_days.map((opening, index) => (
                <li
                  key={`${opening}-${index + 1}`}
                  className="flex flex-col gap-[2px]"
                >
                  <h6 className="text-[18px] text-[#fff] font-candara-rg leading-[28px]">
                    {opening}:
                  </h6>
                  <p
                    className="text-[18px] text-[#fff] font-candara-rg font-bold leading-[26px]"
                    dir="ltr"
                  >
                    {settingsFields.opening_timings[index]}
                  </p>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      )}
    </>
  );
};

export default FooterOpeningHoursWidget;
