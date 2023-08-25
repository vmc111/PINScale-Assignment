import { useEffect, useState } from "react";

import { TailSpin } from "react-loader-spinner";
import useUserId from "../FetchUserId";
import useApiCall from "../UseApiCall";

import TransactionsRouteListItems from "../TransactionsRouteListItems";

import "./index.css";
import statusOfPage from "../../constants/apistatus";

const TxnList = () => {
  const [listOfTransactions, setListOfTransactions] = useState([]);
  const [userCreds, setUserCreds] = useState(useUserId());
  const { response, apiCall, status } = useApiCall({
    url: "https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=100&offset=0",
    method: "GET",
    userId: userCreds.userId,
  });

  useEffect(() => {
    apiCall();
  }, []);

  useEffect(() => {
    if (response !== null) {
      const txnData = response.transactions.map((each) => {
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

      const sortedData = txnData.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });

      const listOfTxns = sortedData.reverse();
      setListOfTransactions(listOfTxns);
    }
  }, [response]);

  const renderLoadingView = () => (
    <div className="loader">
      <TailSpin color="#0b69ff" height="50" width="50" />
    </div>
  );

  const renderFailedView = () => (
    <div>
      <button type="button" className="btn" onClick={this.tryAgain}>
        Try Again
      </button>
    </div>
  );

  const renderSucccessView = () => {
    const threeTxns = listOfTransactions.slice(0, 3);
    return (
      <table className="transactions-container">
        {threeTxns.map((each) => (
          <TransactionsRouteListItems key={each.id} item={each} />
        ))}
      </table>
    );
  };

  switch (status) {
    case statusOfPage.Loading:
      return renderLoadingView();

    case statusOfPage.Success:
      return renderSucccessView();

    case statusOfPage.Failed:
      return renderFailedView();

    default:
      return renderLoadingView();
  }
};

export default TxnList;
