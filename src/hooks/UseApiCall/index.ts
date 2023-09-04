import { useState } from "react";
// import Status from "../../constants/apistatus";
import Status from "../../constants/apistatus";

type Headers = {
    "Content-Type": string;
    "x-hasura-admin-secret": string;
    "x-hasura-role"?: string,
    "x-hasura-user-id"?: string
}

type Error = {
  msg: string
   showErrorMsg: boolean
}

type APIBody = {
  id?: number
   email?: string | undefined,
   password?: string | undefined,
   name?: string,
    type?: string,
    category?: string,
    amount?: number,
    date?: Date,
    user_id?: number 
}

type Props = {
  url: string,
  method: "GET" | "PUT" | "POST" | "DELETE",
  body?: APIBody,
  userId?: number,
  headers?: Headers 
}

const useApiCall = (props: Props) => {
  const { url, method, body, userId, headers } = props;
  const [status, setStatus] = useState<Status>("INITIAL");
  const [response, setResponse] = useState(null);
  const [errorMsg, setErrorMsg] = useState<Error>({ showErrorMsg: false, msg: "" });

  const apiCall = async () => {
    setStatus("LOADING");
    setErrorMsg({ showErrorMsg: false, msg: "" });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "x-hasura-admin-secret",
      "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF"
    );
    myHeaders.append("x-hasura-role", "user");
    myHeaders.append("x-hasura-user-id", `${userId}`);

    var requestOptions:RequestInit = {
      method,
      headers: headers === undefined ? myHeaders : headers,
      redirect: "follow",
      body: body !== undefined ? JSON.stringify(body) : null,
    };
    const res = await fetch(url, requestOptions);
    const data = await res.json();
    if (res.ok) {
      setResponse(data);
      setStatus("SUCCESS");
    } else {
      setStatus("FAILED");
      setErrorMsg({ showErrorMsg: true, msg: data.error });
    }
  };

  return { response, apiCall, status, errorMsg };
};

export default useApiCall;
