import {
    FETCHING_CUSTOMER_END,
    FETCHING_CUSTOMER_START,
    FETCH_ALL_CUSTOMERS_FAILED,
    FETCH_ALL_CUSTOMERS_SUCCESS,
    FETCH_A_CUSTOMERS_FAILED,
    FETCH_A_CUSTOMERS_SUCCESS
  } from "../actions/types";

const intialState = {
    customers:[],
    customer:{},
    success:false,
    error:"",
    loading:false
}

export default (state=intialState, action)=>{
    switch (action.type) {
        case FETCHING_CUSTOMER_END:
            return {
                ...state,
                loading:action.payload,
            }
        case FETCHING_CUSTOMER_START:
            return {
                ...state,
                loading:action.payload,
            }
        case FETCH_A_CUSTOMERS_SUCCESS:
            return {
                ...state,
                customer:action.payload,
                error:""
            }
        case FETCH_A_CUSTOMERS_FAILED:
            return {
                ...state,
                customer:{},
                error:action.payload
            }
        case FETCH_ALL_CUSTOMERS_SUCCESS:
            return {
                ...state,
                customers: action.payload,
                error: ''
            }
        case FETCH_ALL_CUSTOMERS_FAILED:
            return {
                ...state,
                customers: [],
                error: action.payload
            }
        default:
            return state;
    }
}
