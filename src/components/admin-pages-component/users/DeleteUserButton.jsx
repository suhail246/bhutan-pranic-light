"use client";

import { deletePerticularUser } from "@/actions/apiClientActions/user";
import { DeletePopup } from "@/components";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useErrorToast, useSuccessToast } from "@/lib/hooks";
import { usePageRefresh } from "@/utils/refreshPage";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";

const DeleteUserButton = ({ sessionId, targetDetails }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [open, setOpen] = useState(false);
  const { isPending, pageRefresh } = usePageRefresh();

  const handlePostDelete = async () => {
    setIsProcessing(true);
    const response = await deletePerticularUser(sessionId, targetDetails._id);

    if (response.success) {
      setIsProcessing(false);
      useSuccessToast(response.message || "User deleted successfully.");
      setOpen(false);
      pageRefresh();
    } else {
      setIsProcessing(false);
      useErrorToast(response.message || "Something went wrong.");
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()} className="w-full">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          disabled={isProcessing}
          className={`text-red-600 text-[13px] font-poppins-rg flex items-center justify-between gap-3 bg-red-500/10 w-full rounded-sm p-2 hover:bg-red-500 transition-300 hover:text-white`}
        >
          {isPending ? (
            <>
              <span>Refreshing...</span>
              <RefreshCcw size={15} className="animate-spin" />
            </>
          ) : (
            <>
              <span>Delete</span>
              <RiDeleteBin2Line size={15} />
            </>
          )}
        </DialogTrigger>
        <DeletePopup
          deleteFunction={handlePostDelete}
          type="user"
          itemName={targetDetails.username}
          isProcessing={isProcessing}
        />
      </Dialog>
    </div>
  );
};

export default DeleteUserButton;
