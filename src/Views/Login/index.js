import React, { useState } from "react";
import { LoginContainer, LoginBox, LoginForm } from "./style";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  authSuccess,
  authUser,
  authStart,
  authEnd,
  authFail,
} from "../../actions/loginActions";
import axios from "axios";
import izitoast from "izitoast";
import { BeatLoader } from "react-spinners";
import { retrieveMessage } from "../../utils/helperFunc";

export default function Index(props) {
  const dispatch = useDispatch();
  const {
    LoginReducer: { loading },
  } = useSelector((state) => state);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.name === 'email' ? e.target.value.toLowerCase() : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(authStart());
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/login`, formData)
      .then((res) => {
        dispatch(authUser(res.data.payload));
        dispatch(authSuccess(res.data));
        props.history.push("/dashboard");
      })
      .catch((error) => {
        dispatch(authFail(retrieveMessage(error)));
        izitoast.show({
          messageColor: "white",
          backgroundColor: "red",
          titleColor: "white",
          timeout: 5000,
          message: error.response && error.response.data.message,
        });
      })
      .finally(() => {
        dispatch(authEnd(false));
      });
  };

  return (
    <LoginContainer>
      <LoginBox>
        <div className="login-header">
          <h5>Welcome Back</h5>
        </div>
        <LoginForm onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            className="login-input"
            placeholder="Email Address"
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            className="login-input"
            placeholder="Password"
            onChange={handleChange}
          />
          <Button
            className="login-button"
            value={(loading && <BeatLoader color="#fff" size={5} />) || "Login"}
            type="submit"
          />
        </LoginForm>
      </LoginBox>
    </LoginContainer>
  );
}
