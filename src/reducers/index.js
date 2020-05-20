import { combineReducers } from "redux";
import LoginReducer from "./loginReducers";
import products from "./productReducer";
import orders from "./orderReducer";
import transactions from "./transactionReducer";
import discounts from "./discountReducer";
import customer from "./customReducer";
import category from "./categoryReducer";
import brands from "./brandsReducer";
export default combineReducers({
  LoginReducer,
  products,
  orders,
  transactions,
  discounts,
  customer,
  category,
  brands,
});
