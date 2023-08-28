import CreditDebit from "../CreditDebit";

import { Navigate } from "react-router-dom";

import TransactionsCard from "../TranscationsCard";
import useUserId from "../FetchUserId";
import ChartCard from "../ChartCard";

import "./index.css";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

import Details from "../../constants/detailstype";

const Accounts = () => {
  const displayView = () => (
    <div className="account-container">
      <CreditDebit />
      <TransactionsCard />
      <ChartCard />
    </div>
  );

  const jwtToken: string | Details = useUserId();

  const res =
    jwtToken === "" ? (
      <Navigate to="/login" />
    ) : (
      <div className="container">
        <Sidebar />
        <div className="txn-container">
          <Navbar title="Account"/>

          {displayView()}
        </div>
      </div>
    );

  return res;
};

export default Accounts;
