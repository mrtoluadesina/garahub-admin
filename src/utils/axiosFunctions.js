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
  const url = " https://jarahub-staging.herokuapp.com/api/v1/coupon";
  const resp = axios({
    url,
    data,
    headers: { Authorization: `Bearer ${auth}` },
    method:"post"
  })
    .then(response => {
      // get users data from localstorage
			const value = JSON.parse(localStorage.getItem('couponsData'))//.filter(user => user._id !== response.data.payload._id);
      // save back to localstorage
      value.push(response.data.payload)
			localStorage.setItem('couponsData', JSON.stringify(value))
			//update redux
      return response;
    })
    .catch(error => {
      return error;
    });

  return resp;
};
export const updateCoupon = (data, auth) => {
  const url = " https://jarahub-staging.herokuapp.com/api/v1/coupon";
  const resp = axios({
    url,
    data,
    headers: { Authorization: `Bearer ${auth}` },
    method:"put"
  })
    .then(response => {
			const value = JSON.parse(localStorage.getItem('couponsData')).map(coupon => coupon._id === response.data.payload._id? response.data.payload : coupon);
      // save back to localstorage
			localStorage.setItem('couponsData', JSON.stringify(value))
      return response;
    })
    .catch(error => {
      return error;
    });

  return resp;
};

export const getStats = (range) => {
  const url =
    `https://jarahub-staging.herokuapp.com/api/v1/stats/revenue?range=${range}`;

  const res = axios({
    url,
    method: "GET"
  }).then(stats => {
    return stats.data.payload;
  }).catch(error => {
    return error;
  });

  return res;
}
