import React, { useState } from "react";
import style from "./register.module.css";
import banner from "../../assets/registerPage.png";
import { useNavigate } from "react-router-dom";
import { register, login } from "../../apis/auth";
import { toast, Toaster } from "react-hot-toast";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !name || !mobile || !password || !checked) {
      toast.error("Please fill all the details");
    } else {
      try {
        const registerResponse = await register(email, name, mobile, password);
        if (registerResponse) {
          toast.success("User registered successfully!", {
            duration: 4000,
          });
          try {
            const response = await login(email, password);
            console.log(response);
            setTimeout(() => {
              navigate("/");
            }, 2000);
          } catch (error) {
            console.log("Login error");
          }
        }
      } catch (error) {
        toast.error(error.response.data.message || "Registration failed!", {
          duration: 4000,
        });
      }
    }
  };

  return (
    <div className={style.container}>
      <Toaster />
      <div className={style.register}>
        <div>
          <h1>Create an account</h1>
          <p>Your personal job finder is here</p>
          <form onSubmit={handleRegister}>
            <div className={style.formContainer}>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                id="mobile"
                name="mobile"
                placeholder="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
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
            <div className={style.check}>
              <input
                type="checkbox"
                id="agree"
                name="agree"
                checked={checked}
                onChange={handleCheckboxChange}
              />
              <label>
                By creating an account, I agree to our terms of use and privacy
                policy
              </label>
            </div>
            <button type="submit">Create Account</button>
          </form>
          <p>
            Already have an account? <a href="/login">Sign In</a>
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

export default RegisterForm;
