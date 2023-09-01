import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { observer } from "mobx-react-lite";

import Login from "./components/Login";

import Accounts from "./components/Accounts";

import Profile from "./components/Profile";

import TransactionRoute from "./components/TranscationRoute";
import {
  TransactionsStoreContext,
  StoreContext,
} from "./Context/StoresContext";

import "./App.css";
import TransactionsStore from "./utils/Stores/TransactionsStore";

const TransObj = new TransactionsStore();
const newStore: StoreContext = {
  store: TransObj,
};
const App = observer(() => {
  const [store] = useState<StoreContext>(newStore);

  return (
    <TransactionsStoreContext.Provider value={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Accounts />} />
          <Route path="/transactions" element={<TransactionRoute />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </TransactionsStoreContext.Provider>
  );
});

export default App;
