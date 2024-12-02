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
import { useNavigate } from "react-router-dom";

const headers = [
  { name: "Ticker", slug: "ticker" },
  { name: "Price", slug: "price" },
  { name: "Change Amount", slug: "change_amount" },
  { name: "Change Percentage", slug: "change_percentage" },
  { name: "Volume", slug: "volume" },
];

const Table = () => {
  const dispatch = useDispatch();

  const metadata = useSelector(metadataSelector);
  const gainerData = useSelector(gainerSelector);
  const loserData = useSelector(loserSelector);
  const isLoading = useSelector(gainerAndLoserLoadingSelector);
  const isError = useSelector(gainerAndLoserErrorSelector);

  useEffect(() => {
    dispatch(fetchGainerLooserAPI());
  }, []);

  const navigate = useNavigate();

  const goToProducts = () => {
    navigate(`/products`);
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
          headers={headers}
          state={gainerData}
          isClickable={true}
          isAction={false}
        />
        <FormateTable
          tableName="Top Loser"
          headers={headers}
          state={loserData}
          isClickable={true}
          isAction={false}
        />
      </>
    );
  }
};

export default Table;
