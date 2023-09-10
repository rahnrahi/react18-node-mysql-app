/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import AddTransaction from './pages/AddTransaction/Loadable';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import TransactionsPage  from './pages/Transactions/Loadable';
import SetupAccountPage from './pages/SetupAccount/Loadable';

export function App() {
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Wallet"
        defaultTitle="React Wallet APP"
      >
        <meta name="description" content="Wallet Transactions" />
      </Helmet>

      <Routes>
        <Route path="/" element={<SetupAccountPage />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}
