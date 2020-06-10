import axios from "axios";

export const checkCode = async (url, data) => {
  const resp = await axios
    .get(url, { Authorization: data })
    .then(response => {
      const statusCode = response.status;
      return statusCode;
    })
    .catch(error => {
      const statusCode = error.response !== undefined ? error.response.status : '';
      return {error, statusCode};
    });

  return resp;
};

export const postCoupon = (data, auth) => {
  console.log(auth)
  const url = " https://jarahub-staging.herokuapp.com/api/v1/coupon";
  const resp = axios({
    url,
    data,
    headers: { Authorization: `Bearer ${auth}` },
    method:"post"
  })
    .then(response => {

      console.log(response);
      return response;
    })
    .catch(error => {
      return error;
    });

  return resp;
};
