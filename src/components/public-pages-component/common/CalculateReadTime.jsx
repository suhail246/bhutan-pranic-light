"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

const CalculateReadTime = ({
  elementId = "",
  text = "",
  textSize = "text-[16px]",
}) => {
  const [readTime, setReadTime] = useState(0);

  const translate = useTranslations();

  const extractTextReadTimeFromElementId = useCallback(() => {
    const element = document.getElementById(elementId);
    console.log(element);

    if (element) {
      const text = element.innerText || element.textContent;
      console.log(text);

      const wordsCount = text
        .split(/\s+/)
        .filter((word) => word.length > 0).length;

      const wordsPerMinute = 200; // Adjust based on reading speed
      const readTimeMinutes = Math.ceil(wordsCount / wordsPerMinute);

      setReadTime(readTimeMinutes);
    }
  }, [elementId]);

  const extractTextReadTimeFromText = useCallback(() => {
    const temDiv = document.createElement("div");
    temDiv.innerHTML = text;

    const plainText = temDiv.textContent || temDiv.innerText || "";

    const wordsCount = plainText
      .split(/\s+/)
      .filter((word) => word.length > 0).length;

    const wordsPerMinute = 200; // Adjust based on reading speed
    const readTimeMinutes = Math.ceil(wordsCount / wordsPerMinute);

    setReadTime(readTimeMinutes);
  }, [text]);

  useEffect(() => {
    if (elementId) {
      extractTextReadTimeFromElementId();
    }
    if (text) {
      extractTextReadTimeFromText();
    }
  }, [elementId, text]);

  return (
    <>
      {readTime > 0 ? (
        <span
          className={`${textSize} text-[#737373] font-candara-rg leading-[150%] tracking-[-2$%]`}
        >
          {`${translate("Read Time")} - ${readTime} ${translate("min")}`}
        </span>
      ) : null}
    </>
  );
};

export default CalculateReadTime;
