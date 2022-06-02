import { React, useContext } from "react";
import "./LogoutButton.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { GetConnection } from "../../DBAdapater";

export default function LogoutButton() {
  let navigate = useNavigate();
  const setActiveContact = useContext(UserContext);

  const logout = () => {
    setActiveContact("");
    let con = GetConnection();
    if (con !== null) con.stop();
    navigate("/");
  };

  return (
    <div className="logout-button" onClick={logout}>
      <i className="bi bi-box-arrow-right" />
    </div>
  );
}
