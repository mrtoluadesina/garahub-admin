import {
  FETCH_ORDERS_END,
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
  CREATE_ORDERS_END,
  CREATE_ORDERS_FAIL,
  CREATE_ORDERS_START,
  CREATE_ORDERS_SUCCESS
} from "./types";
import request from "../request";
import { retrieveMessage } from "../utils/helperFunc";
const fetchOrderStart = payload => ({
  type: FETCH_ORDERS_START,
  payload
});
const fetchOrderSuccess = payload => ({
  type: FETCH_ORDERS_SUCCESS,
  payload
});
const fetchOrderFail = payload => ({
  type: FETCH_ORDERS_FAIL,
  payload
});
const fetchOrderEnd = payload => ({
  type: FETCH_ORDERS_END,
  payload
});

const createOrderStart = payload=>({
    type:CREATE_ORDERS_START,
    payload
})
const createOrderEnd = payload=>({
    type:CREATE_ORDERS_END,
    payload
})
const createOrderSuccess = payload=>({
    type:CREATE_ORDERS_SUCCESS,
    payload
})
const createOrderFail = payload=>({
    type:CREATE_ORDERS_FAIL,
    payload
})

export const fetchOrders = () => {
  return async dispatch => {
    try {
      dispatch(fetchOrderStart(true));
      const res = await request.get("/api/v1/transaction");
      dispatch(fetchOrderSuccess(res.data.payload));
      dispatch(fetchOrderEnd(false));
    } catch (error) {
      dispatch(fetchOrderFail(retrieveMessage(error)));
      dispatch(fetchOrderEnd(false));
    }
  };
};

export const createOrders =  (data) => {
  return async dispatch => {
    try {
        dispatch(createOrderStart(true))
        const res = await request.post("/api/v1/order/reservation",data)
        dispatch(createOrderSuccess(res.data.payload))
        dispatch(createOrderEnd(false))
    } catch (err) {
        dispatch(createOrderFail(retrieveMessage(err)))
        dispatch(createOrderEnd(false))
    }
  };
};
