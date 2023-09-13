import { observer } from "mobx-react";
import "./index.css";
import TxnList from "../TxnList/TxnList";

const TransactionsCard = () => {
  return (
    <div className="last-txn-card">
      <h1>Last Transactions</h1>
      <TxnList />
    </div>
  );
};

export default observer(TransactionsCard);
