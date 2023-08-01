import {
  BsCurrencyDollar,
  BsArrowUpCircle,
  BsArrowDownCircle,
} from "react-icons/bs";

import Cookies from "js-cookie";

import "./index.css";
import DeletePopup from "../DeletePopUp";
import UpdateTxnPopup from "../UpdateTxnPopup";
import DateConverter from "../DateConverter";

const TxnListItem = (props) => {
  const { item } = props;

  const userCreds = Cookies.get("secret_token");

  console.log(userCreds);

  const parsedObject = JSON.parse(userCreds);

  const { isAdmin } = parsedObject;

  const admin = !isAdmin;

  console.log("sdas", admin);

  const { id, transactionName, type, date, amount, category } = item;

  const formattedDate = DateConverter(date);

  const classname = type === "credit" ? "credit-item" : "debit-item";
  const ReqSign = type === "credit" ? "+" : "-";

  const reqItem =
    type === "credit" ? (
      <BsArrowUpCircle className={classname} size={25} />
    ) : (
      <BsArrowDownCircle className={classname} size={25} />
    );

  return (
    <li className="txn-list-item">
      <p className="name-symbol-item list-item-width">
        {reqItem}
        {transactionName}
      </p>
      <p className="list-item-width">{category}</p>
      <p className="list-item-width">{formattedDate}</p>
      <p className={`${classname} className='list-item-width'`}>
        {ReqSign}
        <BsCurrencyDollar />
        {amount}
      </p>
      <p className="sign-box list-item-width">
        {admin && <UpdateTxnPopup />}
        {admin && <DeletePopup id={id} />}
      </p>
    </li>
  );
};

export default TxnListItem;
