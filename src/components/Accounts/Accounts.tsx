import { Navigate } from "react-router-dom";
import { observer } from "mobx-react";

import CreditDebit from "../CreditDebit/CreditDebit";
import TransactionsCard from "../TranscationsCard/TransactionsCard";
import useUserId from "../../hooks/FetchUserId/UseUserId";
import ChartCard from "../ChartCard/ChartCard";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import "./index.css";

const Accounts = () => {
  const userCreds = useUserId();
  const renderDisplayView = () => (
    <div className="account-container bg-slate-50 p-3 m-0 overflow-x-hidden">
      <CreditDebit />
      <TransactionsCard />
      <ChartCard />
    </div>
  );
  const jwtToken = userCreds?.secretToken;

  const res =
    jwtToken === undefined ? (
      <Navigate to="/login" />
    ) : (
      <div className="container fixed">
        <Sidebar />
        <div className="txn-container">
          <Navbar title="Account" />

          {renderDisplayView()}
        </div>
      </div>
    );

  return res;
};

export default observer(Accounts);
