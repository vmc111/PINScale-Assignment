import { useEffect, useState } from "react";

import { TailSpin } from "react-loader-spinner";
import useUserId from "../FetchUserId";
import useApiCall from "../UseApiCall";

import TransactionsRouteListItems from "../TransactionsRouteListItems";

import "./index.css";

type TransactionsObj = { amount: number; id: number; transactionName: string; userId: number; date: string; type: string; category: string; }
type Transactions = {
  transactions : TransactionsObj[]
}


const TxnList = () => {
  const [listOfTransactions, setListOfTransactions] = useState<TransactionsObj[]>();
  const [userCreds, setUserCreds] = useState(useUserId());
  const { response, apiCall, status } = useApiCall({
    url: "https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=100&offset=0",
    method: "GET",
    userId:userCreds!.userId,
  });

  useEffect(() => {
    apiCall();
  }, []);

  useEffect(() => {
    if (response !== null) {
      const result: Transactions = response
      const txnData = result.transactions.map((each) => {
        return {
          amount: each.amount,
          id: each.id,
          transactionName: each.transactionName,
          userId: each.userId,
          date: each.date,
          type: each.type,
          category: each.category,
        };
      });
      setListOfTransactions(txnData);
    }
  }, [response]);

  const renderLoadingView = () => (
    <div className="loader">
      <TailSpin color="#0b69ff" height="50" width="50" />
    </div>
  );

  const tryAgain = () => {
    apiCall()
  }

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

export default TxnList;
