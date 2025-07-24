"use client";

import DOMPurify from "dompurify";
import { useEffect, useState } from "react";

const SVGBannerImage = ({ bannerUrl }) => {
  const [fileSanitizedSVG, setFileSanitizedSVG] = useState(null);

  useEffect(() => {
    const fetchSVG = async () => {
      try {
        const svgResponse = await fetch(bannerUrl);
        const rawSVG = await svgResponse.text();
        const cleanSVG = DOMPurify.sanitize(rawSVG, {
          USE_PROFILES: { svg: true, html: false },
        });

        setFileSanitizedSVG(cleanSVG);
      } catch (error) {
        console.log(`Error in fetching SVG CLIENT: ${error}`);
      }
    };

    fetchSVG();
  }, [bannerUrl]);
  return (
    <div
      className="w-full h-full"
      dangerouslySetInnerHTML={{ __html: fileSanitizedSVG }}
    />
  );
};

export default SVGBannerImage;
