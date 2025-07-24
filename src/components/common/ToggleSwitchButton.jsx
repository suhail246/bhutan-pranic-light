"use client";

import { useErrorToast, useSuccessToast } from "@/lib/hooks";
import { usePageRefresh } from "@/utils/refreshPage";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { PulseLoader } from "react-spinners";
import { Switch } from "../ui/switch";

const SwitchButton = ({
  args = [],
  status,
  apiCallback,
  customBodySize,
  customThumbSize,
  extraArguments,
  refreshIconSize = 5,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { isPending, pageRefresh } = usePageRefresh();

  const handleStatusChange = async () => {
    setIsProcessing(true);
    const response = await apiCallback(...args);

    if (response.success) {
      useSuccessToast(response.message);
      setIsProcessing(false);
      pageRefresh();
    } else {
      setIsProcessing(false);
      useErrorToast(response.message);
    }
  };

  if (isPending) {
    return (
      <RefreshCcw
        size={refreshIconSize}
        color="#9fa1ad"
        className="animate-spin"
      />
    );
  }

  if (isProcessing) {
    return <PulseLoader size={5} color="#9fa1ad" />;
  }

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Switch
        checked={status}
        onCheckedChange={handleStatusChange}
        className={`data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-slate-200 dark:data-[state=checked]:bg-green-500 dark:data-[state=unchecked]:bg-[#000]/20 ${customBodySize ? customBodySize : "h-3 w-7"}`}
        thumbClassName={`data-[state=checked]:bg-[#fff] data-[state=unchecked]:bg-[#fff] dark:data-[state=checked]:bg-[#fff] dark:data-[state=unchecked]:bg-[#fff]/20 ${customThumbSize ? customThumbSize : "h-2 w-2"}`}
      />
    </div>
  );
};

export default SwitchButton;
