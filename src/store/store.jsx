import { configureStore } from "@reduxjs/toolkit";
import GainerLooserReducer from "./reducers/gainer&LosserReducer";
import CompanyOverviewReducer from "./reducers/companyOverviewReducer";
import IncomeStatementReducer from "./reducers/incomeStatementReducer";
import ProductsReducer from "./reducers/productsReducer";
import NotificationReducer from "./reducers/notificationReducer";

export const store = configureStore({
  reducer: {
    gainersLosersSlice: GainerLooserReducer,
    companyOverviewSlice: CompanyOverviewReducer,
    incomeStatementSlice: IncomeStatementReducer,
    productsSlice: ProductsReducer,
    notificationSlice: NotificationReducer,
  },
});
