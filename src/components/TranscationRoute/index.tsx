import { Navigate } from "react-router-dom";
import TransactionRouteList from "../TransactionRouteList";
import useUserId from "../../hooks/FetchUserId";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

const TransactionRoute = () => {
  return useUserId() !== undefined ? (
    <div className="container">
      <Sidebar />
      <div className="txn-container">
        <Navbar title="Transactions" />
        <TransactionRouteList />
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default TransactionRoute;
