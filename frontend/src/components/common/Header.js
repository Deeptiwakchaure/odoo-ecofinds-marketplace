import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProduct } from '../../context/ProductContext';

const Header = () => {
  const { userInfo, userLogout } = useAuth();
  const { cart } = useProduct();
  const navigate = useNavigate();

  const logoutHandler = () => {
    userLogout();
    navigate('/');
  };

  return (
    <header>
      <Navbar bg="white" expand="lg" className="py-3">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <i className="fas fa-leaf me-2 text-success"></i>
            <span>EcoFinds</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/products" className="d-flex align-items-center">
                <i className="fas fa-shopping-bag me-1"></i> Products
              </Nav.Link>
              {userInfo ? (
                <>
                  <Nav.Link as={Link} to="/dashboard" className="d-flex align-items-center">
                    <i className="fas fa-user-circle me-1"></i> Dashboard
                  </Nav.Link>
                  <Nav.Link as={Link} to="/mylistings" className="d-flex align-items-center">
                    <i className="fas fa-list me-1"></i> My Listings
                  </Nav.Link>
                  <Nav.Link as={Link} to="/cart" className="d-flex align-items-center">
                    <i className="fas fa-shopping-cart me-1"></i> Cart
                    {cart.length > 0 && (
                      <Badge pill bg="success" className="ms-1">
                        {cart.reduce((acc, item) => acc + item.quantity, 0)}
                      </Badge>
                    )}
                  </Nav.Link>
                  <Nav.Link as={Link} to="/purchases" className="d-flex align-items-center">
                    <i className="fas fa-history me-1"></i> Purchases
                  </Nav.Link>
                  <Nav.Link onClick={logoutHandler} className="d-flex align-items-center">
                    <i className="fas fa-sign-out-alt me-1"></i> Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login" className="d-flex align-items-center">
                    <i className="fas fa-sign-in-alt me-1"></i> Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register" className="d-flex align-items-center">
                    <i className="fas fa-user-plus me-1"></i> Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;