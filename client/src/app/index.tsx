/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from "react";
import { Helmet } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { GlobalStyle } from "styles/global-styles";

import AddTransaction from "./pages/AddTransaction/Loadable";
import { NotFoundPage } from "./pages/NotFoundPage/Loadable";
import TransactionsPage from "./pages/Transactions/Loadable";
import SetupAccountPage from "./pages/SetupAccount/Loadable";
import LoadingOverlay from "react-loading-overlay";
import { RootState, useSelector } from "./store";

export function App() {
  const isLoading = useSelector((state: RootState) => state.wallet.isLoading);

  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s - Wallet" defaultTitle="React Wallet APP">
        <meta name="description" content="Wallet Transactions" />
      </Helmet>
      <LoadingOverlay active={isLoading} spinner text="Loading your content...">
        <Routes>
          <Route path="/" element={<SetupAccountPage />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </LoadingOverlay>
      <GlobalStyle />
    </BrowserRouter>
  );
}
