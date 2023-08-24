import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { TailSpin as Loader } from "react-loader-spinner";
import "./index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erroeMsg, setErrorMsg] = useState({ showErrorMsg: false, msg: "" });
  const [isLoading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const dataFormat = (data) => ({
    getUserId: data.get_user_id,
  });

  const handleSelect = (value) => {
    value === "true" ? setIsAdmin(true) : setIsAdmin(false);
  };

  const onLoginApprove = (data) => {
    console.log(data);

    const Token = isAdmin
      ? "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzY"
      : "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF";

    const userDetails = {
      secretToken: Token,
      username: email,
      userId: data.getUserId[0].id,
      isAdmin: isAdmin,
    };

    Cookies.set("secret_token", JSON.stringify(userDetails), {
      expires: 30,
    });
    navigate("/");
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setErrorMsg({ showErrorMsg: false, msg: "" });
    setLoading(true);
    const user = {
      email,
      password,
    };
    const newUrl = `https://bursting-gelding-24.hasura.app/api/rest/get-user-id`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(newUrl, options);
    const data = await response.json();
    if (response.ok) {
      const formattedData = dataFormat(data);
      formattedData.getUserId.length !== 0
        ? onLoginApprove(formattedData)
        : setErrorMsg({ showErrorMsg: true, msg: "Invalid Login credentials" });
      onLoginApprove(formattedData);
    } else {
      console.log(data.error);
      setErrorMsg({ showErrorMsg: true, msg: data.error });
    }
    setLoading(false);
  };

  return (
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
        <form onSubmit={(e) => loginUser(e)} className="form-container">
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
          {isLoading ? <Loader color="#3449eb" height={20} /> : null}
          {erroeMsg.showErrorMsg ? (
            <p className="error-msg">*{erroeMsg.msg}</p>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default Login;
