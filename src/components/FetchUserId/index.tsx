import Cookies from "js-cookie";
import Details from "../../constants/detailstype";
const useUserId = () : string | {
    secretToken: string;
    username: string | undefined;
    userId: number | undefined;
    isAdmin: boolean;
} => {
  const newUserCreds = Cookies.get("secret_token");
  const parsedObject : Details | string =
    newUserCreds === undefined ? "" : JSON.parse(newUserCreds);
  return parsedObject;
};

export default useUserId;
