import React, { createContext, useContext, useReducer } from 'react';
import {
  getProducts,
  getProductById,
  getMyProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  searchProducts,
} from '../services/productService';

const ProductContext = createContext();

const initialState = {
  products: [],
  product: {},
  myProducts: [],
  cart: [],
  purchases: [],
  loading: false,
  error: null,
};

const productReducer = (state, action) => {
  switch (action.type) {
    case 'PRODUCT_REQUEST':
      return { ...state, loading: true, error: null };
    case 'PRODUCT_SUCCESS':
      return { ...state, loading: false, products: action.payload };
    case 'PRODUCT_DETAIL_SUCCESS':
      return { ...state, loading: false, product: action.payload };
    case 'MY_PRODUCTS_SUCCESS':
      return { ...state, loading: false, myProducts: action.payload };
    case 'PRODUCT_CREATE_SUCCESS':
      return { ...state, loading: false, products: [action.payload, ...state.products] };
    case 'PRODUCT_UPDATE_SUCCESS':
      return {
        ...state,
        loading: false,
        products: state.products.map((p) =>
          p._id === action.payload._id ? action.payload : p
        ),
        myProducts: state.myProducts.map((p) =>
          p._id === action.payload._id ? action.payload : p
        ),
      };
    case 'PRODUCT_DELETE_SUCCESS':
      return {
        ...state,
        loading: false,
        products: state.products.filter((p) => p._id !== action.payload),
        myProducts: state.myProducts.filter((p) => p._id !== action.payload),
      };
    case 'ADD_TO_CART':
      // Check if product is already in cart
      const existingItem = state.cart.find(item => item._id === action.payload._id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item._id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'PRODUCT_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  // Get all products
  const getProductsList = async () => {
    try {
      dispatch({ type: 'PRODUCT_REQUEST' });
      const data = await getProducts();
      dispatch({ type: 'PRODUCT_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'PRODUCT_FAIL',
        payload: error.message || 'Failed to get products',
      });
    }
  };

  // Get product by ID
  const getProductByIdHandler = async (id) => {
    try {
      dispatch({ type: 'PRODUCT_REQUEST' });
      const data = await getProductById(id);
      dispatch({ type: 'PRODUCT_DETAIL_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'PRODUCT_FAIL',
        payload: error.message || 'Failed to get product',
      });
    }
  };

  // Get user's products
  const getMyProductsList = async () => {
    try {
      dispatch({ type: 'PRODUCT_REQUEST' });
      const data = await getMyProducts();
      dispatch({ type: 'MY_PRODUCTS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'PRODUCT_FAIL',
        payload: error.message || 'Failed to get your products',
      });
    }
  };

  // Create product
  const createProductHandler = async (productData) => {
    try {
      dispatch({ type: 'PRODUCT_REQUEST' });
      const data = await createProduct(productData);
      dispatch({ type: 'PRODUCT_CREATE_SUCCESS', payload: data });
      return data;
    } catch (error) {
      dispatch({
        type: 'PRODUCT_FAIL',
        payload: error.message || 'Failed to create product',
      });
      throw error;
    }
  };

  // Update product
  const updateProductHandler = async (id, productData) => {
    try {
      dispatch({ type: 'PRODUCT_REQUEST' });
      const data = await updateProduct(id, productData);
      dispatch({ type: 'PRODUCT_UPDATE_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'PRODUCT_FAIL',
        payload: error.message || 'Failed to update product',
      });
    }
  };

  // Delete product
  const deleteProductHandler = async (id) => {
    try {
      dispatch({ type: 'PRODUCT_REQUEST' });
      await deleteProduct(id);
      dispatch({ type: 'PRODUCT_DELETE_SUCCESS', payload: id });
    } catch (error) {
      dispatch({
        type: 'PRODUCT_FAIL',
        payload: error.message || 'Failed to delete product',
      });
    }
  };

  // Get products by category
  const getProductsByCategoryHandler = async (category) => {
    try {
      dispatch({ type: 'PRODUCT_REQUEST' });
      const data = await getProductsByCategory(category);
      dispatch({ type: 'PRODUCT_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'PRODUCT_FAIL',
        payload: error.message || 'Failed to get products by category',
      });
    }
  };

  // Search products
  const searchProductsHandler = async (keyword) => {
    try {
      dispatch({ type: 'PRODUCT_REQUEST' });
      const data = await searchProducts(keyword);
      dispatch({ type: 'PRODUCT_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'PRODUCT_FAIL',
        payload: error.message || 'Failed to search products',
      });
    }
  };

  // Add to cart
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  // Update cart item quantity
  const updateCartItemQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, quantity } });
  };

  // Remove from cart
  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  // Clear cart
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Clear errors
  const clearError = () => dispatch({ type: 'CLEAR_ERROR' });

  return (
    <ProductContext.Provider
      value={{
        ...state,
        getProducts: getProductsList,
        getProductById: getProductByIdHandler,
        getMyProducts: getMyProductsList,
        createProduct: createProductHandler,
        updateProduct: updateProductHandler,
        deleteProduct: deleteProductHandler,
        getProductsByCategory: getProductsByCategoryHandler,
        searchProducts: searchProductsHandler,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        clearError,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);