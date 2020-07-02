import {
  FETCH_PRODUCT_END,
  FETCH_PRODUCT_FAIL,
  FETCH_PRODUCT_START,
  FETCH_PRODUCT_SUCCESS,
  FETCH_A_PRODUCT_SUCCESS,
  // CREATE_PRODUCT_END,
  // CREATE_PRODUCT_FAIL,
  // CREATE_PRODUCT_START,
  // CREATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_END,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_START,
  UPDATE_PRODUCT_SUCCESS
} from "./types";
import request from "../request";
import { retrieveMessage } from "../utils/helperFunc";

const fetchStart = payload => ({
  type: FETCH_PRODUCT_START,
  payload
});
const fetchSuccess = (payload, payload1) => ({
  type: FETCH_PRODUCT_SUCCESS,
  payload,
  payload1
});
const fetchASuccess = payload => ({
  type: FETCH_A_PRODUCT_SUCCESS,
  payload
});
const fetchFail = payload => ({
  type: FETCH_PRODUCT_FAIL,
  payload
});
const fetchEnd = payload => ({
  type: FETCH_PRODUCT_END,
  payload
});

// const createProductStart = payload =>({
//     type: CREATE_PRODUCT_START,
//     payload
// })
// const createProductEnd = payload =>({
//     type: CREATE_PRODUCT_END,
//     payload
// })
// const createProductSuccess = payload =>({
//     type: CREATE_PRODUCT_SUCCESS,
//     payload
// })
// const createProductFail = payload =>({
//     type: CREATE_PRODUCT_FAIL,
//     payload
// })
const updateProductStart = payload =>({
  type: UPDATE_PRODUCT_START,
  payload
})
const updateProductEnd = payload =>({
  type: UPDATE_PRODUCT_END,
  payload
})
const updateProductSuccess = payload =>({
  type: UPDATE_PRODUCT_SUCCESS,
  payload
})
const updateProductFail = payload =>({
  type: UPDATE_PRODUCT_FAIL,
  payload
})

export const fetchProducts = () => {
  return async dispatch => {
    try {
      dispatch(fetchStart(true));
      const res = await request.get("/api/v1/product/all");
      dispatch(fetchSuccess(res.data));
      dispatch(fetchEnd(false));
    } catch (error) {
      dispatch(fetchFail(retrieveMessage(error)));
      dispatch(fetchEnd(false));
    }
  };
};

export const fetchProduct = id => {
  return async dispatch => {
    try {
      dispatch(fetchStart(true));
      const res = await request.get(`/api/v1/product/${id}`);
      dispatch(fetchASuccess(res.data.payload));
      dispatch(fetchEnd(false));
    } catch (error) {
      dispatch(fetchFail(retrieveMessage(error)));
      dispatch(fetchEnd(false));
    }
  };
};


export const createPoductActions = async data => {
      // dispatch(createProductStart(true))
      const res = await request.post("/api/v1/product",data)  
      if (res.data.statusCode >= 400) {
        throw new Error(res.data.message)
      }
			// get users data from localstorage
      const value = JSON.parse(localStorage.getItem('productsData'))
      value.push(res.data.payload);
      console.log(res.data)
			// save back to localstorage
      localStorage.setItem('productsData', JSON.stringify(value))
      
      return res.data.payload;
      //update redux
      // dispatch(fetchSuccess(value, res.data.payload));
      // dispatch(createProductSuccess(res.data.payload))
      // dispatch(createProductEnd(false))
    // }
    // catch(err){
    //   // dispatch(fetchFail(retrieveMessage(err)));
    //   // dispatch(createProductEnd(false));
    // }

  
};

export const updatePoductActions = (id,data) => {
  return async dispatch => {
    try{
      dispatch(updateProductStart(true))
      const res = await request.put(`/api/v1/product/${id}`,data)      
      dispatch(updateProductSuccess(res.data.payload))
      dispatch(updateProductEnd(false))
    }
    catch(err){
      dispatch(updateProductFail(retrieveMessage(err)));
      dispatch(updateProductEnd(false));
    }

  };
};
