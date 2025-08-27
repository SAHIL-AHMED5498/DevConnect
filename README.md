# Dev-Connect Backend

Dev-Connect is a backend service for a recruitment platform designed to simplify the process of connecting recruiters with developers. Recruiters can view developer profiles, send connection requests, and upon acceptance, seamlessly establish connections for potential hiring.  

This repository contains the **backend implementation** of Dev-Connect, built using **Node.js, Express, and MongoDB** with a focus on security, scalability, and robustness.

---

## ✨ Features

- **Authentication & Security**
  - User signup and login using **JWT** for token-based authentication.
  - Passwords secured with **bcrypt hashing**.
  - Secure cookie handling with **cookie-parser**.

- **Profile Management**
  - View and edit user profiles.
  - Update account password with validation.
  - Profile data modeled with Mongoose schemas and schema methods.

- **Connections & Requests**
  - Recruiters can send connection requests to developers.
  - Developers can review and accept/reject connection requests.
  - Users can view their connections and requests.
  - Feed system to explore new developer profiles.

- **Scalable Design**
  - Pagination implemented for efficient data retrieval.
  - Well-structured routes for modular development.
  - Robust error handling and edge case management.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication & Security:** JWT, bcrypt
- **Middleware & Utilities:** cookie-parser, body-parser, express middleware
- **Other Concepts:** Schema methods, pagination, modular route handling

---

## 📌 API Routes

### 🔑 Authentication Routes
| Route          | Method | Description                              |
|----------------|--------|------------------------------------------|
| `/signup`      | POST   | Create a new user                        |
| `/signin`      | POST   | Sign in an existing user                 |
| `/logout`      | POST   | Logout user (clear session/token)        |

---

### 👤 Profile Routes
| Route              | Method | Description                                      |
|---------------------|--------|--------------------------------------------------|
| `/profile/view`     | GET    | View the profile of the logged-in user           |
| `/profile/edit`     | PATCH  | Update the profile of the logged-in user         |
| `/profile/password` | PATCH  | Update/change password for the logged-in user    |

---

### 👥 User Routes
| Route              | Method | Description                                               |
|---------------------|--------|-----------------------------------------------------------|
| `/user/connections` | GET    | Get all connections of the logged-in user                 |
| `/user/requests`    | GET    | Fetch all connection requests received by the user        |
| `/user/feed`        | GET    | Get recommended profiles for the logged-in user’s feed    |

---

### 🔗 Connection Request Routes
| Route                                   | Method | Description                                                                 |
|------------------------------------------|--------|-----------------------------------------------------------------------------|
| `/request/send/:status/:userId`         | POST   | Send a connection request to a user (`status`: `interested` or `ignore`)    |
| `/request/review/:status/:requestId`    | POST   | Review a connection request (`status`: `accepted` or `rejected`)            |

---

## ⚙️ Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/dev-connect-backend.git
   cd dev-connect-backend
