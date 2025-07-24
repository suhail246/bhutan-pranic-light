"use client";

import { topbarColor } from "@/app/assets/data/layoutCustomizerData/layoutCustomizerData";
import { globalStyleObj } from "@/app/assets/styles";
import { useErrorToast, useSuccessToast } from "@/lib/hooks";
import { deleteAllCache, getRedisCacheCount } from "@/lib/redis/actions";
import { useAppSelector } from "@/store/hooks";
import { usePathname } from "next/navigation";
import { cache, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const ClearCache = () => {
  const { topbarColorType } = useAppSelector((state) => state.layout);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cacheCount, setCacheCount] = useState(0);
  const pathname = usePathname();

  // TODO Get REDIS DB INFO
  // const getRedisInfo = async () => {
  //   const { status, data } = await getRedisStatsInfo();

  //   if (status) console.log("INFO: ", data);
  // };

  // TODO Get REDIS DB INFO
  // useEffect(() => {
  //   getRedisInfo();
  // }, []);

  // Get Cache Count
  const getCacheCount = cache(async () => {
    const count = await getRedisCacheCount();
    setCacheCount(count);
  });

  // Get Cache Count on Pathname Change
  useEffect(() => {
    getCacheCount();
  }, [pathname]);

  // Handle Clean Cache
  const handleCleanCache = async () => {
    setIsProcessing(true);
    const { cacheStatus, errorMessage } = await deleteAllCache();

    if (cacheStatus) {
      useSuccessToast("Cache deleted successfully.");
      setCacheCount(0);
      window.location.reload();
    } else {
      useErrorToast("An unexpected error occurred during cache deletion.");
    }
    setIsProcessing(false);
  };

  if (isProcessing) {
    return (
      <ClipLoader
        color={topbarColorType === topbarColor.LIGHT_COLOR ? "#9fa1ad" : "#fff"}
        size={16}
      />
    );
  }

  return (
    <button
      onClick={handleCleanCache}
      className={`${topbarColorType === topbarColor.LIGHT_COLOR ? `hover:bg-light-dencity-400 dark:hover:bg-dark-dencity-100` : `hover:bg-[#fff]/5`} rounded-full p-[5px] sm:p-[10px] relative`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
      >
        <path
          id="_74846e5be5db5b666d3893933be03656"
          data-name="74846e5be5db5b666d3893933be03656"
          d="M7.719,8.911H8.9V10.1H7.719v1.185H6.539V10.1H5.36V8.911h1.18V7.726h1.18ZM5.36,13.652h1.18v1.185H5.36v1.185H4.18V14.837H3V13.652H4.18V12.467H5.36Zm13.626-2.763H10.138V10.3a1.182,1.182,0,0,1,1.18-1.185h2.36V2h1.77V9.111h2.36a1.182,1.182,0,0,1,1.18,1.185ZM18.4,18H16.044a9.259,9.259,0,0,0,.582-2.963.59.59,0,1,0-1.18,0A7.69,7.69,0,0,1,14.755,18H12.5a9.259,9.259,0,0,0,.582-2.963.59.59,0,1,0-1.18,0A7.69,7.69,0,0,1,11.216,18H8.958a22.825,22.825,0,0,0,1.163-5.926H18.99A19.124,19.124,0,0,1,18.4,18Z"
          transform="translate(-3 -2)"
          fill="#717580"
        ></path>
      </svg>

      <span
        className={`${globalStyleObj.flexCenter} absolute left-1/2 top-[-8px] rounded-full px-[5px] text-[12px] font-poppins-md text-dark-weight-400 dark:text-light-weight-550 sm:top-[-5px]`}
      >
        {cacheCount}
      </span>
    </button>
  );
};

export default ClearCache;
