"use server";

import { cookies } from "next/headers";

export default async function setLanguageAction(value) {
  const cookie = await cookies();
  cookie.set("language", value);
}
