import { useState, useContext, useEffect, useMemo } from "react";

import Popup from "reactjs-popup";

import { AiOutlinePlus } from "react-icons/ai";

import useApiCall from "../UseApiCall";

import "reactjs-popup/dist/index.css";

import "./index.css";
import useUserId from "../FetchUserId";
import { TailSpin } from "react-loader-spinner";
import { TransactionsStoreContext } from "../../Context/StoresContext";
import { TransactionObj } from "../../constants/storeConstants";
import TransactionObject from "../../utils/Stores/Modals/TransactionObject";
import { observer } from "mobx-react-lite";

type Data = {
  insert_transactions_one: {
    id: number;
    transaction_name: string;
    type: "credit" | "debit";
    date: string;
    category: string;
    amount: number;
  };
};

const AddTxnPopUp = observer(() => {
  const txn: TransactionObj = {
    transactionName: "",
    id: 0,
    type: "credit",
    amount: 0,
    userId: 0,
    date: "",
    category: "Food",
  };

  const createNewTransactionObject = (): TransactionObject =>
    new TransactionObject(txn);
  const newTxnDetails: TransactionObject = useMemo(
    () => createNewTransactionObject(),
    []
  );
  const txnDetails: TransactionObj = { ...newTxnDetails };

  const userCreds = useUserId();

  const store = useContext(TransactionsStoreContext);

  const userId = userCreds!.userId;
  const apiBody = {
    name: txnDetails!.transactionName,
    type: txnDetails!.type,
    category: txnDetails!.category,
    amount: txnDetails!.amount,
    date: new Date(txnDetails!.date),
    user_id: userId,
  };
  const url = `https://bursting-gelding-24.hasura.app/api/rest/add-transaction`;
  const newheaders = {
    "Content-Type": "application/json",
    "x-hasura-admin-secret":
      "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
    "x-hasura-role": "user",
    "x-hasura-user-id": `${userId}`,
  };
  const { response, apiCall, status, errorMsg } = useApiCall({
    url: url,
    userId: userId,
    method: "POST",
    headers: newheaders,
    body: apiBody,
  });

  useEffect(() => {
    if (response !== null && status === "SUCCESS") {
      const res: Data = response!;
      const newObj: TransactionObj = {
        id: res.insert_transactions_one.id,
        type: res.insert_transactions_one.type,
        amount: res.insert_transactions_one.amount,
        transactionName: res.insert_transactions_one.transaction_name,
        userId: userId!,
        date: res.insert_transactions_one.date,
        category: res.insert_transactions_one.category,
      };
      store.store.addTransaction(newObj);
    } else if (response !== null && status === "FAILED") {
      alert("Failed to update");
    }
  }, [response]);

  const onAddingTxn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { transactionName, category, amount, type, date } = newTxnDetails;

    const amountValidation = amount > 0;

    const txnNameValidation =
      transactionName.length > 30 && transactionName === ""
        ? alert("Name should contain below 30 Charecters and cant be empty")
        : true;

    const isEveryFieldOkay =
      amountValidation && txnNameValidation && date !== "";
    if (isEveryFieldOkay) {
      try {
        apiCall();
      } catch (error) {
        alert("Adding Failed");
      }
    } else {
      alert("Enter all Fields");
    }
  };

  const tryAgain = () => apiCall();

  const renderSuccessView = () => (
    <div className="popup-container">
      <Popup
        modal
        trigger={
          <button className="transaction-btn trigger-button" type="button">
            <AiOutlinePlus /> Add Transaction
          </button>
        }
        closeOnEscape
      >
        <div className="add-txn-popup-container">
          <h1 className="add-txn-heading-text">Add Transaction</h1>
          <p className="add-txn-para-text">Make a Transaction</p>
          <form className="add-txn-form" onSubmit={(e) => onAddingTxn(e)}>
            <div className="input-container">
              <label htmlFor="txnName" className="add-txn-label">
                Transaction Name<span className="span-el">*</span>
              </label>
              <input
                id="txnName"
                type="text"
                placeholder="Enter Name"
                className="add-txn-input"
                value={newTxnDetails.transactionName}
                onChange={(e) =>
                  newTxnDetails.editTransaction({
                    ...newTxnDetails,
                    transactionName: e.target.value,
                  })
                }
              />
            </div>
            <div className="input-container">
              <label htmlFor="txnType" className="add-txn-label">
                Transaction Type<span className="span-el">*</span>
              </label>
              <select
                id="txnType"
                placeholder="Select Transaction Type"
                className="add-txn-input"
                value={newTxnDetails.type}
                onChange={(e) =>
                  newTxnDetails.editTransaction({
                    ...newTxnDetails,
                    type: e.target.value as "credit" | "debit",
                  })
                }
              >
                <option value="credit">credit</option>
                <option value="debit">debit</option>
              </select>
            </div>
            <div className="input-container">
              <label htmlFor="txnCategory" className="add-txn-label">
                Category<span className="span-el">*</span>
              </label>
              <select
                id="txnCategory"
                placeholder="Select Transaction Type"
                className="add-txn-input"
                value={newTxnDetails.category}
                onChange={(e) =>
                  newTxnDetails.editTransaction({
                    ...newTxnDetails,
                    category: e.target.value,
                  })
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
                Amount<span className="span-el">*</span>
              </label>
              <input
                id="amount"
                type="text"
                placeholder="Enter Your Amount"
                className="add-txn-input"
                value={newTxnDetails.amount.toString()}
                onChange={(e) =>
                  newTxnDetails.editTransaction({
                    ...newTxnDetails,
                    amount: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div className="input-container">
              <label htmlFor="date" className="add-txn-label">
                Date<span className="span-el">*</span>
              </label>
              <input
                id="date"
                type="date"
                value={newTxnDetails.date}
                placeholder="Enter Name"
                className="add-txn-input"
                onChange={(e) =>
                  newTxnDetails.editTransaction({
                    ...newTxnDetails,
                    date: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <button className="submit-btn" type="submit">
                Add Transaction
              </button>
            </div>
          </form>
        </div>
      </Popup>
    </div>
  );

  const renderLoadingView = () => (
    <div className="chart-loader">
      <TailSpin color="#0b69ff" height="50" width="50" />
    </div>
  );

  const renderFailureView = () => (
    <div>
      <button type="button" className="btn" onClick={() => tryAgain()}>
        Try Again
      </button>
      {errorMsg.showErrorMsg && <p className="error">{errorMsg.msg}</p>}
    </div>
  );

  switch (status) {
    case "SUCCESS":
      return renderSuccessView();
    case "FAILED":
      return renderFailureView();
    case "LOADING":
      return renderLoadingView();
    default:
      return renderSuccessView();
  }
});

export default AddTxnPopUp;
