"use client";

import { useMemo, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { globalStyleObj } from "@/app/assets/styles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";

const StoreVisits = () => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );

  const [sourcesIsVisible, setSourcesIsVisible] = useState({
    direct: true,
    social: true,
    email: true,
    other: true,
    referrals: true,
  });

  const { hexCode } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  const data = useMemo(
    () => [
      { name: "Direct", value: 44, percentage: 25.6, color: hexCode },
      { name: "Social", value: 55, percentage: 32.0, color: "#0AB39C" },
      { name: "Email", value: 41, percentage: 23.8, color: "#F7B84B" },
      { name: "Other", value: 17, percentage: 9.9, color: "#F06548" },
      { name: "Referrals", value: 15, percentage: 8.7, color: "#299CDB" },
    ],
    [hexCode]
  );

  return (
    <>
      <div
        className={`${globalStyleObj.flexBetween} border-b p-3 dark:border-b-zinc-700`}
      >
        <h4
          className={`${globalStyleObj.text16Light550Dark550} tracking-normal`}
        >
          Store Visits by Source
        </h4>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button type="button" className={`flex items-center gap-1`}>
              <span className="font-poppins-rg text-[13px] text-light-weight-400">
                Report
              </span>
              <MdKeyboardArrowDown className="text-light-weight-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className={`w-[150px] bg-light-dencity-900 p-0 py-2 dark:bg-dark-dencity-200`}
          >
            {["Download Report", "Export", "Import"].map((item) => (
              <DropdownMenuItem
                key={item}
                value={item}
                className={`font-poppins-rg text-[13px] tracking-wide text-dark-weight-550 dark:text-light-weight-450`}
              >
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="relative h-[400px] w-full max-w-full px-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={120}
              startAngle={90}
              endAngle={-270}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                percent,
                index,
              }) => {
                const RADIAN = Math.PI / 180;
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#fff"
                    className="font-poppins-rg text-[13px]"
                  >
                    {`${(percent * 100).toFixed(1)}%`}
                  </text>
                );
              }}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  fillOpacity={
                    sourcesIsVisible[entry.name.toLowerCase()] ? 1 : 0.3
                  }
                />
              ))}
            </Pie>

            <Tooltip
              cursor={false}
              content={({ payload }) => {
                return payload && payload.length > 0 ? (
                  <div
                    className={`rounded-md font-poppins-rg text-[13px] text-light-weight-900 shadow-light`}
                    style={{ backgroundColor: `${payload[0].payload.fill}` }}
                  >
                    {payload.map((data) => (
                      <p key={data.dataKey} className="p-2 font-poppins-rg">
                        <span>
                          {`${data.name.charAt(0).toUpperCase() + data.name.slice(1)}: `}
                          <strong>{data.value}</strong>
                        </span>
                      </p>
                    ))}
                  </div>
                ) : null;
              }}
              className={`${globalStyleObj.backgroundLight900Dark200} font-poppins-rg`}
            />
            <Legend
              content={function LegendContent({ payload }) {
                return (
                  <div className="flex flex-wrap items-center justify-center gap-2 p-3">
                    {[
                      { key: "direct", color: hexCode, label: "Direct" },
                      {
                        key: "social",
                        color: "#0AB39C",
                        label: "Social",
                      },
                      { key: "email", color: "#F7B84B", label: "Email" },
                      { key: "other", color: "#F06548", label: "Other" },
                      {
                        key: "referrals",
                        color: "#299CDB",
                        label: "Referrals",
                      },
                    ].map(({ key, color, label }) => (
                      <button
                        key={key}
                        type="button"
                        className={`flex cursor-pointer items-center`}
                        onMouseEnter={() =>
                          setSourcesIsVisible({
                            direct: key === "direct",
                            social: key === "social",
                            email: key === "email",
                            other: key === "other",
                            referrals: key === "referrals",
                          })
                        }
                        onMouseLeave={() =>
                          setSourcesIsVisible({
                            direct: true,
                            social: true,
                            email: true,
                            other: true,
                            referrals: true,
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
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default StoreVisits;
