"use client";

import ROUTES from "@/constants/routes";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

const HandleSessionEnd = () => {
  const handleLogout = () => {
    signOut({
      callbackUrl: ROUTES.HOME,
    });
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return null;
};

export default HandleSessionEnd;
