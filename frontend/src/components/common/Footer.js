import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark-green text-white py-5 mt-auto">
      <Container>
        <Row>
          <Col md={6} lg={4} className="mb-4 mb-lg-0">
            <h5 className="d-flex align-items-center">
              <i className="fas fa-leaf me-2"></i> EcoFinds
            </h5>
            <p className="mt-3">
              Empowering sustainable consumption through a vibrant second-hand marketplace. 
              Join us in reducing waste and promoting a circular economy.
            </p>
            <div className="mt-3">
              <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="text-white me-3"><i className="fab fa-facebook-f"></i></a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-white me-3"><i className="fab fa-twitter"></i></a>
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="text-white me-3"><i className="fab fa-instagram"></i></a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-white"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </Col>
          <Col md={3} lg={2} className="mb-4 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/products" className="text-white">
                  <i className="fas fa-angle-right me-1"></i> Products
                </a>
              </li>
              <li className="mb-2">
                <a href="/about" className="text-white">
                  <i className="fas fa-angle-right me-1"></i> About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="text-white">
                  <i className="fas fa-angle-right me-1"></i> Contact
                </a>
              </li>
              <li className="mb-2">
                <a href="/blog" className="text-white">
                  <i className="fas fa-angle-right me-1"></i> Blog
                </a>
              </li>
            </ul>
          </Col>
          <Col md={3} lg={3} className="mb-4 mb-md-0">
            <h5>Categories</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/categories/electronics" className="text-white">
                  <i className="fas fa-angle-right me-1"></i> Electronics
                </a>
              </li>
              <li className="mb-2">
                <a href="/categories/clothing" className="text-white">
                  <i className="fas fa-angle-right me-1"></i> Clothing
                </a>
              </li>
              <li className="mb-2">
                <a href="/categories/books" className="text-white">
                  <i className="fas fa-angle-right me-1"></i> Books
                </a>
              </li>
              <li className="mb-2">
                <a href="/categories/home-garden" className="text-white">
                  <i className="fas fa-angle-right me-1"></i> Home & Garden
                </a>
              </li>
            </ul>
          </Col>
          <Col md={12} lg={3}>
            <h5>Newsletter</h5>
            <p className="mt-3">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <div className="input-group mt-3">
              <input type="email" className="form-control" placeholder="Your email" />
              <button className="btn btn-success" type="button">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </Col>
        </Row>
        <hr className="my-4 bg-white" />
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} EcoFinds. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;