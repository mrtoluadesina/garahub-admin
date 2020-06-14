import {
  FETCH_BRANDS,
  FETCH_CATEGORY_FAIL,
} from "../actions/types";

const initialState = {
  brands: [],
  error: "",
  loading: false,
  success: false,
};

export default function brands(state = initialState, action) {
  switch (action.type) {
    case FETCH_BRANDS:
      return {
        ...state,
        brands: action.payload,
        success: true,
      };
    case FETCH_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
        brands: [],
        success: false,
      };

    default:
      return state;
  }
}
