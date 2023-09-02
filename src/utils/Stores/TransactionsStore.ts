import { action, computed, makeObservable, observable } from "mobx";
import { TransactionObj } from "../../constants/storeConstants";
import TransactionObject from "./Modals/TransactionObject";



class TransactionsStore {
     transactionsList: Array<TransactionObject> | [] = []

    constructor() {
        makeObservable(this, {
            transactionsList: observable,
            deleteTransaction: action,
            addTransaction: action,
            setTransactionsList: action,
            totalCredit: computed,
            totalDebit: computed,
            creditTransactionsArray: computed,
            debitTransactionsArray: computed,
            Last3Transactions: computed
        })
    }

    setTransactionsList = (transactionsList: Array<TransactionObj>): void => {
        
        const newList = transactionsList.map(each => {
            const newObj = new TransactionObject(each)
            return newObj
        })
        this.transactionsList = newList
    }

    deleteTransaction = (id: number): void => {
        const newList = this.transactionsList.filter(eachTransaction => eachTransaction.id !== id)
        this.transactionsList = newList
    }

    addTransaction = (newTransaction: TransactionObj): void => {
        const newObj = new TransactionObject(newTransaction)
        const newTransactionsArray: Array<TransactionObject> = [newObj, ...this.transactionsList]
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

    get creditTransactionsArray (): TransactionObj[] {
        return this.transactionsList.filter(eachTransaction => eachTransaction.type ==="credit");
    }

    get debitTransactionsArray (): TransactionObj[] {
        return this.transactionsList.filter(eachTransaction => eachTransaction.type ==="debit");
    }

    get Last3Transactions (): TransactionObj[] {
        return this.transactionsList.slice(0,3)
    }

}

export default TransactionsStore