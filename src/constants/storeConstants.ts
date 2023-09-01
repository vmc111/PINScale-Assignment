export type TransactionObj = {
    id: number,
    type: "credit" | "debit",
    amount: number,
    transactionName: string;
    userId: number;
    date: string;
    category: string;
}
