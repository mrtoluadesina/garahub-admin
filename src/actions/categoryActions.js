import {
  FETCH_CATEGORY_END,
  FETCH_CATEGORY_FAIL,
  FETCH_CATEGORY_START,
  FETCH_CATEGORY_SUCCESS,
} from "./types";
import request from "../request";
import { retrieveMessage } from "../utils/helperFunc";

const fetchStart = (payload) => ({
  type: FETCH_CATEGORY_START,
  payload,
});
const fetchSuccess = (payload) => ({
  type: FETCH_CATEGORY_SUCCESS,
  payload,
});
const fetchFail = (payload) => ({
  type: FETCH_CATEGORY_FAIL,
  payload,
});
const fetchEnd = (payload) => ({
  type: FETCH_CATEGORY_END,
  payload,
});

export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchStart(true));
      const response = await request.get("/api/v1/category");
      const values = response.data.map((category) => ({
        value: category._id,
        label: category.name,
      }));
      dispatch(fetchSuccess(values));
      dispatch(fetchEnd(false));
    } catch (error) {
      dispatch(fetchFail(retrieveMessage(error)));
      dispatch(fetchEnd(false));
    }
  };
};
