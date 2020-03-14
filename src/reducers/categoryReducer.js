import {
    FETCH_CATEGORY_END,
    FETCH_CATEGORY_FAIL,
    FETCH_CATEGORY_START,
    FETCH_CATEGORY_SUCCESS
  } from "../actions/types";
  
  const initialState = {
    categories: [],
    error: "",
    loading: false
  };
  
  export default function categories(state = initialState, action) {
    switch (action.type) {
      case FETCH_CATEGORY_START:
        return {
          ...state,
          loading: action.payload
        };
      case FETCH_CATEGORY_END:
        return {
          ...state,
          loading: action.payload
        };
      case FETCH_CATEGORY_SUCCESS:
        return {
          ...state,
          categories: action.payload,
          error: ""
        };
      case FETCH_CATEGORY_FAIL:
        return {
          ...state,
          error: action.payload,
          categories: []
        };
      default:
        return state;
    }
  }
  