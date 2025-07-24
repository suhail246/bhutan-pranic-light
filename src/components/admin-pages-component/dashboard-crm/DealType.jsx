"use client";

import { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

import { dealTypeData } from "@/app/assets/data/pagesData/dashboardData/crm";
import { globalStyleObj } from "@/app/assets/styles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DealType = () => {
  const [timeLine, setTimeLine] = useState("Monthly");
  const [selectedDealType, setSelectedDealType] = useState(
    dealTypeData[2].data
  );
  const [dealTypeIsVisible, setDealTypeIsVisible] = useState({
    pending: true,
    loss: true,
    won: true,
  });
  const [dealTypeHide, setDealTypeHide] = useState({
    pending: false,
    loss: false,
    won: false,
  });

  useEffect(() => {
    const data = dealTypeData.find((data) => data.value === timeLine);
    setSelectedDealType(data.data);
  }, [timeLine]);

  return (
    <>
      <div
        className={`${globalStyleObj.flexBetween} border-b p-3 dark:border-b-zinc-700`}
      >
        <h4
          className={`${globalStyleObj.text16Light550Dark550} tracking-normal`}
        >
          Deal Type
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
            {["Today", "Weekly", "Monthly", "Yearly"].map((timeZone) => (
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
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="relative h-[400px] w-full max-w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            outerRadius="80%"
            data={selectedDealType}
            margin={{
              top: 30,
              bottom: 30,
            }}
          >
            <PolarGrid />
            <PolarAngleAxis
              dataKey="year"
              className="font-poppins-rg text-[13px] text-light-weight-400"
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              className="font-poppins-rg text-[11px]"
            />
            {dealTypeIsVisible.pending && !dealTypeHide.pending && (
              <Radar
                name="Pending"
                dataKey="pending"
                stroke="#F7B84B"
                strokeWidth={2}
                fill="#F7B84B"
                fillOpacity={0.3}
              />
            )}

            {dealTypeIsVisible.loss && !dealTypeHide.loss && (
              <Radar
                name="Loss"
                dataKey="loss"
                stroke="#F06548"
                strokeWidth={3}
                fill="#F06548"
                fillOpacity={0.3}
              />
            )}

            {dealTypeIsVisible.won && !dealTypeHide.won && (
              <Radar
                name="Won"
                dataKey="won"
                stroke="#0AB39C"
                strokeWidth={3}
                fill="#0AB39C"
                fillOpacity={0.3}
              />
            )}

            <Legend
              content={function LegendContent({ payload }) {
                return (
                  <div className="flex items-center justify-center gap-5 py-3">
                    {[
                      { key: "pending", color: "#F7B84B", label: "Pending" },
                      {
                        key: "loss",
                        color: "#F06548",
                        label: "Loss",
                      },
                      { key: "won", color: "#0AB39C", label: "Won" },
                    ].map(({ key, color, label }) => (
                      <button
                        key={key}
                        type="button"
                        className={`flex cursor-pointer items-center ${dealTypeHide[key] ? "opacity-30" : ""}`}
                        onMouseEnter={() =>
                          setDealTypeIsVisible({
                            pending: key === "pending",
                            loss: key === "loss",
                            won: key === "won",
                          })
                        }
                        onMouseLeave={() =>
                          setDealTypeIsVisible({
                            pending: true,
                            loss: true,
                            won: true,
                          })
                        }
                        onClick={() =>
                          setDealTypeHide({
                            ...dealTypeHide,
                            [key]: !dealTypeHide[key],
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
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default DealType;
