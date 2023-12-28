import React, { useState } from "react";
import style from "./login.module.css";
import banner from "../../assets/registerPage.png";
import { login } from "../../apis/auth";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { logoutAndRedirect } from "../../utils/utils";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response) {
        navigate("/");
        logoutAndRedirect(navigate);
      }
    } catch (error) {
      toast.error(error.message || "Login failed!", {
        duration: 4000,
      });
    }
  };

  return (
    <div className={style.container}>
      <Toaster />
      <div className={style.login}>
        <div>
          <h1>Already have an account?</h1>
          <p>Your personal job finder is here</p>
          <form onSubmit={handleLogin}>
            <div className={style.formContainer}>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Sign in</button>
          </form>
          <p>
            Don't have an account? <a href="/register">Sign Up</a>
          </p>
        </div>
      </div>
      <div className={style.banner}>
        <img src={banner} alt="banner" />
        <div className={style.textOverlay}>Your Personal Job Finder</div>
      </div>
    </div>
  );
}

export default LoginForm;
