import { FETCH_BRANDS, FETCH_BRANDS_FAIL } from "./types";
import { retrieveMessage } from "../utils/helperFunc";
import request from "../request";

const fetchedBrands = (payload) => ({
  type: FETCH_BRANDS,
  payload,
});

const fetchFail = (payload) => ({
  type: FETCH_BRANDS_FAIL,
  payload,
});

export const fetchAllBrands = () => {
  return async (dispatch) => {
    try {
      const response = await request.get("/api/v1/brand");
      const brands = response.data.payload;
      dispatch(fetchedBrands(brands));
    } catch (error) {
      dispatch(fetchFail(retrieveMessage(error)));
    }
  };
};
