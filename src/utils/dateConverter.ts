const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const dateConverter = (dategiven: string) => {
  const d = new Date(dategiven);

  const date = d.getDate();
  const month = months[d.getMonth()];

  const hr = d.getHours();

  const mins = d.getMinutes();

  const ampm = hr > 12 ? "PM" : "AM";

  return `${date} ${month}, ${hr % 12}:${mins} ${ampm}`;
};

export default dateConverter;
