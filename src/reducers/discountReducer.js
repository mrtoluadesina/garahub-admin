import {
  FETCH_DISCOUNT_END,
  FETCH_DISCOUNT_FAIL,
  FETCH_DISCOUNT_START,
  FETCH_DISCOUNT_SUCCESS,
} from "../actions/types";

const initialState = {
  discounts: [],
  discountError: "",
  discountLoading: false,
  discountSuccess: false
};

export default function discounts(state = initialState, action) {
  switch (action.type) {
    case FETCH_DISCOUNT_START:
      return {
        ...state,
        discountLoading: action.payload
      };
    case FETCH_DISCOUNT_END:
      return {
        ...state,
        discountLoading: action.payload
      };
    case FETCH_DISCOUNT_SUCCESS:
      return {
        ...state,
        discounts: action.payload,
        discountError: "",
        discountSuccess: true
      };
    case FETCH_DISCOUNT_FAIL:
      return {
        ...state,
        discountError: action.payload,
        discounts: [],
        discountSuccess: false
      };
    default:
      return state;
  }
}
