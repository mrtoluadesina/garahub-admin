import {FETCH_PRODUCT_END,FETCH_PRODUCT_FAIL,FETCH_PRODUCT_START,FETCH_PRODUCT_SUCCESS} from "./types"
import request from "../request";
import { retrieveMessage } from "../utils/helperFunc";

const fetchStart = payload=>({
    type:FETCH_PRODUCT_START,
    payload
})
const fetchSuccess = payload=>({
    type:FETCH_PRODUCT_SUCCESS,
    payload
})
const fetchFail = payload=>({
    type:FETCH_PRODUCT_FAIL,
    payload
})
const fetchEnd = payload=>({
    type:FETCH_PRODUCT_END,
    payload
})


export const fetchProducts= ()=> {
    return async dispatch =>{
        try {
            dispatch(fetchStart(true))
            const res = await request.get("/api/v1/product")
            dispatch(fetchSuccess(res.data.payload))
            dispatch(fetchEnd(false))
        }
        catch(error){
            dispatch(fetchFail(retrieveMessage(error)))
            dispatch(fetchEnd(false))
        }
    }
}
