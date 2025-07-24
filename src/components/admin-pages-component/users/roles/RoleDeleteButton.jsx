"use client";

import { deletePerticularRole } from "@/actions/apiClientActions/user";
import { DeletePopup } from "@/components";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useErrorToast, useSuccessToast } from "@/lib/hooks";
import { usePageRefresh } from "@/utils/refreshPage";
import { useState } from "react";
import { LiaSpinnerSolid } from "react-icons/lia";
import { RiDeleteBin2Line } from "react-icons/ri";

const RoleDeleteButton = ({ sessionUserId, roleDetails }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [open, setOpen] = useState(false);
  const { isPending, pageRefresh } = usePageRefresh();

  // NOTE Handle Delete Role functionality
  const handleRoleDelete = async () => {
    if (roleDetails.name === "Admin" || roleDetails.name === "Super Admin") {
      useErrorToast("You cannot delete the Admin or Super Admin role.");
      return;
    }

    setIsProcessing(true);
    const response = await deletePerticularRole(sessionUserId, roleDetails._id);
    if (response.success) {
      useSuccessToast(response.message || "Role deleted successfully.");
      setIsProcessing(false);
      setOpen(false);
      pageRefresh();
    } else {
      useErrorToast(response.message || "Something went wrong.");
      setIsProcessing(false);
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Dialog key="role-delete-dialog" open={open} onOpenChange={setOpen}>
        <DialogTrigger
          disabled={isProcessing || isPending}
          className={`transition-300 rounded-full bg-[#F06548]/20 p-1 md:p-2 text-[#F06548] hover:bg-[#F06548] hover:text-white`}
        >
          {isPending ? (
            <LiaSpinnerSolid
              size={12}
              color="#F06548"
              className="animate-spin"
            />
          ) : (
            <RiDeleteBin2Line size={12} />
          )}
        </DialogTrigger>
        <DeletePopup
          deleteFunction={handleRoleDelete}
          type="role"
          itemName={roleDetails.name}
          isProcessing={isProcessing}
        />
      </Dialog>
    </div>
  );
};

export default RoleDeleteButton;
