import AddTxnPopUp from "../AddTxnPopUp";
import "./index.css";
import useUserId from "../FetchUserId";

const Navbar = (props) => {
  const userCreds = useUserId();

  const { isAdmin } = userCreds;

  const admin = !isAdmin;
  return (
    <nav className="nav-container">
      <h1>{props.children}</h1>
      {admin && <AddTxnPopUp />}
    </nav>
  );
};

export default Navbar;
