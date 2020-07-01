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
      const res = await request.get("/api/v1/coupon");
      dispatch(fetchDiscountSuccess(res.data.payload));
      dispatch(fetchDiscountEnd(false));
    } catch (error) {
      dispatch(fetchDiscountFail(retrieveMessage(error)));
      dispatch(fetchDiscountEnd(false));
    }
  };
};

export const fetchDiscount = async (query) => {
  try {
    const res = await request.get(`/api/v1/coupon?${query}`);
    return res.data.payload? res.data.payload: {
      data: [], total: 0
    }
  } catch (error) {
    return error
  }

};

export const updateDiscount = (id, body) => {
  return async dispatch => {
  try {
    dispatch(fetchDiscountStart(true));
    const res = await request.put(`/api/v1/coupon/${id}`, body);
			// get users data from localstorage
			const value = JSON.parse(localStorage.getItem('couponsData')).map(discount => discount._id === res.data.payload._id?  res.data.payload : discount);
			// save back to localstorage
			localStorage.setItem('couponsData', JSON.stringify(value))
			//update redux
    dispatch(fetchDiscountSuccess(value));
    dispatch(fetchDiscountEnd(false));
  } catch (error) {
    dispatch(fetchDiscountFail(retrieveMessage(error)));
    dispatch(fetchDiscountEnd(false));
}
}
}

// delete discount
export const deleteDiscount = (id) => {
  return async dispatch => {
  try {
    dispatch(fetchDiscountStart(true));
    const res = await request.delete(`/api/v1/coupon/${id}`);
			// get users data from localstorage
			const value = JSON.parse(localStorage.getItem('couponsData')).filter(discount => discount._id !== res.data.payload._id);
			// save back to localstorage
			localStorage.setItem('couponsData', JSON.stringify(value))
			//update redux
    dispatch(fetchDiscountSuccess(value));
    dispatch(fetchDiscountEnd(false));
  } catch (error) {
    dispatch(fetchDiscountFail(retrieveMessage(error)));
    dispatch(fetchDiscountEnd(false));
}
}
}