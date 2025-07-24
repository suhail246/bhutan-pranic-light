"use client";

import { debounce } from "lodash";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const SearchContentBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const translate = useTranslations();

  useEffect(() => {
    const currentQuery = searchParams.get("search");
    if (currentQuery) {
      setSearchQuery(currentQuery);
    }
  }, [searchParams]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
      const params = new URLSearchParams(searchParams);
      if (query) {
        params.set("search", query);
      } else {
        params.delete("search");
      }
      router.replace(`?${params.toString()}`, { scroll: false });
    }, 250),
    [searchParams, router]
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  return (
    <div className="w-full md:max-w-[366px] rounded-[14px] border border-black-100 px-[16px] py-[12px] flex items-center gap-3 bg-white">
      <Search size={20} className="text-[#737373]" />

      <input
        type="text"
        placeholder={translate("Search")}
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full text-[16px] text-[#737373] font-candara-rg leading-[150%] tracking-[-2%] border-none outline-none focus:outline-none focus:ring-0 bg-transparent p-0"
      />
    </div>
  );
};

export default SearchContentBox;
