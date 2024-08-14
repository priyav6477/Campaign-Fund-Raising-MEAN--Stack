# Fund Raising Project Documentation

# Overview
This document provides a comprehensive overview of the Fund Raising Project developed using Angular, Express, and MongoDB. It includes details about the application's features, user roles, and technology stack.

# Technology Stack
•	Frontend: Angular
•	Backend: Express
•	Database: MongoDB
•	Validation: express-validator
•	Email Service: nodemailer
•	Payment Gateway: PayPal Sandbox
________________________________________

# Features
# Landing Page
•	Hero Section: Highlights key features and goals of the fund-raising project.
•	About Section: Provides information about the organization and its mission.
•	Recent Campaigns: Displays a list of recent fundraising campaigns.
•	Total Amount Donated: Shows the cumulative amount donated by users.
# User Authentication
•	Registration Page: Allows users to sign up.
•	Login Page: Allows users to log in to their accounts.

# User Roles
1.	Admin User
o	Create Campaigns: Ability to create and manage fundraising campaigns.
o	Manage Users: Can view, edit, and delete all users.

2.	Individual User
o	Register for Campaigns: Sign up for specific fundraising campaigns.
o	View Campaigns: View the Campaigns they registered.
o	Donate Funds: Use PayPal Sandbox to donate funds.
o	Edit Profile: Update personal details and information.
o	View Donations: See the total amount they have donated.

3.	Minor User
o	Register for Campaigns: Sign up for specific fundraising campaigns.
o	View Campaigns: View the Campaigns they registered.
o	Donate Funds: Use PayPal Sandbox to donate funds.
o	Edit Profile: Update personal details and information.
o	View Donations: See the total amount they have donated.

4.	Organization User
o	Create Campaigns: Ability to create and manage fundraising campaigns.
o	View Campaigns: View the Campaigns they registered.
o	Register for Campaigns: Sign up for specific campaigns.
o	Donate Funds: Use PayPal Sandbox to donate funds.
o	Edit Profile: Update organizational details and information.
o	View Donations: See the total amount they have donated.

# Functionality
•	Campaign Management: Admin and Organization users can create and manage campaigns.
•	User Management: Admin users can manage all users.
•	Donation System: Users can donate funds through PayPal Sandbox.
•	Profile Management: Users can edit their profiles and view their donation history.
________________________________________

# Detailed Description

# Frontend (Angular)
•	Components: Developed using Angular components to manage different sections of the application such as the landing page, user registration, login, and campaign details.
•	Services: Angular services for interacting with the backend API, handling user authentication, and managing donations.
•	Routing: Angular Router for navigation between different views (e.g., landing page, user dashboard, campaign details).

# Backend (Express)
# API Endpoints:
o	User Management: Registration, login, profile updates.
o	Campaign Management: Creating, viewing, and managing campaigns.
o	Donation Handling: Processing donations through PayPal Sandbox.
o	User Roles: Handling different permissions and access levels for admin, individual, minor, and organization users.
•	Validation: Using express-validator to ensure data integrity and security.
•	Email Notifications: Using nodemailer to send notifications and updates to users.

# Database (MongoDB)
# Schema Design:
o	User Schema: Includes fields for user information, role.
o	Campaign Schema: Includes details about each campaign, such as title, description, image and progress.
o	User Campaigns Schema: Includes details about Campaigns registered by users and donation made.
# Payment Integration (PayPal Sandbox)
•	Sandbox Environment: Used for testing payments without real transactions.
•	Payment Flow: Users can make donations through a secure PayPal payment process.
•	Handling Payment Data: Securely processing and storing payment information.
________________________________________
# Security Considerations
•	Data Validation: Ensured through express-validator to prevent invalid data entry and potential attacks.
•	Authentication & Authorization: Implemented secure user authentication and role-based access control.
•	Data Protection: Used encryption and secure storage methods for sensitive user and payment information.

