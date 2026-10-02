# CampusOps

CampusOps is a deliberately simple college placement portal MVP connecting students, recruiters, and administrators.

## Stack

- Frontend: React, Vite, React Router, Axios, CSS with Tailwind-inspired utility conventions
- Backend: Node.js, Express, JWT, bcryptjs
- Database: MongoDB with Mongoose

## Structure

`frontend/` contains the Vite React app. `backend/src/` contains Express routes, models, middleware, and the seed script.

## Setup

1. Install Node.js and MongoDB locally.
2. Copy `.env.example` to `backend/.env` and set `MONGODB_URI`, `JWT_SECRET`, and `PORT`.
3. Install dependencies: `npm install`, then `npm run install:all`.
4. Start both apps with `npm run dev` (frontend at `http://localhost:5173`, API at `http://localhost:5000`).
5. Seed sample data with `npm --prefix backend run seed`.

Seed users use the password `Password123!`: `admin@campusops.test`, `recruiter1@campusops.test`, and `student1@campusops.test`.

## API overview

Authentication is available at `/api/auth`; jobs at `/api/jobs`; student applications at `/api/applications`; admin reporting at `/api/admin`. Protected endpoints use a JWT bearer token and role authorization.

## Roles

Students browse and apply for jobs. Recruiters manage owned job postings and candidate statuses. Admins can view all portal data and remove jobs.
