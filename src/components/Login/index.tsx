import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { TailSpin as Loader } from "react-loader-spinner";
import Cookies from "js-cookie";

import "./index.css";
import useApiCall from "../../hooks/UseApiCall/index";
import useUserId from "../../hooks/FetchUserId";

type LoginError = {
  msg: string;
  show: boolean;
};

type UserId = {
  id: number | undefined;
};

type Data = {
  get_user_id: UserId[];
};

const Login = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [lognFail, setLoginFail] = useState<LoginError>({
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

  const userLogged = useUserId();

  if (userLogged !== undefined) {
    return <Navigate to="/" />;
  }

  const handleSelect = (value: string): void => {
    value === "true" ? setIsAdmin(true) : setIsAdmin(false);
  };

  const onLoginApprove = (data: Data): void | null => {
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

  const loinUserApi = async (e: React.FormEvent<HTMLFormElement>) => {
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

  const renderSuccessView = () => (
    <div className=" w-full flex flex-row flex-wrap overflow-hidden items-center justify-center h-screen p-4 bg-gray-200">
      <div className="flex flex-col items-center justify-evenly min-w-max min-h-max rounded-lg bg-slate-100 py-7 px-10 shadow-lg">
        <img
          className="h-auto lg:h-12 w-auto mobile-logo"
          alt="website logo"
          src="https://res.cloudinary.com/dqppfjvrw/image/upload/v1690698824/Frame_507_1_oseag1.png"
        />
        <img
          className="h-auto lg:h-12 w-auto desktop-logo"
          alt="website logo"
          src="https://res.cloudinary.com/dqppfjvrw/image/upload/v1690698824/Frame_507_1_oseag1.png"
        />
        <form
          onSubmit={(e) => loinUserApi(e)}
          className="flex flex-col items-center justify-evenly h-auto flex-wrap font-serif"
        >
          <div className=" w-full lg:w-72 flex flex-col items-start mb-3 mt-3">
            <label htmlFor="username" className="from-neutral-700 text-lg">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent h-auto w-56 lg:w-64 p-3 text-sm mb-1 rounded border-solid"
              id="username"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="w-full lg:w-72 flex flex-col items-start mb-3 mt-3">
            <label htmlFor="password" className="from-neutral-700 text-lg">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent h-auto w-56 lg:w-64 p-3 text-sm mb-1 rounded border-solid"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className=" w-full lg:w-72 flex flex-col items-start mb-3 mt-3">
            <select
              id="type"
              className="w-full border-solid mt-1 p-3 rounded bg-transparent mb-2"
              onChange={(e) => handleSelect(e.target.value)}
            >
              <option
                className="bg-transparent h-auto w-full lg:w-64 p-3 text-sm mb-1 rounded border-solid"
                value="true"
              >
                Admin
              </option>
              <option
                className="bg-transparent h-auto w-full lg:w-64 p-3 text-sm mb-1 rounded border-solid"
                value={"false"}
              >
                User
              </option>
            </select>
          </div>
          <button
            className="text-xs lg:text-xl my-2 py-2 px-12 rounded-md font-medium border-none cursor-pointer bg-teal-600 hover:bg-yellow-600 text-stone-50"
            type="submit"
          >
            Login
          </button>
          {errorMsg.showErrorMsg ? (
            <p className=" text-base text-red-600">*{errorMsg.msg}</p>
          ) : null}
          {lognFail.show && (
            <p className=" text-base text-red-600">*{lognFail.msg}</p>
          )}
        </form>
      </div>
    </div>
  );

  const renderLoadingView = () => (
    <div className="flex flex-row items-center justify-center h-screen p-4 bg-yellow-300">
      <Loader color="#3449eb" height={100} />
    </div>
  );

  switch (status) {
    case "LOADING":
      return renderLoadingView();

    case "SUCCESS":
      return renderSuccessView();

    case "FAILED":
      return renderSuccessView();

    default:
      return renderSuccessView();
  }
};

export default Login;
