"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import { audienceMatricsData } from "@/app/assets/data/pagesData/dashboardData/analytics";
import { globalStyleObj } from "@/app/assets/styles";
import { CountupText } from "@/components";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";

const AudiencesMetrics = () => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const [selectedId, setSelectedId] = useState("all");
  const [selectedData, setSelectedData] = useState(
    audienceMatricsData[0].chartData
  );
  const [legendVisibility, setLegendVisibility] = useState({
    last: true,
    current: true,
  });
  const { active, bgColor, hoverBgColor, textColor, hexCode } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  useEffect(() => {
    const data = audienceMatricsData.find((data) => data.id === selectedId);
    setSelectedData(data.chartData);
  }, [selectedId]);

  const handleLegendClick = useCallback(
    (keyName) => {
      setLegendVisibility((prevState) => ({
        ...prevState,
        [keyName]: !prevState[keyName],
      }));
    },
    [setLegendVisibility]
  );

  return (
    <>
      <div
        className={`${globalStyleObj.flexBetween} border-b p-3 dark:border-b-zinc-700`}
      >
        <h4
          className={`${globalStyleObj.text16Light550Dark550} tracking-normal`}
        >
          Audiences Metrics
        </h4>

        <div className="flex items-center gap-1">
          {audienceMatricsData.map((data) => (
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

      <div className="flex border border-dashed border-[#000]/10 bg-[#000]/5 dark:border-[#f3f3f3]/5 dark:bg-[#f3f3f3]/5">
        <div className="flex h-full flex-1 flex-col items-center border-r border-dashed border-[#000]/10 p-3 dark:border-[#f3f3f3]/5">
          <p
            className={`flex items-center gap-1 font-poppins-sb text-[16px] text-dark-weight-550 dark:text-light-weight-450`}
          >
            <CountupText number={854} decimals={0} suffix="" prefix="" />
            <span className={`text-[11px] text-green-500`}>
              <strong className="flex items-center gap-1">
                49%
                <span>
                  <MdArrowOutward />
                </span>
              </strong>
            </span>
          </p>
          <p className={`${globalStyleObj.text13Light400}`}>Avg. Session</p>
        </div>

        <div className="flex h-full flex-1 flex-col items-center border-r border-dashed border-[#000]/10 p-3 dark:border-[#f3f3f3]/5">
          <p
            className={`flex items-center gap-1 font-poppins-sb text-[16px] text-dark-weight-550 dark:text-light-weight-450`}
          >
            <CountupText number={1278} decimals={0} suffix="" prefix="" />
            <span className={`text-[11px] text-green-500`}>
              <strong className="flex items-center gap-1">
                60%
                <span>
                  <MdArrowOutward />
                </span>
              </strong>
            </span>
          </p>
          <p className={`${globalStyleObj.text13Light400}`}>Conversion Rate</p>
        </div>

        <div className="flex h-full flex-1 flex-col items-center p-3">
          <p
            className={`flex items-center gap-1 font-poppins-sb text-[16px] text-dark-weight-550 dark:text-light-weight-450`}
          >
            <CountupText
              number={3}
              secondNumber={40}
              suffix={"m"}
              prefix=""
              secondPrefix={"sec"}
            />
            <span className={`text-[11px] text-green-500`}>
              <strong className="flex items-center gap-1">
                37%
                <span>
                  <MdArrowOutward />
                </span>
              </strong>
            </span>
          </p>
          <p className={`${globalStyleObj.text13Light400}`}>
            Avg. Session Duration
          </p>
        </div>
      </div>

      <div className="relative h-[400px] w-full max-w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={selectedData || audienceMatricsData[0].chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={5}
              axisLine={true}
              tickFormatter={(value) => value.slice(0, 3)}
              className={`${globalStyleObj.text13Light400}`}
            />
            <Tooltip
              cursor={false}
              content={({ payload }) =>
                payload && payload.length > 0 ? (
                  <div
                    className={`rounded-md shadow-light ${globalStyleObj.backgroundLight900Dark200} ${globalStyleObj.text13Light600Dark400}`}
                  >
                    <p className="border-b p-3 dark:border-[#000]/20">{`${payload[0]?.payload?.month}`}</p>
                    <div className="flex flex-col gap-2 p-3">
                      {payload.map((data) => (
                        <p key={data.dataKey} className="font-poppins-rg">
                          <span
                            style={{
                              display: "inline-block",
                              width: "10px",
                              height: "10px",
                              backgroundColor: hexCode,
                              opacity: data.name === "lastYear" ? 1 : 0.3,
                              marginRight: "15px",
                              borderRadius: "50%",
                            }}
                          ></span>
                          <span>
                            {`${data.name.charAt(0).toUpperCase() + data.name.slice(1)}: `}
                            <strong>{data.value}</strong>
                          </span>
                        </p>
                      ))}
                    </div>
                  </div>
                ) : null
              }
              className={`${globalStyleObj.backgroundLight900Dark200} font-poppins-rg`}
            />
            <Legend
              content={function LegendContent({ payload }) {
                return (
                  <div className="flex items-center justify-center gap-3 py-3">
                    <button
                      type="button"
                      className={`flex cursor-pointer items-center ${legendVisibility.last ? "opacity-100" : "opacity-30"}`}
                      onClick={() => handleLegendClick("last")}
                    >
                      <div className={`mr-2 size-3 ${active}`}></div>
                      <span className={`${globalStyleObj.text13Light400}`}>
                        Last Year
                      </span>
                    </button>

                    <button
                      type="button"
                      className={`flex cursor-pointer items-center ${legendVisibility.current ? "opacity-100" : "opacity-30"}`}
                      onClick={() => handleLegendClick("current")}
                    >
                      <div className={`mr-2 size-3 ${active} opacity-30`}></div>
                      <span className={`${globalStyleObj.text13Light400}`}>
                        Current Year
                      </span>
                    </button>
                  </div>
                );
              }}
            />
            {legendVisibility.last && (
              <Bar
                dataKey="lastYear"
                stackId="a"
                barSize={5}
                fill={hexCode}
                radius={[0, 0, 4, 4]}
              />
            )}
            {legendVisibility.current && (
              <Bar
                dataKey="currentYear"
                stackId="a"
                barSize={5}
                radius={[4, 4, 0, 0]}
                style={{
                  fill: hexCode,
                  opacity: 0.3,
                }}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default AudiencesMetrics;
