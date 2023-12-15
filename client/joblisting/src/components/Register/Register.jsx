import React from "react";
import style from "./register.module.css";
import banner from "../../assets/registerPage.png";

function Register() {
  return (
    <div className={style.container}>
      <div className={style.register}>
        <div>
          <h1>Create an account</h1>
          <p>Your personal job finder is here</p>
          <form>
            <div className={style.formContainer}>
              <input type="text" id="name" name="name" placeholder="Name" />
              <input type="email" id="email" name="email" placeholder="Email" />
              <input
                type="text"
                id="mobile"
                name="mobile"
                placeholder="Mobile"
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <div className={style.check}>
              <input type="checkbox" id="agree" name="agree" />
              <label>
                By creating an account, I agree to our terms of use and privacy
                policy
              </label>
            </div>
            <button type="submit">Create Account</button>
          </form>
          <p>
            Already have an account? <a href="www.google.com">Sign In</a>
          </p>
        </div>
      </div>
      <div className={style.banner}>
        <img src={banner} alt="banner" />
        <div class={style.textOverlay}>Your Personal Job Finder</div>
      </div>
    </div>
  );
}

export default Register;
