import RepeatableWidgetCards from "./admin-pages-component/cms/sections/about-page/RepeatableWidgetCards";
import CommingSoonImage from "./common/CommingSoonImage";
import CommonErrorTemplate from "./common/CommonErrorTemplate";
import CommonRepeatableInputFields from "./common/CommonRepeatableInputFields";
import CommonSelectInputField from "./common/CommonSelectInputField";
import CommonTextAreaField from "./common/CommonTextAreaField";
import CommonTextInputField from "./common/CommonTextInputField";
import CreateNewButton from "./common/CreateNewButton";
import DeletePopup from "./common/DeletePopup";
import Error403 from "./common/Error403";
import ErrorImage from "./common/ErrorImage";
import HandleSessionEnd from "./common/HandleSessionEnd";
import DeleteButton from "./common/ItemDeleteButton";
import LanguageTabs from "./common/LanguageTabs";
import LanguageTabSwitcher from "./common/LanguageTabSwitcher";
import NormalBrowseFileInputFiled from "./common/NormalBrowseFileInputFiled";
import NormalColorInputField from "./common/NormalColorInputField";
import NormalRepeatableInputField from "./common/NormalRepeatableInputField";
import NormalSelectInputFields from "./common/NormalSelectInputFields";
import NormalSwitchInputField from "./common/NormalSwitchInputField";
import NormalTextEditorInputFiled from "./common/NormalTextEditorInputFiled";
import NormalTextInputField from "./common/NormalTextInputField";
import PageLoading from "./common/PageLoading";
import SettingsUpdateButton from "./common/SettingsUpdateButton";
import SubmitButton from "./common/SubmitButton";
import SwitchButton from "./common/ToggleSwitchButton";
import TranslationForm from "./common/TranslationForm";
import TranslationNormalForm from "./common/TranslationNormalForm";
import WordFocus from "./common/WordFocus";
import PageRefresh from "./PageRefresh";
// Repeatable
import RepeatableOneImageInput from "./common/repeatable/RepeatableOneImageInput";
import RepeatableOneInputField from "./common/repeatable/RepeatableOneInputField";
import RepeatableThreeInputsWithImage from "./common/repeatable/RepeatableThreeInputsWithImage";
import RepeatableTwoInputswithImage from "./common/repeatable/RepeatableTwoInputswithImage";
import RepeatableTwoInputsWithTextEditor from "./common/repeatable/RepeatableTwoInputsWithTextEditor";
import RepeatableTwoTextInputFields from "./common/repeatable/RepeatableTwoTextInputFields";
// Auth Forms
import LoginForm from "./forms/LoginForm";
// Inputs
import PasswordInputFiled from "./inputs/PasswordInputFiled";
import TextInputField from "./inputs/TextInputField";
// Footer
import Footer from "./layouts-style/Footer";
// Loading
import LoadingUI from "./layouts-style/LoadingUI";
// Dashboard layout
import AuthProtectedLayoutProvider from "./navigation/AuthProtectedLayoutProvider";
// Horizontal Navigation
import HorizontalSidebar from "./navigation/horizontalNavigationbar/HorizontalSidebar";
// Left Sidebar
import LeftSidebar from "./navigation/leftSidebar/LeftSidebar";
import LeftSidebarSmallIconView from "./navigation/leftSidebar/LeftSidebarSmallIconView";
import LeftTwoColumnSidebar from "./navigation/leftSidebar/LeftTwoColumnSidebar";
import VerticalDefaultLeftSidebarView from "./navigation/leftSidebar/VerticalDefaultLeftSidebarView";
// Right Sidebar
import RightSidebar from "./layouts-style/RightSidebar";
// Admin Pages Navbar
import ClearCache from "./navigation/navbar/admin-pages-navbar/ClearCache";
import HomeButton from "./navigation/navbar/admin-pages-navbar/HomeButton";
import Navbar from "./navigation/navbar/admin-pages-navbar/Navbar";
import NavbarLanguages from "./navigation/navbar/admin-pages-navbar/NavbarLanguages";
import NavbarNotification from "./navigation/navbar/admin-pages-navbar/NavbarNotification";
import NavbarThemeSwitcher from "./navigation/navbar/admin-pages-navbar/NavbarThemeSwitcher";
import NavFullScreenToggleButton from "./navigation/navbar/admin-pages-navbar/NavFullScreenToggleButton";
import NavLogo from "./navigation/navbar/admin-pages-navbar/NavLogo";
import NavProfile from "./navigation/navbar/admin-pages-navbar/NavProfile";
import ToggleButton from "./navigation/navbar/admin-pages-navbar/ToggleButton";
import TransitionLink from "./navigation/TransitionLink";
// Admin Blog System
import CategoryForm from "./admin-pages-component/blogs/categories/CategoryForm";
import CategoryFormDetails from "./admin-pages-component/blogs/categories/CategoryFormDetails";
import RenderAllCategories from "./admin-pages-component/blogs/categories/RenderAllCategories";
import RenderCategoryOptions from "./admin-pages-component/blogs/categories/RenderCategoryOptions";
import AllBlogPostsList from "./admin-pages-component/blogs/posts/AllBlogPostsList";
import CategoriesFilter from "./admin-pages-component/blogs/posts/CategoriesFilter";
import EachPostActions from "./admin-pages-component/blogs/posts/EachPostActions";
import PostFilterDropdown from "./admin-pages-component/blogs/posts/PostFilterDropdown";
import BlogPostForm from "./admin-pages-component/blogs/posts/PostForm";
import PostFormDetails from "./admin-pages-component/blogs/posts/PostFormDetails";
import SVGBannerImage from "./admin-pages-component/blogs/posts/SVGBannerImage";
import LabelText from "./common/LabelText";
import PaginationComponent from "./common/PaginationComponent";
import SearchInputField from "./common/SearchInputField";
// Admin Users
import AdminStaff from "./admin-pages-component/users/AdminStaff";
import DeleteUserButton from "./admin-pages-component/users/DeleteUserButton";
import RoleFilter from "./admin-pages-component/users/RoleFilter";
import PermissionsGroup from "./admin-pages-component/users/roles/PermissionsGroup";
import PermissionSwitch from "./admin-pages-component/users/roles/PermissionSwitch";
import RoleDeleteButton from "./admin-pages-component/users/roles/RoleDeleteButton";
import RoleForm from "./admin-pages-component/users/roles/RoleForm";
import RolesTable from "./admin-pages-component/users/roles/RolesTable";
import UpdateRoleForm from "./admin-pages-component/users/roles/UpdateRoleForm";
import UserForm from "./admin-pages-component/users/UserForm";
import UsersTable from "./admin-pages-component/users/UsersTable";
import UserToggleOptions from "./admin-pages-component/users/UserToggleOptions";
// Admin Languages
import LanguageForm from "./admin-pages-component/languages/LanguageForm";
import LanguageFormFields from "./admin-pages-component/languages/LanguageFormFields";
import RenderAllLanguages from "./admin-pages-component/languages/RenderAllLanguages";
// Admin Menu Managment
import MenuForm from "./admin-pages-component/menu/MenuForm";
import MenuFormDetails from "./admin-pages-component/menu/MenuFormDetails";
import RenderAllMenus from "./admin-pages-component/menu/RenderAllMenus";
// Admin Dashboard Analytics
import AudiencesMetrics from "./admin-pages-component/dashboard-analytics/AudiencesMetrics";
import AudiencesSessionsByCountry from "./admin-pages-component/dashboard-analytics/AudiencesSessionsByCountry";
import CountupText from "./admin-pages-component/dashboard-analytics/CountupText";
import CustomExportButton from "./admin-pages-component/dashboard-analytics/CustomExportButton";
import SessionsByCountries from "./admin-pages-component/dashboard-analytics/SessionsByCountries";
import TopPages from "./admin-pages-component/dashboard-analytics/TopPages";
import TopReferralsPages from "./admin-pages-component/dashboard-analytics/TopReferralsPages";
import UserByDevice from "./admin-pages-component/dashboard-analytics/UserByDevice";
import Widget from "./admin-pages-component/dashboard-analytics/Widget";
import Breadcrumb from "./common/Breadcrumb";
// Admin Dashboard CRM
import BalanceOverview from "./admin-pages-component/dashboard-crm/BalanceOverview";
import ClosingDeals from "./admin-pages-component/dashboard-crm/ClosingDeals";
import DealsStatus from "./admin-pages-component/dashboard-crm/DealsStatus";
import DealType from "./admin-pages-component/dashboard-crm/DealType";
import MyTasks from "./admin-pages-component/dashboard-crm/MyTasks";
import SalesForecast from "./admin-pages-component/dashboard-crm/SalesForecast";
import UpcomingActivites from "./admin-pages-component/dashboard-crm/UpcomingActivites";
// Admin Dashboard Ecommerce
import AddPrdocutsAndSheet from "./admin-pages-component/dashboard-ecommerce/AddPrdocutsAndSheet";
import BestSellingProducts from "./admin-pages-component/dashboard-ecommerce/BestSellingProducts";
import DateRangePicker from "./admin-pages-component/dashboard-ecommerce/DateRangePicker";
import EcommerceWidgets from "./admin-pages-component/dashboard-ecommerce/EcommerceWidgets";
import ProgressBar from "./admin-pages-component/dashboard-ecommerce/ProgressBar";
import RecentOrders from "./admin-pages-component/dashboard-ecommerce/RecentOrders";
import RecentOrdersOrderId from "./admin-pages-component/dashboard-ecommerce/RecentOrdersOrderId";
import Revenue from "./admin-pages-component/dashboard-ecommerce/Revenue";
import SalesByLocations from "./admin-pages-component/dashboard-ecommerce/SalesByLocations";
import StoreVisits from "./admin-pages-component/dashboard-ecommerce/StoreVisits";
import TopSellers from "./admin-pages-component/dashboard-ecommerce/TopSellers";
// Admin Uppy Uploader
import DefaultSwitch from "./admin-pages-component/uppy-uploader/DefaultSwitch";
import DownloadFile from "./admin-pages-component/uppy-uploader/DownloadFile";
import EmptyCard from "./admin-pages-component/uppy-uploader/EmptyCard";
import FileGallery from "./admin-pages-component/uppy-uploader/FileGallery";
import FileItemWrapper from "./admin-pages-component/uppy-uploader/FileItemWrapper";
import FileTypeFilterDropdown from "./admin-pages-component/uppy-uploader/FileTypeFilterDropdown";
import ImageDetailedPreview from "./admin-pages-component/uppy-uploader/ImageDetailedPreview";
import ImagePreview from "./admin-pages-component/uppy-uploader/ImagePreview";
import OverlayButtons from "./admin-pages-component/uppy-uploader/OverlayButtons";
import PillTooltip from "./admin-pages-component/uppy-uploader/PillTooltip";
import SearchByFileName from "./admin-pages-component/uppy-uploader/SearchByFileName";
import UppyUploader from "./admin-pages-component/uppy-uploader/UppyUploader";
import VideoPreview from "./admin-pages-component/uppy-uploader/VideoPreview";
// Reuse File
import FileDialogContent from "./admin-pages-component/file-reuse-component/FileDialogContent";
import FileDialogInner from "./admin-pages-component/file-reuse-component/FileDialogInner";
import FileReuseDialog from "./admin-pages-component/file-reuse-component/FileReuseDialog";
// Website Settings - (General)
import CookiesAggrentSettings from "./admin-pages-component/website-settings/general-settings/CookiesAggrentSettings";
import GeneralColorSettings from "./admin-pages-component/website-settings/general-settings/GeneralColorSettings";
import GlobalSEOSettings from "./admin-pages-component/website-settings/general-settings/GlobalSEOSettings";
import HeaderSettings from "./admin-pages-component/website-settings/general-settings/HeaderSettings";
import SystemGeneralSettings from "./admin-pages-component/website-settings/general-settings/SystemGeneralSettings";
import WebsiteAppearanceSettings from "./admin-pages-component/website-settings/general-settings/WebsiteAppearance";
import WebsitePopupSettings from "./admin-pages-component/website-settings/general-settings/WebsitePopupSettings";
// Website Settings - (Footer)
import CopyWriteWidget from "./admin-pages-component/website-settings/footer-settings/CopyWriteWidget";
import FooterAboutWidget from "./admin-pages-component/website-settings/footer-settings/FooterAboutWidget";
import FooterInfoWidget from "./admin-pages-component/website-settings/footer-settings/FooterInfoWidget";
import FooterSettings from "./admin-pages-component/website-settings/footer-settings/FooterSettings";
import LinkWidgetOne from "./admin-pages-component/website-settings/footer-settings/LinkWidgetOne";
import LinkWidgetThree from "./admin-pages-component/website-settings/footer-settings/LinkWidgetThree";
import LinkWidgetTwo from "./admin-pages-component/website-settings/footer-settings/LinkWidgetTwo";
import OpeningSchedule from "./admin-pages-component/website-settings/footer-settings/OpeningSchedule";
import SocialLinksWidget from "./admin-pages-component/website-settings/footer-settings/SocialLinksWidget";
// Contact Hub
import AllContactList from "./admin-pages-component/contacts/AllContactList";
import AllContactQueryList from "./admin-pages-component/contacts/AllContactQueryList";
import ContactForm from "./admin-pages-component/contacts/ContactForm";
import ContactFormDetails from "./admin-pages-component/contacts/ContactFormDetails";
// Testimonial
import TestimonialForm from "./admin-pages-component/testimonial/TestimonialForm";
import TestimonialFormDetails from "./admin-pages-component/testimonial/TestimonialFormDetails";
import TestimonialLists from "./admin-pages-component/testimonial/TestimonialLists";
// Career
import CareerForm from "./admin-pages-component/career/CareerForm";
import CareerFormDetails from "./admin-pages-component/career/CareerFormDetails";
import CareerLists from "./admin-pages-component/career/CareerLists";
// Profile
import AdminUserInfoForm from "./admin-pages-component/profile/AdminUserInfoForm";
// CMS
import CMSAllPagesLisitng from "./admin-pages-component/cms/CMSAllPagesLisitng";
import CMSPageForm from "./admin-pages-component/cms/CMSPageForm";
import CMSPageFormDetails from "./admin-pages-component/cms/CMSPageFormDetails";
import EachCMSPageActions from "./admin-pages-component/cms/EachCMSPageActions";
// CMS Sections::
import GetInTouchFiledSection from "./admin-pages-component/cms/sections/GetInTouchFiledSection";
import MainSectionForm from "./admin-pages-component/cms/sections/MainSectionForm";
import TabNavigation from "./admin-pages-component/cms/sections/TabNavigation";
// CMS Home Section
import HomeAboutUsSectionFormField from "./admin-pages-component/cms/sections/home/HomeAboutUsSectionFormField";
import HomeBannerSectionFormFields from "./admin-pages-component/cms/sections/home/HomeBannerSectionFormFields";
import HomeCoursesSectionFormField from "./admin-pages-component/cms/sections/home/HomeCoursesSectionFormField";
import HomeInfoSectionFormField from "./admin-pages-component/cms/sections/home/HomeInfoSectionFormField";
import HomeNewsSectionFormField from "./admin-pages-component/cms/sections/home/HomeNewsSectionFormField";
import HomePageCMSForm from "./admin-pages-component/cms/sections/home/HomePageCMSForm";
import HomePricingSectionFormField from "./admin-pages-component/cms/sections/home/HomePricingSectionFormField";
import HomeTestimonialSectionFormField from "./admin-pages-component/cms/sections/home/HomeTestimonialSectionFormField";
// CMS About Page Section
import AboutPageCMSForm from "./admin-pages-component/cms/sections/about-page/AboutPageCMSForm";
import AboutSectionFormFields from "./admin-pages-component/cms/sections/about-page/AboutSectionFormFields";
import BannerSectionFormFields from "./admin-pages-component/cms/sections/about-page/BannerSectionFormFields";
import MessageSectionFormFields from "./admin-pages-component/cms/sections/about-page/MessageSectionFormFields";
import WhyChooseUsSectionFormFields from "./admin-pages-component/cms/sections/about-page/WhyChooseUsSectionFormFields";
// CMS News & Blogs Section
import NewsAndBlogsCMSForm from "./admin-pages-component/cms/sections/news-blogs/NewsAndBlogsCMSForm";
import NewsAndBlogsHeroSection from "./admin-pages-component/cms/sections/news-blogs/NewsAndBlogsHeroSection";
import NewsAndBlogsListingSection from "./admin-pages-component/cms/sections/news-blogs/NewsAndBlogsListingSection";
// CMS Careers Section
import CareersCMSForm from "./admin-pages-component/cms/sections/careers/CareersCMSForm";
import CareersHeroSection from "./admin-pages-component/cms/sections/careers/CareersHeroSection";
// CMS Contact Us Section
import ContactUsCMSForm from "./admin-pages-component/cms/sections/contact-us/ContactUsCMSForm";
import ContactUsHeroSection from "./admin-pages-component/cms/sections/contact-us/ContactUsHeroSection";
// CMS Offers Section
import OffersBannerSectionFormFields from "./admin-pages-component/cms/sections/offers/OffersBannerSectionFormFields";
import OffersCMSForm from "./admin-pages-component/cms/sections/offers/OffersCMSForm";
import OffersInfoSectionFormFields from "./admin-pages-component/cms/sections/offers/OffersInfoSectionFormFields";
// CMS Courses Section
import CoursesCMSForm from "./admin-pages-component/cms/sections/courses/CoursesCMSForm";
import CoursesHeroSection from "./admin-pages-component/cms/sections/courses/CoursesHeroSection";
// Courses
import AllCoursesList from "./admin-pages-component/courses/AllCoursesList";
import CourseCategoryConditionFormSection from "./admin-pages-component/courses/CourseCategoryConditionFormSection";
import CourseFAQsFormSection from "./admin-pages-component/courses/CourseFAQsFormSection";
import CourseForm from "./admin-pages-component/courses/CourseForm";
import CourseGalaryFormSection from "./admin-pages-component/courses/CourseGalaryFormSection";
import CourseInfoFormSection from "./admin-pages-component/courses/CourseInfoFormSection";
import CourseMetaFormSection from "./admin-pages-component/courses/CourseMetaFormSection";
import CourseOptionsFormSection from "./admin-pages-component/courses/CourseOptionsFormSection";
import CoursePackagesFormSection from "./admin-pages-component/courses/CoursePackagesFormSection";
import CourseRegistrationFormSection from "./admin-pages-component/courses/CourseRegistrationFormSection";
import CourseTrainingFormSection from "./admin-pages-component/courses/CourseTrainingFormSection";
import EachCourseActions from "./admin-pages-component/courses/EachCourseActions";
// Course Packages
import AllCoursePackagesList from "./admin-pages-component/courses/packages/AllCoursePackagesList";
import CoursePackageForm from "./admin-pages-component/courses/packages/CoursePackageForm";
import CoursePackageFormFields from "./admin-pages-component/courses/packages/CoursePackageFormFields";
import CoursesFilter from "./admin-pages-component/courses/packages/CoursesFilter";
import EachPackageActions from "./admin-pages-component/courses/packages/EachPackageActions";

