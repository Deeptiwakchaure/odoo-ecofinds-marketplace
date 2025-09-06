import React, { useEffect } from 'react';
import { Button, Card, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useProduct } from '../../context/ProductContext';
import Loading from '../common/Loading';

const MyListings = () => {
  const { myProducts, getMyProducts, loading, error, deleteProduct } = useProduct();

  useEffect(() => {
    getMyProducts();
  }, [getMyProducts]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  return (
    <Container className="py-5">
      <div className="my-listings-header">
        <h1 className="fw-bold">My Listings</h1>
        <Button as={Link} to="/addproduct" variant="success">
          <i className="fas fa-plus me-2"></i> Add New Product
        </Button>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : myProducts.length === 0 ? (
        <div className="alert alert-info text-center py-4">
          <i className="fas fa-box-open fa-3x mb-3 text-muted"></i>
          <h4>You haven't listed any products yet</h4>
          <p className="mb-3">Start selling your sustainable items today!</p>
          <Button as={Link} to="/addproduct" variant="success">
            <i className="fas fa-plus me-2"></i> Add Your First Product
          </Button>
        </div>
      ) : (
        <Row>
          {myProducts.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
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
                        <i className="fas fa-eye me-1"></i> View
                      </Button>
                      <div className="d-flex gap-2">
                        <Button
                          as={Link}
                          to={`/editproduct/${product._id}`}
                          variant="outline-secondary"
                          size="sm"
                          className="flex-grow-1"
                        >
                          <i className="fas fa-edit me-1"></i> Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="flex-grow-1"
                          onClick={() => deleteHandler(product._id)}
                        >
                          <i className="fas fa-trash me-1"></i> Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MyListings;