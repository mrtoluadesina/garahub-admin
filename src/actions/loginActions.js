import request from "../request";
import { AUTH_START, AUTH_USER, AUTH_SUCCESS, AUTH_FAIL, AUTH_END, LOGOUT } from "./types";
import { retrieveMessage } from "../utils/helperFunc";

export const authStart = () => ({
  type: AUTH_START,
  payload: true
});

export const authUser = payload => ({
  type: AUTH_USER,
  payload
})

export const authSuccess = payload => ({
  type: AUTH_SUCCESS,
  payload
});

export const authFail = error => ({
  type: AUTH_FAIL,
  error
});
export const authEnd = payload => ({
  type: AUTH_END,
  payload
});

export const authLogin = body => {
  return async dispatch => {
    try {
      dispatch(authStart());
      const res = await request.post("/api/v1/admin/login", body);
      dispatch(authUser(res.data.payload));
      dispatch(authSuccess(res.data));
      dispatch(authEnd(false));
    } catch (error) {
      dispatch(authFail(retrieveMessage(error)));
      dispatch(authEnd(false));
    }
  };
};

export const authLogout = () => {
  

  return async dispatch => {
    dispatch({
      type: LOGOUT
    });
  };
};
