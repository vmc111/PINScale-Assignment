import { useEffect, useState } from "react";

const statusOfPage = {
  Initial: "INITIAL",
  Loading: "LOADING",
  Success: "SUCCESS",
  Failed: "FAILED",
};
const useApiCall = (props) => {
  const { url, method, body, userId, headers } = props;
  const [status, setStatus] = useState(statusOfPage.Loading);
  const [response, setResponse] = useState(null);
  const [erroeMsg, setErrorMsg] = useState({ showErrorMsg: false, msg: "" });

  useEffect(() => {
    apiCall();
  }, [url]);

  const apiCall = async () => {
    setErrorMsg({ showErrorMsg: false, msg: "" });
    var myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");
    myHeaders.append(
      "x-hasura-admin-secret",
      "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF"
    );
    myHeaders.append("x-hasura-role", "user");
    myHeaders.append("x-hasura-user-id", `${userId}`);

    var requestOptions = {
      method,
      headers: headers === undefined ? myHeaders : headers,
      redirect: "follow",
      body: body !== undefined ? JSON.stringify(body) : null,
    };
    const res = await fetch(url, requestOptions);
    const data = await res.json();
    if (res.ok) {
      setResponse(data);
      setStatus(statusOfPage.Success);
    } else {
      setStatus(statusOfPage.Failed);
      setErrorMsg({ showErrorMsg: true, msg: data.error });
    }
  };

  return { response, apiCall, status, erroeMsg };
};

export default useApiCall;
