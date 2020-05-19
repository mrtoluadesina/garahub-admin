import {
  FETCH_DISCOUNT_END,
  FETCH_DISCOUNT_FAIL,
  FETCH_DISCOUNT_START,
  FETCH_DISCOUNT_SUCCESS,
} from "./types";
import request from "../request";
import { retrieveMessage } from "../utils/helperFunc";
const fetchDiscountStart = payload => ({
  type: FETCH_DISCOUNT_START,
  payload
});
const fetchDiscountSuccess = payload => ({
  type: FETCH_DISCOUNT_SUCCESS,
  payload
});
const fetchDiscountFail = payload => ({
  type: FETCH_DISCOUNT_FAIL,
  payload
});
const fetchDiscountEnd = payload => ({
  type: FETCH_DISCOUNT_END,
  payload
});

export const fetchDiscounts = () => {
  return async dispatch => {
    try {
      dispatch(fetchDiscountStart(true));
      const res = await request.get("/api/v1/discount");
      dispatch(fetchDiscountSuccess(res.data));
      dispatch(fetchDiscountEnd(false));
    } catch (error) {
      dispatch(fetchDiscountFail(retrieveMessage(error)));
      dispatch(fetchDiscountEnd(false));
    }
  };
};
