import {
  AUTH_START,
  AUTH_USER,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_END,
  LOGOUT
} from "../actions/types";

const initialState = {
  user: {},
  info: {},
  error: "",
  loading: false,
  success: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        loading: action.payload
      };
    case AUTH_END:
      return {
        ...state,
        loading: action.payload
      };
    case AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        info: {}
      };
    case AUTH_USER:
      return {
        ...state,
        user: action.payload,
        success: true,
        error: ""
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        info: action.payload,
        success: true,
        error: ""
      };
    case LOGOUT:
      return {
        ...state,
        success: false,
        error: ""
      };
    default:
      return state;
  }
};
