import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { TailSpin as Loader } from "react-loader-spinner";
import "./index.css";
import useApiCall from "../UseApiCall";
import statusOfPage from "../../constants/apistatus";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [lognFail, setLoginFail] = useState({
    show: false,
    msg: "",
  });
  const navigate = useNavigate();

  const { response, status, apiCall, errorMsg } = useApiCall({
    url: `https://bursting-gelding-24.hasura.app/api/rest/get-user-id`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret":
        "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
    },
    body: { email, password },
  });

  useEffect(() => {
    if (response !== null) {
      onLoginApprove(response);
    }
  }, [response]);

  const handleSelect = (value) => {
    value === "true" ? setIsAdmin(true) : setIsAdmin(false);
  };

  const onLoginApprove = (data) => {
    if (data === null || data.get_user_id.length === 0) {
      setLoginFail({ show: true, msg: "username or password is incorrect" });
      return null;
    }
    const Token = isAdmin
      ? "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzY"
      : "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF";

    const userDetails = {
      secretToken: Token,
      username: email,
      userId: data.get_user_id[0].id,
      isAdmin: isAdmin,
    };

    setLoginFail({ show: true, msg: "details" });

    Cookies.set("secret_token", JSON.stringify(userDetails), {
      expires: 30,
    });
    navigate("/");
  };

  const loinUserApi = async (e) => {
    e.preventDefault();
    setLoginFail({ show: false, msg: "" });
    if (email === "" || password === "") {
      if (email === "") {
        setLoginFail({ show: true, msg: "Email Field is Empty" });
        return;
      } else {
        setLoginFail({ show: true, msg: "Password Field is Empty" });
        return;
      }
    }
    apiCall();
  };

  const successView = () => (
    <div className="login-container">
      <div className="login-card">
        <img
          className="website-logo mobile-logo"
          alt="website logo"
          src="https://res.cloudinary.com/dqppfjvrw/image/upload/v1690698824/Frame_507_1_oseag1.png"
        />
        <img
          className="website-logo desktop-logo"
          alt="website logo"
          src="https://res.cloudinary.com/dqppfjvrw/image/upload/v1690698824/Frame_507_1_oseag1.png"
        />
        <form onSubmit={(e) => loinUserApi(e)} className="form-container">
          <div className="input-container">
            <label htmlFor="username">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-element"
              id="username"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">PASSWORD</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-element"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="input-container">
            <select
              id="type"
              className="select-element"
              onChange={(e) => handleSelect(e.target.value)}
            >
              <option className="input-element" htmlFor="type" value="true">
                Admin
              </option>
              <option className="input-element" htmlFor="type" value={"false"}>
                User
              </option>
            </select>
          </div>
          <button className="btn" type="submit">
            Login
          </button>
          {errorMsg.showErrorMsg ? (
            <p className="error-msg">*{errorMsg.msg}</p>
          ) : null}
          {lognFail.show && <p className="error-msg">*{lognFail.msg}</p>}
        </form>
      </div>
    </div>
  );

  const loadingView = () => (
    <div className="login-container">
      <Loader color="#3449eb" height={20} />
    </div>
  );

  switch (status) {
    case statusOfPage.Loading:
      return loadingView();

    case statusOfPage.Success:
      return successView();

    case statusOfPage.Failed:
      return successView();

    default:
      return null;
  }
};

export default Login;
