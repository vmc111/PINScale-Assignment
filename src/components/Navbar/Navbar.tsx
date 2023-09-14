import AddTxnPopUp from "../AddTxnPopUp/AddTxnPopUp";
import "./index.css";
import useUserId from "../../hooks/FetchUserId/UseUserId";

type Title = {
  title: string;
};

const Navbar = (props: Title) => {
  const userCreds = useUserId();
  const { title } = props;

  const admin = userCreds!.isAdmin || userCreds?.userId === 3;
  return (
    <nav className="nav-container">
      <h1>{title}</h1>
      {!admin && <AddTxnPopUp />}
    </nav>
  );
};

export default Navbar;
