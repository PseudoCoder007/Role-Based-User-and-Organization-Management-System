# Role-Based-User-and-Organization-Management-System

# Project Summary
This is a Role-Based User and Organization Management System built using the MERN (MongoDB, Express, React, Node.js) stack. The system provides robust authentication and authorization mechanisms, enabling different users to manage organizations and employees based on their roles. The system defines three primary roles:

1. Super Admin:
    . Manages all organizations and users.
    . Has access to view and manage organization accounts.

2. Organization Admin:
    . Manages employees within their assigned organization.

3. Organization Employee:
    . Accesses basic organizational features and updates their own profile.

# Project Structure

.
├── controllers
│   ├── adminEmployeeController.js
│   ├── authController.js
│   ├── organizationEmployeController.js
│   ├── superAdminOrganizationController.js
├── middlewares
│   ├── catchError.js
│   ├── protectedRoute.js
│   ├── userRoleRoute.js
├── models
│   ├── userSchema.js
│   ├── organizationSchema.js
├── routes
│   ├── adminEmployeeRoutes.js
│   ├── authRoutes.js
│   ├── organizationEmployeeRoutes.js
│   ├── superAdminOrganizationRoutes.js
├── config
│   ├── database.js
├── index.js
├── .env
├── package.json
└── README.md

# Features and Functionalitie

1. Authentication and Authorization:
    . JWT-based authentication for login and role-based access control.
    . Refresh token API to renew access tokens securely.
    . Password hashing using bcrypt for secure storage.

2. Super Admin Functionalities:
    . Create, view, and delete organizations.
    . View all employees across all organizations.

3. Organization Admin Functionalities:
    . Add, update, delete, and list employees within their organization.
    . Pagination, search, and sort features for employee lists.

4. Organization Employee Functionalities:
    . View and update their own profile.
    . Search, Sort, and Pagination
    . Search functionality for organizations and employees by name or other fields.
    . Sort data by specified fields in ascending or descending order.
    . Pagination for efficient data retrieval.

5. Error Handling:
    . Clear and consistent error messages for unauthorized access, validation errors, and resource not found scenarios.

6. Environment Variables:
    . Securely stores sensitive data such as database credentials and JWT secrets in a .env file.

# Installation and Setup

1. Prerequisites
    Ensure you have the following installed:
        . Node.js (v16 or higher)
        . MongoDB (local or MongoDB Atlas)
        . Git

2. Steps to Run the Project
    1. Clone the Repository - Clone the repository to your local machine:
    . git clone <repository-url>
    . cd <repository-folder>
    2. Install Dependencies Install the required Node.js packages:
    . npm install
    3. Set Up MongoDB
    4. Configure the .env File:
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/role-based-management  # For local MongoDB
    JWT_SECRET=<your-jwt-secret>
    JWT_REFRESH_SECRET=<your-refresh-token-secret>
    5. Start the Server Now, you can start the backend server:
    . npm start
    6. Access the API The server will start on http://localhost:5000 by default.

    . You can now use Postman or cURL to test the APIs.
    Example request:

    . POST /login: Log in to get the access token.
    . GET /organizations: Fetch all organizations.
    . POST /organizations: Create a new organization (Super Admin only).

