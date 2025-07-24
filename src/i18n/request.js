import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookie = await cookies();

  const locale = cookie.get("language")?.value
    ? cookie.get("language").value
    : "en";

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
