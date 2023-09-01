import Cookies from "js-cookie";
import Details from "../../constants/detailstype";
const useUserId = () : Details => {
  const newUserCreds = Cookies.get("secret_token");
  return (newUserCreds === undefined? undefined : JSON.parse(newUserCreds))
};

export default useUserId;
