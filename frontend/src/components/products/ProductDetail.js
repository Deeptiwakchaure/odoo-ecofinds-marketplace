import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useProduct } from '../../context/ProductContext';
import Loading from '../common/Loading';

const ProductDetail = () => {
  const { id } = useParams();
  const { product, getProductById, loading, error, addToCart, clearError } = useProduct();

  useEffect(() => {
    getProductById(id);
  }, [getProductById, id]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Container className="py-5">
      {loading ? (
        <Loading />
      ) : error ? (
        <Alert variant="danger" onClose={clearError} dismissible>
          {error}
        </Alert>
      ) : (
        <div className="product-detail-container">
          <Link to="/products" className="btn btn-outline-success mb-4">
            <i className="fas fa-arrow-left me-2"></i> Back to Products
          </Link>
          
          <Row>
            <Col md={6}>
              <div className="overflow-hidden rounded">
                <img
                  src={product.image || 'https://via.placeholder.com/600x400?text=Product+Image'}
                  alt={product.title}
                  className="product-detail-image img-fluid"
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="product-detail-info">
                <h1 className="product-detail-title">{product.title}</h1>
                <div className="product-detail-price">${product.price}</div>
                <div className="product-detail-category">
                  <i className="fas fa-tag me-2"></i> {product.category}
                </div>
                <div className="product-detail-description">
                  {product.description}
                </div>
                
                <div className="d-grid gap-2 mt-4">
                  <Button
                    variant="success"
                    size="lg"
                    onClick={handleAddToCart}
                  >
                    <i className="fas fa-shopping-cart me-2"></i> Add to Cart
                  </Button>
                  
                  <Button
                    variant="outline-success"
                    size="lg"
                    as={Link}
                    to="/products"
                  >
                    <i className="fas fa-browse me-2"></i> Continue Shopping
                  </Button>
                </div>
                
                <div className="mt-4 p-3 bg-light rounded">
                  <h5 className="fw-bold">Eco Benefits</h5>
                  <ul className="mb-0">
                    <li>Reduces waste by extending product lifecycle</li>
                    <li>Lowers carbon footprint compared to new products</li>
                    <li>Supports sustainable consumption practices</li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
};

export default ProductDetail;