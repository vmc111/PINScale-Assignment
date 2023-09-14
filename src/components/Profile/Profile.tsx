import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Navigate } from "react-router";
import useUserId from "../../hooks/FetchUserId/UseUserId";

import Navbar from "../Navbar/Navbar";

import Sidebar from "../Sidebar/Sidebar";

import "./index.css";
import useApiCall from "../../hooks/UseApiCall/UseApiCall";

type UserData = {
  date_of_birth: string;
  email: string;
  id: number;
  name: string;
  country: string;
  city: string;
  present_address: string;
  postal_code: string;
  permanent_address: string;
};

type Data = {
  users: UserData[];
};

const Profile = (): JSX.Element => {
  const [userDetails, setUserDetails] = useState<UserData>();

  const userFromHook = useUserId();
  const { response, status, apiCall } = useApiCall({
    url: "https://bursting-gelding-24.hasura.app/api/rest/profile",
    method: "GET",
    userId: userFromHook?.userId,
  });

  useEffect(() => {
    if (response !== null) {
      const result: Data = response;
      const user = {
        city: result.users[0].city,
        country: result.users[0].country,
        date_of_birth: result.users[0].date_of_birth,
        email: result.users[0].email,
        id: result.users[0].id,
        name: result.users[0].name,
        permanent_address: result.users[0].permanent_address,
        postal_code: result.users[0].postal_code,
        present_address: result.users[0].present_address,
      };
      setUserDetails(user);
    }
  }, [response]);

  useEffect(() => {
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
            value={userDetails?.name === undefined ? "" : userDetails!.name}
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
            value={userDetails?.name === undefined ? "" : userDetails!.name}
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
            value={userDetails?.email === undefined ? "" : userDetails!.email}
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
            value="**********"
          />
        </li>
        <li className="user-bio-li-items">
          <label htmlFor="DOB" className="bio-labels">
            Date of Birth
          </label>
          <select className="input-element" id="DOB" name="dob">
            <option className="option-el" value="Dob">
              {userDetails?.date_of_birth === undefined
                ? ""
                : userDetails!.date_of_birth}
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
            value={
              userDetails?.present_address === undefined
                ? ""
                : userDetails!.present_address
            }
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
            value={
              userDetails?.present_address === undefined
                ? ""
                : userDetails!.present_address
            }
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
            value={userDetails?.city === undefined ? "" : userDetails!.city}
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
            value={
              userDetails?.postal_code === undefined
                ? ""
                : userDetails!.postal_code
            }
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

  const renderLoadingView = () => (
    <div className="chart-loader">
      <TailSpin color="#0b69ff" height="50" width="50" />
    </div>
  );

  const tryAgain = (): void => {
    apiCall();
  };

  const renderFailedView = () => (
    <div>
      <button type="button" className="btn" onClick={() => tryAgain()}>
        Try Again
      </button>
    </div>
  );

  const displayView = () => {
    switch (status) {
      case "SUCCESS":
        return renderSuccessView();
      case "LOADING":
        return renderLoadingView();
      case "FAILED":
        return renderFailedView();

      default:
        return renderLoadingView();
    }
  };

  return userFromHook === undefined ? (
    <Navigate to={"/login"} />
  ) : (
    <div className="container fixed w-screens">
      <Sidebar />
      <div className="txn-container">
        <Navbar title="Profile" />
        <div className="profile-container">{displayView()}</div>
      </div>
    </div>
  );
};

export default Profile;
