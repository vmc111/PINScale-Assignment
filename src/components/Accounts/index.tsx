import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react";

import { TransactionStoreContext } from "../../context/StoresContext";
import { DebitCredit, TransactionObj } from "../../types/storeConstants";
import CreditDebit from "../CreditDebit";
import TransactionsCard from "../TranscationsCard";
import useUserId from "../../hooks/FetchUserId";
import ChartCard from "../ChartCard";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Details from "../../types/detailstype";
import useApiCall from "../../hooks/UseApiCall";
import TransactionModel from "../../stores/models/TransactionObjectmodel";
import "./index.css";

type InitialDataObj = {
  amount: number;
  id: number;
  transaction_name: string;
  user_id: number;
  date: string;
  type: "credit" | "debit";
  category: string;
};
type Data = {
  transactions: InitialDataObj[];
};

const Accounts = () => {
  const store = useContext(TransactionStoreContext);

  const userCreds = useUserId();
  const { response, apiCall, status } = useApiCall({
    url: "https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=1000&offset=0",
    method: "GET",
    userId: userCreds?.userId,
  });

  const displayView = () => (
    <div className="account-container">
      <CreditDebit />
      <TransactionsCard />
      <ChartCard />
    </div>
  );
  const jwtToken = userCreds;

  const res =
    jwtToken === undefined ? (
      <Navigate to="/login" />
    ) : (
      <div className="container">
        <Sidebar />
        <div className="txn-container">
          <Navbar title="Account" />

          {displayView()}
        </div>
      </div>
    );

  return res;
};

export default observer(Accounts);
