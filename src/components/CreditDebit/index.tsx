import { useEffect, useState } from "react";

import { observer } from "mobx-react";
import { useContext } from "react";
import { TailSpin } from "react-loader-spinner";

import useApiCall from "../../hooks/UseApiCall";
import useUserId from "../../hooks/FetchUserId";

import DebitBox from "../DebitBox";
import CreditBox from "../CreditBox";

import { TransactionStoreContext } from "../../context/StoresContext";
import "./index.css";

type Amount = { sum: number };

const CreditDebit = () => {
  const store = useContext(TransactionStoreContext);

  const userCreds = useUserId();
  const CreditAmountData: Amount = { sum: store ? store?.totalCredit : 0 };
  const DebitAmountData: Amount = { sum: store ? store?.totalDebit : 0 };

  const { response, apiCall, status } = useApiCall({
    url: "https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals",
    method: "GET",
    userId: userCreds!.userId,
  });

  useEffect(() => {
    apiCall();
  }, []);

  const tryAgain = (): void => {
    apiCall();
  };

  const renderSuccessView = () => {
    return (
      <div className="creditdebit-container">
        <CreditBox creditData={CreditAmountData} />
        <DebitBox debitData={DebitAmountData} />
      </div>
    );
  };

  const renderFailedView = () => (
    <div>
      <button type="button" className="btn" onClick={tryAgain}>
        Try Again
      </button>
    </div>
  );

  const renderLoadingView = () => (
    <div className="loader">
      <TailSpin color="#0b69ff" height="50" width="50" />
    </div>
  );

  switch (status) {
    case "LOADING":
      return renderLoadingView();

    case "SUCCESS":
      return renderSuccessView();

    case "FAILED":
      return renderFailedView();

    default:
      return renderLoadingView();
  }
};

export default observer(CreditDebit);
