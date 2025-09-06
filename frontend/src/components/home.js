import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section bg-success text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="display-4 fw-bold mb-4">Welcome to EcoFinds</h1>
              <p className="lead mb-4">
                Your sustainable second-hand marketplace. Buy and sell pre-owned items while reducing waste and promoting a circular economy.
              </p>
              <div className="d-flex gap-3">
                <Button as={Link} to="/products" variant="light" size="lg">
                  Browse Products
                </Button>
                <Button as={Link} to="/register" variant="outline-light" size="lg">
                  Join Now
                </Button>
              </div>
            </Col>
            <Col md={6}>
              <div className="text-center">
                <i className="fas fa-leaf fa-10x"></i>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <div className="features-section py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold">Why Choose EcoFinds?</h2>
            <p className="text-muted">Making sustainable shopping accessible and rewarding</p>
          </div>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="feature-icon mb-3">
                    <i className="fas fa-recycle fa-3x text-success"></i>
                  </div>
                  <Card.Title as="h3">Reduce Waste</Card.Title>
                  <Card.Text>
                    Extend the lifecycle of products and reduce waste by buying and selling second-hand items.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="feature-icon mb-3">
                    <i className="fas fa-leaf fa-3x text-success"></i>
                  </div>
                  <Card.Title as="h3">Eco-Friendly</Card.Title>
                  <Card.Text>
                    Promote sustainable consumption and reduce your carbon footprint by choosing pre-owned items.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="feature-icon mb-3">
                    <i className="fas fa-hand-holding-usd fa-3x text-success"></i>
                  </div>
                  <Card.Title as="h3">Save Money</Card.Title>
                  <Card.Text>
                    Find great deals on quality pre-owned items and save money compared to buying new.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Categories Section */}
      <div className="categories-section bg-light py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold">Popular Categories</h2>
            <p className="text-muted">Explore our wide range of sustainable products</p>
          </div>
          <Row>
            <Col md={3} sm={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="category-icon mb-3">
                    <i className="fas fa-tshirt fa-3x text-success"></i>
                  </div>
                  <Card.Title as="h4">Clothing</Card.Title>
                  <Card.Text>
                    Sustainable fashion for everyone
                  </Card.Text>
                  <Button as={Link} to="/products?category=Clothing" variant="outline-success">
                    Browse
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="category-icon mb-3">
                    <i className="fas fa-laptop fa-3x text-success"></i>
                  </div>
                  <Card.Title as="h4">Electronics</Card.Title>
                  <Card.Text>
                    Quality pre-owned electronics
                  </Card.Text>
                  <Button as={Link} to="/products?category=Electronics" variant="outline-success">
                    Browse
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="category-icon mb-3">
                    <i className="fas fa-book fa-3x text-success"></i>
                  </div>
                  <Card.Title as="h4">Books</Card.Title>
                  <Card.Text>
                    Second-hand books for all ages
                  </Card.Text>
                  <Button as={Link} to="/products?category=Books" variant="outline-success">
                    Browse
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="category-icon mb-3">
                    <i className="fas fa-home fa-3x text-success"></i>
                  </div>
                  <Card.Title as="h4">Home & Garden</Card.Title>
                  <Card.Text>
                    Sustainable home and garden items
                  </Card.Text>
                  <Button as={Link} to="/products?category=Home & Garden" variant="outline-success">
                    Browse
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* CTA Section */}
      <div className="cta-section bg-success text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <h2 className="fw-bold mb-3">Join the Sustainable Revolution</h2>
              <p className="lead">
                Start buying and selling sustainable products today. Together, we can make a difference.
              </p>
            </Col>
            <Col md={4} className="text-center">
              <Button as={Link} to="/register" variant="light" size="lg">
                Get Started
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;