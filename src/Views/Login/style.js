import styled from "styled-components";

export const LoginContainer = styled.div`
  background: #333333;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  align-items: center;
`;
export const LoginBox = styled.div`
  display: flex;
  max-width: 25rem;
  /* height:30vh; */
  background: #fff;
  border-radius: 0.17rem;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  .login-header {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .login-input {
    margin-bottom: 1rem;
    height: 3rem;
    border: 2px solid #e1e1e1;
    border-radius: 0.15rem;
  }
  .login-button {
    background: #ff4745;
    color: #fff;
    height: 3rem;
  }
`;
export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;
