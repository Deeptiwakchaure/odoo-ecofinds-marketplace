import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useProduct } from '../../context/ProductContext';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [message, setMessage] = useState('');
  const { userInfo, updateUser, error, clearError, loading } = useAuth();
  const { myProducts, getMyProducts } = useProduct();

  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo.username);
      setEmail(userInfo.email);
      setProfileImage(userInfo.profileImage || '');
      getMyProducts();
    }
  }, [userInfo, getMyProducts]);

  useEffect(() => {
    clearError();
  }, [clearError]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    updateUser({ username, email, password, profileImage });
    setMessage('Profile updated successfully');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <Container className="py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="dashboard-card">
            <div className="text-center mb-4">
              <i className="fas fa-user-circle text-success fa-4x mb-3"></i>
              <h2 className="fw-bold">User Dashboard</h2>
              <p className="text-muted">Manage your account settings and preferences</p>
            </div>

            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Row>
              <Col md={4} className="mb-4 mb-md-0">
                <div className="text-center">
                  <div className="mb-3">
                    {profileImage ? (
                      <img 
                        src={profileImage} 
                        alt="Profile" 
                        className="rounded-circle img-thumbnail"
                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto" 
                           style={{ width: '150px', height: '150px' }}>
                        <i className="fas fa-user fa-4x text-secondary"></i>
                      </div>
                    )}
                  </div>
                  <h4 className="fw-bold">{username}</h4>
                  <p className="text-muted">{email}</p>
                  
                  <Card className="border-0 shadow-sm mt-4">
                    <Card.Body className="p-3">
                      <h5 className="fw-bold">Your Stats</h5>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Listings:</span>
                        <span className="fw-bold">{myProducts.length}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Member Since:</span>
                        <span className="fw-bold">
                          {userInfo && new Date(userInfo.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
              
              <Col md={8}>
                <Form onSubmit={submitHandler}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3" controlId="profileImage">
                    <Form.Label>Profile Image URL</Form.Label>
                    <Form.Control
                      type="text"
                      value={profileImage}
                      onChange={(e) => setProfileImage(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="password">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Leave blank to keep current password"
                        />
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="confirmPassword">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm new password"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                    <Button
                      variant="success"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Updating...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-save me-2"></i> Update Profile
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;