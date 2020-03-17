import {
  FETCH_PRODUCT_END,
  FETCH_PRODUCT_FAIL,
  FETCH_PRODUCT_START,
  FETCH_PRODUCT_SUCCESS,
  FETCH_A_PRODUCT_SUCCESS,
  CREATE_PRODUCT_END,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_START,
  CREATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_END,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_START,
  UPDATE_PRODUCT_SUCCESS
} from "../actions/types";

const initialState = {
  products: [],
  productObj:{},
  error: "",
  loading: false,
  success:false,
  updated:false
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
    case FETCH_A_PRODUCT_SUCCESS:
      return {
        ...state,
        productObj: action.payload,
        error: ""
      };
    case FETCH_PRODUCT_FAIL:
      return {
        ...state,
        error: action.payload,
        products: []
      };
    case CREATE_PRODUCT_END:
      return {
        ...state,
        loading: action.payload
      };
    case CREATE_PRODUCT_START:
      return {
        ...state,
        loading: action.payload
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        productObj:action.payload,
        success: true,
        error:""
      };
    case CREATE_PRODUCT_FAIL:
      return {
        ...state,
        success: false,
        error:action.payload
      };
    case UPDATE_PRODUCT_END:
      return {
        ...state,
        loading: action.payload
      };
    case UPDATE_PRODUCT_START:
      return {
        ...state,
        loading: action.payload,
        updated:false
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        updated:true,
        success: true,
        error:""
      };
    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        success: false,
        error:action.payload,
        updated:false
      };
    
    default:
      return state;
  }
}
