const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Product = require('./models/Product');
const User = require('./models/User');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample user data
const sampleUsers = [
  {
    username: 'ecouser',
    email: 'user@example.com',
    password: 'password123',
    bio: 'Passionate about sustainable living and reducing waste',
    location: 'San Francisco, CA',
  },
  {
    username: 'greenseller',
    email: 'seller@example.com',
    password: 'password123',
    bio: 'Eco-friendly products for a better tomorrow',
    location: 'Portland, OR',
  },
];

// Sample products data
const sampleProducts = [
  {
    title: 'Vintage Leather Jacket',
    description: 'A high-quality vintage leather jacket in excellent condition. Perfect for fall and winter.',
    category: 'Clothing',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1551028719-ae673c9cb10c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    condition: 'Good',
  },
  {
    title: 'Organic Cotton T-Shirt',
    description: 'Comfortable and sustainable organic cotton t-shirt. Available in multiple colors.',
    category: 'Clothing',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    condition: 'Like New',
  },
  {
    title: 'Recycled Glass Vase',
    description: 'Beautiful vase made from 100% recycled glass. Perfect for flowers or as a decorative piece.',
    category: 'Home & Garden',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1589557797996-0ff5e99e8c8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    condition: 'New',
  },
  {
    title: 'Solar-Powered Charger',
    description: 'Eco-friendly solar-powered charger for your devices. Great for outdoor activities.',
    category: 'Electronics',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1596495577856-01e0a661c284?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    condition: 'Like New',
  },
  {
    title: 'Bamboo Cutting Board Set',
    description: 'Set of three bamboo cutting boards. Sustainable and durable kitchen essential.',
    category: 'Home & Garden',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1558963642-0dba6d8f3dc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    condition: 'Good',
  },
  {
    title: 'Second-Hand Novel Collection',
    description: 'Collection of 5 bestselling novels in good condition. Perfect for book lovers.',
    category: 'Books',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    condition: 'Good',
  },
  {
    title: 'Vintage Camera',
    description: 'Classic film camera in working condition. Great for photography enthusiasts.',
    category: 'Electronics',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    condition: 'Fair',
  },
  {
    title: 'Handmade Ceramic Mug',
    description: 'Beautiful handmade ceramic mug. Unique design and perfect for your morning coffee.',
    category: 'Home & Garden',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    condition: 'Like New',
  },
];

// Function to seed products
const seedProducts = async () => {
  try {
    // Clear existing users and products
    await User.deleteMany();
    await Product.deleteMany();
    console.log('Users and products cleared');

    // Create sample users
    const createdUsers = [];
    for (const user of sampleUsers) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      const createdUser = await User.create({
        ...user,
        password: hashedPassword,
      });
      createdUsers.push(createdUser);
    }
    console.log('Sample users created');

    // Assign user ID to products
    const productsWithUser = sampleProducts.map((product, index) => ({
      ...product,
      seller: createdUsers[index % createdUsers.length]._id,
    }));

    // Insert sample products
    const createdProducts = await Product.insertMany(productsWithUser);
    console.log(`${createdProducts.length} products added and assigned to users`);

    console.log('Database seeded successfully!');
    console.log('You can login with:');
    console.log('Email: user@example.com, Password: password123');
    console.log('Email: seller@example.com, Password: password123');

    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeder
seedProducts();