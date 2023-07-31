import { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import PaidIcon from "@mui/icons-material/Paid";
import PersonIcon from "@mui/icons-material/Person";
import "./index.css";
import DebitCreditView from "../DashBoard";
import TabBarFooter from "../TabBarFooter";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

const TabBar = () => {
  const [activetab, setActiveTab] = useState("");
  const [userData, setUserData] = useState({});
  console.log("userDate TabBar: ", userData);

  const userId = Cookies.get("USER_ID");
  useEffect(() => {
    getUserProfile(userId);
  }, []);

  const getUserProfile = async () => {
    const apiUrl = "https://bursting-gelding-24.hasura.app/api/rest/profile";
    const headers = {
      "content-type": "application/json",
      "x-hasura-user-id": 1,
      "x-hasura-role": "user",
      "x-hasura-admin-secret":
        "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
    };
    const requestOptions = {
      method: "GET",
      headers: headers,
    };
    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();
    if (response.ok) {
      console.log(data);
      setUserData(data.users[0]);
    }
  };

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
        <Link to="/transactions">
          <div className="tab-bar">
            <PaidIcon className="icon" fontSize="large" color="primary" />
            <p className="label">Transactions</p>
          </div>
        </Link>
        <Link to="/profile">
          <div className="tab-bar">
            <PersonIcon className="icon" fontSize="large" color="primary" />
            <p className="label">Profile</p>
          </div>
        </Link>
      </div>
      <div className="footer">
        <TabBarFooter userData={userData} />
      </div>
      <div className="mobile-tabs">
        <HomeIcon
          className="icon active-tab"
          fontSize="large"
          color="primary"
        />
        <Link to={"/transactions"}>
          <PaidIcon className="icon" fontSize="large" color="primary" />
        </Link>
        <Link to={"/profile"}>
          <PersonIcon className="icon" fontSize="large" color="primary" />
        </Link>
      </div>
    </div>
  );
};

export default TabBar;
