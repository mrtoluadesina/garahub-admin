import {
  FETCH_PRODUCT_END,
  FETCH_PRODUCT_FAIL,
  FETCH_PRODUCT_START,
  FETCH_PRODUCT_SUCCESS
} from "../actions/types";

const initialState = {
  products: [],
  error: "",
  loading: false
};

export default function products(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCT_START:
      return {
        ...state,
        loading: action.payload
      };
    case FETCH_PRODUCT_END:
      return {
        ...state,
        loading: action.payload
      };
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        products: action.payload,
        error: ""
      };
    case FETCH_PRODUCT_FAIL:
      return {
        ...state,
        error: action.payload,
        products: []
      };
    default:
      return state;
  }
}
