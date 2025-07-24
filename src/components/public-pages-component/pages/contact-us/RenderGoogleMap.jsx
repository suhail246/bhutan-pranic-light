"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";
import { DataNotFound } from "../..";

const RenderGoogleMap = ({ lat, lng }) => {
  const position = useMemo(
    () => ({
      lat: !isNaN(parseFloat(lat)) ? parseFloat(lat) : 0,
      lng: !isNaN(parseFloat(lng)) ? parseFloat(lng) : 0,
    }),
    [lat, lng]
  );

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  });
  const [map, setMap] = useState(null);
  const translate = useTranslations();

  // On Load
  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  // On Component Unmount
  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Load Error
  if (loadError || position.lat === 0 || position.lng === 0)
    return <DataNotFound notFoundText={translate("Google Map not found")} />;
  // Loading
  if (!isLoaded) return <Skeleton className="w-full h-[290px] md:h-[517px]" />;

  return (
    <div className="w-full h-[290px] md:h-[517px] rounded-[14px] overflow-hidden">
      <GoogleMap
        mapContainerClassName="w-full h-full"
        center={position}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
      ></GoogleMap>
    </div>
  );
};

export default RenderGoogleMap;
