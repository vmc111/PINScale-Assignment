import Popup from "reactjs-popup";
import { observer } from "mobx-react-lite";
import { MdOutlineModeEditOutline } from "react-icons/md";

import "reactjs-popup/dist/index.css";

import "./index.css";
import { useEffect, useContext, useState } from "react";
import { TransactionObj } from "../../constants/storeConstants";
import useApiCall from "../UseApiCall";
import { TransactionsStoreContext } from "../../Context/StoresContext";
import useUserId from "../FetchUserId";

type Item = {
  amount: number;
  id: number;
  transactionName: string;
  userId: number;
  date: string;
  type: "credit" | "debit";
  category: string;
};

type NewData = {
  id: number;
  name: string;
  type: "credit" | "debit";
  category: string;
  amount: number;
  date: string;
};

type ResponseObj = {
  id: number;
  transaction_name: string;
  type: "credit" | "debit";
  category: string;
  amount: number;
  date: string;
};

type Response = {
  update_transactions_by_pk: ResponseObj;
};

const UpdateTxnPopup = observer((item: Item) => {
  const transac = item;
  const apiTransaction: NewData = {
    id: transac.id,
    name: transac.transactionName,
    type: transac.type,
    category: transac.category,
    amount: transac.amount,
    date: transac.date,
  };
  const [data, setData] = useState<NewData>(apiTransaction);
  const apiUrl =
    "https://bursting-gelding-24.hasura.app/api/rest/update-transaction";
  const newheaders = {
    "Content-Type": "application/json",
    "x-hasura-admin-secret":
      "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
    "x-hasura-role": "user",
    "x-hasura-user-id": `${useUserId()!.userId}`,
  };
  const { response, apiCall, status } = useApiCall({
    url: apiUrl,
    method: "POST",
    headers: newheaders,
    body: { ...data, date: new Date(data.date) },
  });

  const store = useContext(TransactionsStoreContext);

  useEffect(() => {
    if (response !== null && status === "SUCCESS") {
      const result: Response = response!;
      const newObj: TransactionObj = {
        id: result.update_transactions_by_pk.id,
        transactionName: result.update_transactions_by_pk.transaction_name,
        type: result.update_transactions_by_pk.type,
        category: result.update_transactions_by_pk.category,
        amount: result.update_transactions_by_pk.amount,
        date: result.update_transactions_by_pk.date,
        userId: item.userId,
      };
      const index = store.store.transactionsList.findIndex(
        (each) => each.id === newObj.id
      );
      store.store.transactionsList[index].editTransaction(newObj);
      alert("Update Complete....");
    } else if (status === "FAILED") {
      alert("Failed to edit..");
    }
  }, [response]);

  const onAddingTxn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    apiCall();
  };

  return (
    <div className="popup-container">
      <Popup
        modal
        trigger={
          <button type="button" className="edit-btn">
            <MdOutlineModeEditOutline size={25} />
          </button>
        }
        closeOnEscape
      >
        <div className="add-txn-popup-container">
          <h1 className="add-txn-heading-text">Update Transaction</h1>
          <p className="add-txn-para-text">Make a Transaction</p>
          <form className="add-txn-form" onSubmit={(e) => onAddingTxn(e)}>
            <div className="input-container">
              <label htmlFor="txnName" className="add-txn-label">
                Transaction Name
              </label>
              <input
                id="txnName"
                type="text"
                placeholder="Enter Name"
                className="add-txn-input"
                value={data.name}
                onChange={(e) =>
                  setData((preState) => ({
                    ...preState,
                    name: e.target.value,
                  }))
                }
              />
            </div>
            <div className="input-container">
              <label htmlFor="txnType" className="add-txn-label">
                Transaction Type
              </label>
              <select
                id="txnType"
                placeholder="Select Transaction Type"
                className="add-txn-input"
                value={data.type}
                onChange={(e) =>
                  setData((preState) => ({
                    ...preState,
                    type: e.target.value! as "credit" | "debit",
                  }))
                }
              >
                <option value="credit">credit</option>
                <option value="debit">debit</option>
              </select>
            </div>
            <div className="input-container">
              <label htmlFor="txnCategory" className="add-txn-label">
                Category
              </label>
              <select
                id="txnCategory"
                placeholder="Select Transaction Type"
                className="add-txn-input"
                value={data.category}
                onChange={(e) =>
                  setData((preState) => ({
                    ...preState,
                    category: e.target.value!,
                  }))
                }
              >
                <option value="Food">Food</option>
                <option value="Shopping">Shopping</option>
                <option value="Materials">Materials</option>
                <option value="Books">Books</option>
                <option value="Grocery">Grocery</option>
                <option value="Transfer">Transfer</option>
              </select>
            </div>
            <div className="input-container">
              <label htmlFor="amount" className="add-txn-label">
                Amount
              </label>
              <input
                id="amount"
                type="text"
                placeholder="Enter Your Amount"
                className="add-txn-input"
                value={data.amount}
                onChange={(e) =>
                  setData((preState) => ({
                    ...preState,
                    amount: parseInt(e.target.value!),
                  }))
                }
              />
            </div>
            <div className="input-container">
              <label htmlFor="date" className="add-txn-label">
                Date
              </label>
              <input
                id="date"
                type="date"
                placeholder="Enter transaction Date"
                className="add-txn-input"
                value={data.date.split("T", 1).toString()}
                onChange={(e) =>
                  setData((preState) => ({
                    ...preState,
                    date: e.target.value!,
                  }))
                }
              />
            </div>
            <div>
              <button className="submit-btn" type="submit">
                Update Transaction
              </button>
            </div>
          </form>
        </div>
      </Popup>
    </div>
  );
});

export default UpdateTxnPopup;
