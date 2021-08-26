import React, { useEffect } from "react";
import "./LoginScreen.css";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/Actions/auth.action";
import { useHistory } from "react-router-dom";

const LoginScreen = () => {
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.auth.accessToken);

  const handleLogin = () => {
    dispatch(login());
  };
  const history = useHistory();
  useEffect(() => {
    if (accessToken) {
      history.push("/");
    }
  }, [accessToken, history]);
  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://download.logo.wine/logo/YouTube/YouTube-White-Full-Color-Logo.wine.png"
          alt=""
        />
        <div className="button_box" onClick={handleLogin}>
          <FcGoogle />
          <button>Login With Google</button>
        </div>
        <p>This is a Youtube Clone</p>
      </div>
    </div>
  );
};

export default LoginScreen;
