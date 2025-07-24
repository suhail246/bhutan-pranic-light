"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";

import { makeStore } from "@/store/store";

// StoreProvider renders on the client side and initializes the store (Safe for SSR)
export default function StoreProvider({ children }) {
  const [storeReadyStatus, setStoreReadyStatus] = useState(false);
  const [storeData, setStoreData] = useState(null);

  useEffect(() => {
    const store = makeStore();

    if (store) {
      setStoreData(store); // Set the store when it's ready
      setStoreReadyStatus(true); // Mark store as ready once it's initialized
    }
  }, []);

  // Not to ready state
  if (!storeReadyStatus && !storeData) {
    return null;
  }

  // Ready state
  return <Provider store={storeData.store}>{children}</Provider>;
}
