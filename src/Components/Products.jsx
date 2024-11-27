import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsAPI,
  fetchCategoriesAPI,
  fetchProductByCategoriesAPI,
} from "../store/reducers/productsReducer";
import {
  productsLoadingSelector,
  productsErrorSelector,
  productsSelector,
  totalProductsSelector,
  productsPagesSelector,
  categoriesSelector,
  selectedCategorySelector,
} from "../store/selectors/productsSelector";
import FormateTable from "./core/TableFormat";
import { useInView } from "react-intersection-observer";
import {
  setLoading,
  setPagination,
  setSelectedCategory,
} from "../store/reducers/productsReducer";
import { useParams, useSearchParams } from "react-router-dom";
import Loading from "../Components/core/Loading";
import ButtonWithIcon from "./core/ButtonWithIcon";
import { useNavigate } from "react-router-dom";

const headerContent = ["Product Name", "Category", "Price", "Rating", "Stock"];
const headers = ["title", "category", "price", "rating", "stock"];

const categoriesConfig = {
  beauty: { icon: "GiLipstick", color: "pink" },
  fragrances: { icon: "GiBrandyBottle", color: "#e8e829" },
  furniture: { icon: "GiBed", color: "#d08484" },
  groceries: { icon: "FaShoppingBag", color: "#9191cf" },
  "home-decoration": { icon: "FaHome", color: "#6fc26f" },
};
const Products = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const products = useSelector(productsSelector);
  const totalProducts = useSelector(totalProductsSelector);
  const productsLoading = useSelector(productsLoadingSelector);
  const productsError = useSelector(productsErrorSelector);
  const pages = useSelector(productsPagesSelector);
  const categories = useSelector(categoriesSelector);
  const selectedCategory = useSelector(selectedCategorySelector);

  const { ref: bottomRef, inView: bottomInView } = useInView({
    threshold: 1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (
      bottomInView &&
      pages.skip <= totalProducts &&
      !Object.keys(params)?.length
    ) {
      dispatch(setLoading(true));
      const timeoutId = setTimeout(() => {
        dispatch(fetchProductsAPI({ skip: pages.skip, limit: pages.limit }));
        dispatch(setPagination(pages.skip));
        searchParams.set("skip", pages.skip);
        setSearchParams(searchParams);
        dispatch(setLoading(false));
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [bottomInView, selectedCategory, params?.category]);

  useEffect(() => {
    dispatch(fetchCategoriesAPI());
  }, []);

  useEffect(() => {
    if (!selectedCategory) {
      navigate(`/products?limit=${pages.limit}&skip=0`);
    }
    if (pages.skip <= totalProducts && selectedCategory) {
      console.log(params?.category);
      dispatch(setLoading(true));
      //UI is working well but beacuse of bottomInView this api calls 2 time, cause bottomInView changes its value 2 times
      const timeoutId = setTimeout(() => {
        dispatch(
          fetchProductByCategoriesAPI({
            skip: pages.skip,
            category: selectedCategory,
            limit: pages.limit,
          })
        );
        if (bottomInView) {
          dispatch(setPagination(pages.skip));
        }
        searchParams.set("skip", pages.skip);
        setSearchParams(searchParams);
        dispatch(setLoading(false));
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [bottomInView, selectedCategory]);

  const navigate = useNavigate();

  const reset = () => {
    dispatch(setSelectedCategory(null));
    navigate(`/products?limit=${pages.limit}&skip=0`);
  };

  const clickOnCategories = (category) => {
    dispatch(setSelectedCategory(category));
    navigate(`/products/${category}?limit=${pages.limit}&skip=${pages.skip}`);
  };

  if (productsError) {
    return <h1 className="text-4xl text-center">Something went wrong....</h1>;
  } else if (products) {
    return (
      <div className="overflow-y-scroll">
        <div className="w-full">
          <div className="flex items-center justify-center my-8 gap-4">
            <ButtonWithIcon
              config={{ icon: "RxCross1", color: "#e75454" }}
              item={{ name: "Reset" }}
              clickButton={() => reset()}
            />
            {categories.map((item, index) => (
              <ButtonWithIcon
                key={index}
                config={categoriesConfig[item?.slug]}
                item={item}
                isActive={params?.category === item?.slug}
                clickButton={() => clickOnCategories(item?.slug)}
              />
            ))}
          </div>
          <FormateTable
            tableName="Product Page"
            headerContent={headerContent}
            headers={headers}
            state={products}
            click={false}
          />
          <div ref={bottomRef} className="h-12 my-5 text-center">
            {!productsLoading && pages.skip >= totalProducts
              ? "No More Products"
              : null}
            {productsLoading ? <Loading /> : null}
            {!productsLoading && pages.skip < totalProducts
              ? "Load more..."
              : null}
          </div>
        </div>
      </div>
    );
  }
};

export default Products;
