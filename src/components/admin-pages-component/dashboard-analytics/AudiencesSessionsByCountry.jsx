"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { MdKeyboardArrowDown } from "react-icons/md";

import { audienceSessionsByCountryData } from "@/app/assets/data/pagesData/dashboardData/analytics";
import { globalStyleObj } from "@/app/assets/styles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AudiencesSessionsByCountry = () => {
  const [timeLine, setTimeLine] = useState("Today");

  const [seriesState, setSeriesState] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    const seriesData = audienceSessionsByCountryData.find(
      (data) => data.id === timeLine
    );
    setSeriesState(seriesData.series);
  }, [timeLine]);

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      heatmap: {
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 50,
              color: "#008FFB",
            },
            {
              from: 51,
              to: 100,
              color: "#00E396",
            },
          ],
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      horizontalAlign: "center",
      offsetX: 0,
      offsetY: 20,
      markers: {
        width: 20,
        height: 6,
        radius: 2,
      },
      itemMargin: {
        horizontal: 12,
        vertical: 0,
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
        backgroundColor: "red",
      },
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const seriesName = w.globals.seriesNames[seriesIndex];
        const value = series[seriesIndex][dataPointIndex];

        return `<div style="background-color: ${
          theme === "dark" ? "#292E32" : "#FFFFFF"
        }; color: ${theme === "dark" ? "#f3f3f3" : "#495057"}; padding: 10px;">
         <strong>${seriesName}</strong>: ${value}
       </div>`;
      },
    },
  };

  return (
    <>
      <div
        className={`${globalStyleObj.flexBetween} border-b p-3 dark:border-b-zinc-700`}
      >
        <h4
          className={`${globalStyleObj.text16Light550Dark550} tracking-normal`}
        >
          Audiences Sessions by Country
        </h4>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button type="button" className={`flex items-center gap-1`}>
              <span className="font-poppins-rg text-[13px] text-light-weight-400">
                <strong className="text-dark-weight-500 dark:text-light-weight-550">
                  SORT BY:{" "}
                </strong>{" "}
                {timeLine}
              </span>
              <MdKeyboardArrowDown className="text-light-weight-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className={`w-[150px] bg-light-dencity-900 p-0 py-2 dark:bg-dark-dencity-200`}
          >
            {["Today", "LastWeek", "LastMonth", "CurrentYear"].map((item) => (
              <DropdownMenuItem
                key={item}
                value={item}
                onSelect={() => setTimeLine(item)}
                className={`font-poppins-rg text-[13px] tracking-wide text-dark-weight-550 dark:text-light-weight-450 ${
                  timeLine === item
                    ? "bg-[#f3f3f3]/90 dark:bg-[#f3f3f3]/10"
                    : ""
                }`}
              >
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="w-full max-w-full">
        <ReactApexChart
          options={options}
          series={seriesState.length ? seriesState : []}
          type="heatmap"
          height={450}
        />
      </div>
    </>
  );
};

export default AudiencesSessionsByCountry;
