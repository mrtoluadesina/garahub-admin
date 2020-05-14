import {
  FETCH_TRANSACTIONS_END,
  FETCH_TRANSACTIONS_FAIL,
  FETCH_TRANSACTIONS_START,
  FETCH_TRANSACTIONS_SUCCESS,
} from "../actions/types";

const initialState = {
  transactions: [],
  transactionError: "",
  transactionLoading: false,
  transactionSuccess: false
};

export default function transactions(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRANSACTIONS_START:
      return {
        ...state,
        transactionLoading: action.payload
      };
    case FETCH_TRANSACTIONS_END:
      return {
        ...state,
        transactionLoading: action.payload
      };
    case FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: action.payload,
        transactionError: "",
        transactionSuccess: true
      };
    case FETCH_TRANSACTIONS_FAIL:
      return {
        ...state,
        transactionError: action.payload,
        transactions: [],
        transactionSuccess: false
      };
    default:
      return state;
  }
}
