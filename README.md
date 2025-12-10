Snapp-Backend 🚕

This repository contains the Backend code for an internet taxi service (similar to Snapp). The project is developed using the advanced and scalable NestJS framework and TypeScript language.

Key Features ✨
The backend is designed with the following core functionalities:

Modular Architecture:

Structured based on modules for clear separation of concerns and easier maintenance.

Authentication & Authorization:

Implementation of JWT (JSON Web Tokens) for user authentication (Passengers and Drivers).

Utilization of NestJS Guards to manage access control and roles effectively.

User Management:

Comprehensive management of Passenger and Driver profiles.

Geospatial & Routing Services:

Leveraging a NoSQL database (e.g., MongoDB/Redis) for real-time tracking of driver locations.

Calculation of estimated fare and ETA (Estimated Time of Arrival) using external services (e.g., Google Maps API).

Implementation of the matching mechanism to pair a ride request with the nearest available driver.

Payment System:

Management of transactions and integration with payment gateways.

Real-Time Communication:

Use of WebSockets (via NestJS Gateway) for instantaneous updates on trip status and driver location.
