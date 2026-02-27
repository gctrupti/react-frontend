Task Dashboard

Task Dashboard is a full-stack RESTful web application designed for secure, user-scoped task management. It implements stateless JWT-based authentication within a three-tier client–server architecture and is deployed using a cloud-native infrastructure.

Live Application:
https://react-frontend-iota-neon.vercel.app/

Architecture

Client: React (Single Page Application)

Server: Node.js + Express

Database: MongoDB (Mongoose ODM)

Protocol: HTTP

Data Format: JSON

Architecture Pattern: Three-tier (Client → API → Database)

Authentication

Password hashing: bcrypt

Authentication: JSON Web Token (JWT)

Session model: Stateless

Token transmission: Authorization: Bearer <token>

Verification: Middleware-based token validation

No server-side session storage

Data Model

User

_id (ObjectId)

email (unique)

password (hashed)

createdAt, updatedAt

Task

_id (ObjectId)

title

description

user (ObjectId reference)

createdAt, updatedAt

Relationship:
User (1) → (N) Tasks

API Endpoints

Authentication

POST /auth/register

POST /auth/login

Task Management (Protected)

GET /tasks

POST /tasks

DELETE /tasks/:id

Backend Design

Modular routing

MVC structure

JWT authorization middleware

Asynchronous request handling

Environment-based configuration

CORS enabled

Frontend Design

Functional components with React Hooks

Client-side routing

Token persistence

Axios for HTTP abstraction

Protected route handling

Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

Configuration via environment variables

Core Concepts Implemented

RESTful API architecture

Stateless authentication system

Middleware-driven access control

Document-oriented schema modeling

Distributed cloud deployment
