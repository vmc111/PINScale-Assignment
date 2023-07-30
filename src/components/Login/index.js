import { useState } from "react";
import axios from "axios";
import "./index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erroeMsg, setErrorMsg] = useState("");
  console.log(email);

  const loginUser = async (e) => {
    e.preventDefault();
    const url = "https://bursting-gelding-24.hasura.app/api/rest/get-user-id";
    const user = {
      email,
      password,
    };
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      },
      body: JSON.stringify(user),
    };
    console.log(options);
    const response = await fetch(url, options);

    //   const response = await axios.get(
    //     url,
    //     {
    //       email: "jane.doe@gmail.com",
    //       password: "janedoe@123",
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         "x-hasura-admin-secret":
    //           "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
    //         // Add more headers as needed
    //       },
    //     }
    //   );

    console.log(response.data);
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
          <button className="form-button" type="submit">
            Login
          </button>
          <p className="error-msg">{erroeMsg}</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
