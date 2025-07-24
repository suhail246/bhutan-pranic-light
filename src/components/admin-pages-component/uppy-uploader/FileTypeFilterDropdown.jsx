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

const FileTypeFilterDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFileTypeQuery, setSelectedFileTypeQuery] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const fileTypes = ["all", "images", "videos", "pdf", "other"];

  useEffect(() => {
    const currentQuery = searchParams.get("selectedFileType");
    if (currentQuery) {
      setSelectedFileTypeQuery(currentQuery);
    }
  }, [searchParams]);

  const debouncedSelectedFileType = useCallback(
    debounce((query) => {
      const params = new URLSearchParams(searchParams);

      if (query) {
        params.set("selectedFileType", query);
      } else {
        params.delete("selectedFileType");
      }

      router.push(`?${params.toString()}`);
    }, 250),
    [searchParams, router]
  );

  const handleToggle = (type) => {
    setSelectedFileTypeQuery(type);
    debouncedSelectedFileType(type);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={`focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${globalStyleObj.backgroundLight900Dark200} dark:border-[#fff]/10`}
        >
          <Filter className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className={`w-56 p-2 ${globalStyleObj.backgroundLight900Dark200} dark:border-[#fff]/10 text-[10px] font-poppins-rg text-dark-weight-350 dark:text-light-weight-400 z-[99]`}
      >
        <DropdownMenuRadioGroup
          value={selectedFileTypeQuery ? selectedFileTypeQuery : "all"}
          onValueChange={(value) => handleToggle(value)}
        >
          {fileTypes.map((type) => (
            <DropdownMenuRadioItem
              key={type}
              value={type}
              className="w-full justify-start"
            >
              <span className="capitalize">
                {type === "all" ? "All Files" : type}
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FileTypeFilterDropdown;
