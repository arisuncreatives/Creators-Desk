# Creator's Desk 🖥️

A modern, highly scalable e-commerce platform dedicated to premium desk setups, keycaps, organizers, and tech accessories. Built with a microservices architecture to ensure isolated scaling, seamless deployments, and a resilient infrastructure.

## 🏗️ Architecture Overview

This project is divided into distinct microservices, all routed through a central API Gateway. 

*   **Frontend:** React (Vite) application providing a fast, responsive UI.
*   **API Gateway:** Node.js/Express reverse proxy (`http-proxy-middleware`) that routes frontend requests to the appropriate backend service and handles global CORS.
*   **Auth Service:** Manages user sessions and authentication using passwordless OTP (via Twilio) and JWT verification.
*   **Product Service:** Handles the product catalog, inventory data, and item retrieval.
*   **Order Service:** Manages cart functionality, checkout processes, and user order history.

## 🛠️ Tech Stack

*   **Frontend:** React, Vite, TailwindCSS
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB (Mongoose)
*   **Authentication:** JWT (JSON Web Tokens), Twilio SMS OTP
*   **Proxy/Routing:** `http-proxy-middleware` (v3)
*   **Deployment:** Vercel (Frontend), Render (Microservices)

---

## 🚀 Local Development Setup

Because this environment runs the microservices directly via Node.js (without Docker), you will need to start each service independently. 

### Prerequisites
*   Node.js installed
*   MongoDB Community Server running locally on `mongodb://localhost:27017` (or a MongoDB Atlas cloud URI)

### 1. Installation
Clone the repository and install dependencies for **each** service. Open your terminal and navigate to each folder:

```bash
cd api-gateway && npm install
cd ../auth-service && npm install
cd ../product-service && npm install
cd ../order-service && npm install
cd ../frontend && npm install
