import CreditDebit from "../CreditDebit";

import { Navigate } from "react-router-dom";

import TransactionsCard from "../TranscationsCard";
import useUserId from "../FetchUserId";
import ChartCard from "../ChartCard";

import "./index.css";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

import Details from "../../constants/detailstype";
import { useContext, useEffect } from "react";
import { TransactionsStoreContext } from "../../Context/StoresContext";
import useApiCall from "../UseApiCall";
import { TransactionObj } from "../../constants/storeConstants";
import { observer } from "mobx-react-lite";

type FinalDataObj = {
  amount: number;
  id: number;
  transactionName: string;
  userId: number;
  date: string;
  type: "credit" | "debit";
  category: string;
};
type FinalDataArray = FinalDataObj[];
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

const Accounts = observer(() => {
  const store = useContext(TransactionsStoreContext);

  const userCreds = useUserId();
  const { response, apiCall, status } = useApiCall({
    url: "https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=1000&offset=0",
    method: "GET",
    userId: userCreds!.userId,
  });

  useEffect(() => {
    apiCall();
  }, []);

  useEffect((): void => {
    if (response !== null) {
      const result: Data = response;
      const txnData = result.transactions.map((each) => {
        return {
          amount: each.amount,
          id: each.id,
          transactionName: each.transaction_name,
          userId: each.user_id,
          date: each.date,
          type: each.type,
          category: each.category,
        };
      });
      const sortedData: TransactionObj[] = txnData.sort((a, b) =>
        new Date(a.date) < new Date(b.date) ? 1 : -1
      );
      store.store.setTransactionsList(sortedData);
    }
  }, [response]);

  const displayView = () => (
    <div className="account-container">
      <CreditDebit />
      <TransactionsCard />
      <ChartCard />
    </div>
  );

  const jwtToken: Details = useUserId();

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
});

export default Accounts;
