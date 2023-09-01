import { useEffect, useState } from "react";

import { TailSpin } from "react-loader-spinner";

import useApiCall from "../UseApiCall";
import useUserId from "../FetchUserId";

import DebitBox from "../DebitBox";
import CreditBox from "../CreditBox";

import "./index.css";
import { useContext } from "react";
import { TransactionsStoreContext } from "../../Context/StoresContext";
import { observer } from "mobx-react-lite";

type AmountObj = { type: string; sum: number };

type Data = {
  totals_credit_debit_transactions: AmountObj[];
};

type Amount = { sum: number };

const CreditDebit = observer(() => {
  // const [CreditAmountData, setCreditAmountData] = useState<Amount>({sum: 0});
  // const [DebitAmountData, setDebitAmountData] = useState<Amount>({sum: 0});
  // const [userCreds, setUserCreds] = useState(useUserId());

  const store = useContext(TransactionsStoreContext);

  const userCreds = useUserId();
  const CreditAmountData: Amount = { sum: store.store.totalCredit };
  const DebitAmountData: Amount = { sum: store.store.totalDebit };

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
});

export default CreditDebit;
