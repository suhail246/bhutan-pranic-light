import { VectorMap } from "@south-paw/react-vector-maps";
import Image from "next/image";
import { FaArrowUp, FaRegClock } from "react-icons/fa";
import { FiActivity, FiAlertTriangle, FiExternalLink } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import { RiArrowRightLine } from "react-icons/ri";

import illustrator from "../../../../../../assets/images/illustrator-1.png";
import illustaratorImg from "../../../../../../assets/images/user-illustarator-2.png";
import world from "../../../../../../assets/jsonData/world.svg.json";

import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";
import {
  AudiencesMetrics,
  AudiencesSessionsByCountry,
  Breadcrumb,
  CustomExportButton,
  SessionsByCountries,
  TopPages,
  TopReferralsPages,
  TransitionLink,
  UserByDevice,
  Widget,
} from "@/components";
import ROUTES from "@/constants/routes";

export const metadata = {
  title: titlesObject.analytics.title,
};

const DashboardAnalytics = () => {
  return (
    <div className={`min-h-full`}>
      <Breadcrumb currentTab="Analytics" mainParentTab="Dashboards" />
      <div className={`mt-[40px] flex flex-col gap-5 2xl:flex-row`}>
        <div className="flex flex-col gap-5 2xl:w-2/5">
          <div
            className={`${globalStyleObj.backgroundLight900Dark300} overflow-hidden rounded-sm shadow-light`}
          >
            <div
              className={`${globalStyleObj.flexBetween} gap-2 bg-[#FEF4E4] p-3 dark:bg-[#413A2E]`}
            >
              <div className={`${globalStyleObj.flexStart} gap-2`}>
                <FiAlertTriangle color={"#F9A741"} size={13} />
                <h5 className="font-poppins-rg text-[13px] text-[#F9A741]">
                  Your free trial expired in{" "}
                  <span className="font-poppins-sb">17</span> days.
                </h5>
              </div>

              <TransitionLink
                href={`${ROUTES.PAGES_PRICING}`}
                className="font-poppins-sb text-[13px] tracking-wide text-[#F9A741] underline"
              >
                Upgrade
              </TransitionLink>
            </div>

            <div
              className={`flex flex-col gap-2 px-3 sm:flex-row sm:items-end sm:justify-between`}
            >
              <div className="py-3">
                <div
                  className={`flex flex-col gap-2 sm:flex-row sm:items-center`}
                >
                  <p
                    className={`font-poppins-rg text-[16px] text-dark-weight-600 dark:text-light-weight-550`}
                  >
                    Upgrade your plan from a{" "}
                    <span className="font-poppins-sb">Free trial</span>, to
                    ‘Premium Plan’
                  </p>
                  <RiArrowRightLine size={16} />
                </div>
                <TransitionLink href={`${ROUTES.PAGES_PRICING}`}>
                  <button
                    type="button"
                    className="mt-5 rounded-[4px] bg-custom-green-400 p-2 font-poppins-rg text-[13px] tracking-wide text-white hover:bg-custom-green-500"
                  >
                    Upgrade Account!
                  </button>
                </TransitionLink>
              </div>
              <Image
                src={illustaratorImg}
                alt="illustarator"
                width={250}
                height={100}
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-5 md:flex-row md:justify-between">
            <div
              className={`${globalStyleObj.backgroundLight900Dark300} transition-300 flex w-full justify-between rounded-sm px-3 py-4 shadow-light hover:translate-y-[-4px] hover:shadow-lg md:w-[49%]`}
            >
              <Widget
                title="Users"
                number="28.10"
                status="up"
                percentage="16.24"
                suffix="k"
                prefix=""
                decimals={2}
                icon={<LuUsers color={"#2998D5"} size={22} />}
              />
            </div>

            <div
              className={`${globalStyleObj.backgroundLight900Dark300} transition-300 flex w-full justify-between rounded-sm px-3 py-4 shadow-light hover:translate-y-[-4px] hover:shadow-lg md:w-[49%]`}
            >
              <Widget
                title="Sessions"
                number="97.66"
                status="down"
                percentage="3.96"
                suffix="k"
                prefix=""
                decimals={2}
                icon={<FiActivity color={"#2998D5"} size={22} />}
              />
            </div>
          </div>

          <div className="flex flex-col gap-5 md:flex-row md:justify-between">
            <div
              className={`${globalStyleObj.backgroundLight900Dark300} transition-300 flex w-full justify-between rounded-sm px-3 py-4 shadow-light hover:translate-y-[-4px] hover:shadow-lg md:w-[49%]`}
            >
              <Widget
                title="Avg. Visit Duration"
                number="3"
                secondNumber="40"
                status="down"
                percentage="0.24"
                suffix="m"
                prefix=""
                decimals={0}
                secondPrefix="sec"
                icon={<FaRegClock color={"#2998D5"} size={22} />}
              />
            </div>

            <div
              className={`${globalStyleObj.backgroundLight900Dark300} transition-300 flex w-full justify-between rounded-sm px-3 py-4 shadow-light hover:translate-y-[-4px] hover:shadow-lg md:w-[49%]`}
            >
              <Widget
                title="Bounce Rate"
                number="33.48"
                status="up"
                percentage="7.05"
                suffix="%"
                prefix=""
                decimals={2}
                icon={<FiExternalLink color={"#2998D5"} size={22} />}
              />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-5 xl:flex-row 2xl:w-3/5">
          <div
            className={`${globalStyleObj.backgroundLight900Dark300} flex w-full flex-col justify-between rounded-sm shadow-light xl:w-[49%]`}
          >
            <div
              className={`${globalStyleObj.flexBetween} border-b p-3 dark:border-b-zinc-700`}
            >
              <h4
                className={`${globalStyleObj.text16Light550Dark550} tracking-normal`}
              >
                Live Users by Country
              </h4>
              <CustomExportButton />
            </div>

            <div className="p-3">
              <VectorMap
                {...world}
                className="mx-auto max-w-[360px] fill-slate-300 dark:fill-zinc-700"
              />
            </div>

            <div className="pb-3">
              <table className="w-full">
                <thead className="border border-dashed border-[#000]/10 bg-[#000]/5 font-poppins-rg text-[13px] text-dark-weight-300 dark:border-[#f3f3f3]/5 dark:bg-[#f3f3f3]/5">
                  <tr>
                    <th className="py-2 pl-3 text-start">Duration (Secs)</th>
                    <th className="w-[30%] py-2 text-start">Sessions</th>
                    <th className="w-[30%] py-2 text-start">Views</th>
                  </tr>
                </thead>
                <tbody className="font-poppins-rg text-[13px] tracking-wide text-dark-weight-600 dark:text-light-weight-450">
                  <tr>
                    <td className="py-1 pl-3">0-30</td>
                    <td className="py-1">2,250</td>
                    <td className="py-1">4,250</td>
                  </tr>
                  <tr>
                    <td className="py-1 pl-3">31-60</td>
                    <td className="py-1">1,501</td>
                    <td className="py-1">2,050</td>
                  </tr>
                  <tr>
                    <td className="py-1 pl-3">61-120</td>
                    <td className="py-1">750</td>
                    <td className="py-1">1,600</td>
                  </tr>
                  <tr>
                    <td className="pl-3 pt-1">121-240</td>
                    <td className="pt-1">540</td>
                    <td className="pt-1">1,040</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div
            className={`${globalStyleObj.backgroundLight900Dark300} flex w-full flex-col justify-between rounded-sm shadow-light xl:w-[49%]`}
          >
            <SessionsByCountries />
          </div>
        </div>
      </div>

      <div className="mt-5 flex w-full flex-col gap-5 xl:flex-row xl:justify-between">
        <div
          className={`${globalStyleObj.backgroundLight900Dark300} rounded-sm shadow-light xl:w-[49%]`}
        >
          <AudiencesMetrics />
        </div>

        <div
          className={`${globalStyleObj.backgroundLight900Dark300} flex flex-col justify-between rounded-sm shadow-light xl:w-[49%]`}
        >
          <AudiencesSessionsByCountry />
        </div>
      </div>

      <div className="mt-5 flex w-full flex-col gap-5 xl:flex-row xl:justify-between">
        <div
          className={`${globalStyleObj.backgroundLight900Dark300} w-full rounded-sm shadow-light xl:w-[33%]`}
        >
          <UserByDevice />
        </div>

        <div className={`flex w-full flex-col gap-5 md:flex-row xl:w-[66%]`}>
          <div
            className={`${globalStyleObj.backgroundLight900Dark300} w-full rounded-sm shadow-light`}
          >
            <div
              className={`${globalStyleObj.flexBetween} border-b p-3 dark:border-b-zinc-700`}
            >
              <h4
                className={`${globalStyleObj.text16Light550Dark550} tracking-normal`}
              >
                Top Referrals Pages
              </h4>
              <CustomExportButton />
            </div>

            <div className="mt-2 flex justify-between gap-2 p-3 font-poppins-rg text-[13px] text-light-weight-400">
              <div>
                <h6 className="mb-1 uppercase">
                  <strong>Total Referrals Page</strong>
                </h6>
                <h4 className="mb-1 font-poppins-md text-[20px] text-dark-weight-550 dark:text-light-weight-550">
                  725,800
                </h4>
                <p className="flex flex-wrap items-center">
                  <span
                    className={`flex items-center gap-1 rounded-sm bg-[#F3F6F9] p-px px-[4px] font-poppins-md text-[11px] text-[#0AB39C] dark:bg-[#fff]/5`}
                  >
                    <FaArrowUp />
                    15.72%
                  </span>
                  vs. previous month
                </p>
              </div>

              <div className="w-[120px] text-center">
                <Image
                  src={illustrator}
                  style={{ width: "auto", height: "auto" }}
                  alt="illustrator image"
                />
              </div>
            </div>
            <TopReferralsPages />
          </div>

          <div
            className={`${globalStyleObj.backgroundLight900Dark300} w-full rounded-sm shadow-light`}
          >
            <TopPages />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytics;
