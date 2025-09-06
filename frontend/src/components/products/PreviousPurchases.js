import React from 'react';
import { Table, Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PreviousPurchases = () => {
  // In a real application, this would fetch from the backend
  const purchases = []; // Placeholder for purchased products

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Previous Purchases</h1>
        <p className="text-muted">Your history of sustainable purchases</p>
      </div>

      {purchases.length === 0 ? (
        <Card className="border-0 shadow-sm text-center py-5">
          <Card.Body>
            <i className="fas fa-history text-muted fa-3x mb-3"></i>
            <h3>No purchase history</h3>
            <p className="text-muted mb-4">You haven't made any purchases yet</p>
            <Button as={Link} to="/products" variant="success">
              <i className="fas fa-shopping-bag me-2"></i> Browse Products
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Card className="border-0 shadow-sm">
          <Card.Body className="p-0">
            <Table responsive className="mb-0">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((purchase) => (
                  <tr key={purchase.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={purchase.image || 'https://via.placeholder.com/50?text=Product'}
                          alt={purchase.title}
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          className="rounded me-3"
                        />
                        <div>
                          <div className="fw-bold">{purchase.title}</div>
                          <div className="text-muted small">{purchase.category}</div>
                        </div>
                      </div>
                    </td>
                    <td>${purchase.price}</td>
                    <td>{purchase.quantity}</td>
                    <td>${(purchase.price * purchase.quantity).toFixed(2)}</td>
                    <td>{new Date(purchase.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default PreviousPurchases;