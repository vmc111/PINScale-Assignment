import { observer } from "mobx-react-lite";
import "./index.css";
import TxnList from "../TxnList";

const TransactionsCard = observer(() => {
  return (
    <div className="last-txn-card">
      <h1>Last Transactions</h1>
      <TxnList />
    </div>
  );
});

export default TransactionsCard;
