"use client";

import { fileToggleDefaultStatus } from "@/actions/apiClientActions/files";
import { Switch } from "@/components/ui/switch";
import { useErrorToast, useSuccessToast } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PulseLoader } from "react-spinners";

const DefaultSwitch = ({ isDefault, fileKey, userId }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const onDefaultChange = async () => {
    setIsProcessing(true);
    const { success, message } = await fileToggleDefaultStatus(fileKey, userId);

    if (success) {
      setIsProcessing(false);
      useSuccessToast(message);
      router.refresh();
    } else {
      setIsProcessing(false);
      useErrorToast(message);
    }
  };

  return (
    <>
      {isProcessing ? (
        <PulseLoader size={5} color="#9fa1ad" />
      ) : (
        <Switch
          checked={isDefault}
          onCheckedChange={onDefaultChange}
          className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-slate-200 dark:data-[state=checked]:bg-green-500 dark:data-[state=unchecked]:bg-[#000]/20 h-3 w-7"
          thumbClassName="data-[state=checked]:bg-[#fff] data-[state=unchecked]:bg-[#fff] dark:data-[state=checked]:bg-[#fff] dark:data-[state=unchecked]:bg-[#fff]/20 h-2 w-2"
        />
      )}
    </>
  );
};

export default DefaultSwitch;
