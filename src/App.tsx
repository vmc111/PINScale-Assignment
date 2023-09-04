import { Routes, Route, BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";

import Login from "./components/Login";

import Accounts from "./components/Accounts";

import Profile from "./components/Profile";
import { TransactionsStoreContextProvider } from "./context/StoresContext";

import TransactionRoute from "./components/TranscationRoute";

import "./App.css";

const App = () => {
  return (
    <TransactionsStoreContextProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Accounts />} />
          <Route path="/transactions" element={<TransactionRoute />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </TransactionsStoreContextProvider>
  );
};

export default observer(App);
