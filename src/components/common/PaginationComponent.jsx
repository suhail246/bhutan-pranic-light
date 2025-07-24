"use client";

import { globalStyleObj } from "@/app/assets/styles";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { debounce } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const PaginationComponent = ({ paginationDetails }) => {
  const [currentPage, setCurrentPage] = useState(
    paginationDetails.currentPage || 1
  );
  const [rowsPerPage, setRowsPerPage] = useState(
    paginationDetails.currentLimit || 5
  );

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const page = parseInt(
      searchParams.get("page") || paginationDetails.currentPage
    );
    const limit = parseInt(
      searchParams.get("pageSize") || paginationDetails.currentLimit
    );

    setCurrentPage(page);
    setRowsPerPage(limit);
  }, [searchParams, paginationDetails]);

  // Debounced function for page change
  const debouncedPageChange = useCallback(
    debounce((page, limit) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", page);
      params.set("pageSize", limit);
      router.push(`?${params.toString()}`, undefined, { shallow: true });
    }, 250),
    [searchParams, router]
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > paginationDetails.totalPages) return;

    setCurrentPage(pageNumber);
    debouncedPageChange(pageNumber, rowsPerPage);
  };

  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(value);
    setCurrentPage(1); // Reset to page 1 when rows per page changes
    debouncedPageChange(1, value);
  };

  const renderPageNumbers = () => {
    const maxButtons = 4;
    const startPageIndex = Math.max(1, currentPage - 3);
    const endPageIndex = Math.min(
      startPageIndex + maxButtons - 1,
      paginationDetails.totalPages
    );

    let buttons = [];

    for (
      let pageIndex = startPageIndex;
      pageIndex <= endPageIndex;
      pageIndex++
    ) {
      buttons.push(
        <PaginationItem key={pageIndex} className="hidden md:block">
          <PaginationLink
            onClick={() => handlePageChange(pageIndex)}
            isActive={pageIndex === currentPage}
            className={`
              ${
                pageIndex === currentPage ? "dark:bg-dark-dencity-600" : ""
              } cursor-pointer text-[13px] font-poppins-rg text-dark-weight-500 dark:text-light-weight-800`}
          >
            {pageIndex}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return buttons;
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-[13px] font-poppins-rg text-dark-weight-500 dark:text-light-weight-400">
          Rows
        </span>
        <Select value={rowsPerPage} onValueChange={handleRowsPerPageChange}>
          <SelectTrigger className="w-fit border dark:border-[#fff]/10">
            <SelectValue
              placeholder="--"
              className="font-poppins-rg text-[13px]"
            />
          </SelectTrigger>
          <SelectContent
            className={`w-fit ${globalStyleObj.backgroundLight900Dark300} z-[99]`}
          >
            <SelectGroup className="font-poppins-rg text-[13px] text-dark-weight-400 dark:text-light-weight-800">
              <SelectLabel className="text-dark-weight-600 dark:text-light-weight-800">
                Rows
              </SelectLabel>
              {[5, 9, 12, 15, 18, 21].map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`${currentPage === 1 ? "cursor-not-allowed line-through opacity-50" : "cursor-pointer"} bg-[#000]/10 text-[13px] font-poppins-rg text-dark-weight-400 dark:text-light-weight-800`}
            />
          </PaginationItem>
          {(renderPageNumbers() || []).map((button, index) => button)}
          {paginationDetails.totalPages > 4 &&
            currentPage < paginationDetails.totalPages && (
              <PaginationItem className="hidden md:block">
                <PaginationEllipsis />
              </PaginationItem>
            )}
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === paginationDetails.totalPages}
              className={`${currentPage === paginationDetails.totalPages ? "cursor-not-allowed line-through opacity-50" : "cursor-pointer"} bg-[#000]/10 text-[13px] font-poppins-rg text-dark-weight-400 dark:text-light-weight-800`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default PaginationComponent;
