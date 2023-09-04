export type TransactionObj = {
    id: number,
    type: DebitCredit,
    amount: number,
    transactionName: string;
    userId: number;
    date: string;
    category: string;
}

export type DebitCredit = "credit" | "debit"