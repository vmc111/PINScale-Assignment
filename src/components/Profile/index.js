import { useEffect, useState } from "react";

import Cookies from "js-cookie";

import Navbar from "../Navbar";

import Sidebar from "../Sidebar";

import "./index.css";

const statusOfPage = {
  Initial: "INITIAL",
  Loading: " LOADING",
  Success: "SUCCESS",
  Failed: "FAILED",
};

const Profile = () => {
  const [status, setStatus] = useState(statusOfPage.Initial);
  const [userDetails, setUserDetails] = useState({});
  const [userCreds, setUserCreds] = useState({});

  useEffect(() => {
    fetchAccountDetails();
  }, []);

  const fetchAccountDetails = async () => {
    setStatus(statusOfPage.Loading);
    const userCreds = Cookies.get("secret_token");

    const parsedObject = JSON.parse(userCreds);
    console.log("parsed object", parsedObject);

    setUserCreds(parsedObject);

    const ReqUrl = "https://bursting-gelding-24.hasura.app/api/rest/profile";

    var myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");
    myHeaders.append(
      "x-hasura-admin-secret",
      "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF"
    );
    myHeaders.append("x-hasura-role", "user");
    myHeaders.append("x-hasura-user-id", `${parsedObject.userId}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(ReqUrl, requestOptions);

      const result = await response.json();
      console.log("User", result.users);

      const user = {
        city: result.users[0].city,
        country: result.users[0].country,
        dateOfBirth: result.users[0].date_of_birth,
        email: result.users[0].email,
        id: result.users[0].id,
        name: result.users[0].name,
        permanentAddress: result.users[0].permanent_address,
        postalCode: result.users[0].postal_code,
        presentAddress: result.users[0].present_address,
      };
      setUserDetails(user);
      setStatus(statusOfPage.Success);
    } catch (error) {
      setStatus(statusOfPage.Failed);
    }
  };

  const SuccessView = () => (
    <div className="profile-card">
      <img
        src="https://p.kindpng.com/picc/s/24-248325_profile-picture-circle-png-transparent-png.png"
        alt="profile"
        className="profile-image"
      />

      <ul className="bio-container">
        <li className="user-bio-li-items">
          <label htmlFor="name" className="bio-labels">
            Your Name
          </label>
          <input
            value={userDetails.name}
            className="input-element"
            id="name"
            type="text"
          />
        </li>
        <li className="user-bio-li-items">
          <label htmlFor="UserName" className="bio-labels">
            User Name
          </label>
          <input
            className="input-element"
            id="UserName"
            type="text"
            value={userDetails.name}
            onChange={() => {}}
          />
        </li>
        <li className="user-bio-li-items">
          <label htmlFor="Email" className="bio-labels">
            Email
          </label>
          <input
            className="input-element"
            id="Email"
            type="email"
            //   placeholder="email"
            value={userDetails.email}
            onChange={() => {}}
          />
        </li>
        <li className="user-bio-li-items">
          <label htmlFor="password" className="bio-labels">
            Password
          </label>
          <input
            className="input-element"
            id="password"
            type="password"
            //   placeholder="**********"
            value="**********"
            onChange={() => {}}
          />
        </li>
        <li className="user-bio-li-items">
          <label htmlFor="DOB" className="bio-labels">
            Date of Birth
          </label>
          <select className="input-element" id="DOB" name="dob">
            <option className="option-el" value="Dob">
              {userDetails.dateOfBirth}
            </option>
          </select>
        </li>
        <li className="user-bio-li-items">
          <label htmlFor="presentAddress" className="bio-labels">
            Present Address
          </label>
          <input
            className="input-element"
            id="presentAddress"
            type="text"
            placeholder="Present Address"
            value={userDetails.presentAddress}
            onChange={() => {}}
          />
        </li>
        <li className="user-bio-li-items">
          <label htmlFor="permanentAddress" className="bio-labels">
            Permanent Address
          </label>
          <input
            className="input-element"
            id="permanentAddress"
            type="text"
            placeholder="Permanent Address"
            value={userDetails.permanentAddress}
            onChange={() => {}}
          />
        </li>
        <li className="user-bio-li-items">
          <label htmlFor="city" className="bio-labels">
            City
          </label>
          <input
            className="input-element"
            id="city"
            type="text"
            placeholder="City"
            value={userDetails.city}
            onChange={() => {}}
          />
        </li>
        <li className="user-bio-li-items">
          <label htmlFor="postalCode" className="bio-labels">
            Postal Code
          </label>
          <input
            className="input-element"
            id="postal Code"
            type="text"
            placeholder="Postal Code"
            value={userDetails.postalCode}
            onChange={() => {}}
          />
        </li>
        <li className="user-bio-li-items">
          <label htmlFor="country" className="bio-labels">
            Country
          </label>
          <input
            className="input-element"
            id="country"
            type="text"
            placeholder="Country"
            value="Country"
            onChange={() => {}}
          />
        </li>
      </ul>
    </div>
  );

  const loadingView = () => <div>Loading...</div>;

  const failedView = () => <div>Failed...</div>;

  const displayView = () => {
    switch (status) {
      case statusOfPage.Success:
        return SuccessView();
      case statusOfPage.Loading:
        return loadingView();
      case statusOfPage.Failed:
        return failedView();

      default:
        return null;
    }
  };

  return userCreds === undefined ? (
    //   <Navigate to="/login" />
    window.location.replace("/login")
  ) : (
    <div className="container">
      <Sidebar />
      <div className="txn-container">
        <Navbar>Profile</Navbar>
        <div className="profile-container">{displayView()}</div>
      </div>
    </div>
  );
};

export default Profile;
