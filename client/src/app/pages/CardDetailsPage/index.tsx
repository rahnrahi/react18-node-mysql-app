import React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import CardUI from './CardUI';
import { PageWrapper } from 'app/components/PageWrapper';

export function CardPage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <CardUI />
      </PageWrapper>
    </>
  );
}
