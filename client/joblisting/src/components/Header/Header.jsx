import React, { useState, useEffect } from "react";
import { isUserLoggedIn, logoutUser } from "./../../utils/utils";
import style from "./header.module.css";
import { useNavigate } from "react-router-dom";
import avatar from "../../assets/Avatar.png";

function Header() {
  const [loggedIn, setLoggedIn] = useState(isUserLoggedIn());
  const [recruiterName, setRecruiterName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userName = localStorage.getItem("loggedInUser");
    if (userName) {
      const recruiterName =
        userName.charAt(0).toUpperCase() + userName.slice(1);
      setRecruiterName(recruiterName);
    }
  }, []);

  const handleLogout = () => {
    setLoggedIn(false);
    logoutUser(navigate);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className={style.container}>
      <div className={style.title}>Jobfinder</div>
      <div>
        {loggedIn ? (
          <div className={style.loggedin}>
            <div className={style.logout} onClick={handleLogout}>
              Logout
            </div>
            <div className={style.user}>Hello! {recruiterName}</div>
            <div className={style.avatar} alt="User Avatar">
              <img src={avatar} />
            </div>
          </div>
        ) : (
          <div className={style.loggedout}>
            <div className={style.login} onClick={handleLogin}>
              Login
            </div>
            <div className={style.register} onClick={handleRegister}>
              Register
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
