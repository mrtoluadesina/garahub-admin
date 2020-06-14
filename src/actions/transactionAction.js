import {
  FETCH_TRANSACTIONS_END,
  FETCH_TRANSACTIONS_FAIL,
  FETCH_TRANSACTIONS_START,
  FETCH_TRANSACTIONS_SUCCESS,
} from "./types";
import request from "../request";
import { retrieveMessage } from "../utils/helperFunc";
const fetchTransactionStart = payload => ({
  type: FETCH_TRANSACTIONS_START,
  payload
});
const fetchTransactionSuccess = payload => ({
  type: FETCH_TRANSACTIONS_SUCCESS,
  payload
});
const fetchTransactionFail = payload => ({
  type: FETCH_TRANSACTIONS_FAIL,
  payload
});
const fetchTransactionEnd = payload => ({
  type: FETCH_TRANSACTIONS_END,
  payload
});

export const fetchTransactions = (query) => {
  return async dispatch => {
    try {
      dispatch(fetchTransactionStart(true));

      const res = await request.get(`/api/v1/transaction?${query}`);
      dispatch(fetchTransactionSuccess(res.data.payload));
      dispatch(fetchTransactionEnd(false));
    } catch (error) {
      console.log('start')
      dispatch(fetchTransactionFail(retrieveMessage(error)));
      dispatch(fetchTransactionEnd(false));
    }
  };
};

export const fetchTransaction = async (query)=> {
    const res = await request.get(`/api/v1/transaction?${query}`);
    return res.data.payload? res.data.payload: ({
      data: [], total: 0
    })
}
