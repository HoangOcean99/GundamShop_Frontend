# 🛒 Gundam Shop – Fullstack Web Application

The **Gundam Shop** project is a fullstack web application for selling Gundam model kits. It is built with a **separated Frontend and Backend architecture**, mainly for learning and practicing **Fullstack Web Development**.

---

## 📌 Project Objectives

* Build an online Gundam shop system
* Apply React for the Frontend and Node.js for the Backend
* Practice RESTful APIs, authentication, and data validation
* Experience a real-world fullstack project workflow

---

## 🧱 System Architecture

```
Client (React + Vite)
        ↓ REST API (JSON)
Server (Node.js + Express)
        ↓
     Database
```

---

## 🌐 Frontend

### 🔧 Technologies

* **React**
* **Vite**
* **React Router DOM**
* **Axios**
* **Tailwind CSS / Bootstrap** (optional)

### 📁 Folder Structure

```
frontend/
 ├─ src/
 │  ├─ components/
 │  ├─ pages/
 │  ├─ services/
 │  ├─ routes/
 │  └─ App.jsx
 ├─ index.html
 ├─ vite.config.js
 ├─ package.json
 ├─ .env
 └─ .env.example
```

## ⚙️ Installation & Running the Backend
### Install dependencies
```bash
npm install
```
### Create .env file
```bash
cp .env.example .env
```

### Run the server
```bash
npm run dev
```
👉 API will be available at: http://localhost:5173


## 🔐 Core Features

### 👤 User

* Register / Login
* JWT-based authentication

### 📦 Gundam Products

* Product listing
* Product details
* Categories (HG, MG, RG, PG, etc.)

### 🛒 Cart & Orders

* Add / remove products from cart
* Place orders
* Order management

---

## 🧪 Validation & Security

* Request validation using **Joi**
* Password hashing
* Protected APIs with JWT middleware

---

## 📦 Git & Environment

* `.env` ❌ Not committed
* `.env.example` ✅ Committed
* Separate `.gitignore` rules for frontend and backend

---

## 🚀 Future Improvements

* Online payment integration
* Admin dashboard
* Product image upload
* Role-based access control
* Deployment (Vercel / Render / Railway)

---

## 👨‍💻 Author

**Gundam Shop Project**
Developed for learning and practicing Fullstack Web Development

---

> 📌 *This project is for educational purposes only and not intended for commercial use.*
