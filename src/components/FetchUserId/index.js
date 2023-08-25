import Cookies from "js-cookie";

const useFetchUserId = () => {
  const newUserCreds = Cookies.get("secret_token");
  const parsedObject = JSON.parse(newUserCreds);
  return parsedObject;
};

export default useFetchUserId;
