import { useEffect, useContext } from "react";
import { observer } from "mobx-react";
import { useMachine } from "@xstate/react";

import { TailSpin } from "react-loader-spinner";
import useUserId from "../../hooks/FetchUserId/UseUserId";
import useApiCall from "../../hooks/UseApiCall/UseApiCall";

import TransactionsRouteListItems from "../TransactionsRouteListItems/TransactionsRouteListItems";

import "./index.css";
import { TransactionStoreContext } from "../../context/StoresContext";
import { DebitCredit, TransactionObj } from "../../types/storeConstants";
import TransactionModel from "../../stores/models/TransactionObjectmodel";
import { transactionsMachine } from "../../machines/TransactionsMachine";

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
  const { apiCall } = useApiCall({
    url: "https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=100&offset=0",
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
      const result: Transactions = state.context.data as Transactions;
      const txnData: TransactionObj[] = result?.transactions.map((each) => {
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
      const sortedData = txnData.sort((a, b) =>
        new Date(a.date) < new Date(b.date) ? 1 : -1
      );
      const addToTransactionList = sortedData.map(
        (each) => new TransactionModel(each)
      );
      store?.setTransactionsList(addToTransactionList);
    }
  }, [state]);

  const renderLoadingView = () => (
    <div className="loader">
      <TailSpin color="#0b69ff" height="50" width="50" />
    </div>
  );

  const retry = () => send({ type: "Retry" });

  const renderFailedView = () => (
    <div>
      <button type="button" className="btn" onClick={() => retry()}>
        Try Again
      </button>
    </div>
  );

  const renderSucccessView = () => {
    const threeTxns = listOfTransactions?.slice(0, 3);
    return (
      <table className="transactions-container">
        <tbody>
          {threeTxns?.map((each) => (
            <TransactionsRouteListItems key={each.id} item={each} />
          ))}
        </tbody>
      </table>
    );
  };

  if (state.matches("loading")) {
    return renderLoadingView();
  } else if (state.matches("fetchSuccess")) {
    return renderSucccessView();
  }

  return renderFailedView();
};

export default observer(TxnList);
