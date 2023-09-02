import { action, makeObservable, observable } from "mobx";

import { TransactionObj } from "../../../constants/storeConstants";

class TransactionObject {
    id: number
    type: "credit" | "debit";
    amount: number;
    transactionName: string;
    userId: number;
    date: string;
    category: string;

    constructor(transaction: TransactionObj){
        makeObservable(this, {
            id: observable,
            transactionName: observable,
            type:observable ,amount : observable  ,userId : observable   ,date : observable    ,category : observable,
            editTransaction: action,
        })
        this.id = transaction.id
        this.amount = transaction.amount
        this.category = transaction.category
        this.date = transaction.date
        this.type = transaction.type
        this.transactionName = transaction.transactionName
        this.userId = transaction.userId
    }

    editTransaction = (newTransaction: TransactionObj): void => {
        this.id = newTransaction.id
        this.type = newTransaction.type
        this.amount = newTransaction.amount
        this.category = newTransaction.category
        this.date = newTransaction.date
        this.userId = newTransaction.userId
        this.transactionName = newTransaction.transactionName
    }
}

export default TransactionObject