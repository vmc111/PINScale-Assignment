import { Component } from "react";

import { TailSpin } from "react-loader-spinner";

import Cookies from "js-cookie";

import LogoutBtn from "../LogoutBtn";

import "./index.css";

const profileStatus = {
  Loading: " LOADING",
  Success: "SUCCESS",
  Failed: "FAILED",
};

class ProfileBox extends Component {
  state = { userProfile: [], status: profileStatus.Success };

  SuccessView = () => {
    const userCreds = Cookies.get("secret_token");

    console.log(userCreds);

    const parsedObject = JSON.parse(userCreds);

    const { username } = parsedObject;
    return (
      <div className="profile-box">
        <img
          src="https://res.cloudinary.com/reddyimgs/image/upload/v1687011162/Avatar_zhzj4v.png"
          alt="profile"
        />
        <div className="user-info">
          <h1 className="user-text">USER</h1>
          <p>{username}</p>
        </div>
      </div>
    );
  };

  LoadingView = () => (
    <div className="profile-loader">
      <TailSpin color="#0b69ff" height="50" width="50" />
    </div>
  );

  failedView = () => <div>Failed To Fetch</div>;

  displayProfile = () => {
    const { status } = this.state;

    switch (status) {
      case profileStatus.Loading:
        return this.LoadingView();

      case profileStatus.Success:
        return this.SuccessView();

      case profileStatus.Failed:
        return this.failedView();

      default:
        return null;
    }
  };

  render() {
    return (
      <div className="user-profile">
        {this.displayProfile()}
        <LogoutBtn />
      </div>
    );
  }
}

export default ProfileBox;
