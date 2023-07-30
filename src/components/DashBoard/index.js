import { useState, useEffect } from "react";

// import "./index.css";
import Button from "@mui/material/Button";

const DebitCreditView = () => {
  const [data, setData] = useState(null);

  const getLast7DaysTransactions = async () => {
    const url =
      "https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-last-7-days-admin";
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "admin",
      },
    };

    const response = await fetch(url, options);
    // const data = await response.json();
    // setData(data);
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Bar Chart",
        },
      },
    },
  };

  console.log(data);
  return (
    <div className="main-container">
      <h1 className="main-heading">Debit & Credit Overview</h1>
      <div className="container">
        <div></div>
        <Button
          onClick={() => getLast7DaysTransactions()}
          variant="contained"
          color="primary"
        >
          Get Data
        </Button>
      </div>
    </div>
  );
};

export default DebitCreditView;
