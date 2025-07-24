"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { sessionByCountriesData } from "@/app/assets/data/pagesData/dashboardData/analytics";
import { globalStyleObj } from "@/app/assets/styles";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";

const SessionsByCountries = () => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const [selectedId, setSelectedId] = useState("half-yearly");
  const [selectedData, setSelectedData] = useState(
    sessionByCountriesData[2].chartData
  );
  const { active, bgColor, hoverBgColor, textColor } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  useEffect(() => {
    const data = sessionByCountriesData.find((data) => data.id === selectedId);
    setSelectedData(data.chartData);
  }, [selectedId]);

  return (
    <>
      <div
        className={`${globalStyleObj.flexBetween} border-b p-3 dark:border-b-zinc-700`}
      >
        <h4
          className={`${globalStyleObj.text16Light550Dark550} tracking-normal`}
        >
          Sessions by Countries
        </h4>

        <div className="flex items-center gap-1">
          {sessionByCountriesData.map((data) => (
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

      {/* Chart Section */}
      <div className="relative h-[400px] w-full max-w-full">
        {/* Responsive Container */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={selectedData}
            layout="vertical"
            margin={{
              top: 20,
              right: 30,
              bottom: 20,
              left: 30,
            }}
          >
            {/* X-Axis */}
            <XAxis
              dataKey="user"
              type="number"
              axisLine
              tickLine={true}
              className="font-poppins-rg text-[11px]"
            />

            {/* Y-Axis */}
            <YAxis
              dataKey="country"
              type="category"
              tickLine={false}
              axisLine
              className="font-poppins-rg text-[11px]"
            />

            {/* Tooltip */}
            <Tooltip
              cursor={false}
              content={({ payload }) => {
                return payload && payload.length > 0 ? (
                  <div
                    className={`rounded ${globalStyleObj.backgroundLight900Dark200} font-poppins-rg text-[13px] shadow-light ${globalStyleObj.text13Light550Dark550}`}
                  >
                    <p className="mb-2 border-b border-[#000]/20 p-2 dark:border-[#fff]/10">
                      {payload[0].payload.country}
                    </p>
                    <p className="flex items-center gap-2 px-2 pb-2">
                      <span
                        className={`size-[10px] rounded-full`}
                        style={{ backgroundColor: payload[0].payload.fill }}
                      ></span>
                      <span>
                        Sessions: <strong>{payload[0].value}</strong>
                      </span>
                    </p>
                  </div>
                ) : null;
              }}
              label="Sessions"
            />

            {/* Bars */}
            <Bar dataKey="user" radius={4} barSize={20}>
              <LabelList
                dataKey="user"
                position="right"
                offset={8}
                fontSize={12}
                fill="#878a99"
                className="font-poppins-rg"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default SessionsByCountries;
