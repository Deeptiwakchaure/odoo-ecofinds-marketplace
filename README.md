
# EcoFinds 🌱

![Node.js](https://img.shields.io/badge/Node.js-14+-green) ![React](https://img.shields.io/badge/React-18-blue)

**EcoFinds** is a sustainable second-hand marketplace connecting eco-conscious buyers and sellers. Our platform promotes a circular economy by giving pre-loved items a new home and reducing waste.

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Installation](#installation)
* [Usage](#usage)
* [Project Structure](#project-structure)
* [Cloudinary Setup](#cloudinary-setup)
* [Contributing](#contributing)
* [License](#license)

---

## Features

**User**

* Secure login & registration
* Profile management
* Browse, search & filter products
* Product details & images
* Like & save products
* Add & manage listings

**Admin**

* User management
* Product moderation
* Order management
* Analytics dashboard

---

## Tech Stack

**Frontend:**
React 18, React Router, React Bootstrap, Axios, Context API

**Backend:**
Node.js, Express, MongoDB, Mongoose, JWT, Multer, Cloudinary, Bcrypt

---

## Installation

### Backend

```bash
cd backend
npm install
```

* Create `.env`:

```env
MONGO_URI=mongodb://localhost:27017/ecofinds
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

* Create uploads folder:

```bash
mkdir uploads
```

* Seed database:

```bash
node seeder.js
```

* Start server:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

* Create `.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

* Start app:

```bash
npm start
```

---

## Usage

1. Make sure MongoDB is running
2. Start backend & frontend servers
3. Open `http://localhost:3000` in your browser

---

## Project Structure

```
ecofinds/
├── backend/    # Express server, models, controllers, routes
├── frontend/   # React app, components, context, styles
└── README.md
```

---

## Cloudinary Setup

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Get **Cloud Name**, **API Key**, **API Secret**
3. Add them to backend `.env`

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "Add feature"`)
4. Push to branch (`git push origin feature-name`)
5. Open a Pull Request

---
