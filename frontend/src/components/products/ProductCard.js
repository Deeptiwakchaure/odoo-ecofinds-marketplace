import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useProduct } from '../../context/ProductContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useProduct();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Card className="product-card h-100 border-0 shadow-sm">
      <div className="overflow-hidden">
        <Card.Img
          variant="top"
          src={product.image || 'https://via.placeholder.com/300x200?text=Product+Image'}
          alt={product.title}
          className="img-fluid"
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold">{product.title}</Card.Title>
        <div className="price mb-2">${product.price}</div>
        <div className="category text-muted mb-3">
          <i className="fas fa-tag me-1"></i> {product.category}
        </div>
        <div className="mt-auto">
          <div className="d-grid gap-2">
            <Button
              as={Link}
              to={`/product/${product._id}`}
              variant="outline-success"
              size="sm"
            >
              <i className="fas fa-eye me-1"></i> View Details
            </Button>
            <Button
              variant="success"
              size="sm"
              onClick={handleAddToCart}
            >
              <i className="fas fa-shopping-cart me-1"></i> Add to Cart
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;