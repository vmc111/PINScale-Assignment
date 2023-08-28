import {
  BsCurrencyDollar,
  BsArrowUpCircle,
  BsArrowDownCircle,
} from "react-icons/bs";
import UpdateTxnPopup from "../UpdateTxnPopup";
import useUserId from "../FetchUserId";

import "./index.css";
import DeletePopup from "../DeletePopUp";
import DateConverter from "../DateConverer";

type Props = {
  key: number,
  item: {
    amount: number;
    id: number;
    transactionName: string;
    userId: number;
    date: string;
    type: string;
    category: string;
}
}

const TransactionsRouteListItems = (props: Props) => {
  const { item } = props;

  const { id, transactionName, type, category, date, amount } = item;

  const reqItem =
    type === "credit" ? (
      <BsArrowUpCircle size={25} />
    ) : (
      <BsArrowDownCircle size={25} />
    );

  const classOfReqType =
    type === "credit" ? "credit-amount-text" : "debit-amount-text";
  const ReqSign = type === "credit" ? "+" : "-";

  const formattedDate = DateConverter(date);

  const userCreds = useUserId();

  const admin  =typeof userCreds === "string"? false: userCreds.isAdmin;
 

  return (
    <tr className="transaction-item-row">
      <td className="txnname">
        {reqItem} {transactionName}
      </td>
      <td>{category}</td>
      <td>{formattedDate}</td>
      <td className={classOfReqType}>
        {ReqSign}
        <BsCurrencyDollar />
        {amount}
      </td>
      {!admin && (
        <td>
          <UpdateTxnPopup />
        </td>
      )}
      {!admin && (
        <td>
          <DeletePopup id={id} />
        </td>
      )}
    </tr>
  );
};

export default TransactionsRouteListItems;
