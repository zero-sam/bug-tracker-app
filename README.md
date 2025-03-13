# bug-tracker-app
 A full-stack bug tracker app built with React and Node.js
🐞 Bug Tracker App
🚀 Overview

This is a full-stack Bug Tracker app built to help manage and track software bugs efficiently. It allows users to report bugs, update their status, and delete resolved issues.
🔧 Features

    📝 Report Bugs: Add new bugs with a title and description.
    ✅ Update Status: Mark bugs as "Closed" or "Reopen" them.
    🗑️ Delete Bugs: Remove bugs from the list once they’re resolved.
    👨‍💻 Admin/User Roles: Admin gets access to the dashboard; users can report bugs only.

🛠️ Tech Stack

Frontend:

    React (with Hooks)
    Axios for API requests
    CSS for styling

Backend:

    Node.js & Express
    MongoDB (Mongoose) for database
    CORS and body-parser

DEFAULT CREDENTIALS:
TO LOGIN AS USER:
```bash
username:user
password:user123
```

TO LOGIN AS ADMIN:
```bash
username:admin
password:password123
```

SCREENSHOTS:
LOGIN PAGE:
![login](https://github.com/user-attachments/assets/241c04ed-ff97-4939-9448-f23092fbac80)


USER DASHBOARD PAGE:
![newuser](https://github.com/user-attachments/assets/12b70c44-ab2f-48fa-a4bc-f48b41a7f6b3)

ADMIN DASHBOARD:
![admin1](https://github.com/user-attachments/assets/06b124a6-751d-49ed-8f5a-ef53eebe85d3)



💻 Setup Instructions
🏗️ Clone the repo
```bash
git clone https://github.com/zero-sam/bug-tracker.app
cd bug-tracker
```
🔧 Install dependencies

# Backend setup
```bash
cd backend
npm install
```

# Frontend setup
```bash
cd ../frontend
npm install
```
🚀 Run the app

# Backend
```bash
cd backend
node server
```

# Frontend
```bash
cd ../frontend
npm start
```
The frontend will run on localhost:3000 and the backend on localhost:5000.
