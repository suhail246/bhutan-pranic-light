"use client";

import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { revenueChartData } from "@/app/assets/data/pagesData/dashboardData/ecommerce";
import { globalStyleObj } from "@/app/assets/styles";
import { CountupText } from "@/components";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";

const Revenue = () => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const { theme } = useTheme();
  const [selectedId, setSelectedId] = useState("all");
  const [selectedData, setSelectedData] = useState(revenueChartData[0].data);
  const [refundTypeIsVisible, setRefundTypeIsVisible] = useState({
    orders: true,
    earnings: true,
    refunds: true,
  });
  const [refundTypeHide, setRefundTypeHide] = useState({
    orders: false,
    earnings: false,
    refunds: false,
  });

  const { active, bgColor, hoverBgColor, textColor, hexCode } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  useEffect(() => {
    const data = revenueChartData.find((data) => data.id === selectedId);
    setSelectedData(data.data);
  }, [selectedId]);

  return (
    <>
      <div className={`${globalStyleObj.flexBetween} p-3`}>
        <h4
          className={`${globalStyleObj.text16Light550Dark550} tracking-normal`}
        >
          Revenue
        </h4>

        <div className="flex items-center gap-1">
          {revenueChartData.map((data) => (
            <button
              key={data.id}
              type="button"
              className={`${textColor} ${
                selectedId === data.id ? `${active} text-white` : bgColor
              } ${hoverBgColor} transition-300 rounded-[3px] px-3 py-1 font-poppins-rg text-[13px] hover:text-white`}
              onClick={() => setSelectedId(data.id)}
            >
              {data.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col border border-dashed border-[#000]/10 bg-[#000]/5 dark:border-[#f3f3f3]/5 dark:bg-[#f3f3f3]/5 sm:flex-row">
        <div className="flex flex-1">
          <div className="flex h-full flex-1 flex-col items-center border-b border-r border-dashed border-[#000]/10 p-3 dark:border-[#f3f3f3]/5 sm:border-b-0">
            <p
              className={`font-poppins-md text-[16px] text-dark-weight-550 dark:text-light-weight-450`}
            >
              <CountupText number={7585} decimals={0} suffix="" prefix="" />
            </p>
            <p className={`${globalStyleObj.text13Light400}`}>Orders</p>
          </div>

          <div className="flex h-full flex-1 flex-col items-center border-b border-dashed border-[#000]/10 p-3 dark:border-[#f3f3f3]/5 sm:border-b-0 sm:border-r">
            <p
              className={`font-poppins-md text-[16px] text-dark-weight-550 dark:text-light-weight-450`}
            >
              <CountupText number={22.89} decimals={2} suffix="k" prefix="$" />
            </p>
            <p className={`${globalStyleObj.text13Light400}`}>Earnings</p>
          </div>
        </div>

        <div className="flex flex-1">
          <div className="flex h-full flex-1 flex-col items-center border-r border-dashed border-[#000]/10 p-3 dark:border-[#f3f3f3]/5">
            <p
              className={`font-poppins-md text-[16px] text-dark-weight-550 dark:text-light-weight-450`}
            >
              <CountupText number={367} decimals={0} suffix="" prefix="" />
            </p>
            <p className={`${globalStyleObj.text13Light400}`}>Refunds</p>
          </div>

          <div className="flex h-full flex-1 flex-col items-center p-3">
            <p className={`font-poppins-md text-[16px] text-[#0AB39C]`}>
              <CountupText number={18.92} decimals={2} suffix="%" prefix="" />
            </p>
            <p className={`${globalStyleObj.text13Light400}`}>
              Conversation Ratio
            </p>
          </div>
        </div>
      </div>

      <div className="relative h-[400px] w-full max-w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={selectedData}
            margin={{
              top: 30,
              right: 30,
              bottom: 10,
              left: 20,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke={theme === "light" ? "#e1e1e3" : "#40403f"}
            />
            <XAxis
              dataKey="name"
              scale="point"
              axisLine={false}
              tickLine={false}
              tickMargin={5}
              interval={0}
              padding={{ left: 0, right: 0 }}
              className={`${globalStyleObj.text13Light400}`}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tickFormatter={(value) => {
                return value + ".00";
              }}
              className={`${globalStyleObj.text13Light400}`}
            />
            <Tooltip
              cursor={false}
              content={({ payload }) => {
                if (payload && payload.length > 0) {
                  const monthName = payload[0].payload.name;
                  const ordersValue = payload[0].payload.orders;
                  const earningsValue = payload[0].payload.earnings;
                  const refundsValue = payload[0].payload.refunds;
                  return (
                    <div
                      className={`rounded-md shadow-light ${globalStyleObj.backgroundLight900Dark200} ${globalStyleObj.text13Light600Dark400}`}
                    >
                      <p className="border-b p-3 dark:border-[#fff]/10">{`${monthName}`}</p>
                      <div className="flex flex-col gap-2 p-3">
                        <p className="font-poppins-rg">
                          <span
                            className={`inline-block size-[10px] rounded-full ${active} mr-[10px]`}
                          ></span>
                          <span>
                            Orders <strong>{ordersValue}</strong>
                          </span>
                        </p>
                        <p className="font-poppins-rg">
                          <span
                            className={`mr-[10px] inline-block size-[10px] rounded-full bg-[#0AB39C]`}
                          ></span>
                          <span>
                            Earnings <strong>${earningsValue}k</strong>
                          </span>
                        </p>
                        <p className="font-poppins-rg">
                          <span
                            className={`mr-[10px] inline-block size-[10px] rounded-full bg-[#F06548]`}
                          ></span>
                          <span>
                            Refunds <strong>{refundsValue} Sales</strong>
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              content={function LegendContent({ payload }) {
                return (
                  <div className="flex items-center justify-center gap-5 py-3">
                    {[
                      { key: "orders", color: hexCode, label: "Orders" },
                      {
                        key: "earnings",
                        color: "#0AB39C",
                        label: "Earnings",
                      },
                      { key: "refunds", color: "#F06548", label: "Refunds" },
                    ].map(({ key, color, label }) => (
                      <button
                        key={key}
                        type="button"
                        className={`flex cursor-pointer items-center ${refundTypeHide[key] ? "opacity-30" : ""}`}
                        onMouseEnter={() =>
                          setRefundTypeIsVisible({
                            orders: key === "orders",
                            earnings: key === "earnings",
                            refunds: key === "refunds",
                          })
                        }
                        onMouseLeave={() =>
                          setRefundTypeIsVisible({
                            orders: true,
                            earnings: true,
                            refunds: true,
                          })
                        }
                        onClick={() =>
                          setRefundTypeHide({
                            ...refundTypeHide,
                            [key]: !refundTypeHide[key],
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
            {refundTypeIsVisible.orders && !refundTypeHide.orders && (
              <Area
                type="monotone"
                dataKey="orders"
                fill={hexCode}
                stroke={hexCode}
                strokeWidth={2}
                fillOpacity={0.1}
              />
            )}

            {refundTypeIsVisible.earnings && !refundTypeHide.earnings && (
              <Bar
                type="monotone"
                dataKey="earnings"
                barSize={20}
                fill="#0AB39C"
              />
            )}

            {refundTypeIsVisible.refunds && !refundTypeHide.refunds && (
              <Line
                type="monotone"
                dataKey="refunds"
                stroke="#F06548"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Revenue;
