import React from "react";
import Login from "../../components/authentication/Login";
import "./Login.css";

const LoginPage = () => {
  return (
    <div className="auth-container">
      <Login title="Bienvenuemue sur E-commerce" />
    </div>
  );
};

export default LoginPage;
