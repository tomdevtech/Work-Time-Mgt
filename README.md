# 📊 Work Time Management System

A full-stack application for managing employee work time and activities.

## 📄 Project Overview
This project focuses on developing a work time management system that enables companies to efficiently record, manage, and analyze employee working hours. The system is designed to provide a user-friendly interface to enhance productivity and ensure compliance with legal requirements.

## ✨ Features

- 👥 Employee management
- 📝 Activity management
- ⏱️ Time tracking
- 📊 Dashboard with statistics
- 📱 Responsive design

## 🔎 Data Structures

### Employee JSON Structure
```json
{
  "Employee": {
    "EmployeeNo": "12345",
    "Surname": "Doe",
    "LastName": "John",
    "Role": "Software Developer",
    "StreetName": "Main Street 123",
    "ZipCode": "12345",
    "City": "Sample City",
    "TotalCountHoursPerMonth": 160
  }
}
```

### Activity JSON Structure
```json
{
  "Activity": {
    "Code": "ACT1001",
    "Description": "Development Work",
    "TotalHoursBooked": 120,
    "TotalHoursAvailable": 160,
    "IgnoreTotalHoursAvailableCheck": false
  }
}
```

### Time Management JSON Structure
```json
{
  "TimeMgt": {
    "LineNo": "001",
    "EmployeeNo": "12345",
    "ActivityCode": "ACT1001",
    "Description": "Development Work",
    "StartTime": "2025-03-01T09:00:00Z",
    "EndTime": "2025-03-01T17:00:00Z"
  }
}
```

## 🛠️ Tech Stack

### Frontend
- ⚛️ React
- 📘 TypeScript
- 🎨 Material UI
- 📝 Formik
- ✅ Yup
- 🔄 Axios
- 🛣️ React Router

### Backend
- 🟢 Node.js
- 🚂 Express
- 📘 TypeScript
- 🐘 PostgreSQL
- 🔄 Prisma

## 🚀 Getting Started

### Prerequisites

- 🟢 Node.js
- 🐘 PostgreSQL
- 📦 npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   cd src/frontend
   npm install
   cd ../backend
   npm install
   ```

3. Set up the database:
   ```bash
   cd src/backend
   npx prisma migrate dev
   ```

4. Start the development servers:
   ```bash
   # Terminal 1
   cd src/backend
   npm run dev

   # Terminal 2
   cd src/frontend
   npm start
   ```

## ⚙️ Environment Variables

### Frontend
- `REACT_APP_API_URL`: API base URL
  - Development: `http://localhost:3000/api`
  - Production: `/api`

### Backend
- `DATABASE_URL`: PostgreSQL connection string
- `PORT`: Server port (default: 3000)

## 📁 Project Structure

### Frontend
```
src/frontend/
├── src/
│   ├── api/                 # API client and endpoints
│   ├── components/          # Reusable components
│   ├── pages/              # Page components
│   ├── App.tsx             # Main application component
│   └── index.tsx           # Entry point
├── public/                 # Static files
└── package.json           # Dependencies and scripts
```

### Backend
```
src/backend/
├── src/
│   ├── controllers/        # Request handlers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   └── app.ts             # Main application
├── prisma/                # Database schema and migrations
└── package.json          # Dependencies and scripts
```

## 📚 API Documentation

### Employee Management
- `GET /employees` - Get all employees
- `GET /employees/:employeeNo` - Get employee by ID
- `POST /employees` - Create new employee
- `PATCH /employees/:employeeNo` - Update employee
- `DELETE /employees/:employeeNo` - Delete employee

### Activity Management
- `GET /activities` - Get all activities
- `GET /activities/:code` - Get activity by code
- `POST /activities` - Create new activity
- `PATCH /activities/:code` - Update activity
- `DELETE /activities/:code` - Delete activity

### Time Management
- `GET /time-management` - Get all time entries
- `GET /time-management/:lineNo` - Get time entry by ID
- `POST /time-management` - Create new time entry
- `PATCH /time-management/:lineNo` - Update time entry
- `DELETE /time-management/:lineNo` - Delete time entry

## 📄 License

MIT
