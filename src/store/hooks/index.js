"use client";

import { useDispatch, useSelector, useStore } from "react-redux";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes(); // INFO: send data in store

export const useAppSelector = useSelector.withTypes(); // INFO: get data from stroe

export const useAppStore = useStore.withTypes(); // INFO: call the stroe
