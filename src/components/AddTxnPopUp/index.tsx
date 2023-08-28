import { useState } from "react";

import Popup from "reactjs-popup";

import { AiOutlinePlus } from "react-icons/ai";

import useApiCall from "../UseApiCall";

import "reactjs-popup/dist/index.css";

import "./index.css";
import useUserId from "../FetchUserId";
import statusOfPage from "../../constants/apistatus";
import { TailSpin } from "react-loader-spinner";

const TxnDetails = {
  txnName: "",
  txnType: "credit",
  category: "Food",
  amount: "",
  date: "2023-07-31",
};

const  AddTxnPopUp = () =>  {
  const [txnDetails, setTxnDetails] = useState(TxnDetails)
  const userCreds = useUserId()
  const userId = userCreds!.userId
  const apiBody = {
    name: txnDetails.txnName,
    type: txnDetails.txnType,
    category: txnDetails.category,
    amount: parseInt(txnDetails.amount),
    date: new Date(txnDetails.date),
    user_id: userId
  }
  const url = `https://bursting-gelding-24.hasura.app/api/rest/add-transaction`
  const {response, apiCall, status, errorMsg } = useApiCall({url: url,
  method: "POST",
  body: apiBody
 })


  const onTypingName = (value : string) => {
    setTxnDetails((preState) => ({...preState, txnName: value}))
  };

  const onTypingAmount = (newValue: string) => {
     setTxnDetails((preState) => ({...preState,amount: newValue}))
  };

  const onTxnType = (newValue: string) => {
     setTxnDetails((preState) => ({...preState, txnType:newValue}))
  };

  const onChangingDate = (newValue: string) => {
     setTxnDetails((preState) => ({...preState, date:newValue}))
  };

  const onCategorySelection = (newValue : string) => {
     setTxnDetails((preState) => ({...preState, category: newValue}))
  };

  const onAddingTxn = (event:  React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { txnName, amount } = txnDetails;

    const amountValidation = !(amount) && amount.trim() !== "";

    const txnNameValidation =
      txnName.length > 30 && txnName === ""
        ? alert("Name should contain below 30 Charecters and cant be empty")
        : true;

    const isEveryFieldOkay = amountValidation && txnNameValidation;
    apiCall()

  }

  const tryAgain = () => window. location. reload 

    const { txnName, category, amount, txnType, date } = txnDetails;

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
                      value={txnName}
                      onChange={(e) => onTypingName(e.target.value)} />
                  </div>
                  <div className="input-container">
                    <label htmlFor="txnType" className="add-txn-label">
                      Transaction Type<span className="span-el">*</span>
                    </label>
                    <select
                      id="txnType"
                      placeholder="Select Transaction Type"
                      className="add-txn-input"
                      value={txnType}
                      onChange={(e) => onTxnType(e.target.value)}
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
                      value={category}
                      onChange={(e) => onCategorySelection(e.target.value!)}
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
                      value={amount}
                      onChange={(e) => onTypingAmount(e.target.value)} />
                  </div>
                  <div className="input-container">
                    <label htmlFor="date" className="add-txn-label">
                      Date<span className="span-el">*</span>
                    </label>
                    <input
                      id="date"
                      type="date"
                      value={date}
                      placeholder="Enter Name"
                      className="add-txn-input"
                      onChange={(e) => onChangingDate(e.target.value)} />
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

    const renderLoadingView = () => (<div className="chart-loader">
      <TailSpin color="#0b69ff" height="50" width="50" />
    </div>)

    const renderFailureView = () => (<div>
      <button type="button" className="btn" onClick={tryAgain()}>
        Try Again
      </button>
      {
        errorMsg.showErrorMsg && <p className="error">{errorMsg.msg}</p>
      }
    </div>)

    switch (status) {
      case statusOfPage.Success :
        return renderSuccessView()
      case statusOfPage.Failed:
        return renderFailureView()
      case statusOfPage.Loading:
        return renderLoadingView()
      default :
      return renderSuccessView()
    }
}

export default AddTxnPopUp;
