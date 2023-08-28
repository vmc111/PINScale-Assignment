import { useState } from "react";

import Popup from "reactjs-popup";

import { LuAlertTriangle } from "react-icons/lu";

import { HiOutlineTrash } from "react-icons/hi";

import "reactjs-popup/dist/index.css";
import useApiCall from "../UseApiCall";
import useUserId from "../FetchUserId";

const DeletePopup = (props: {id: number}) => {
  const [txnDetails, setTxnDetails] = useState({});

  const { id } = props;
  const apiUrl = `https://bursting-gelding-24.hasura.app/api/rest/delete-transaction?id=${id}`
  const userCreds = useUserId()
  const {response, apiCall} = useApiCall({url: apiUrl, method: "Delete"})
  const isAdmin =  typeof userCreds === "string"? false : userCreds.isAdmin
  const userId =  typeof userCreds === "string"? 0 : userCreds.userId

  const role = isAdmin ? "admin" : "user";
  const onDelTxn = async () => {

    try {
      apiCall()
    } catch (error) {
      alert("Cannot Delete");
      return;
    }
  };

  return (
    <div className="popup-container">
      <Popup
        modal
        trigger={
          <button type="button" className="delete-btn">
            <HiOutlineTrash size={25} />
          </button>
        }
      >
          <div className="logout-container">
            <LuAlertTriangle
              color="#D97706"
              size={40}
              className="logout-logo"
            />
            <div>
              <p className="sure-text">Are you sure you want to Delete?</p>
              <p>
                This transaction will be deleted immediately. You can’t undo
                this action.
              </p>
              <div>
                <button className="logout-btn" onClick={onDelTxn}>
                  Yes, Delete
                </button>
                <button className="cancel-btn">
                  No, Leave it
                </button>
              </div>
            </div>
          </div>
      </Popup>
    </div>
  );
};

export default DeletePopup;
