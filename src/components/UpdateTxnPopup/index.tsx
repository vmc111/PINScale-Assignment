import Popup from "reactjs-popup";

import { MdOutlineModeEditOutline } from "react-icons/md";

import "reactjs-popup/dist/index.css";

import "./index.css";

const UpdateTxnPopup = () => {

  const onAddingTxn = (event:  React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
              <h1 className="add-txn-heading-text">Add Transaction</h1>
              <p className="add-txn-para-text">Make a Transaction</p>
              <form className="add-txn-form" onSubmit={(e) =>onAddingTxn(e)}>
                <div className="input-container">
                  <label htmlFor="txnName" className="add-txn-label">
                    Transaction Name
                  </label>
                  <input
                    id="txnName"
                    type="text"
                    placeholder="Enter Name"
                    className="add-txn-input"
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
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="date" className="add-txn-label">
                    Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    value="2023-07-30"
                    placeholder="Enter transaction Date"
                    className="add-txn-input"
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
  }

export default UpdateTxnPopup;
