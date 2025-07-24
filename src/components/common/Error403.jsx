"use client";

import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const Error403 = () => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const { textColor } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );
  const router = useRouter();

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen bg-light-dencity-900 dark:bg-dark-dencity-300 ${textColor} dark:text-light-weight-800 text-center rounded-md p-3`}
    >
      <DotLottieReact
        src="https://lottie.host/4fbe6ad8-9189-423b-81e8-ea469aae6f27/PgwIcakgnC.lottie"
        loop
        autoplay
        className="size-[200px]"
      />
      <h1 className="text-2xl md:text-3xl font-poppins-bold mt-4">
        You are not allowed to enter here
      </h1>
      <h2 className="text-xl font-poppins-bold mt-2">
        Go{" "}
        <button
          onClick={() => router.back()}
          className="text-blue-400 hover:text-blue-600 transition-300"
        >
          Back!
        </button>
      </h2>
    </div>
  );
};

export default Error403;
