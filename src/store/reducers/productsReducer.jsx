import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProducts,
  fetchCategories,
  fetchCategoriesProduct,
  updateProductAPI,
  addProductAPI,
} from "./axios";

// import {
//   setText,
//   setBgColor,
//   setTextColor,
// } from "../reducers/notificationReducer";

import { info } from "../../constants/notification";
import { getNotification } from "../../common/utils";

const intialStateData = {
  isLoading: false,
  isError: null,
  products: [],
  totalProduct: 0,
  pagination: { limit: 15, skip: 0, pageNo: 0 },
  categories: [],
  selectedCategory: null,
  newProduct: null,
};

// const updateNotification = Notification({message: info.UPDATE.MESSAGE, duration: 3000, bgColor: info.UPDATE.BG_COLOR, textColor: info.UPDATE.TEXT_COLOR});

const ProductsSlice = createSlice({
  name: "productsSlice",
  initialState: intialStateData,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.isError = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    appendProducts: (state, action) => {
      state.products = [...state.products, ...action.payload];
    },
    appendOneProduct: (state, action) => {
      state.products = [action.payload, ...state.products];
    },
    setPagination: (state, action) => {
      state.pagination.skip = action.payload + state.pagination.limit;
      state.pagination.pageNo = state.pagination.skip / state.pagination.limit;
    },
    setTotalProducts: (state, action) => {
      state.totalProduct = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.pagination.skip = 0;
    },
    setNewProduct: (state, action) => {
      state.newProduct = action.payload;
    },
    setUpdateProduct: (state, action) => {
      const newProduct = action.payload;
      state.products = state.products.map((product) =>
        product.id === newProduct.id ? { ...product, ...newProduct } : product
      );
    },
  },
});

export const fetchProductsAPI = createAsyncThunk(
  "products",
  async ({ skip, limit }, { dispatch }) => {
    try {
      const response = await fetchProducts(skip, limit);
      if (skip === 0) {
        dispatch(setProducts(response?.data?.products));
      } else {
        dispatch(appendProducts(response?.data?.products));
      }
      dispatch(setTotalProducts(response?.data?.total));
    } catch (error) {
      console.log("Error fetching data:", error);
      throw error;
    }
  }
);

export const fetchCategoriesAPI = createAsyncThunk(
  "products/fetchCategories",
  async (param, { dispatch }) => {
    try {
      const response = await fetchCategories();
      dispatch(setCategories(response?.data.slice(0, 5)));
    } catch (error) {
      console.log("Error fetching data:", error);
      throw error;
    }
  }
);

export const fetchProductByCategoriesAPI = createAsyncThunk(
  "products/fetchCategory/product",
  async ({ skip, category, limit }, { dispatch }) => {
    try {
      const response = await fetchCategoriesProduct(category, skip, limit);
      if (skip === 0) {
        dispatch(setProducts(response?.data?.products));
      } else {
        dispatch(appendProducts(response?.data?.products));
      }
      dispatch(setTotalProducts(response?.data?.total));
    } catch (error) {
      console.log("Error fetching data:", error);
      throw error;
    }
  }
);

export const putUpdateProductAPI = createAsyncThunk(
  "products/updateProduct",
  async ({ updatedProduct }, { dispatch }) => {
    try {
      const payload = {
        title: updatedProduct?.title,
        category: updatedProduct?.category,
        price: updatedProduct?.price,
        rating: updatedProduct?.rating,
        stock: updatedProduct?.stock,
      };
      const response = await updateProductAPI(updatedProduct?.id, payload);
      dispatch(setUpdateProduct(response?.data));
      getNotification({
        message: info.UPDATE.MESSAGE,
        duration: 3000,
        bgColor: info.UPDATE.BG_COLOR,
        textColor: info.UPDATE.TEXT_COLOR,
      });
      // dispatch(setText(info.UPDATE.MESSAGE));
      // dispatch(setBgColor(info.UPDATE.BG_COLOR));
      // dispatch(setTextColor(info.UPDATE.TEXT_COLOR));
    } catch (error) {
      // dispatch(setText(info.ERROR.MESSAGE));
      // dispatch(setBgColor(info.ERROR.BG_COLOR));
      // dispatch(setTextColor(info.ERROR.TEXT_COLOR));
      console.log("Error fetching data:", error);
      throw error;
    }
  }
);

export const postAddProductAPI = createAsyncThunk(
  "products/addProduct",
  async ({ newProduct }, { dispatch }) => {
    try {
      const payload = {
        title: newProduct?.title,
        category: newProduct?.category,
        price: newProduct?.price,
        rating: newProduct?.rating,
        stock: newProduct?.stock,
      };
      const response = await addProductAPI(payload);
      dispatch(appendOneProduct(response?.data));
      // dispatch(setText(info.ADD.MESSAGE));
      // dispatch(setBgColor(info.ADD.BG_COLOR));
      // dispatch(setTextColor(info.ADD.TEXT_COLOR));
    } catch (error) {
      // dispatch(setText(info.ERROR.MESSAGE));
      // dispatch(setBgColor(info.ERROR.BG_COLOR));
      // dispatch(setTextColor(info.ERROR.TEXT_COLOR));
      console.log("Error fetching data:", error);
      throw error;
    }
  }
);

export const {
  setLoading,
  setProducts,
  setError,
  setTotalProducts,
  appendProducts,
  appendOneProduct,
  setPagination,
  setCategories,
  setSelectedCategory,
  setUpdateProduct,
  setNewProduct,
} = ProductsSlice.actions;

export default ProductsSlice.reducer;
