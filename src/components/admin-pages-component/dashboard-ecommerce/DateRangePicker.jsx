"use client";

import { addDays, format } from "date-fns";
import { useMemo, useState } from "react";
import { SlCalender } from "react-icons/sl";

import { globalStyleObj } from "@/app/assets/styles";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";

const DateRangePicker = () => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const [date, setDate] = useState({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  const { active } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  return (
    <div className={cn("grid gap-5")}>
      <Popover modal={false}>
        <PopoverTrigger asChild>
          <button
            id="date"
            className={cn(
              `flex items-center justify-between text-left font-normal border-0 text-[13px] font-poppins-rg text-dark-weight-550 dark:text-light-weight-550 pl-3 rounded-sm overflow-hidden shadow-light ${globalStyleObj.backgroundLight900Dark300}`,
              !date && "text-muted-foreground"
            )}
          >
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
            <div
              className={`ml-3 flex size-[35px] items-center justify-center ${active}`}
            >
              <SlCalender size={13} color="#fff" />
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className={`w-auto border-0 p-0 ${globalStyleObj.backgroundLight900Dark300}`}
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
            classNames={{
              nav_button: `w-5 h-5 ${active} flex items-center justify-center rounded-[4px] text-white`,
              caption_label:
                "text-[13px] font-poppins-rg text-dark-weight-550 dark:text-light-weight-550",
              table:
                "text-[13px] font-poppins-rg text-dark-weight-550 dark:text-light-weight-550",
              day_range_start: `${active} text-white`,
              day_range_end: `${active} text-white`,
              day_selected: ``,
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;
