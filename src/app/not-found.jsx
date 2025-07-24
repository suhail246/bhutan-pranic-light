import Link from "next/link";
import { MdCopyright, MdHome } from "react-icons/md";

import ROUTES from "@/constants/routes";
import { ErrorImage } from "../components";
import { titlesObject } from "./assets/data/titlesData/titles";
import { globalStyleObj } from "./assets/styles";

export const metadata = {
  title: titlesObject.error404.title,
};

const NotFoundPage = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#F3F3F9]">
      {/* Banner Section */}
      <div className="relative min-h-[50vh] bg-auth-hero-pattern bg-cover bg-center sm:min-h-[58vh]">
        <div className="absolute inset-0 w-full bg-black-500/60 px-2"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1440 120"
          className="absolute inset-x-0 bottom-0 z-10"
        >
          <path
            d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"
            fill="#F3F3F9"
          ></path>
        </svg>
      </div>
      {/* Error Description Section */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center px-2 py-8 sm:px-5">
        {/* Error Message */}
        <div className="flex flex-col items-center">
          <h1 className="mb-5 font-poppins-md text-5xl font-semibold text-[#212529] sm:text-7xl">
            404
          </h1>
          <h3 className="mb-3 font-poppins-md text-[23px] text-[#212529] sm:text-[28px]">
            Sorry, Page not Found 😭
          </h3>
          <p className="mb-6 font-poppins-rg text-[14px] text-[#878A99] sm:text-[16px]">
            The page you are looking for not available!
          </p>
          <Link href={ROUTES.HOME}>
            <span className={`${globalStyleObj.authButton} gap-2`}>
              <MdHome />
              <span>Back to home</span>
            </span>
          </Link>
        </div>
        <p className="text-soft mt-3 flex items-center justify-center gap-1 text-[13px] sm:text-[16px]">
          <MdCopyright />
          <span>2025 Bin Yaber Driving.</span>
        </p>
      </div>
      {/* Error SVG */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[999]">
        <ErrorImage />
      </div>
    </div>
  );
};

export default NotFoundPage;
