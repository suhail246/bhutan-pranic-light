"use client";

import { useEffect, useMemo, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  balanceOverviewData,
  balanceOverViewWidgets,
} from "@/app/assets/data/pagesData/dashboardData/crm";
import { globalStyleObj } from "@/app/assets/styles";
import { CountupText } from "@/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";

const BalanceOverview = () => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const [timeLine, setTimeLine] = useState("Current Year");
  const [selectedBalanceOverviewData, setSelectedBalanceOverviewData] =
    useState(balanceOverviewData[3].data);
  const [balanceIsVisible, setBalanceIsVisible] = useState({
    revenue: true,
    expenses: true,
  });
  const [balaceHide, setBalanceHide] = useState({
    revenue: false,
    expenses: false,
  });

  const { textColor } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  useEffect(() => {
    const data = balanceOverviewData.find((data) => data.value === timeLine);
    setSelectedBalanceOverviewData(data.data);
  }, [timeLine]);

  return (
    <>
      <div
        className={`${globalStyleObj.flexBetween} border-b p-3 dark:border-b-zinc-700`}
      >
        <h4
          className={`${globalStyleObj.text16Light550Dark550} tracking-normal`}
        >
          Balance Overview
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
            {["Today", "Last Week", "Last Month", "Current Year"].map(
              (timeZone) => (
                <DropdownMenuItem
                  key={timeZone}
                  onSelect={() => setTimeLine(timeZone)}
                  className={`font-poppins-rg text-[13px] tracking-wide text-dark-weight-550 dark:text-light-weight-450 ${
                    timeLine === timeZone
                      ? "bg-[#f3f3f3]/90 dark:bg-[#f3f3f3]/10"
                      : ""
                  }`}
                >
                  {timeZone}
                </DropdownMenuItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-wrap items-center justify-center py-3">
        {balanceOverViewWidgets.map((widget, index) => (
          <div
            key={`${widget.label} ${widget.id}`}
            className={`flex items-center gap-3 px-3 font-poppins-md text-[13px] text-light-weight-400 ${index === 1 ? "border-x dark:border-[#fff]/10" : ""}`}
          >
            <h2
              className={`text-[20px] ${index === 0 ? textColor : "text-dark-weight-550 dark:text-light-weight-450"}`}
            >
              <CountupText
                number={widget.number}
                decimals={widget.decimals}
                suffix={widget.suffix}
                prefix={widget.prefix}
              />
            </h2>
            <span>{widget.lable}</span>
          </div>
        ))}
      </div>

      <div className="relative h-[300px] w-full max-w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={selectedBalanceOverviewData}
            margin={{
              top: 20,
              right: 30,
              left: 10,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tickMargin={10}
              className="font-poppins-rg text-[12px] text-light-weight-400"
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
                const name =
                  payload && payload.length ? payload[0].payload.name : "";
                const rvValue =
                  payload && payload.length ? payload[0].payload.rv : "";
                const exValue =
                  payload && payload.length ? payload[0].payload.ex : "";

                if (payload && payload.length) {
                  return (
                    <div
                      className={`gap-2 rounded-md ${globalStyleObj.backgroundLight900Dark200} flex flex-col border font-poppins-rg text-[13px] text-dark-weight-550 dark:border-[#fff]/10 dark:text-light-weight-450`}
                    >
                      <p className="border-b p-2 dark:border-[#fff]/10">
                        {name}
                      </p>
                      <div className="px-2 pb-2">
                        <div className="mb-2 flex items-center gap-2">
                          <span
                            className={`size-[10px] rounded-full`}
                            style={{
                              backgroundColor: "#0AB39C",
                            }}
                          ></span>
                          <p className="font-poppins-rg text-[13px] text-dark-weight-550 dark:text-light-weight-450">
                            Revenue: <strong>${rvValue}k</strong>
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`size-[10px] rounded-full`}
                            style={{
                              backgroundColor: "#F06548",
                            }}
                          ></span>
                          <p className="font-poppins-rg text-[13px] text-dark-weight-550 dark:text-light-weight-450">
                            Expenses: <strong>${exValue}k</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }
              }}
            />

            {balanceIsVisible.revenue && !balaceHide.revenue && (
              <Area
                type="Revenue"
                dataKey="rv"
                stroke="#0AB39C"
                fill="#0AB39C"
                fillOpacity={0.1}
                strokeWidth={2}
              />
            )}

            {balanceIsVisible.expenses && !balaceHide.expenses && (
              <Area
                type="Expenses"
                dataKey="ex"
                stroke="#F06548"
                fill="#F06548"
                fillOpacity={0.1}
                strokeWidth={2}
              />
            )}

            <Legend
              content={function LegendContent({ payload }) {
                return (
                  <div className="flex items-center justify-center gap-5 py-3">
                    {[
                      { key: "revenue", color: "#0AB39C", label: "Revenue" },
                      { key: "expenses", color: "#F06548", label: "Expenses" },
                    ].map(({ key, color, label }) => (
                      <button
                        key={key}
                        type="button"
                        className={`flex cursor-pointer items-center ${balaceHide[key] ? "opacity-30" : ""}`}
                        onMouseEnter={() =>
                          setBalanceIsVisible({
                            revenue: key === "revenue",
                            expenses: key === "expenses",
                          })
                        }
                        onMouseLeave={() =>
                          setBalanceIsVisible({
                            revenue: true,
                            expenses: true,
                          })
                        }
                        onClick={() =>
                          setBalanceHide({
                            ...balaceHide,
                            [key]: !balaceHide[key],
                          })
                        }
                      >
                        <div
                          className="mr-1 size-3 rounded-full"
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
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default BalanceOverview;
