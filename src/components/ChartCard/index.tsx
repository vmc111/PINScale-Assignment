import { useEffect, useState } from "react";
import useApiCall from "../UseApiCall";
// import statusOfPage from "../../constants/apistatus";
import useUserId from "../FetchUserId";
import Status from "../../constants/apistatus";
import { TailSpin } from "react-loader-spinner";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./index.css";

import GetReqFormat from "../../utils/recentTxnsDateConverter";
import Details from "../../constants/detailstype";

type DataObj = {
  date: Date,
  sum: number,
  type: string
}

type FinalDataObj = { day: string; debit: number; credit: number; }

type Data = {
  last_7_days_transactions_credit_debit_totals: DataObj []
}
 type FinalData = FinalDataObj []

const ChartCard = () => {
  const [last7DaysTxns, setLast7] = useState<FinalData| null >(null);
  const [userCreds, setUserCreds] = useState<Details>(useUserId());

  const { response, apiCall, status } = useApiCall({
    url: "https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days",
    method: "GET",
    userId:userCreds!.userId,
  });

  useEffect(() => {
    if (response !== null) {
      const sevenDaysTxn: Data = response;

      const inRequiredFormat = GetReqFormat(sevenDaysTxn);
      setLast7(inRequiredFormat);
    }
  }, [response]);

  useEffect(() => {
    apiCall();
  }, []);

  const renderLoadingView = (): JSX.Element => (
    <div className="chart-loader">
      <TailSpin color="#0b69ff" height="50" width="50" />
    </div>
  );

  const renderSuccessView = () => {
    const DataFormatter = (number: number) => {
      if (number > 1000) {
        return `${(number / 1000).toString()}k`;
      }
      return number.toString();
    };

    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={last7DaysTxns as any[]}
          margin={{
            top: 5,
          }}
        >
          <XAxis
            dataKey="day"
            tick={{
              stroke: "gray",
              strokeWidth: 1,
            }}
          />

          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: "gray",
              strokeWidth: 0,
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 20,
              borderRadius: "15px",
            }}
          />

          <Bar
            dataKey="debit"
            name="Debit"
            fill="#1f77b4"
            radius={[10, 10, 10, 10]}
          />
          <Bar
            dataKey="credit"
            name="Credit"
            fill="#fd7f0e"
            radius={[10, 10, 10, 10]}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const renderFailedView = () => <div>Failed...</div>;

  const renderChartCardView = () => {
    switch (status) {
      case "SUCCESS":
        return renderSuccessView();
      case "LOADING":
        return renderLoadingView();
      case "FAILED":
        return renderFailedView();
      default:
        return renderLoadingView();
    }
  };

  return (
    <>
      <h1>Debit & Credit Overview</h1>
      {renderChartCardView()}
    </>
  );
};

export default ChartCard;
