import { useEffect, useState, useContext } from "react";
import { observer } from "mobx-react";

import { TailSpin } from "react-loader-spinner";
import useApiCall from "../../hooks/UseApiCall";

import TransactionsRouteListItems from "../TransactionsRouteListItems";

import "./index.css";
import useUserId from "../../hooks/FetchUserId";
import { TransactionStoreContext } from "../../context/StoresContext";
import { DebitCredit } from "../../types/storeConstants";
import TransactionModel from "../../stores/models/TransactionObjectmodel";
import { useMachine } from "@xstate/react";
import { transactionsMachine } from "../../machines/transactionsMachine";

type Filter = DebitCredit | "AllTxn";

type FinalDataObj = {
  amount: number;
  id: number;
  transactionName: string;
  userId: number;
  date: string;
  type: DebitCredit;
  category: string;
};

type InitialDataObj = {
  amount: number;
  id: number;
  transaction_name: string;
  user_id: number;
  date: string;
  type: DebitCredit;
  category: string;
};

type Data = {
  transactions: InitialDataObj[];
};

const TransactionRouteList = () => {
  const [activeBtn, setActiveBtn] = useState<Filter>("AllTxn");
  const userCreds = useUserId();
  const store = useContext(TransactionStoreContext);
  let allTxnsList = store?.transactionsList;
  let filteredlist: TransactionModel[] | [] | undefined;
  switch (activeBtn) {
    case "AllTxn":
      filteredlist = allTxnsList;
      break;
    case "credit":
      filteredlist = store?.creditTransactionsArray;
      break;
    case "debit":
      filteredlist = store?.debitTransactionsArray;
      break;
    default:
      filteredlist = allTxnsList;
  }

  const { response, apiCall, status } = useApiCall({
    url: "https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=1000&offset=0",
    method: "GET",
    userId: userCreds!.userId,
  });
  const [state, send] = useMachine(transactionsMachine, {
    services: {
      fetchData: async () => {
        const data = await apiCall();
        return new Promise((resolve, reject) => {
          if (data !== null && data !== undefined) {
            resolve(data);
          } else {
            reject("Failed to fetch....");
          }
        });
      },
    },
  });

  useEffect(() => {
    if (state.matches("fetchSuccess")) {
      const result: Data = state.context.data as Data;
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

      const sortedData = txnData.sort((a, b) =>
        new Date(a.date) < new Date(b.date) ? 1 : -1
      );
      const addToTransactionList = sortedData.map(
        (each) => new TransactionModel(each)
      );
      store?.setTransactionsList(addToTransactionList);
      setActiveBtn("AllTxn");
    }
  }, [state]);

  const onClickCredit = (): void => {
    const filteredData = allTxnsList!.filter((each) => each.type === "credit");
    setActiveBtn("credit");
  };

  const onClickDebit = (): void => {
    const filteredData = allTxnsList!.filter((each) => each.type === "debit");
    setActiveBtn("debit");
  };

  const onAllTxns = (): void => {
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
          {filteredlist?.map((each) => (
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
      <button
        type="button"
        className="btn"
        onClick={() => send({ type: "Retry" })}
      >
        Try Again
      </button>
    </div>
  );

  if (state.matches("fetchSuccess")) {
    return renderSuccessView();
  } else if (state.matches("loading")) {
    return renderLoadingView();
  }

  return renderFailedView();
};

export default observer(TransactionRouteList);
