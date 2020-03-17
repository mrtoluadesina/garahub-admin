import { combineReducers } from "redux";
import LoginReducer from "./loginReducers";
import products from "./productReducer"
import orders from "./orderReducer"
import customer from "./customReducer"
import category from "./categoryReducer"
export default combineReducers({
  LoginReducer,
  products,
  orders,
  customer,
  category
});
