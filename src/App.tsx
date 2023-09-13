import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";

import Accounts from "./components/Accounts";

import Profile from "./components/Profile/Profile";
import { TransactionsStoreContextProvider } from "./context/StoresContext";

import TransactionRoute from "./components/TranscationRoute/TransactionRoute";

import "./App.css";
import {
  HOME_PATH,
  LOGIN_IN_PATH,
  PROFILE_PATH,
  TRANSACTIONS_PATH,
} from "./constants/PathConstants";

const App = () => {
  return (
    <TransactionsStoreContextProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path={LOGIN_IN_PATH} element={<Login />} />
          <Route path={HOME_PATH} element={<Accounts />} />
          <Route path={TRANSACTIONS_PATH} element={<TransactionRoute />} />
          <Route path={PROFILE_PATH} element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </TransactionsStoreContextProvider>
  );
};

export default App;
