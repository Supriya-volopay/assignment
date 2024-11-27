import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GainerLooserAPI } from "./axios.jsx";
import * as gainerLooserData from "../../data/TopGainerLooser.json";

let isMockEnable = true;

// Create a shallow copy of json
const mockData = { ...gainerLooserData };

const intialStateData = {
  isLoading: false,
  metadata: "",
  topGainer: [],
  topLoser: [],
  isError: null,
};

const GainerLooserSlice = createSlice({
  name: "gainersLosersSlice",
  initialState: intialStateData,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setMetadata: (state, action) => {
      state.metadata = action.payload;
    },
    setGainer: (state, action) => {
      state.topGainer = action.payload;
    },
    setLoser: (state, action) => {
      state.topLoser = action.payload;
    },
    setError: (state, action) => {
      state.isError = action.payload;
    },
  },
});

// Action
export const fetchGainerLooserAPI = createAsyncThunk(
  "fetchAPI",
  async (params, { dispatch }) => {
    try {
      if (isMockEnable) {
        dispatch(setMetadata(mockData.metadata));
        dispatch(setGainer(mockData.top_gainers));
        dispatch(setLoser(mockData.top_losers));
      } else {
        const response = await GainerLooserAPI.get("");
        dispatch(setMetadata(response?.data?.metadata));
        dispatch(setGainer(response?.data?.top_gainers));
        dispatch(setLoser(response?.data?.top_losers));
      }
    } catch (error) {
      console.log("Error fetching data:", error);
      throw error;
    }
  }
);

export const { setLoading, setMetadata, setGainer, setLoser, setError } =
  GainerLooserSlice.actions;

export default GainerLooserSlice.reducer;
