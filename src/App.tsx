import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";
import Login from "./components/Login";

import Accounts from "./components/Accounts";

import Profile from "./components/Profile";
import { TransactionsStoreContextProvider } from "./context/StoresContext";

import TransactionRoute from "./components/TranscationRoute";

import "./App.css";
import SpaceXLaunches from "./components/SpacexLaunches";

const client = new ApolloClient({
  uri: "https://spacex-production.up.railway.app/",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          launchesPast: offsetLimitPagination(),
        },
      },
    },
  }),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <TransactionsStoreContextProvider>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Accounts />} />
            <Route path="/transactions" element={<TransactionRoute />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="launches" element={<SpaceXLaunches />} />
          </Routes>
        </BrowserRouter>
      </TransactionsStoreContextProvider>
    </ApolloProvider>
  );
};

export default App;
