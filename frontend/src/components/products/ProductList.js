import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container, Button, Alert } from 'react-bootstrap';
import { useProduct } from '../../context/ProductContext';
import ProductCard from './ProductCard';
import Loading from '../common/Loading';

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { products, getProducts, loading, error, getProductsByCategory, searchProducts, clearError } = useProduct();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const categories = [...new Set(products.map((product) => product.category))];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchProducts(searchTerm);
    } else {
      getProducts();
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category) {
      getProductsByCategory(category);
    } else {
      getProducts();
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    getProducts();
    clearError();
  };

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Browse Sustainable Products</h1>
        <p className="text-muted">Discover pre-owned items that help reduce waste and promote a circular economy</p>
      </div>

      <div className="search-filter-container mb-4">
        <Row>
          <Col md={8}>
            <Form onSubmit={handleSearch}>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-search"></i>
                </span>
                <Form.Control
                  type="text"
                  placeholder="Search for eco-friendly products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="success" type="submit">
                  Search
                </Button>
              </div>
            </Form>
          </Col>
          <Col md={4}>
            <Form.Group controlId="category">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-filter"></i>
                </span>
                <Form.Select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </Form.Group>
          </Col>
        </Row>
        {(searchTerm || selectedCategory) && (
          <div className="mt-3">
            <Button variant="outline-secondary" size="sm" onClick={handleClearFilters}>
              <i className="fas fa-times me-1"></i> Clear Filters
            </Button>
          </div>
        )}
      </div>

      {error && (
        <Alert variant="danger" onClose={clearError} dismissible>
          {error}
        </Alert>
      )}

      {loading ? (
        <Loading />
      ) : products.length === 0 ? (
        <div className="alert alert-info text-center py-4">
          <i className="fas fa-search fa-3x mb-3 text-muted"></i>
          <h4>No products found</h4>
          <p className="mb-0">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ProductList;