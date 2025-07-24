"use client";

import { useEffect, useMemo, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuUsers } from "react-icons/lu";
import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { userByDeviceData } from "@/app/assets/data/pagesData/dashboardData/analytics";
import { globalStyleObj } from "@/app/assets/styles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";

const UserByDevice = () => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const [timeLine, setTimeLine] = useState("Today");
  const [userData, setUserData] = useState(userByDeviceData[0].data);
  const { hexCode } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  useEffect(() => {
    const selectedUserData = userByDeviceData.find(
      (item) => item.id === timeLine
    );
    setUserData(selectedUserData.data);
  }, [timeLine]);

  const COLORS = useMemo(() => [hexCode, "#F7B84B", "#299CDB"], []);

  return (
    <>
      <div
        className={`${globalStyleObj.flexBetween} border-b p-3 dark:border-b-zinc-700`}
      >
        <h4
          className={`${globalStyleObj.text16Light550Dark550} tracking-normal`}
        >
          Users by Device
        </h4>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button type="button">
              <BsThreeDotsVertical className="text-light-weight-400" />
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
                className={`${
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

      <div className="relative h-[300px] w-full max-w-full px-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={userData}
              innerRadius={75}
              outerRadius={100}
              paddingAngle={0}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              className="border-0"
            >
              {userData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
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
                          <strong>{data.value}k Users</strong>
                        </span>
                      </p>
                    ))}
                  </div>
                ) : null;
              }}
              className={`${globalStyleObj.backgroundLight900Dark200} font-poppins-rg`}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="px-3 pb-3">
        <table className="w-full font-poppins-rg text-[13px]">
          <tbody className="flex flex-col gap-2">
            {userData.map((entry, index) => (
              <tr
                key={entry.name}
                className="flex items-center justify-between"
              >
                <td>
                  <h4 className="flex items-center gap-2 text-[14px] text-dark-weight-600 dark:text-light-weight-550">
                    <span
                      className="size-[10px] rounded-[2px]"
                      style={{
                        backgroundColor: COLORS[index],
                      }}
                    ></span>
                    {entry.name} User
                  </h4>
                </td>
                <td>
                  <p className="flex items-center gap-1 text-light-weight-400">
                    <LuUsers size={16} />
                    {entry.value}k
                  </p>
                </td>
                <td className="">
                  {entry.percentage > 0 ? (
                    <p className="flex items-center justify-end font-poppins-sb text-green-500">
                      <RiArrowDropUpFill size={16} />
                      {entry.percentage}%
                    </p>
                  ) : (
                    <p className="flex items-center justify-end font-poppins-sb text-red-500">
                      <RiArrowDropDownFill size={16} />
                      {(entry.percentage + "").slice(1)}%
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserByDevice;
