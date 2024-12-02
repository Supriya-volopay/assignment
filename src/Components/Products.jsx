import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsAPI,
  fetchCategoriesAPI,
  fetchProductByCategoriesAPI,
  putUpdateProductAPI,
  postAddProductAPI,
  setLoading,
  setPagination,
  setSelectedCategory,
  setNewProduct,
} from "../store/reducers/productsReducer";
import {
  productsLoadingSelector,
  productsErrorSelector,
  productsSelector,
  totalProductsSelector,
  productsPagesSelector,
  categoriesSelector,
  selectedCategorySelector,
  newProductSelector,
} from "../store/selectors/productsSelector";
import FormateTable from "./core/TableFormat";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "react-router-dom";
import Loading from "../Components/core/Loading";
import ButtonWithIcon from "./core/ButtonWithIcon";
import { useNavigate } from "react-router-dom";
import { searchParams } from "../constants/searchParams";
import Modal from "../Components/core/Modal";
import Notification from "../Components/core/NotificationModal";
import {
  textSelector,
  bgColorSelector,
  textColorSelector,
} from "../store/selectors/notificationSelector";

const headers = [
  { name: "Product Name", slug: "title" },
  { name: "Category", slug: "category" },
  { name: "Price", slug: "price" },
  { name: "Rating", slug: "rating" },
  { name: "Stock", slug: "stock" },
];

const categoriesConfig = {
  beauty: { icon: "GiLipstick", color: "bg-pink-400" },
  fragrances: { icon: "GiBrandyBottle", color: "bg-amber-400" },
  furniture: { icon: "GiBed", color: "bg-orange-400" },
  groceries: { icon: "FaShoppingBag", color: "bg-violet-500" },
  "home-decoration": { icon: "FaHome", color: "bg-lime-500" },
};

const newProductField = {
  title: "",
  category: "",
  price: "",
  rating: "",
  stock: "",
};

const Products = () => {
  const dispatch = useDispatch();
  const [searchParam, setSearchParam] = useSearchParams();
  const products = useSelector(productsSelector);
  const totalProducts = useSelector(totalProductsSelector);
  const productsLoading = useSelector(productsLoadingSelector);
  const productsError = useSelector(productsErrorSelector);
  const pages = useSelector(productsPagesSelector);
  const categories = useSelector(categoriesSelector);
  const selectedCategory = useSelector(selectedCategorySelector);
  const newProduct = useSelector(newProductSelector);
  const infoText = useSelector(textSelector);
  const infoBgColor = useSelector(bgColorSelector);
  const infoTextColor = useSelector(textColorSelector);

  const { ref: bottomRef, inView: bottomInView } = useInView({
    threshold: 1,
    triggerOnce: false,
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [isInfo, setIsInfo] = useState(false);

  useEffect(() => {
    dispatch(fetchCategoriesAPI());
  }, []);

  const categoryParam = searchParam.get(searchParams.CATEGORY);

  useEffect(() => {
    if (selectedCategory && categoryParam !== selectedCategory) {
      searchParam.set(searchParams.CATEGORY, selectedCategory);
      setSearchParam(searchParam);
    }

    const shouldFetchByCategory = categoryParam && pages.skip <= totalProducts;

    const shouldFetchProducts =
      !categoryParam && bottomInView && pages.skip <= totalProducts;

    if (shouldFetchByCategory || shouldFetchProducts) {
      dispatch(setLoading(true));

      const timeoutId = setTimeout(() => {
        if (shouldFetchByCategory) {
          dispatch(
            fetchProductByCategoriesAPI({
              skip: pages.skip,
              category: categoryParam,
              limit: pages.limit,
            })
          );
        } else if (shouldFetchProducts) {
          dispatch(fetchProductsAPI({ skip: pages.skip, limit: pages.limit }));
        }
        if (bottomInView) {
          dispatch(setPagination(pages.skip));
        }
        dispatch(setLoading(false));
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [bottomInView, selectedCategory, categoryParam]);

  useEffect(() => {
    if (newProduct?.hasOwnProperty("id")) {
      dispatch(putUpdateProductAPI({ updatedProduct: newProduct }));
    } else if (newProduct) {
      dispatch(postAddProductAPI({ newProduct: newProduct }));
    }

    // const timeoutId = setTimeout(() => {
    //   setIsInfo(true);
    // }, 2000);
    // return () => clearTimeout(timeoutId);
  }, [newProduct]);

  const navigate = useNavigate();

  const reset = () => {
    dispatch(setSelectedCategory(null));
    searchParam.set(searchParams.CATEGORY, selectedCategory);
    navigate(`/products`);
  };

  const clickOnCategories = (category) => {
    dispatch(setSelectedCategory(category));
  };

  const handleUpdateAndAddProduct = (data) => {
    dispatch(setNewProduct(data));
  };

  if (productsError) {
    return <h1 className="text-4xl text-center">Something went wrong....</h1>;
  } else if (products) {
    return (
      <div className="overflow-y-scroll">
        <div className="w-full">
          {/* {isInfo && (
            <Notification
              message={infoText}
              bgColor={infoBgColor}
              textColor={infoTextColor}
              duration={3000}
            />
          )} */}

          <div className="flex items-center justify-center my-8 gap-4">
            <ButtonWithIcon
              config={{ icon: "RxCross1", color: "bg-red-600" }}
              item={{ name: "Reset" }}
              clickButton={() => reset()}
            />
            {categories.map((item, index) => (
              <ButtonWithIcon
                key={index}
                config={categoriesConfig[item?.slug]}
                item={item}
                isActive={categoryParam === item?.slug}
                clickButton={() => clickOnCategories(item?.slug)}
              />
            ))}
            <ButtonWithIcon
              config={{ icon: "AiFillProduct", color: "bg-blue-400" }}
              item={{ name: "Add New Product" }}
              clickButton={(e) => {
                e.stopPropagation();
                setModalOpen(true);
              }}
            />
            {isModalOpen && (
              <Modal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleUpdateAndAddProduct}
                topic="Add New Product"
                field={headers}
                fieldData={newProductField}
              />
            )}
          </div>
          <FormateTable
            tableName="Product Page"
            headers={headers}
            state={products}
            isClickable={false}
            isAction={true}
            action="Update"
            onSave={handleUpdateAndAddProduct}
          />
          <div ref={bottomRef} className="h-12 my-5 text-center">
            {!productsLoading && pages.skip >= totalProducts
              ? "No More Products"
              : null}
            {productsLoading ? <Loading extraClasses="h-12" /> : null}
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
