import { useEffect, useState } from "react";

import { TailSpin } from "react-loader-spinner";
import useApiCall from "../UseApiCall";

import TransactionsRouteListItems from "../TransactionsRouteListItems";
import statusOfPage from "../../constants/apistatus";

import "./index.css";
import useUserId from "../FetchUserId";

const TransactionRouteList = () => {
  const [allTxnsList, setAllTxnsList] = useState([]);
  const [filteredlist, setFilteredList] = useState([]);
  const [activeBtn, setActiveBtn] = useState("");
  const userCreds = useUserId();

  const { response, apiCall, status } = useApiCall({
    url: "https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=1000&offset=1",
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

      const ListOfTxns = sortedData.reverse();
      setAllTxnsList(ListOfTxns);
      setFilteredList(ListOfTxns);
      setActiveBtn("AllTxn");
    }
  }, [response]);

  const onClickCredit = () => {
    const filteredData = allTxnsList.filter((each) => each.type === "credit");
    setFilteredList(filteredData);
    setActiveBtn("Credit");
  };

  const onClickDebit = () => {
    const filteredData = allTxnsList.filter((each) => each.type === "debit");
    setFilteredList(filteredData);
    setActiveBtn("Debit");
  };

  const onAllTxns = () => {
    setFilteredList(allTxnsList);
    setActiveBtn("AllTxn");
  };

  const renderSuccessView = () => {
    const isAllTxnActive =
      "AllTxn" === activeBtn ? "txn-btn active-txn-btn" : "txn-btn";
    const isCreditActive =
      "credit" === activeBtn ? "txn-btn active-txn-btn" : "txn-btn";
    const isDebitActive =
      "debit" === activeBtn ? "txn-btn active-txn-btn" : "txn-btn";

    return (
      <div className="transactions-route-container">
        <div className="btns-container">
          <button type="button" className={isAllTxnActive} onClick={onAllTxns}>
            All Transactions
          </button>
          <button
            type="button"
            className={isDebitActive}
            onClick={onClickDebit}
          >
            Debit
          </button>
          <button
            type="button"
            className={isCreditActive}
            onClick={onClickCredit}
          >
            Credit
          </button>
        </div>
        <table className="transactions-container">
          <tr>
            <th className="transaction-heading-text">Transaction Name</th>
            <th className="transaction-heading-text">Category</th>
            <th className="transaction-heading-text">Date</th>
            <th className="transaction-heading-text">Amount</th>
            <th> </th>
            <th> </th>
          </tr>
          {filteredlist.map((each) => (
            <TransactionsRouteListItems key={each.id} item={each} />
          ))}
        </table>
      </div>
    );
  };

  const renderLoadingView = () => (
    <div className="loader">
      <TailSpin color="#0b69ff" height="50" width="50" />
    </div>
  );

  const tryAgain = () => {};

  const renderFailedView = () => (
    <div>
      <button type="button" className="btn" onClick={tryAgain}>
        Try Again
      </button>
    </div>
  );

  switch (status) {
    case statusOfPage.Loading:
      return renderLoadingView();
    case statusOfPage.Success:
      return renderSuccessView();
    case statusOfPage.Failed:
      return renderFailedView();

    default:
      return renderLoadingView();
  }
};

export default TransactionRouteList;
