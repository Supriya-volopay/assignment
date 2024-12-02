import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const apiUrl2 = import.meta.env.VITE_API_URL2;

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

export const fetchIncomeStatement = (symbol) => {
  return axios.get(`${apiUrl}/query`, {
    params: {
      function: "INCOME_STATEMENT",
      symbol,
      apikey: apiKey,
    },
  });
};

export const fetchProducts = (skip, limit) => {
  return axios.get(`${apiUrl2}/products`, {
    params: {
      limit: limit,
      skip: skip,
    },
  });
};

export const fetchCategories = () => {
  return axios.get(`${apiUrl2}/products/categories`);
};

export const fetchCategoriesProduct = (category, skip, limit) => {
  return axios.get(`${apiUrl2}/products/category/${category}`, {
    params: {
      limit: limit,
      skip: skip,
    },
  });
};

export const updateProductAPI = (id, payload) => {
  return axios.put(`${apiUrl2}/products/${id}`, payload);
};

export const addProductAPI = (payload) => {
  return axios.post(`${apiUrl2}/products/add`, payload);
};
