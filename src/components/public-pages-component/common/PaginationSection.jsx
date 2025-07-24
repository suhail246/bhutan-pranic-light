"use client";

import { debounce } from "lodash";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const PaginationSection = ({ paginationDetails, selectedPage }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Determine the current page, defaulting to 1 if no value is provided
  const currentPage = parseInt(
    selectedPage || paginationDetails?.currentPage || "1"
  );

  // Debounced function to handle page changes with a delay of 250ms
  const debouncedPageChange = useCallback(
    debounce((page) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", page);
      router.push(`?${params.toString()}`, undefined, { shallow: true });
    }, 250),
    [searchParams, router]
  );
  // Fujairah Freezone Internal

  // Function to handle page changes
  const handlePageChange = (pageNumber) => {
    // Prevent invalid page numbers (less than 1 or greater than total pages)
    if (pageNumber < 1 || pageNumber > paginationDetails.totalPages) return;

    debouncedPageChange(pageNumber);
  };

  // Function to render the page number buttons
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
        <button
          key={pageIndex}
          onClick={() => handlePageChange(pageIndex)}
          className={`${
            pageIndex === currentPage
              ? "bg-[#FE7437] text-white"
              : "text-black-500 border border-black-100 bg-white"
          } min-w-[50px] h-[50px] cursor-pointer text-[28px] font-candara-rg p-[8px] rounded-[10px] flex items-center justify-center`}
        >
          {pageIndex < 10 ? `0${pageIndex}` : pageIndex}
        </button>
      );
    }

    return buttons;
  };

  // Function to render navigation buttons (left and right arrows)
  const renderNavigationButtons = (direction) => {
    const directionText = direction.toLowerCase();

    return (
      <button
        key={directionText}
        className="w-[50px] h-[50px] p-[8px] rounded-[10px] border border-black-100 flex items-center justify-center bg-white"
        disabled={
          directionText && directionText === "left"
            ? currentPage === 1
            : currentPage === paginationDetails.totalPages
        }
        onClick={() =>
          handlePageChange(
            directionText && directionText === "left"
              ? currentPage - 1
              : currentPage + 1
          )
        }
      >
        <div className="size-[28px] relative">
          <Image
            src={
              directionText && directionText === "left"
                ? "/bin-yaber-assets/icons/arrows-left/arrow-left-linear.png"
                : "/bin-yaber-assets/icons/arrows-right/arrow-right-linear.png"
            }
            alt={
              directionText && directionText === "left"
                ? "Left Arrow"
                : "Right Arrow"
            }
            fill
            sizes="(max-width: 768px) 100px, 100px"
            className="object-cover"
          />
        </div>
      </button>
    );
  };

  return (
    <>
      {/* Render left arrow if there are more than 4 pages */}
      {paginationDetails.totalPages > 4 && renderNavigationButtons("left")}

      {/* Render page number buttons */}
      {(renderPageNumbers() || []).map((button, index) => button)}

      {/* Render ellipsis if there are more pages after the current range */}
      {paginationDetails.totalPages > 4 &&
        currentPage < paginationDetails.totalPages && (
          <Ellipsis className="text-black-300" />
        )}

      {/* Render right arrow if there are more than 4 pages */}
      {paginationDetails.totalPages > 4 && renderNavigationButtons("right")}
    </>
  );
};

export default PaginationSection;
