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

const CategoriesFilter = ({ categoriesList }) => {
  const [categoryQuery, setCategoryQuery] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const categoryParams = searchParams.get("category");
    if (categoryParams) {
      setCategoryQuery(categoryParams);
    }
  }, [searchParams]);

  const debouncedCategoryQuery = useCallback(
    debounce((query) => {
      const params = new URLSearchParams(searchParams);

      if (query && query !== "none") {
        params.set("category", query);
      } else {
        params.delete("category");
      }

      router.push(`?${params.toString()}`);
    }, 250),
    [searchParams, router]
  );

  const handleCategoryQuery = (query) => {
    setCategoryQuery(query);
    debouncedCategoryQuery(query);
  };

  return (
    <Select
      value={categoryQuery}
      onValueChange={(value) => handleCategoryQuery(value)}
    >
      <SelectTrigger className="border font-poppins-rg text-[13px] text-dark-weight-550 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400">
        <SelectValue placeholder="Filter by category" />
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
          {categoriesList.length > 0 ? (
            categoriesList.map(
              (category) =>
                category.activeStatus && (
                  <SelectItem
                    key={category._id}
                    value={category._id}
                    disabled={category.isDefault}
                    className={`text-[12px] font-poppins-rg text-dark-weight-600 dark:text-light-weight-550 cursor-pointer`}
                  >
                    {category?.name?.en || "Anonymous"}{" "}
                    {category.isDefault && (
                      <span className="text-[10px] bg-red-500/20 rounded-full font-poppins-md text-red-600 px-2 py-0.5 ml-2">
                        Default
                      </span>
                    )}
                  </SelectItem>
                )
            )
          ) : (
            <p className="text-light-weight-400 text-[13px] font-poppins-rg flex items-center justify-center gap-1">
              <MdErrorOutline size={16} color="#878a99" />
              No Categories
            </p>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategoriesFilter;
