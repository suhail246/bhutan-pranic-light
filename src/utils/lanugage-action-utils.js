"use server";

import { cookies } from "next/headers";

// Get Language from Cookie
export const getLanguageFromCookie = async () => {
  const cookie = await cookies();

  const language = cookie.get("language");

  if (language) {
    return language.value;
  } else {
    return "en";
  }
};
