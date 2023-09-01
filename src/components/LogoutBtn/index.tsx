import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

import Popup from "reactjs-popup";

import { LuLogOut } from "react-icons/lu";

import "reactjs-popup/dist/index.css";

import "./index.css";

const LogoutBtn = () => {
  const [logout, setLogout] = useState(false);
  const navigate = useNavigate();

  const onLogOut = () => {
    Cookies.remove("secret_token");
    navigate("/login");
  };
  return (
    <div className="popup-container">
      <Popup
        modal
        trigger={
          <button type="button" className="edit-btn">
            <LuLogOut size={25} />
          </button>
        }
        closeOnEscape
      >
          <div className="logout-container">
            <LuLogOut color="#D97706" size={30} className="logout-logo" />
            <div>
              <p className="sure-text">Are you sure you want to Logout?</p>
              <p>If you click on Yes , you'll be logged out</p>
              <div>
                <button className="logout-btn" onClick={onLogOut}>
                  Yes, Logout
                </button>
                <button className="cancel-btn" >
                  Cancel
                </button>
              </div>
            </div>
          </div>
      </Popup>
    </div>
  );
};

export default LogoutBtn;
