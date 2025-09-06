import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import Layout from './components/Layout';
import PrivateRoute from './components/common/PrivateRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/user/Dashboard';
import ProductList from './components/products/ProductList';
import ProductDetail from './components/products/ProductDetail';
import AddProduct from './components/products/AddProduct';
import MyListings from './components/user/MyListings';
import Cart from './components/products/Cart';
import PreviousPurchases from './components/products/PreviousPurchases';

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="/mylistings" element={<MyListings />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/purchases" element={<PreviousPurchases />} />
              </Route>
            </Routes>
          </Layout>
        </Router>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;