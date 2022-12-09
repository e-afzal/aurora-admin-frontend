import '../styles/admin-login.css';
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div id="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-image-container">
          <img
            className="admin-login-image"
            src="/images/aurora-logo.png"
            alt="Aurora Logo"
          />
        </div>
        <p className="admin-login-message">Welcome to the login portal</p>
        <button className="admin-login-btn" onClick={() => loginWithRedirect()}>login</button>
      </div>
    </div>
  );
};

export default Login;