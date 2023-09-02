import { useEffect, useState, useContext } from "react";
import { observer } from "mobx-react-lite";

import { TailSpin } from "react-loader-spinner";
import useUserId from "../FetchUserId";
import useApiCall from "../UseApiCall";

import TransactionsRouteListItems from "../TransactionsRouteListItems";

import "./index.css";
import { TransactionsStoreContext } from "../../Context/StoresContext";
import { TransactionObj } from "../../constants/storeConstants";

type TransactionsObjs = {
  amount: number;
  id: number;
  transaction_name: string;
  user_id: number;
  date: string;
  type: "credit" | "debit";
  category: string;
};
type Transactions = {
  transactions: TransactionsObjs[];
};

const TxnList = observer(() => {
  const store = useContext(TransactionsStoreContext);
  const listOfTransactions = store.store.Last3Transactions;
  const userCreds = useUserId();
  const { response, apiCall, status } = useApiCall({
    url: "https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=100&offset=0",
    method: "GET",
    userId: userCreds!.userId,
  });

  useEffect(() => {
    apiCall();
  }, []);

  useEffect(() => {
    if (response !== null) {
      const result: Transactions = response;
      const txnData: TransactionObj[] = result.transactions.map((each) => {
        return {
          amount: each.amount,
          id: each.id,
          transactionName: each.transaction_name,
          userId: each.user_id,
          date: each.date,
          type: each.type as "credit" | "debit",
          category: each.category,
        };
      });
      store.store.setTransactionsList(txnData);
    }
  }, [response]);

  const renderLoadingView = () => (
    <div className="loader">
      <TailSpin color="#0b69ff" height="50" width="50" />
    </div>
  );

  const tryAgain = () => {
    apiCall();
  };

  const renderFailedView = () => (
    <div>
      <button type="button" className="btn" onClick={() => tryAgain()}>
        Try Again
      </button>
    </div>
  );

  const renderSucccessView = () => {
    const threeTxns = listOfTransactions?.slice(0, 3);
    return (
      <table className="transactions-container">
        {threeTxns?.map((each) => (
          <TransactionsRouteListItems key={each.id} item={each} />
        ))}
      </table>
    );
  };

  switch (status) {
    case "LOADING":
      return renderLoadingView();

    case "SUCCESS":
      return renderSucccessView();

    case "FAILED":
      return renderFailedView();

    default:
      return renderLoadingView();
  }
});

export default TxnList;
