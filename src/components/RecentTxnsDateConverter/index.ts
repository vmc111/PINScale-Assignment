const WeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type DataArray = {
  date: Date,
  sum: number,
  type: string
}

type Data = {
  last_7_days_transactions_credit_debit_totals: DataArray []
}

type Days = {
    day: string;
    debit: number;
    credit: number;
}[]


const GetReqFormat = (sevenDaysTxns: Data) => {
  const day0 = new Date();
  const day1 = new Date();
  day1.setDate(new Date().getDate() - 1);
  const day2 = new Date();
  day2.setDate(new Date().getDate() - 2);
  const day3 = new Date();
  day3.setDate(new Date().getDate() - 3);
  const day4 = new Date();
  day4.setDate(new Date().getDate() - 4);
  const day5 = new Date();
  day5.setDate(new Date().getDate() - 5);
  const day6 = new Date();
  day6.setDate(new Date().getDate() - 6);

  let sevenWeeksData: Days = [
    { day: WeekDays[day6.getDay()], debit: 0, credit: 0 },
    { day: WeekDays[day5.getDay()], debit: 0, credit: 0 },
    { day: WeekDays[day4.getDay()], debit: 0, credit: 0 },
    { day: WeekDays[day3.getDay()], debit: 0, credit: 0 },
    { day: WeekDays[day2.getDay()], debit: 0, credit: 0 },
    { day: WeekDays[day1.getDay()], debit: 0, credit: 0 },
    { day: WeekDays[day0.getDay()], debit: 0, credit: 0 },
  ];


 const GivenData = sevenDaysTxns.last_7_days_transactions_credit_debit_totals

for (let item of GivenData){
  const dateOfTxn = new Date(item.date);
 const dayOfTxn = WeekDays[dateOfTxn.getDay()];
  const modified = sevenWeeksData.map((eachData) => {
    if (eachData.day === dayOfTxn) {
        if (item.type === "credit"){
          eachData["credit"] += item.sum} else{
            eachData["debit"] += item.sum
        }
    }
    return eachData
  })
  sevenWeeksData = modified
}
  return sevenWeeksData;
};

export default GetReqFormat;
