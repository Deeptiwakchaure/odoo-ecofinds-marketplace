import React from 'react';
import { Table, Button, Container, Card, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useProduct } from '../../context/ProductContext';

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateCartItemQuantity } = useProduct();

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
    } else {
      updateCartItemQuantity(id, quantity);
    }
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Shopping Cart</h1>
        <p className="text-muted">Review your selected sustainable items</p>
      </div>

      {cart.length === 0 ? (
        <Card className="border-0 shadow-sm text-center py-5">
          <Card.Body>
            <i className="fas fa-shopping-cart text-muted fa-3x mb-3"></i>
            <h3>Your cart is empty</h3>
            <p className="text-muted mb-4">Start shopping for sustainable products</p>
            <Button as={Link} to="/products" variant="success">
              <i className="fas fa-shopping-bag me-2"></i> Browse Products
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <>
          <Card className="cart-table border-0 shadow-sm mb-4">
            <Card.Body className="p-0">
              <Table responsive className="mb-0">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={item.image || 'https://via.placeholder.com/50?text=Product'}
                            alt={item.title}
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            className="rounded me-3"
                          />
                          <div>
                            <div className="fw-bold">{item.title}</div>
                            <div className="text-muted small">{item.category}</div>
                          </div>
                        </div>
                      </td>
                      <td>${item.price}</td>
                      <td>
                        <Form.Control
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                          style={{ width: '70px' }}
                        />
                      </td>
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                      <td>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeFromCart(item._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="text-end">
                      <strong>Total:</strong>
                    </td>
                    <td>
                      <strong>${totalPrice.toFixed(2)}</strong>
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </Table>
            </Card.Body>
          </Card>

          <Row className="mt-4">
            <Col md={6}>
              <Button variant="outline-danger" onClick={clearCart}>
                <i className="fas fa-trash me-2"></i> Clear Cart
              </Button>
            </Col>
            <Col md={6} className="text-end">
              <Button variant="success" size="lg">
                <i className="fas fa-credit-card me-2"></i> Proceed to Checkout
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Cart;