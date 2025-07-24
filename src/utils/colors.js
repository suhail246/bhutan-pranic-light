import {
  layoutThemePrimaryColor,
  sidebarGradientColor,
  sidebarImage,
} from "@/app/assets/data/layoutCustomizerData/layoutCustomizerData";

const themeConfig = {
  [layoutThemePrimaryColor.TEAL_GREEN]: {
    base: "#066b5e",
    gradient: {
      [sidebarGradientColor.SEC_CHILD_GRADIENT_BG_COLOR]: [
        "#2a99dd",
        "#347cef",
      ],
      [sidebarGradientColor.THIRD_CHILD_GRADIENT_BG_COLOR]: [
        "#2a99dd",
        "#0fb0a6",
      ],
      [sidebarGradientColor.FOURTH_CHILD_GRADIENT_BG_COLOR]: [
        "#1d2129",
        "#066b5e",
      ],
      default: ["#066b5e", "#10a99a"],
    },
  },
  [layoutThemePrimaryColor.ROYAL_PURPLE]: {
    base: "#5147A3",
    gradient: {
      [sidebarGradientColor.SEC_CHILD_GRADIENT_BG_COLOR]: [
        "#2a99dd",
        "#347cef",
      ],
      [sidebarGradientColor.THIRD_CHILD_GRADIENT_BG_COLOR]: [
        "#2a99dd",
        "#0fb0a6",
      ],
      [sidebarGradientColor.FOURTH_CHILD_GRADIENT_BG_COLOR]: [
        "#1d2129",
        "#5147A3",
      ],
      default: ["#5147A3", "#10a99a"],
    },
  },
  [layoutThemePrimaryColor.COBALT_BLUE]: {
    base: "#2a5fc1",
    gradient: {
      [sidebarGradientColor.SEC_CHILD_GRADIENT_BG_COLOR]: [
        "#2a99dd",
        "#347cef",
      ],
      [sidebarGradientColor.THIRD_CHILD_GRADIENT_BG_COLOR]: [
        "#2a99dd",
        "#0fb0a6",
      ],
      [sidebarGradientColor.FOURTH_CHILD_GRADIENT_BG_COLOR]: [
        "#1d2129",
        "#2a5fc1",
      ],
      default: ["#2a5fc1", "#10a99a"],
    },
  },
  default: {
    base: "#405189",
    gradient: {
      [sidebarGradientColor.SEC_CHILD_GRADIENT_BG_COLOR]: [
        "#2a99dd",
        "#347cef",
      ],
      [sidebarGradientColor.THIRD_CHILD_GRADIENT_BG_COLOR]: [
        "#2a99dd",
        "#0fb0a6",
      ],
      [sidebarGradientColor.FOURTH_CHILD_GRADIENT_BG_COLOR]: [
        "#1d2129",
        "#405189",
      ],
      default: ["#405189", "#10a99a"],
    },
  },
};

const sidebarImages = {
  [sidebarImage.SNOW]: "bg-sidebar-snow",
  [sidebarImage.OFFICE]: "bg-sidebar-office",
  [sidebarImage.PATTERN]: "bg-sidebar-pattern",
  [sidebarImage.BUBBLE]: "bg-sidebar-bubble",
  default: "",
};

export const getCustomTheme = ({
  layoutThemePrimaryColorType,
  leftSidebarImageType,
  leftSidebarGradientColorType,
}) => {
  const theme = themeConfig[layoutThemePrimaryColorType] || themeConfig.default;
  const gradient =
    theme.gradient[leftSidebarGradientColorType] || theme.gradient.default;

  return {
    active: `bg-[${theme.base}]`,
    bgColor: `bg-[${theme.base}]/20`,
    hoverBgColor: `hover:bg-[${theme.base}]`,
    textColor: `text-[${theme.base}]`,
    hexCode: theme.base,
    checkedColor: `checked:bg-[${theme.base}]`,
    lightBgColor: `bg-[${theme.base}]/20`,
    hoverTextColor: `hover:text-[${theme.base}]`,
    groupHoverBgColor: `group-hover:bg-[${theme.base}]`,
    borderColor: `border border-[${theme.base}]`,
    gradientBgColor: `bg-gradient-to-r from-[${gradient[0]}] to-[${gradient[1]}]`,
    bgImageUrl: sidebarImages[leftSidebarImageType] || sidebarImages.default,
  };
};
