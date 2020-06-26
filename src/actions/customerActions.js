import {
  FETCHING_CUSTOMER_END,
  FETCHING_CUSTOMER_START,
  FETCH_ALL_CUSTOMERS_FAILED,
  FETCH_ALL_CUSTOMERS_SUCCESS,
  FETCH_A_CUSTOMERS_FAILED,
  FETCH_A_CUSTOMERS_SUCCESS
} from "./types";
import request from "../request";
import { retrieveMessage } from "../utils/helperFunc";

const fetchStart = payload=>({
    type:FETCHING_CUSTOMER_START,
    payload
})
const fetchCustomersSuccess = payload => ({
    type: FETCH_ALL_CUSTOMERS_SUCCESS,
    payload
})
const fetchCustomersFail = payload => ({
    type: FETCH_ALL_CUSTOMERS_FAILED,
    payload
})
const fetchACustomerSuccess = payload=>({
    type:FETCH_A_CUSTOMERS_SUCCESS,
    payload
})
const fetchACustomerFail = payload=>({
    type:FETCH_A_CUSTOMERS_FAILED,
    payload
})
const fetchEnd = payload=>({
    type:FETCHING_CUSTOMER_END,
    payload
})

export const fetchAllCustomers = () => {
    return async dispatch => {
        try {
            dispatch(fetchStart(true))
            const res = await request.get('/api/v1/user')
            dispatch(fetchCustomersSuccess(res.data))
            dispatch(fetchEnd(false))
        } catch(error) {
            dispatch(fetchCustomersFail(retrieveMessage(error)))
            dispatch(fetchEnd(false))
        }
    }
}

export const fetchACustomer = data =>{
    return async dispatch =>{
        try{
          dispatch(fetchStart(true))
        const res =  await request.get(`/api/v1/user/${data}`)
        const _id = JSON.parse(res.request.response).payload._id


        let address =[]
        try{
             const addressGet = await request.get(`/api/v1/address/${_id}`)
             //Destructured response to create new properties value and label for React-Select
             address = JSON.parse(addressGet.request.response).payload.map(addr=>{
               return {
                 ...addr, value: addr._id, label: addr.address1
               }
            })
        }
        catch(err){
            address=err.response.data.payload
        }
        finally{

        dispatch(fetchACustomerSuccess({...JSON.parse(res.request.response).payload,address}))
        dispatch(fetchEnd(false))
        return;
        }
        }
        catch(error){


            dispatch(fetchACustomerFail(retrieveMessage(error)))
            dispatch(fetchEnd(false))
        }

 
   }
}