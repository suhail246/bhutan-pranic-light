import { createSlice } from "@reduxjs/toolkit";

import {
  avatarStatus,
  layout,
  layoutThemePrimaryColor,
  loader,
  mode,
  position,
  rightSidebarOpenStatus,
  sidebarColor,
  sidebarGradientColor,
  sidebarImage,
  sidebarMainSize,
  sidebarSize,
  sidebarView,
  sidebarVisibility,
  theme,
  toggleStatus,
  topbarColor,
  widthType,
} from "@/app/assets/data/layoutCustomizerData/layoutCustomizerData";

const initialState = {
  rightSideBarIsOpen: rightSidebarOpenStatus.CLOSE, // OPEN
  toggleButtonStatus: toggleStatus.CLOSE, // OPEN
  toggleSmallButtonStatus: toggleStatus.CLOSE, // OPEN
  layoutType: layout.VERTICAL, // HORIZONTAL, TWO_COLUMN, SEMI_BOX
  sidebarUserProfileAvtarType: avatarStatus.SHOW, // HIDE
  layoutThemeType: theme.DEFAULT,
  layoutModeType: mode.LIGHT, // DARK
  layoutWidthType: widthType.FLUID, // BOXED
  layoutPositionType: position.FIXED, // SCROLLABLE
  topbarColorType: topbarColor.LIGHT_COLOR, // DARK_COLOR
  leftSidebarSizeType: sidebarSize.DEFAULT, // COMPACT, SMALL_ICON_VIEW, SMALL_HOVER_VIEW
  leftSidebarSizeMain: sidebarMainSize.LG, // MD, SM, SM_HOVER
  leftSidebarVisibilityType: sidebarVisibility.SHOW, // HIDDEN
  leftSidebarViewType: sidebarView.DEFAULT, // DETACHED
  leftSidebarColorType: sidebarColor.DARK_BG_COLOR, // LIGHT_BG_COLOR,  GRADIENT_BG_COLOR
  leftSidebarGradientColorType: sidebarGradientColor.GRADIENT_BG_COLOR, // SEC_CHILD_GRADIENT_BG_COLOR, THIRD_CHILD_GRADIENT_BG_COLOR, FOURTH_CHILD_GRADIENT_BG_COLOR
  leftSidebarImageType: sidebarImage.NONE, // SNOW, OFFICE, PATTERN, BUBBLE
  layoutThemePrimaryColorType: layoutThemePrimaryColor.DEFAULT, // TEAL_GREEN, ROYAL_PURPLE, COBALT_BLUE
  preloader: loader.DISABLE, // TOP_LOADER, SPINNER
};

export const layoutCustomizerSlice = createSlice({
  name: "customizer",
  initialState,
  reducers: {
    changeRightSideBarIsOpen: (state, action) => {
      state.rightSideBarIsOpen = action.payload;
    },

    changeToggleButtonStatus: (state, action) => {
      state.toggleButtonStatus = action.payload;
    },

    changeToggleSmallButtonStatus: (state, action) => {
      state.toggleSmallButtonStatus = action.payload;
    },

    changeLayoutType: (state, action) => {
      state.layoutType = action.payload;
    },

    changeLeftSideBarSizeType: (state, action) => {
      state.leftSidebarSizeType = action.payload;
    },

    changeLeftSidebarSizeMain: (state, action) => {
      state.leftSidebarSizeMain = action.payload;
    },

    changeLeftSidebarVisibilityType: (state, action) => {
      state.leftSidebarVisibilityType = action.payload;
    },

    changeSidebarUserProfileAvtarType: (state, action) => {
      state.sidebarUserProfileAvtarType = action.payload;
    },

    changeLayoutThemeType: (state, action) => {
      state.layoutThemeType = action.payload;
    },

    changeLayoutModeType: (state, action) => {
      state.layoutModeType = action.payload;
    },

    changeLayoutWidthType: (state, action) => {
      state.layoutWidthType = action.payload;
    },

    changeLayoutPositionType: (state, action) => {
      state.layoutPositionType = action.payload;
    },

    changeTopbarColorType: (state, action) => {
      state.topbarColorType = action.payload;
    },

    changeLeftSidbarSizeType: (state, action) => {
      state.leftSidbarSizeType = action.payload;
    },

    changeLeftSidebarViewType: (state, action) => {
      state.leftSidebarViewType = action.payload;
    },

    changeLeftSidebarColorType: (state, action) => {
      state.leftSidebarColorType = action.payload;
    },

    changeLeftSidebarGradientColorType: (state, action) => {
      state.leftSidebarGradientColorType = action.payload;
    },

    changeLeftSidebarImageType: (state, action) => {
      state.leftSidebarImageType = action.payload;
    },

    changeLayoutThemePrimaryColorType: (state, action) => {
      state.layoutThemePrimaryColorType = action.payload;
    },

    changePreloader: (state, action) => {
      state.preloader = action.payload;
    },
  },
});

export const {
  changeRightSideBarIsOpen,
  changeToggleButtonStatus,
  changeToggleSmallButtonStatus,
  changeLayoutType,
  changeLeftSideBarSizeType,
  changeSidebarUserProfileAvtarType,
  changeLayoutThemeType,
  changeLayoutModeType,
  changeLayoutWidthType,
  changeLayoutPositionType,
  changeTopbarColorType,
  changeLeftSidebarSizeType,
  changeLeftSidebarSizeMain,
  changeLeftSidebarVisibilityType,
  changeLeftSidebarViewType,
  changeLeftSidebarColorType,
  changeLeftSidebarGradientColorType,
  changeLeftSidebarImageType,
  changeLayoutThemePrimaryColorType,
  changePreloader,
} = layoutCustomizerSlice.actions;
export default layoutCustomizerSlice.reducer;
