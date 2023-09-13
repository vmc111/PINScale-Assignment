import { PropsWithChildren, createContext, useRef } from "react";
import TransactionsStore from "../stores/TransactionsStore";

export const TransactionStoreContext = createContext<
  TransactionsStore | undefined
>(undefined);

export const TransactionsStoreContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const storeRef = useRef(new TransactionsStore());

  return (
    <TransactionStoreContext.Provider value={storeRef.current}>
      {children}
    </TransactionStoreContext.Provider>
  );
};
