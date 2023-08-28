import AddTxnPopUp from "../AddTxnPopUp";
import "./index.css";
import useUserId from "../FetchUserId";

const Navbar = (props: {title: string}) => {
  const userCreds = useUserId();
  const {title} = props

  const  admin  =typeof userCreds === "string"? false: userCreds.isAdmin;
  return (
    <nav className="nav-container">
      <h1>{title}</h1>
      {!admin && <AddTxnPopUp />}
    </nav>
  );
};

export default Navbar;
