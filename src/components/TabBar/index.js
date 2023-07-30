import HomeIcon from "@mui/icons-material/Home";
import PaidIcon from "@mui/icons-material/Paid";
import PersonIcon from "@mui/icons-material/Person";
import "./index.css";
import DebitCreditView from "../DashBoard";
import TabBarFooter from "../TabBarFooter";

import { useState } from "react";
const TabBar = () => {
  const [activetab, setActiveTab] = useState("");

  return (
    <div className="tab-main">
      <div className="tabs-container">
        <div>
          <img
            src="https://res.cloudinary.com/dqppfjvrw/image/upload/v1690684818/Frame_507_prglf9.png"
            alt="logo"
            className="logo"
          />
        </div>
        <div className="tab-bar active-tab">
          <HomeIcon className="icon" fontSize="large" color="primary" />
          <p className="label">Home</p>
        </div>
        <div className="tab-bar">
          <PaidIcon className="icon" fontSize="large" color="primary" />
          <p className="label">Transactions</p>
        </div>
        <div className="tab-bar">
          <PersonIcon className="icon" fontSize="large" color="primary" />
          <p className="label">Profile</p>
        </div>
      </div>
      <footer className="footer">
        <TabBarFooter />
      </footer>
      <div className="mobile-tabs">
        <HomeIcon
          className="icon active-tab"
          fontSize="large"
          color="primary"
        />
        <PaidIcon className="icon" fontSize="large" color="primary" />
        <PersonIcon className="icon" fontSize="large" color="primary" />
      </div>
    </div>
  );
};

export default TabBar;
