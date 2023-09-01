import { createContext } from "react"
import TransactionsStore from "../utils/Stores/TransactionsStore"
import { TransactionObj } from "../constants/storeConstants"

export type StoreContext = {
    store: TransactionsStore
}

const TransObj = new TransactionsStore()
const newStore: StoreContext = {
  store: TransObj,
}
export const TransactionsStoreContext = createContext<StoreContext>(newStore)
