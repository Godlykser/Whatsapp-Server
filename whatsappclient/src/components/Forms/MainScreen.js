import { Link } from "react-router-dom";
import React from "react";
import "./MainContainer.css";

export default function MainScreen() {
  return (
    <div className="mainContainer">
      <div className="welcomeText">Welcome</div>
      <Link className="mainButton mb-3" to="/login">
        Sign in
      </Link>
      <Link className="mainButton" to="/register">
        Register
      </Link>
    </div>
  );
}
