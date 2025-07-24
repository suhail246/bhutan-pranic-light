import React from "react";
import { FiActivity, FiPlusCircle } from "react-icons/fi";

const AddPrdocutsAndSheet = () => {
  return (
    <>
      <button
        type="button"
        className="transition-300 group flex items-center gap-2 rounded-[5px] bg-[#0AB39C]/10 px-3 py-2 font-poppins-rg text-[13px] text-[#0AB39C] hover:bg-[#0AB39C] hover:text-white"
      >
        <FiPlusCircle
          size={13}
          className="text-[#0AB39C] group-hover:text-white"
        />
        Add Products
      </button>
      <button
        type="button"
        className="transition-300 group rounded-[5px] bg-[#299CDB]/10 px-3 py-2 hover:bg-[#299CDB]"
      >
        <FiActivity
          size={13}
          className="text-[#299CDB] group-hover:text-white"
        />
      </button>
    </>
  );
};

export default AddPrdocutsAndSheet;
