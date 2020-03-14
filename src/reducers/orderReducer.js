import {
  FETCH_ORDERS_END,
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
  CREATE_ORDERS_END,
  CREATE_ORDERS_FAIL,
  CREATE_ORDERS_START,
  CREATE_ORDERS_SUCCESS
} from "../actions/types";

const initialState = {
  orders: [],
  orderError: "",
  orderLoading: false,
  orderSuccess: false
};

export default function orders(state = initialState, action) {
  switch (action.type) {
    case FETCH_ORDERS_START:
      return {
        ...state,
        orderLoading: action.payload
      };
    case FETCH_ORDERS_END:
      return {
        ...state,
        orderLoading: action.payload
      };
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        orderError: "",
        orderSuccess: true
      };
    case FETCH_ORDERS_FAIL:
      return {
        ...state,
        orderError: action.payload,
        orders: [],
        orderSuccess: false
      };
    case CREATE_ORDERS_START:
      return {
        ...state,
        orderLoading: action.payload
      };
    case CREATE_ORDERS_END:
      return {
        ...state,
        orderLoading: action.payload
      };
    case CREATE_ORDERS_SUCCESS:
      return {
        ...state,
        orderError: "",
        orderSuccess: true
      };
    case CREATE_ORDERS_FAIL:
      return {
        ...state,
        orderError: action.payload,
        orderSuccess: false
      };
    default:
      return state;
  }
}
