import { action, makeObservable, observable } from "mobx";

import { DebitCredit, TransactionObj } from "../../types/storeConstants";

class TransactionModel {
    id: number
    type: DebitCredit;
    amount: number;
    transactionName: string;
    userId: number;
    date: string;
    category: string;

    constructor(transaction: TransactionObj){
        makeObservable(this, {
            transactionName: observable,
            type:observable ,amount : observable  ,date : observable    ,category : observable,
            setType: action.bound,
            setAmount: action.bound,
            setTransactionName: action.bound,
            setDate: action.bound,
            setCategory: action.bound
        })
        this.id = transaction.id
        this.amount = transaction.amount
        this.category = transaction.category
        this.date = transaction.date
        this.type = transaction.type
        this.transactionName = transaction.transactionName
        this.userId = transaction.userId
    }

    setType (type: DebitCredit) : void{
        this.type = type
    }

    setAmount(amount: number): void {
        this.amount = amount
    }

    setTransactionName (name: string): void {
        this.transactionName = name
    }

    setDate (date: string): void {
        this.date = date
    }

    setCategory (category: string): void {
        this.category = category
    }
}

export default TransactionModel