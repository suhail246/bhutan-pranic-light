"use client";

import { DeletePopup } from "@/components";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useErrorToast, useSuccessToast } from "@/lib/hooks";
import { usePageRefresh } from "@/utils/refreshPage";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { CgDanger } from "react-icons/cg";
import { RiDeleteBin2Line } from "react-icons/ri";

const DeleteButton = ({
  userId,
  targetDetails,
  targetType,
  targetName,
  targetKeyName = "slug",
  targetAlternateKeyName = "none",
  apiCallback,
  isDefault = false,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [open, setOpen] = useState(false);
  const { isPending, pageRefresh } = usePageRefresh();

  // Handle Delete functionality
  const handleDelete = async () => {
    setIsProcessing(true);
    const response = await apiCallback(
      userId,
      targetDetails?.[targetKeyName] ||
        targetDetails?.[targetAlternateKeyName]?.[targetKeyName] ||
        "",
      targetDetails._id
    );

    if (response.success) {
      useSuccessToast(response.message || "Item deleted successfully.");
      setIsProcessing(false);
      setOpen(false);
      pageRefresh();
    } else {
      setIsProcessing(false);
      useErrorToast(response.message || "Something went wrong.");
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          disabled={isProcessing || isDefault}
          className={`transition-300 rounded-full bg-[#F06548]/20 p-2 text-[#F06548] ${isDefault ? "cursor-not-allowed" : "hover:bg-[#F06548] hover:text-white"}`}
        >
          {isPending ? (
            <RefreshCcw size={12} className="animate-spin" />
          ) : isDefault ? (
            <CgDanger size={12} />
          ) : (
            <RiDeleteBin2Line size={12} />
          )}
        </DialogTrigger>
        <DeletePopup
          deleteFunction={handleDelete}
          type={targetType}
          itemName={targetName}
          isProcessing={isProcessing}
        />
      </Dialog>
    </div>
  );
};

export default DeleteButton;
