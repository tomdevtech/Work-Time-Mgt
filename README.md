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

---

# 🖥️ **Running PowerShell Script `start_processes.ps1` via Desktop Shortcut**  

## ✅ **Prerequisites**
Before you begin, ensure that the following prerequisites are met:  
1. **Docker** is installed and running on your system. If Docker is not installed, you can download it here: [Docker Official Website](https://www.docker.com/)  
2. **PowerShell script execution is enabled** (see below).  

---

## 🚀 **Step 1: Enable PowerShell Script Execution**
If not already enabled, activate script execution for PowerShell:
1. Open PowerShell as Administrator.
2. Run the following command to allow unsigned scripts:
   ```powershell
   Set-ExecutionPolicy Unrestricted -Scope CurrentUser
   ```
3. Confirm with `Y` and press **Enter**.

---

## 📂 **Step 2: Store the Script in a Repository**
Save your `start_processes.ps1` script in a local folder, e.g.:  
`C:\Users\YourUser\Documents\WorkTimeManagement\start_processes.ps1`

---

## 📌 **Step 3: Create a Desktop Shortcut for the Script**
1. **Right-click on the desktop** → **New** → **Create Shortcut**  
2. In the field **"Enter the location of the item"**, enter the following command:
   ```plaintext
   powershell.exe -ExecutionPolicy Bypass -File "C:\Users\YourUser\Documents\WorkTimeManagement\start_processes.ps1"
   ```
3. Click **Next**.  
4. Give the shortcut a name, e.g., **"WorkTimeManager Start"**.  
5. Click **Finish**.  

---

## 🎨 **Step 4: Customize Shortcut Icon (Optional)**
1. **Right-click on the shortcut** → **Properties**  
2. Under the **"Shortcut"** tab, click **"Change Icon"**.  
3. Choose a suitable icon (e.g., from `shell32.dll`) or use your own `.ico` file.  
4. Click **OK** → **Apply**.  

---

## ▶ **Step 5: Run the Script with the Shortcut**
Double-click the created shortcut to execute the script.  

If Docker is not running, check the Docker installation and start it manually via the Docker Desktop application.

---

With this setup, you can quickly start your `start_processes.ps1` script to initialize processes for your Work Time Management System! 🚀

---

## 📄 References
👾  [Running Powershell Script from Shortcut on Desktop](https://www.tenforums.com/tutorials/97162-powershell-scripting-run-script-shortcut.html)
