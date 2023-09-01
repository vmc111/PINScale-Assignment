import TransactionRouteList from "../TransactionRouteList";
import useUserId from "../FetchUserId";
import { Navigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { observer } from "mobx-react-lite";

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
