import { useEffect, useState, useContext } from "react";
import { observer } from "mobx-react";

import { TailSpin } from "react-loader-spinner";
import useUserId from "../../hooks/FetchUserId";
import useApiCall from "../../hooks/UseApiCall";

import TransactionsRouteListItems from "../TransactionsRouteListItems";

import "./index.css";
import { TransactionStoreContext } from "../../context/StoresContext";
import { DebitCredit, TransactionObj } from "../../types/storeConstants";
import TransactionModel from "../../stores/models/TransactionObjectmodel";

type TransactionsObjs = {
  amount: number;
  id: number;
  transaction_name: string;
  user_id: number;
  date: string;
  type: DebitCredit;
  category: string;
};
type Transactions = {
  transactions: TransactionsObjs[];
};

const TxnList = () => {
  const store = useContext(TransactionStoreContext);
  const listOfTransactions = store?.lastThreeTransactions;
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
          type: each.type as DebitCredit,
          category: each.category,
        };
      });
      const addToTransactionList = txnData.map(
        (each) => new TransactionModel(each)
      );
      store?.setTransactionsList(addToTransactionList);
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
};

export default observer(TxnList);
