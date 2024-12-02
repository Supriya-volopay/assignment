import { createSelector } from "@reduxjs/toolkit";

export const notificationStore = (store) => store.notificationSlice;

export const textSelector = createSelector(
  notificationStore,
  (info) => info.text
);

export const bgColorSelector = createSelector(
  notificationStore,
  (info) => info.bg_color
);
export const textColorSelector = createSelector(
  notificationStore,
  (info) => info.text_color
);
