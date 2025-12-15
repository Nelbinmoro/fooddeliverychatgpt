# 🍔 Food Delivery Application (MERN)

A full-stack food delivery application built with **React (Vite)** on the frontend and **Node.js / Express / MongoDB** on the backend.

This project follows a **real-world monorepo structure** with separate frontend and backend folders, role-based admin functionality, and RESTful APIs.

---

## 📦 Tech Stack

### Frontend

* React (Vite)
* React Router
* Context API
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Multer (file uploads)
* Cookie Parser

---

## 📁 Project Structure

```
fooddeliverychatgpt/
│
├── backend/
│   ├── config/         # DB connection & config
│   ├── controllers/    # Route controllers
│   ├── data/           # Seed / sample data
│   ├── middlewares/    # Auth & error middleware
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   ├── utils/          # Helper utilities
│   └── server.js       # Backend entry point
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/    # Global state (Auth, Cart, etc.)
│   │   ├── pages/
│   │   │   └── Admin/  # Admin dashboard pages
│   │   ├── routes/
│   │   ├── services/   # API service layer
│   │   ├── styles/
│   │   └── utils/
│   └── vite.config.js
│
└── README.md
```

---

## ✨ Features

### User

* Browse food items by category
* Add items to cart
* Place orders
* Authentication using JWT

### Admin

* Admin dashboard
* Product & category management
* Order management
* Protected admin routes

### System

* RESTful API architecture
* Centralized error handling
* Environment-based configuration
* Scalable folder structure

---

## ⚙️ Environment Variables

Create a `.env` file inside the **backend/** folder:

```env
PORT=5000
DB_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY
JWT_EXPIRE=5d
COOKIE_EXPIRE=5

CLOUDINARY_NAME=YOUR_CLOUDINARY_NAME
CLOUDINARY_API_KEY=YOUR_API_KEY
CLOUDINARY_API_SECRET=YOUR_API_SECRET
```

Do **not** commit `.env` files to GitHub.

---

## 🧑‍💻 Installation & Running Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/fooddeliverychatgpt.git
cd fooddeliverychatgpt
```

---

### 2️⃣ Backend setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

### 3️⃣ Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔐 Authentication & Authorization

* JWT-based authentication
* Protected routes using middleware
* Admin routes restricted via role checks
* Tokens handled securely (cookies / headers)

---

## 📡 API Overview (Partial)

| Method | Endpoint            | Description            |
| ------ | ------------------- | ---------------------- |
| POST   | /api/users/login    | User login             |
| POST   | /api/users/register | User registration      |
| GET    | /api/products       | Fetch products         |
| POST   | /api/products       | Create product (Admin) |
| POST   | /api/orders         | Create order           |

---

## 🚀 Deployment

Recommended setup:

* **Frontend**: Vercel / Netlify
* **Backend**: Render / Railway
* **Database**: MongoDB Atlas

Environment variables must be configured on the hosting platform.

---

## 🧹 Important Notes

* `node_modules/` **must not** be committed
* Use `.gitignore` in both frontend and backend
* Secrets must stay in `.env`

---

## 📌 Future Enhancements

* Online payments integration
* Order status tracking
* Real-time notifications
* Performance optimization
* CI/CD pipeline

---

## 👤 Author

**Nelbin**
GitHub: [https://github.com/Nelbinmoro](https://github.com/Nelbinmoro)
