import { useEffect, useState } from "react";

import { TailSpin } from "react-loader-spinner";

import Cookies from "js-cookie";

import TransactionsRouteListItems from "../TransactionsRouteListItems";

import "./index.css";

const statusOfPage = {
  initial: "INTIAL",
  Loading: "LOADING",
  Succcess: "SUCCESS",
  Failed: "FAILED",
};

const TransactionRouteList = () => {
  const [status, setStatus] = useState(statusOfPage.initial); // to update the page's status
  const [allTxnsList, setAllTxnsList] = useState([]);
  const [filteredlist, setFilteredList] = useState([]);
  const [activeBtn, setActiveBtn] = useState("");

  useEffect(() => {
    fetchTxnDetails();
  }, []);

  const fetchTxnDetails = async () => {
    setStatus(statusOfPage.Loading);

    const userCreds = Cookies.get("secret_token");

    const parsedObject = JSON.parse(userCreds);

    const { userId, isAdmin } = parsedObject;
    console.log("userId", userId);

    const role = isAdmin ? "admin" : "user";

    const ReqUrl =
      "https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=1000&offset=1";

    var myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");
    myHeaders.append(
      "x-hasura-admin-secret",
      "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF"
    );
    myHeaders.append("x-hasura-role", role);
    myHeaders.append("x-hasura-user-id", userId);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(ReqUrl, requestOptions);

      const result = await response.json();

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
      console.log(txnData);

      const sortedData = txnData.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });

      const ListOfTxns = sortedData.reverse();
      setAllTxnsList(ListOfTxns);
      setFilteredList(ListOfTxns);
      setStatus(statusOfPage.Succcess);
      setActiveBtn("AllTxn");
    } catch (error) {
      setStatus(statusOfPage.Failed);
    }
  };

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

  const successView = () => {
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

  const loadingView = () => (
    <div className="loader">
      <TailSpin color="#0b69ff" height="50" width="50" />
    </div>
  );

  const tryAgain = () => {};

  const failedView = () => (
    <div>
      <button type="button" className="btn" onClick={tryAgain}>
        Try Again
      </button>
    </div>
  );

  switch (status) {
    case statusOfPage.Loading:
      return loadingView();
    case statusOfPage.Succcess:
      return successView();
    case statusOfPage.Failed:
      return failedView();

    default:
      return null;
  }
};

export default TransactionRouteList;
