import { getFESettingsFieldValues } from "@/utils/website-settings-helper";
import NextTopLoader from "nextjs-toploader";

const TopLoader = ({ settingsData }) => {
  // Extract specific settings from settingsData using a helper function
  const { toploader_color, show_toploader_switcher } = getFESettingsFieldValues(
    settingsData,
    ["toploader_color", "show_toploader_switcher"]
  );

  if (show_toploader_switcher === 1) {
    if (toploader_color) {
      return <NextTopLoader showSpinner={false} color={toploader_color} />;
    }

    return <NextTopLoader showSpinner={false} color="#e61247" />;
  }

  return null;
};

export default TopLoader;
