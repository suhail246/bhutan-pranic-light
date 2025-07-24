"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { globalStyleObj } from "@/app/assets/styles";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { debounce } from "lodash";
import { Filter } from "lucide-react";

const PostFilterDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    featured: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const filterTypes = ["All", "Active Items", "Featured Items"];

  useEffect(() => {
    const statusParams = searchParams.get("status");
    const featuredParams = searchParams.get("featured");

    setFilters({
      status: statusParams || "",
      featured: featuredParams || "",
    });
  }, [searchParams]);

  const updateQueryParams = useCallback(
    debounce((newFilters) => {
      const params = new URLSearchParams(searchParams);
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      router.push(`?${params.toString()}`);
    }, 250),
    [searchParams, router]
  );

  const handleToggle = (type) => {
    let newFilters = {};

    if (type === "Active Items") {
      newFilters = {
        status: "true",
        featured: "",
      };
    } else if (type === "Featured Items") {
      newFilters = {
        status: "",
        featured: "true",
      };
    } else if (type === "All") {
      newFilters = {
        status: "",
        featured: "",
      };
    }

    setFilters(newFilters);
    updateQueryParams(newFilters);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={`focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${globalStyleObj.backgroundLight900Dark200} dark:border-[#fff]/10 px-2`}
        >
          <Filter className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className={`w-56 p-2 ${globalStyleObj.backgroundLight900Dark200} dark:border-[#fff]/10 text-[10px] font-poppins-rg text-dark-weight-350 dark:text-light-weight-400 z-[99]`}
      >
        <DropdownMenuRadioGroup
          value={
            filters.status === "true"
              ? "Active Items"
              : filters.featured === "true"
                ? "Featured Items"
                : "All"
          }
          onValueChange={(value) => handleToggle(value)}
        >
          {filterTypes.map((type) => (
            <DropdownMenuRadioItem
              key={type}
              value={type}
              className="w-full justify-start"
            >
              <span className="capitalize">{type}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostFilterDropdown;
