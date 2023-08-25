import Cookies from "js-cookie";

const useUserId = () => {
  const newUserCreds = Cookies.get("secret_token");
  const parsedObject = JSON.parse(newUserCreds);
  return parsedObject;
};

export default useUserId;
