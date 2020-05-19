import { combineReducers } from "redux";
import LoginReducer from "./loginReducers";
import products from "./productReducer"
import orders from "./orderReducer"
import transactions from "./transactionReducer";
import discounts from "./discountReducer";
import customer from "./customReducer"
import category from "./categoryReducer"
export default combineReducers({
  LoginReducer,
  products,
  orders,
  transactions,
  discounts,
  customer,
  category
});
