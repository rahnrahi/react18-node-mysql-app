import React from "react";
import { Helmet } from "react-helmet-async";
import { NavBar } from "app/components/NavBar";
import Transactions from "./Transactions";
import { PageWrapper } from "app/components/PageWrapper";

export function TransactionsPage() {
  return (
    <>
      <Helmet>
        <title>Transactions Page</title>
        <meta name="description" content="Add a transaction" />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <Transactions />
      </PageWrapper>
    </>
  );
}
