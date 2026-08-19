# JOB-TRACKER-API# 

A RESTful API built with Node.js, Express, and MongoDB for tracking job applications. Features JWT authentication, pagination, filtering, sorting, and search functionality.
## 🚀 Live Demo

**Base URL:** `job-tracker-api-production-4bed.up.railway.app`

> Test the API using the endpoints below with any REST client (Postman, Thunder Client, etc.)


## Features

- JWT Authentication (Register/Login)
- Full CRUD for job applications
- Filter by status (Applied/Interview/Rejected/Offered)
- Search by company or position
- Sort by latest or oldest
- Pagination support
- Rate limiting & security headers (Helmet)
- Request logging (Morgan)
- User-specific data isolation

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Helmet, Morgan, express-rate-limit

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |

### Jobs (Protected — Bearer Token required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/jobs | Get all jobs (filter, sort, search, paginate) |
| GET | /api/jobs/stats | Get job statistics |
| GET | /api/jobs/:id | Get job by ID |
| POST | /api/jobs | Create new job |
| PUT | /api/jobs/:id | Update job |
| DELETE | /api/jobs/:id | Delete job |

## Query Parameters (GET /api/jobs)

| Param | Default | Description |
|-------|---------|-------------|
| page | 1 | Page number |
| limit | 10 | Results per page |
| status | all | Filter by status |
| sort | latest | latest or oldest |
| search | - | Search company or position |

## Setup

```bash
# Install dependencies
npm install

# Add .env file
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3000

# Run server
npm start
```
