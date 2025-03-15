# 📆 Work Time Management 

## 📄 Project Overview
This project focuses on developing a work time management system that enables companies to efficiently record, manage, and analyze employee working hours. The system is designed to provide a user-friendly interface to enhance productivity and ensure compliance with legal requirements.
---

## 🔧 Features
- **Time Tracking:** Employees can conveniently clock in and out.
- **Management:** Managers can view, edit, and approve working hours.
---

## 🔎 Employee JSON Structure

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

## 🔎 Time Management JSON Structure

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

## 🔎 Activity JSON Structure

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


