import React from 'react';
import Header from './common/Header';
import Footer from './common/Footer';
import { Container } from 'react-bootstrap';

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 py-4">
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;