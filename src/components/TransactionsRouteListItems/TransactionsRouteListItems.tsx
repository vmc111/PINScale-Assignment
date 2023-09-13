import {
  BsCurrencyDollar,
  BsArrowUpCircle,
  BsArrowDownCircle,
} from "react-icons/bs";
import { observer } from "mobx-react";
import UpdateTxnPopup from "../UpdateTxnPopup/UpdateTxnPopup";
import useUserId from "../../hooks/FetchUserId/UseUserId";

import "./index.css";
import DeletePopup from "../DeletePopUp/DeletePopup";
import dateConverter from "../../utils/dateConverter";
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
      <BsArrowUpCircle size={30} color="green" />
    ) : (
      <BsArrowDownCircle size={30} color="red" />
    );

  const classOfReqType =
    type === "credit" ? "credit-amount-text" : "debit-amount-text";
  const ReqSign = type === "credit" ? "+" : "-";

  const formattedDate = dateConverter(date);

  const userCreds = useUserId();

  const admin = userCreds!.userId === 3;

  return (
    <tr className="transaction-item-row border border-cyan-200">
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
