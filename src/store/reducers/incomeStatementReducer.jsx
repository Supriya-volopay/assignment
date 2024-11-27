import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchIncomeStatement } from "./axios.jsx";
import * as incomeStatement from "../../data/incomeStatement.json";

let isMockEnable = true;

// Create a shallow copy of json
const mockData = { ...incomeStatement };

const intialStateData = {
  isLoading: false,
  annualReports: [],
  quarterlyReports: [],
  isError: null,
};

const IncomeStatementSlice = createSlice({
  name: "incomeStatementSlice",
  initialState: intialStateData,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setAnnualReports: (state, action) => {
      state.annualReports = action.payload;
    },
    setQuarterlyReports: (state, action) => {
      state.quarterlyReports = action.payload;
    },
    setError: (state, action) => {
      state.isError = action.payload;
    },
  },
});

export const fetchIncomeStatementAPI = createAsyncThunk(
  "fetchIncomeStatementAPI",
  async ({ param }, { dispatch }) => {
    try {
      if (isMockEnable) {
        dispatch(setAnnualReports(mockData.annualReports));
        dispatch(setQuarterlyReports(mockData.quarterlyReports));
      } else {
        const response = await fetchIncomeStatement(param.ticker);
        dispatch(setAnnualReports(response?.annualReports));
        dispatch(setQuarterlyReports(response?.quarterlyReports));
      }
    } catch (error) {
      console.log("Error fetching data:", error);
      throw error;
    }
  }
);

export const { setLoading, setAnnualReports, setQuarterlyReports, setError } =
  IncomeStatementSlice.actions;

export default IncomeStatementSlice.reducer;
