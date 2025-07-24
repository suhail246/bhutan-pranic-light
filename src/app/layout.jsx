import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import localFont from "next/font/local";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "./clientToastContainer.js";
import "./globals.css";
import StoreProvider from "./StoreProvider.jsx";

import {
  getAllPublicFiles,
  getAllPublicLanguages,
  getAllPublicWebsiteSettings,
} from "@/actions/frontEndActions/action.js";
import AuthProvider from "@/context/AuthProvider.jsx";
import { getLanguageFromCookie } from "@/utils/lanugage-action-utils.js";
import {
  getFESettingsFieldValues,
  getFileSettingsValue,
} from "@/utils/website-settings-helper.js";
import { Toaster } from "sonner";

// ✅ **Async function to fetch metadata from Website Settings**
export const generateMetadata = async () => {
  try {
    const [websiteSettingsResponse, fielsResponse] = await Promise.all([
      getAllPublicWebsiteSettings(),
      getAllPublicFiles(),
    ]);

    const { meta_title, meta_description, meta_keywords, meta_image } =
      getFESettingsFieldValues(websiteSettingsResponse?.settingsData ?? [], [
        "meta_title",
        "meta_description",
        "meta_keywords",
        "meta_image",
      ]);

    const metaImage =
      getFileSettingsValue(fielsResponse?.filesList ?? [], meta_image)
        ?.fileUrl ?? null;

    return {
      title: meta_title,
      description: meta_description,
      keywords: meta_keywords,
      icons: { icon: metaImage },
    };
  } catch (error) {
    console.log(`❌ Error in generating metadata: ${error}`);

    return {
      title: process.env.NEXT_PUBLIC_DEFAULT_META_APP_NAME || "Default Title",
      description:
        process.env.NEXT_PUBLIC_DEFAULT_META_APP_DESCRIPTION ||
        "Default Description",
      keywords: "default, app, nextjs",
      icons: { icon: "/bin-yaber-assets/favicon/512_522.png" },
    };
  }
};

const poppinsELi = localFont({
  src: "./assets/fonts/poppinsELi.ttf",
  variable: "--font-poppins--extra-light",
  weight: "200",
});

const poppinsLi = localFont({
  src: "./assets/fonts/poppinsLi.ttf",
  variable: "--font-poppins-light",
  weight: "300",
});

const poppinsRg = localFont({
  src: "./assets/fonts/poppinsRg.ttf",
  variable: "--font-poppins-rg",
  weight: "400",
});

const poppinsMd = localFont({
  src: "./assets/fonts/poppinsMd.ttf",
  variable: "--font-poppins-md",
  weight: "500",
});

const poppinsSb = localFont({
  src: "./assets/fonts/poppinsSb.ttf",
  variable: "--font-poppins-sb",
  weight: "600",
});

const poppinsBo = localFont({
  src: "./assets/fonts/poppinsBo.ttf",
  variable: "--font-poppins-bold",
  weight: "700",
});

const poppinsBl = localFont({
  src: "./assets/fonts/poppinsBl.ttf",
  variable: "--font-poppins-black",
  weight: "900",
});

// Bhutan pranic FE
const figtree = localFont({
  src: "./assets/fonts/figtreeVF.ttf",
  variable: "--font-figtree",
});

const grotesk = localFont({
  src: "./assets/fonts/hkGroteskVF.ttf",
  variable: "--font-grotesk",
});
const spaceGrotesk = localFont({
  src: "./assets/fonts/SpaceGrotesk-VariableFont_wght.ttf",
  variable: "--font-space-grotesk",
});
const RootLayout = async ({ children }) => {
  // Providing all messages to the client side is the easiest way to get started
  const locale = await getLocale();
  const messages = await getMessages();

  // Current Language
  const currentLanguage = await getLanguageFromCookie();

  const { fetchData } = await getAllPublicLanguages();

  const currentlangRTLStatus =
    (fetchData.length > 0 ? fetchData : []).find(
      (lang) => lang.code === currentLanguage
    )?.rtl ?? false;

  return (
    <html lang={locale} dir={currentlangRTLStatus ? "rtl" : "ltr"}>
      <body
        className={`${poppinsRg.variable} ${poppinsMd.variable} ${poppinsBl.variable} ${poppinsBo.variable} ${poppinsLi.variable} ${poppinsELi.variable} ${poppinsSb.variable} ${figtree.variable} ${grotesk.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <AuthProvider>
          <StoreProvider>
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </StoreProvider>

          <Toaster richColors />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
