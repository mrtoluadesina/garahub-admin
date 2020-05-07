import * as actions from "../actions/types";

const initialState = {
  user: {},
  info: {},
  error: "",
  loading: false,
  success: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_START:
      return {
        ...state,
        loading: action.payload
      };
    case actions.AUTH_END:
      return {
        ...state,
        loading: action.payload
      };
    case actions.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        info: {}
      };
    case actions.AUTH_USER:
      return {
        ...state,
        user: action.payload,
        success: true,
        error: ""
      };
    case actions.AUTH_SUCCESS:
      return {
        ...state,
        info: action.payload,
        success: true,
        error: ""
      };
    case actions.LOGOUT:
      return {
        ...state,
        success: false,
        error: ""
      };
    default:
      return state;
  }
};
