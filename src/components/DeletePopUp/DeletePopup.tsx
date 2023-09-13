import { useContext, useEffect } from "react";
import { observer } from "mobx-react";
import Popup from "reactjs-popup";
import { LuAlertTriangle } from "react-icons/lu";
import { HiOutlineTrash } from "react-icons/hi";
import "reactjs-popup/dist/index.css";

import useApiCall from "../../hooks/UseApiCall/UseApiCall";
import useUserId from "../../hooks/FetchUserId/UseUserId";
import { TransactionStoreContext } from "../../context/StoresContext";

const DeletePopup = (props: { id: number }) => {
  const { id } = props;
  const userCreds = useUserId();

  const store = useContext(TransactionStoreContext);

  const apiUrl =
    "https://bursting-gelding-24.hasura.app/api/rest/delete-transaction";
  const newheaders = {
    "Content-Type": "application/json",
    "x-hasura-admin-secret":
      "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
    "x-hasura-role": "user",
    "x-hasura-user-id": `${userCreds!.userId}`,
  };
  const { response, apiCall, status } = useApiCall({
    url: apiUrl,
    method: "DELETE",
    headers: newheaders,
    body: { id: id },
  });

  useEffect(() => {
    if (response !== null && status === "SUCCESS") {
      store?.deleteTransaction(id);
    }
  }, [response]);

  const onDelTxn = async () => {
    apiCall();
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
          <LuAlertTriangle color="#D97706" size={40} className="logout-logo" />
          <div>
            <p className="sure-text">Are you sure you want to Delete?</p>
            <p>
              This transaction will be deleted immediately. You can’t undo this
              action.
            </p>
            <div>
              <button className="logout-btn" onClick={onDelTxn}>
                Yes, Delete
              </button>
              <button className="cancel-btn">No, Leave it</button>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default observer(DeletePopup);
