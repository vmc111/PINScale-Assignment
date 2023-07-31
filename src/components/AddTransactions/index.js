onClickAddTransaction = async (event) => {
  event.preventDefault();
  const { name, type, category, amount, date } = this.state;
  const apiUrl =
    "https://bursting-gelding-24.hasura.app/api/rest/add-transaction";
  const addTransactionDetails = {
    name: name,
    type: type,
    category: category,
    amount: amount,
    date: date,
    user_id: 1,
  };
  const options = {
    headers: {
      "content-type": "application/json",
      "x-hasura-admin-secret":
        "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      "x-hasura-role": "user",
      "x-hasura-user-id": "1",
    },
    method: "POST",
    body: JSON.stringify(addTransactionDetails),
  };
  const response = await fetch(apiUrl, options);
  const data = await response.json();
  console.log(data);
  if (response.ok) {
    //   this.setState({ name: "", type: "", category: "", amount: "", date: "" });
  }
};
