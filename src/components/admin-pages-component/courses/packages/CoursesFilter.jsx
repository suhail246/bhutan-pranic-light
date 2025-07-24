"use client";

import { globalStyleObj } from "@/app/assets/styles";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { debounce } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdErrorOutline } from "react-icons/md";

const CoursesFilter = ({ itemList = [] }) => {
  const [courseQuery, setCourseQuery] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const courseParams = searchParams.get("course");
    if (courseParams) {
      setCourseQuery(courseParams);
    }
  }, [searchParams]);

  const debouncedQuery = useCallback(
    debounce((query) => {
      const params = new URLSearchParams(searchParams);

      if (query && query !== "none") {
        params.set("course", query);
      } else {
        params.delete("course");
      }

      router.push(`?${params.toString()}`);
    }, 250),
    [searchParams, router]
  );

  const handleQuery = (query) => {
    setCourseQuery(query);
    debouncedQuery(query);
  };

  return (
    <Select value={courseQuery} onValueChange={(value) => handleQuery(value)}>
      <SelectTrigger className="border font-poppins-rg text-[13px] text-dark-weight-550 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400">
        <SelectValue placeholder="Filter by courses" />
      </SelectTrigger>
      <SelectContent
        className={`border-0 ${globalStyleObj.backgroundLight900Dark200}`}
      >
        <SelectGroup>
          <SelectItem
            value="none"
            className={`font-poppins-rg text-dark-weight-600 dark:text-light-weight-550 cursor-pointer text-[12px]`}
          >
            None
          </SelectItem>
          {itemList.length > 0 ? (
            itemList.map((item) => (
              <SelectItem
                key={item._id}
                value={item._id}
                className={`text-[12px] font-poppins-rg text-dark-weight-600 dark:text-light-weight-550 cursor-pointer`}
              >
                {item?.title?.en || "Anonymous"}
              </SelectItem>
            ))
          ) : (
            <p className="text-light-weight-400 text-[13px] font-poppins-rg flex items-center justify-center gap-1">
              <MdErrorOutline size={16} color="#878a99" />
              No Courses
            </p>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CoursesFilter;
