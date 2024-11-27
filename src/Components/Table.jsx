import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGainerLooserAPI } from "../store/reducers/gainer&LosserReducer";
import FormateTable from "./core/TableFormat";
import {
  gainerAndLoserErrorSelector,
  gainerAndLoserLoadingSelector,
  metadataSelector,
  gainerSelector,
  loserSelector,
} from "../store/selectors/gainAndLosersSelector";
import { productsPagesSelector } from "../store/selectors/productsSelector";
import { useNavigate } from "react-router-dom";

const Table = () => {
  const headerContent = [
    "Ticker",
    "Price",
    "Change Amount",
    "Change Percentage",
    "Volume",
  ];
  const headers = [
    "ticker",
    "price",
    "change_amount",
    "change_percentage",
    "volume",
  ];

  const dispatch = useDispatch();

  const metadata = useSelector(metadataSelector);
  const gainerData = useSelector(gainerSelector);
  const loserData = useSelector(loserSelector);
  const isLoading = useSelector(gainerAndLoserLoadingSelector);
  const isError = useSelector(gainerAndLoserErrorSelector);
  const pages = useSelector(productsPagesSelector);

  useEffect(() => {
    dispatch(fetchGainerLooserAPI());
  }, []);

  const navigate = useNavigate();

  const goToProducts = () => {
    const limit = pages.limit;
    const skip = pages.skip;
    navigate(`/products?limit=${limit}&skip=${skip}`);
  };

  if (isLoading) {
    return <h1 className="text-4xl text-center">Loading....</h1>;
  } else if (isError) {
    return <h1 className="text-4xl text-center">Something went wrong....</h1>;
  } else if (gainerData || loserData) {
    return (
      <>
        <h1 className="text-4xl text-center my-5">{metadata}</h1>
        <div className="flex items-center justify-center">
          <button
            onClick={goToProducts}
            className="border-2 p-2 text-white bg-gray-500 rounded-lg"
          >
            Products
          </button>
        </div>
        <FormateTable
          tableName="Top Gainer"
          headerContent={headerContent}
          headers={headers}
          state={gainerData}
          click={true}
        />
        <FormateTable
          tableName="Top Loser"
          headerContent={headerContent}
          headers={headers}
          state={loserData}
          click={true}
        />
      </>
    );
  }
};

export default Table;
