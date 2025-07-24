import { combineReducers, configureStore } from "@reduxjs/toolkit";

import layoutReducer from "./features/layoutCustomizer/layoutCustomizerSlice";

// This function creates a new persist store for per request
export const makeStore = () => {
  const rootReducer = combineReducers({
    layout: layoutReducer, // Non-persist reducer
  });

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });

  return { store };
};
