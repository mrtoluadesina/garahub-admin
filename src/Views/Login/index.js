import React, { useState, useEffect } from "react";
import { LoginContainer, LoginBox, LoginForm } from "./style";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { useSelector, useDispatch } from "react-redux";
import { authLogin } from "../../actions/loginActions";
import izitoast from "izitoast";
import { BeatLoader } from "react-spinners";

export default function Index(props) {
  const dispatch = useDispatch();
  const {
    LoginReducer: { error, loading, success }
  } = useSelector(state => state);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {}, []);

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };
  const authenticate = (success, error) => {
    if (success === true) {
      props.history.push("/dashboard");
    } else if (error.length > 0) {
      izitoast.show({
        messageColor: "white",
        title: "Login Error",
        backgroundColor: "red",
        titleColor: "white",
        timeout: 5000,
        message: error
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(authLogin(formData));
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
      {authenticate(success, error)}
    </LoginContainer>
  );
}
