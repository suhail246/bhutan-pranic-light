"use client";

import { globalStyleObj } from "@/app/assets/styles";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LiaSpinnerSolid } from "react-icons/lia";
import { RiDeleteBin5Line } from "react-icons/ri";

const DeletePopup = ({ deleteFunction, type, itemName, isProcessing }) => {
  const onDelete = () => {
    deleteFunction();
  };

  return (
    <DialogContent
      className={`${globalStyleObj.backgroundLight900Dark300} border-none font-poppins-rg`}
      aria-hidden="undefined"
    >
      <DialogHeader>
        <DialogTitle className="text-left text-[16px] text-dark-weight-400 dark:text-light-weight-550">
          Are you absolutely sure?
        </DialogTitle>
        <DialogDescription className="text-left text-light-weight-400 text-[13px] italic">
          This action cannot be undone. This will permanently delete your
          <span className="text-dark-weight-600 dark:text-light-weight-900 font-poppins-md mx-2 not-italic">
            {itemName}
          </span>
          {type}.
        </DialogDescription>

        <DialogFooter>
          <button
            type="button"
            className="bg-red-500/20 px-5 py-2 rounded-sm text-red-500 text-[13px] hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out flex items-center gap-2"
            onClick={onDelete}
          >
            {isProcessing ? (
              <>
                <LiaSpinnerSolid size={12} className="animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <RiDeleteBin5Line size={12} />
                <span>Yes, I'm sure</span>
              </>
            )}
          </button>
        </DialogFooter>
      </DialogHeader>
    </DialogContent>
  );
};

export default DeletePopup;
