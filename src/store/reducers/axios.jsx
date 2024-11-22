import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

// pass the baseURL as an object
export const GainerLooserAPI = axios.create({
  // baseURL: `${apiUrl}/query?function=TOP_GAINERS_LOSERS&apikey=${apiKey}`,
  baseURL: `${apiUrl}/query?function=TOP_GAINERS_LOSERS&apikey=demo`,
});

export const fetchCompanyOverview = (symbol) => {
  return axios.get(`${apiUrl}/query`, {
    params: {
      function: "OVERVIEW",
      symbol,
      apikey: apiKey,
    },
  });
};

export const fetchIncomeStatement= (symbol) => {
  return axios.get(`${apiUrl}/query`, {
    params: {
      function: "INCOME_STATEMENT",
      symbol,
      apikey: apiKey,
    },
  });
};