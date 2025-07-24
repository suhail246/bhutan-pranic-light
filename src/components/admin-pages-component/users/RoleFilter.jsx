"use client";

import { globalStyleObj } from "@/app/assets/styles";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { debounce } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdErrorOutline } from "react-icons/md";

const RoleFilter = ({ roleLists }) => {
  const [roleQuery, setRoleQuery] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const roleParams = searchParams.get("role");
    if (roleParams) {
      setRoleQuery(roleParams);
    }
  }, [searchParams]);

  const debouncedRoleQuery = useCallback(
    debounce((query) => {
      const params = new URLSearchParams(searchParams);

      if (query && query !== "All") {
        params.set("role", query);
      } else {
        params.delete("role");
      }

      router.push(`?${params.toString()}`);
    }, 250),
    [searchParams, router]
  );

  const handleRoleQuery = (query) => {
    setRoleQuery(query);
    debouncedRoleQuery(query);
  };

  return (
    <Select value={roleQuery} onValueChange={(value) => handleRoleQuery(value)}>
      <SelectTrigger className="border font-poppins-rg text-[13px] text-dark-weight-550 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400">
        <SelectValue placeholder="Filter by role" />
      </SelectTrigger>
      <SelectContent
        className={`border-0 ${globalStyleObj.backgroundLight900Dark200}`}
      >
        <SelectGroup>
          <SelectItem
            value="All"
            className={`font-poppins-rg text-dark-weight-600 dark:text-light-weight-550 cursor-pointer text-[12px]`}
          >
            All
          </SelectItem>
          {roleLists.length > 0 ? (
            roleLists.map((roleItem) => (
              <SelectItem
                key={roleItem._id}
                value={roleItem._id}
                className={`text-[12px] font-poppins-rg text-dark-weight-600 dark:text-light-weight-550 cursor-pointer`}
              >
                {roleItem.name}
              </SelectItem>
            ))
          ) : (
            <p className="text-light-weight-400 text-[13px] font-poppins-rg flex items-center justify-center gap-2">
              <MdErrorOutline size={16} color="#878a99" />
              Role does not created yet
            </p>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default RoleFilter;
