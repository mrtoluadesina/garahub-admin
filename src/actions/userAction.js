import {
	FETCHING_USER_END,
	FETCHING_USER_START,
	FETCH_ALL_USERS_FAILED,
	FETCH_ALL_USERS_SUCCESS,
	CREATE_USER_END,
	CREATE_USER_FAIL,
	CREATE_USER_START,
  CREATE_USER_SUCCESS,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL
} from "./types";
import request from "../request";
import { retrieveMessage } from "../utils/helperFunc";

const fetchStart = (payload) => ({
	type: FETCHING_USER_START,
	payload,
});
const fetchUsersSuccess = (payload) => ({
	type: FETCH_ALL_USERS_SUCCESS,
	payload,
});
const fetchUsersFail = (payload) => ({
	type: FETCH_ALL_USERS_FAILED,
	payload,
});
const fetchEnd = (payload) => ({
	type: FETCHING_USER_END,
	payload,
});
const createUserStart = (payload) => ({
	type: CREATE_USER_START,
	payload,
});
const createUserEnd = (payload) => ({
	type: CREATE_USER_END,
	payload,
});
const createUserSuccess = (payload) => ({
	type: CREATE_USER_SUCCESS,
	payload,
});
const createUserFail = (payload) => ({
	type: CREATE_USER_FAIL,
	payload,
});
const editUserSuccess = (payload) => ({
  type: EDIT_USER_SUCCESS,
  payload,
});
const editUserFail = (payload) => ({
	type: EDIT_USER_FAIL,
	payload,
});
const deleteUserFail = (payload) => ({
	type: DELETE_USER_FAIL,
	payload,
});
const deleteUserSuccess = (payload) => ({
	type: DELETE_USER_SUCCESS,
	payload,
});



export const fetchAllUsers = () => {
	return async (dispatch) => {
		try {
			dispatch(fetchStart(true));
			const res = await request.get("/api/v1/admin");
			dispatch(fetchUsersSuccess(res.data.payload));
			dispatch(fetchEnd(false));
		} catch (error) {
			dispatch(fetchUsersFail(retrieveMessage(error)));
			dispatch(fetchEnd(false));
		}
	};
};

export const createUser = (data) => {
	return async (dispatch) => {
		try {
			dispatch(createUserStart(true));
      const res = await request.post("/api/v1/admin", data);
			dispatch(createUserSuccess(res.data.payload));
			dispatch(createUserEnd(false));
		} catch (err) {
			dispatch(createUserFail(retrieveMessage(err)));
			dispatch(createUserEnd(false));
		}
	};
};

export const editUser = (data,id) => {
	return async (dispatch) => {
		try {
			const res = await request.put(`/api/v1/admin/${id}`,data);
			dispatch(editUserSuccess(res.data.payload));
		} catch (err) {
			dispatch(editUserFail(retrieveMessage(err)));
		}
	};
};

export const deleteUser = (id) => {
	return async (dispatch) => {
		try {
      const res = await request.delete(`/api/v1/admin/${id}`);
			dispatch(deleteUserSuccess(res.data.payload));
		} catch (err) {
			dispatch(deleteUserFail(retrieveMessage(err)));
		}
	};
};
