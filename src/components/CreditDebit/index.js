import { useEffect, useState } from "react";

import { TailSpin } from "react-loader-spinner";

import useApiCall from "../UseApiCall";
import useUserId from "../FetchUserId";

import DebitBox from "../DebitBox";
import CreditBox from "../CreditBox";
import statusOfPage from "../../constants/apistatus";

import "./index.css";

const CreditDebit = () => {
  const [CreditAmountData, setCreditAmountData] = useState([]);
  const [DebitAmountData, setDebitAmountData] = useState([]);
  const [userCreds, setUserCreds] = useState(useUserId());

  const { response, apiCall, status } = useApiCall({
    url: "https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals",
    method: "GET",
    userId: userCreds.userId,
  });

  useEffect(() => {
    if (response !== null) {
      const data = response.totals_credit_debit_transactions;

      const creditAmount = data.find((each) => each.type === "credit");
      const debitAmount = data.find((each) => each.type === "debit");

      setCreditAmountData(
        creditAmount !== undefined ? creditAmount : { sum: 0 }
      );
      setDebitAmountData(debitAmount !== undefined ? debitAmount : { sum: 0 });
    }
  }, [response]);

  useEffect(() => {
    apiCall();
  }, []);

  const tryAgain = () => {
    apiCall();
  };

  const renderSuccessView = () => {
    return (
      <div className="creditdebit-container">
        <CreditBox Creditdata={CreditAmountData} />
        <DebitBox Debitdata={DebitAmountData} />
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
    case statusOfPage.Loading:
      return renderLoadingView();

    case statusOfPage.Success:
      return renderSuccessView();

    case statusOfPage.Failed:
      return renderFailedView();

    default:
      return renderLoadingView();
  }
};

export default CreditDebit;
