import { createSlice } from "@reduxjs/toolkit";

const intialStateData = {
  text: "",
  bg_color: "",
  text_color: "",
};

const NotificationSlice = createSlice({
  name: "notificationSlice",
  initialState: intialStateData,
  reducers: {
    setText: (state, action) => {
      state.text = action.payload;
    },
    setBgColor: (state, action) => {
      state.bg_color = action.payload;
    },
    setTextColor: (state, action) => {
      state.text_color = action.payload;
    },
  },
});

export const { setText, setBgColor, setTextColor } = NotificationSlice.actions;

export default NotificationSlice.reducer;