export {
  AboutPageCMSForm,
  AboutSectionFormFields,
  AddPrdocutsAndSheet,
  AdminStaff,
  AdminUserInfoForm,
  AllBlogPostsList,
  AllContactList,
  AllContactQueryList,
  AllCoursePackagesList,
  AllCoursesList,
  AudiencesMetrics,
  AudiencesSessionsByCountry,
  AuthProtectedLayoutProvider,
  BalanceOverview,
  BannerSectionFormFields,
  BestSellingProducts,
  BlogPostForm,
  Breadcrumb,
  CareerForm,
  CareerFormDetails,
  CareerLists,
  CareersCMSForm,
  CareersHeroSection,
  CategoriesFilter,
  CategoryForm,
  CategoryFormDetails,
  ClearCache,
  ClosingDeals,
  CMSAllPagesLisitng,
  CMSPageForm,
  CMSPageFormDetails,
  CommingSoonImage,
  CommonErrorTemplate,
  CommonRepeatableInputFields,
  CommonSelectInputField,
  CommonTextAreaField,
  CommonTextInputField,
  ContactForm,
  ContactFormDetails,
  ContactUsCMSForm,
  ContactUsHeroSection,
  CookiesAggrentSettings,
  CopyWriteWidget,
  CountupText,
  CourseCategoryConditionFormSection,
  CourseFAQsFormSection,
  CourseForm,
  CourseGalaryFormSection,
  CourseInfoFormSection,
  CourseMetaFormSection,
  CourseOptionsFormSection,
  CoursePackageForm,
  CoursePackageFormFields,
  CoursePackagesFormSection,
  CourseRegistrationFormSection,
  CoursesCMSForm,
  CoursesFilter,
  CoursesHeroSection,
  CourseTrainingFormSection,
  CreateNewButton,
  CustomExportButton,
  DateRangePicker,
  DealsStatus,
  DealType,
  DefaultSwitch,
  DeleteButton,
  DeletePopup,
  DeleteUserButton,
  DownloadFile,
  EachCMSPageActions,
  EachCourseActions,
  EachPackageActions,
  EachPostActions,
  EcommerceWidgets,
  EmptyCard,
  Error403,
  ErrorImage,
  FileDialogContent,
  FileDialogInner,
  FileGallery,
  FileItemWrapper,
  FileReuseDialog,
  FileTypeFilterDropdown,
  Footer,
  FooterAboutWidget,
  FooterInfoWidget,
  FooterSettings,
  GeneralColorSettings,
  GetInTouchFiledSection,
  GlobalSEOSettings,
  HandleSessionEnd,
  HeaderSettings,
  HomeAboutUsSectionFormField,
  HomeBannerSectionFormFields,
  HomeButton,
  HomeCoursesSectionFormField,
  HomeInfoSectionFormField,
  HomeNewsSectionFormField,
  HomePageCMSForm,
  HomePricingSectionFormField,
  HomeTestimonialSectionFormField,
  HorizontalSidebar,
  ImageDetailedPreview,
  ImagePreview,
  LabelText,
  LanguageForm,
  LanguageFormFields,
  LanguageTabs,
  LanguageTabSwitcher,
  LeftSidebar,
  LeftSidebarSmallIconView,
  LeftTwoColumnSidebar,
  LinkWidgetOne,
  LinkWidgetThree,
  LinkWidgetTwo,
  LoadingUI,
  LoginForm,
  MainSectionForm,
  MenuForm,
  MenuFormDetails,
  MessageSectionFormFields,
  MyTasks,
  Navbar,
  NavbarLanguages,
  NavbarNotification,
  NavbarThemeSwitcher,
  NavFullScreenToggleButton,
  NavLogo,
  NavProfile,
  NewsAndBlogsCMSForm,
  NewsAndBlogsHeroSection,
  NewsAndBlogsListingSection,
  NormalBrowseFileInputFiled,
  NormalColorInputField,
  NormalRepeatableInputField,
  NormalSelectInputFields,
  NormalSwitchInputField,
  NormalTextEditorInputFiled,
  NormalTextInputField,
  OffersBannerSectionFormFields,
  OffersCMSForm,
  OffersInfoSectionFormFields,
  OpeningSchedule,
  OverlayButtons,
  PageLoading,
  PageRefresh,
  PaginationComponent,
  PasswordInputFiled,
  PermissionsGroup,
  PermissionSwitch,
  PillTooltip,
  PostFilterDropdown,
  PostFormDetails,
  ProgressBar,
  RecentOrders,
  RecentOrdersOrderId,
  RenderAllCategories,
  RenderAllLanguages,
  RenderAllMenus,
  RenderCategoryOptions,
  RepeatableOneImageInput,
  RepeatableOneInputField,
  RepeatableThreeInputsWithImage,
  RepeatableTwoInputswithImage,
  RepeatableTwoInputsWithTextEditor,
  RepeatableTwoTextInputFields,
  RepeatableWidgetCards,
  Revenue,
  RightSidebar,
  RoleDeleteButton,
  RoleFilter,
  RoleForm,
  RolesTable,
  SalesByLocations,
  SalesForecast,
  SearchByFileName,
  SearchInputField,
  SessionsByCountries,
  SettingsUpdateButton,
  SocialLinksWidget,
  StoreVisits,
  SubmitButton,
  SVGBannerImage,
  SwitchButton,
  SystemGeneralSettings,
  TabNavigation,
  TestimonialForm,
  TestimonialFormDetails,
  TestimonialLists,
  TextInputField,
  ToggleButton,
  TopPages,
  TopReferralsPages,
  TopSellers,
  TransitionLink,
  TranslationForm,
  TranslationNormalForm,
  UpcomingActivites,
  UpdateRoleForm,
  UppyUploader,
  UserByDevice,
  UserForm,
  UsersTable,
  UserToggleOptions,
  VerticalDefaultLeftSidebarView,
  VideoPreview,
  WebsiteAppearanceSettings,
  WebsitePopupSettings,
  WhyChooseUsSectionFormFields,
  Widget,
  WordFocus,
};
