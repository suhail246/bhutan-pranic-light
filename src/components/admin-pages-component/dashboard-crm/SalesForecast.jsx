"use client";

import { useEffect, useMemo, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { salesForecastData } from "@/app/assets/data/pagesData/dashboardData/crm";
import { globalStyleObj } from "@/app/assets/styles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";

const SalesForecast = () => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const [timeLine, setTimeLine] = useState("Nov 2021");
  const [selectedSalesForecastData, setSelectedSalesForecastData] = useState(
    salesForecastData[1].series
  );

  const { hexCode } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  useEffect(() => {
    const data = salesForecastData.find((data) => data.value === timeLine);
    setSelectedSalesForecastData(data.series);
  }, [timeLine]);

  return (
    <>
      <div
        className={`${globalStyleObj.flexBetween} border-b p-3 dark:border-b-zinc-700`}
      >
        <h4
          className={`${globalStyleObj.text16Light550Dark550} tracking-normal`}
        >
          Sales Forecast
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
            {["Oct 2021", "Nov 2021", "Dec 2021", "Jan 2022"].map((month) => (
              <DropdownMenuItem
                key={month}
                onSelect={() => setTimeLine(month)}
                className={`font-poppins-rg text-[13px] tracking-wide text-dark-weight-550 dark:text-light-weight-450 ${
                  timeLine === month
                    ? "bg-[#f3f3f3]/90 dark:bg-[#f3f3f3]/10"
                    : ""
                }`}
              >
                {month}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="relative h-[400px] w-full max-w-full">
        {/* Responsive Container */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={selectedSalesForecastData}
            margin={{
              top: 30,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              axisLine={false}
              tickLine={false}
              tick={false}
              label={{
                value: "Total Forecasted Value",
              }}
              className="font-poppins-rg text-[13px] text-light-weight-400"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => {
                return "$" + value + "k";
              }}
              className="font-poppins-rg text-[12px] text-light-weight-400"
            />
            <Tooltip
              cursor={false}
              content={({ payload }) => {
                if (payload && payload.length) {
                  return (
                    <div
                      className={`flex items-center gap-2 rounded-md ${globalStyleObj.backgroundLight900Dark200} border p-2 font-poppins-rg text-[13px] text-dark-weight-550 dark:border-[#fff]/10 dark:text-light-weight-450`}
                    >
                      <span
                        className={`size-[10px] rounded-full`}
                        style={{
                          backgroundColor: payload[0].payload.fill
                            ? payload[0].payload.fill
                            : hexCode,
                        }}
                      ></span>
                      <p>
                        {`${payload[0].payload.name}: `}{" "}
                        <strong>${payload[0].value}k</strong>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              content={function LegendContent({ payload }) {
                return (
                  <div className="flex items-center justify-center gap-2 py-3 lg:gap-5">
                    {[
                      { key: "goal", color: hexCode, label: "Goal" },
                      {
                        key: "pending",
                        color: "#0AB39C",
                        label: "Pending Forecast",
                      },
                      { key: "revenue", color: "#F7B84B", label: "Revenue" },
                    ].map(({ key, color, label }) => (
                      <button
                        key={key}
                        type="button"
                        className="flex cursor-pointer items-center"
                      >
                        <div
                          className="mr-1 size-3"
                          style={{
                            backgroundColor: color,
                          }}
                        ></div>
                        <span className={`${globalStyleObj.text13Light400}`}>
                          {label}
                        </span>
                      </button>
                    ))}
                  </div>
                );
              }}
            />

            <Bar key="name" dataKey="value" barSize={"20%"} fill={hexCode}>
              <LabelList dataKey="value" position="center" fill="white" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default SalesForecast;
