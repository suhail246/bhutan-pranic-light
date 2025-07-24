"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

export const usePageRefresh = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const pageRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return { isPending, pageRefresh };
};
