import { Navigate } from "react-router-dom";
import TransactionRouteList from "../TransactionRouteList/TransactionRouteList";
import useUserId from "../../hooks/FetchUserId/UseUserId";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

const TransactionRoute = () => {
  return useUserId() !== undefined ? (
    <div className="container fixed w-screen">
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
