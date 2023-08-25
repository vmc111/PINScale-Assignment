import { useEffect, useState } from "react";
import useUserId from "../FetchUserId";

import Navbar from "../Navbar";

import Sidebar from "../Sidebar";

import "./index.css";
import useApiCall from "../UseApiCall";
import statusOfPage from "../../constants/apistatus";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [userCreds, setUserCreds] = useState({});

  const userFromHook = useUserId();
  const { response, status, apiCall } = useApiCall({
    url: "https://bursting-gelding-24.hasura.app/api/rest/profile",
    method: "GET",
    userId: userFromHook.userId,
  });

  useEffect(() => {
    if (response !== null) {
      const user = {
        city: response.users[0].city,
        country: response.users[0].country,
        dateOfBirth: response.users[0].date_of_birth,
        email: response.users[0].email,
        id: response.users[0].id,
        name: response.users[0].name,
        permanentAddress: response.users[0].permanent_address,
        postalCode: response.users[0].postal_code,
        presentAddress: response.users[0].present_address,
      };
      setUserDetails(user);
    }
  }, [response]);

  useEffect(() => {
    setUserCreds(userFromHook);
    apiCall();
  }, []);

  const renderSuccessView = () => (
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
          />
        </li>
      </ul>
    </div>
  );

  const renderLoadingView = () => <div>Loading...</div>;

  const renderFailedView = () => <div>Failed...</div>;

  const displayView = () => {
    switch (status) {
      case statusOfPage.Success:
        return renderSuccessView();
      case statusOfPage.Loading:
        return renderLoadingView();
      case statusOfPage.Failed:
        return renderFailedView();

      default:
        return null;
    }
  };

  return userCreds === undefined ? (
    // <Navigate to="/login" />
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
