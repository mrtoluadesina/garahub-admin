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

export const postCoupon = data => {
  const url = "http://localhost:3005/api/v1/coupon";
  const resp = axios({
    url,
    data,
    headers: { Authorization: data }
  })
    .then(response => {
      return 1;
    })
    .catch(error => {
      return error;
    });

  return resp;
};
