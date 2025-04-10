# 📚 Peer-to-Peer Book Exchange Portal

A full-stack MERN application that connects **Book Owners** and **Book Seekers**, enabling them to exchange or rent books. Built with **React + Next.js**, **Node.js**, **Express**, and **MongoDB**.

> ✅ All features are implemented as per the assignment — and then some. Authentication, data persistence, user role dashboards, and book status toggling are included.
## 🔗 Live Demo

👉 [Click here to view the live app](https://your-demo-link.vercel.app)
---

## 🚀 Features Implemented

### 👥 User Profiles (Owner & Seeker)
- Signup/Login using **Email + Password**
- Roles: `Owner` or `Seeker`
- Fields: Name, Mobile Number, Email, Password, Role
- JWT authentication with secure password hashing
- User data stored in **MongoDB**

### 📚 Book Listings
- **Owners** can add books with the following fields:
  - Title
  - Author
  - Genre (optional)
  - City/Location
  - Contact Info
- **All users** (Owners & Seekers) can browse books
- Each listing displays:
  - Title, Author, Owner Info, Location
- Owners can **toggle status**: Mark as Rented/Exchanged

### 🔒 Authentication
- Mock login with basic form (email + password)
- Matches against stored users in MongoDB
- Redirects to the appropriate dashboard (Owner/Seeker)
- JWT-based secure login flow

---

## ⚙️ Technologies Used

- **Frontend**: React, Next.js, Axios, Material UI
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, 
- **Authentication**: JWT (JSON Web Token), bcrypt
- **Hosting**: Frontend & Backend hosted on **Vercel**
- **AI Tools Used**: ChatGPT, Cursor, Claude (for faster dev & suggestions)

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/book-exchange-portal.git
```

### 2. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```


### 3. Setup Backend
```bash
cd backend
npm install
npm start

```


### 4. Create .env file in Backend

```bash
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

 
### ✅ Assignment Coverage
✅ User Profiles with Role-based access

✅ Book Listings with Owner-only posting

✅ Status Toggle for availability

✅ Mock Authentication

✅ Hosted frontend + backend

✅ AI tools mentioned

✅ Clean code and proper instructions

### 🕒 Time Spent
🧑‍💻 Approximately 2 hours 30 minutes of development time.

### 🙌 Final Thoughts
This was a fun and rewarding mini-project. I enjoyed building the portal and even went the extra mile to implement secure authentication and host both applications. Thanks for the opportunity!

