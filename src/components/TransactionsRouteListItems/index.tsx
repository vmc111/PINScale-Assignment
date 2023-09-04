import {
  BsCurrencyDollar,
  BsArrowUpCircle,
  BsArrowDownCircle,
} from "react-icons/bs";
import { observer } from "mobx-react";
import UpdateTxnPopup from "../UpdateTxnPopup";
import useUserId from "../../hooks/FetchUserId";

import "./index.css";
import DeletePopup from "../DeletePopUp";
import DateConverter from "../../utils/dateConverter";
import { DebitCredit } from "../../types/storeConstants";

type Item = {
  amount: number;
  id: number;
  transactionName: string;
  userId: number;
  date: string;
  type: DebitCredit;
  category: string;
};

type Props = {
  key: number;
  item: Item;
};

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

  const admin = userCreds!.userId === 3;

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
          <UpdateTxnPopup {...item} />
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

export default observer(TransactionsRouteListItems);
