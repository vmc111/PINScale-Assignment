import { useEffect, useState } from "react";
import useApiCall from "../UseApiCall";
import statusOfPage from "../../constants/apistatus";
import useUserId from "../FetchUserId";
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

import GetReqFormat from "../RecentTxnsDateConverter";

const ChartCard = () => {
  const [last7DaysTxns, setLast7] = useState([]);
  const [userCreds, setUserCreds] = useState(useUserId());

  const { response, apiCall, status } = useApiCall({
    url: "https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days",
    method: "GET",
    userId: userCreds.userId,
  });

  useEffect(() => {
    if (response !== null) {
      const sevenDaysTxn =
        response.last_7_days_transactions_credit_debit_totals;

      const inRequiredFormat = GetReqFormat(sevenDaysTxn);
      setLast7(inRequiredFormat);
    }
  }, [response]);

  useEffect(() => {
    apiCall();
  }, []);

  const renderLoadingView = () => (
    <div className="chart-loader">
      <TailSpin color="#0b69ff" height="50" width="50" />
    </div>
  );

  const renderSuccessView = () => {
    const DataFormatter = (number) => {
      if (number > 1000) {
        return `${(number / 1000).toString()}k`;
      }
      return number.toString();
    };

    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={last7DaysTxns}
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
            barSize="20%"
            radius={(10, 10, 10, 10)}
          />
          <Bar
            dataKey="credit"
            name="Credit"
            fill="#fd7f0e"
            barSize="20%"
            radius={(10, 10, 10, 10)}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const renderFailedView = () => <div>Failed...</div>;

  const renderChartCardView = () => {
    switch (status) {
      case statusOfPage.Success:
        return renderSuccessView();
      case statusOfPage.Loading:
        return renderLoadingView();
      case statusOfPage.Failed:
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
