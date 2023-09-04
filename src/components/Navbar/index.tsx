import AddTxnPopUp from "../AddTxnPopUp";
import "./index.css";
import useUserId from "../../hooks/FetchUserId";

type Title = {
  title: string;
};

const Navbar = (props: Title) => {
  const userCreds = useUserId();
  const { title } = props;

  const admin = userCreds!.isAdmin;
  return (
    <nav className="nav-container">
      <h1>{title}</h1>
      {!admin && <AddTxnPopUp />}
    </nav>
  );
};

export default Navbar;
