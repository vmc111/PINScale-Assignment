import Cookies from "js-cookie";
import { Details } from "../../types/Detailstype";
const useUserId = (): Details => {
  const newUserCreds = Cookies.get("secret_token");
  return newUserCreds === undefined ? undefined : JSON.parse(newUserCreds);
};

export default useUserId;
