# Doctor Availability System

A production-ready REST API for managing doctor availability. It supports recurring weekly schedules and specific date overrides (custom availability).

## Features
- **Clean Architecture**: Separation of concerns with Models, Services, and Controllers.
- **Conflict Detection**: Prevents overlapping time slots for the same doctor.
- **Hierarchical Logic**: Custom date overrides take precedence over recurring weekly slots.
- **JWT Authentication**: Secure endpoints using Bearer tokens.
- **RBAC**: Role-Based Access Control (DOCTOR vs PATIENT roles).
- **ORM**: Sequelize with SQLite (zero-config database setup).

## Prerequisites
- Node.js (v16 or higher)
- npm

## Installation

1. Install dependencies:
    npm install

2. Create a `.env` file (already provided in the root as `.env`):
    PORT=3000
    JWT_SECRET=super-secret-doctor-key-12345

3. Start the server:
    npm start

The server will automatically create a `database.sqlite` file in the root directory.

## API Documentation

### Auth Endpoints
- `POST /api/auth/register`: Create a new account.
- `POST /api/auth/login`: Authenticate and receive a JWT.

### Availability Endpoints (Doctor Only)
- `POST /api/availability/recurring`: Set a weekly slot (e.g., MONDAY 09:00-12:00).
- `POST /api/availability/custom`: Set a specific date override (e.g., 2024-12-25 10:00-11:00).
- `DELETE /api/availability/recurring/:id`: Remove a recurring slot.

### Retrieval Endpoints
- `GET /api/availability/view?date=YYYY-MM-DD`: View slots for a specific date.
  - If a Custom slot exists for that date, it returns only those.
  - Otherwise, it returns the recurring slots for that day of the week.

## Usage Example

1. **Register as a Doctor**:
    POST /api/auth/register
    { "name": "Dr. Smith", "email": "smith@clinic.com", "password": "password123", "role": "DOCTOR" }

2. **Add Recurring Slot**:
    POST /api/availability/recurring
    Authorization: Bearer <TOKEN>
    { "dayOfWeek": "MONDAY", "startTime": "09:00", "endTime": "17:00" }

3. **Add Custom Override** (e.g., for a holiday or specific shift):
    POST /api/availability/custom
    Authorization: Bearer <TOKEN>
    { "date": "2024-06-10", "startTime": "10:00", "endTime": "14:00" }

4. **Query Availability**:
    GET /api/availability/view?date=2024-06-10
    Authorization: Bearer <TOKEN>
    (Will return the 10:00-14:00 custom slot, ignoring the 09:00-17:00 recurring one).

## Project Structure
- `src/models`: Database schema definitions.
- `src/services`: Business logic and validation (Overlap detection).
- `src/controllers`: Request/Response handling.
- `src/middleware`: Authentication and Role checks.
- `src/utils`: Reusable helper functions.
