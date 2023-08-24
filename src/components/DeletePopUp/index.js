import { useState } from "react";

import Popup from "reactjs-popup";

import Cookies from "js-cookie";

import { LuAlertTriangle } from "react-icons/lu";

import { HiOutlineTrash } from "react-icons/hi";

import "reactjs-popup/dist/index.css";

const DeletePopup = (props) => {
  // state = { txnDetails: {}, userCreds: {} };
  const [txnDetails, setTxnDetails] = useState({});
  const [userCreds, setUserCreds] = useState({});

  const onDelTxn = async () => {
    const { id } = props;

    const userCreds = Cookies.get("secret_token");

    const parsedObject = JSON.parse(userCreds);

    const { isAdmin, userId } = parsedObject;

    const role = isAdmin ? "admin" : "user";

    const ReqUrl = `https://bursting-gelding-24.hasura.app/api/rest/delete-transaction?id=${id}`;

    var myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");
    myHeaders.append(
      "x-hasura-admin-secret",
      "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF"
    );
    myHeaders.append("x-hasura-role", role);
    myHeaders.append("x-hasura-user-id", `${userId}`);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      await fetch(ReqUrl, requestOptions);
      window.location.reload(true);
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
        {(close) => (
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
                <button className="cancel-btn" onClick={() => close()}>
                  No, Leave it
                </button>
              </div>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default DeletePopup;
