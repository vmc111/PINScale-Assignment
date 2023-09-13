import { action, computed, makeObservable, observable } from "mobx";
import { TransactionObj } from "../types/StoreConstants";
import TransactionModel from "./models/TransactionObjectmodel";



class TransactionsStore {
     transactionsList: Array<TransactionModel>

    constructor() {
        makeObservable(this, {
            transactionsList: observable,
            deleteTransaction: action.bound,
            addTransaction: action.bound,
            setTransactionsList: action.bound,
            totalCredit: computed,
            totalDebit: computed,
            creditTransactionsArray: computed,
            debitTransactionsArray: computed,
            lastThreeTransactions: computed
        })
        this.transactionsList = []
    }

    setTransactionsList(transactionsList: Array<TransactionModel>): void  {
        this.transactionsList = transactionsList
    }

    deleteTransaction(id: number): void{
        const newList = this.transactionsList.filter(eachTransaction => eachTransaction.id !== id)
        this.transactionsList = newList
    }

    addTransaction(newTransaction: TransactionObj): void{
        const newObj = new TransactionModel(newTransaction)
        const newTransactionsArray: Array<TransactionModel> = [newObj, ...this.transactionsList]
        this.transactionsList = newTransactionsArray 
    }

    get totalCredit(): number{
        const creditsArray = this.transactionsList.filter((eachTransaction) => eachTransaction.type === "credit")
        let totalCreditAmount = 0;
        creditsArray.forEach((eachTransaction) => {
            totalCreditAmount += eachTransaction.amount
        })
        return totalCreditAmount
    }

    get totalDebit (): number {
        const debitsArray = this.transactionsList.filter(eachTransaction => eachTransaction.type === "debit")
        let totalDebitAmount = 0;
        debitsArray.forEach(eachTransaction => {
            totalDebitAmount += eachTransaction.amount
        })
        return totalDebitAmount
    }

    get creditTransactionsArray (): TransactionModel[] {
        return this.transactionsList.filter(eachTransaction => eachTransaction.type ==="credit");
    }

    get debitTransactionsArray (): TransactionModel[] {
        return this.transactionsList.filter(eachTransaction => eachTransaction.type ==="debit");
    }

    get lastThreeTransactions (): TransactionObj[] {
        return this.transactionsList.slice(0,3)
    }

}

export default TransactionsStore