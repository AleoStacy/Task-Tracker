TaskMaster

TaskMaster is a task management web application that allows users to create, edit, delete, and filter tasks. The application includes features such as setting task priority, assigning collaborators, and setting due dates. The tasks are fetched from and managed via a backend API, which is secured with JWT (JSON Web Token) authentication.

# Features
- Task Management: Create, update, and delete tasks.
- Task Status: Mark tasks as completed or pending.
- Task Filtering: Filter tasks based on their status (all, completed, pending).
- Task Priority: Set priorities (High, Medium, Low) for tasks.
- Task Due Date: Set and display due dates for tasks.
- Collaborator Assignment: Assign collaborators to tasks.

# Technologies Used
1. Frontend: React
2. Backend: Flask Python, Resftful (API)
3. Database: JSON Server (for local storage)
4. Authentication: JWT (JSON Web Token)
5. Styling: CSS

1. Clone the repository

- git clone https://github.com/AleoStacy/Task-Tracker.git
- cd taskmaster

2. Backend Setup
Navigate to the backend directory and install dependencies:

- cd backend
- npm install
- Start the backend server:

- npm start
- Your backend will be running on http://localhost:5000.

3. Frontend Setup
Navigate to the frontend directory and install dependencies:

cd frontend
npm install
Start the frontend server:

npm start
Your frontend will be running on http://localhost:3000.

4. Authentication Setup
To use the task management features, the app requires JWT authentication:

- Log in to the app (authentication endpoint needed).
- Store the returned JWT token in localStorage.
- The token will be automatically included in the headers for API requests.

5. Environment Variables
If needed, you can set environment variables for the backend API URL in .env files for easier configuration.

Example .env for frontend:

REACT_APP_API_URL=http://localhost:5000/api

6. Future Enhancements
- User registration and login functionality.
- Integrate with a real database (like MongoDB or PostgreSQL) instead of using JSON Server.
- More robust task filtering (e.g., filter by date, collaborator).
- Better error handling and user feedback.


