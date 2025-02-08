# Task Managemwnt

## Overview

This is a task management web application built with React and Firebase. Users can sign in with Google, manage their tasks (create, edit, delete), and sort/filter them based on various criteria. The app also includes features like task history, file attachments, and responsive design.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **npm**: npm comes with Node.js, so it will be installed automatically.

### Instructions to run the project.

1. Clone the repository:

```bash
git clone https://github.com/your-username/TaskMaster-Pro.git
```

2. Navigate to the project directory:

```bash
cd TaskMaster-Pro
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

This will start the development server, and you can access the app at http://localhost:5173.

### Overview of implemented features.

#### User Authentication

- Google Authentication Setup: Configured Firebase Authentication for seamless Google login. Used Firebase Auth API to manage user sessions.
- User Profile: Displays user information, including name, email, and profile picture.

#### Task Management

- Task Creation: Users can create new tasks with title, description, due date, category, and tags.
- Task Editing: Users can edit task details, including title, description, due date, category, and tags.
- Task Deletion: Users can delete tasks.
- Task Sorting and Filtering: Users can sort tasks by due date and filter tasks based on category, tags, and due date range.
- Batch Actions: Users can delete multiple tasks or mark them as complete in bulk.
- Task History: A history log tracks changes made to tasks, such as status updates and edits.
- File Attachments: Users can attach files (e.g., documents, images) to tasks.

#### Responsive Design

- Responsive Design: Ensured that the app is mobile-first, using Material UI components and custom CSS to support different screen sizes.

#### Deployment

- Deployment: The app is deployed to Firebase Hosting, a cloud-based platform for hosting static web applications.
  url: https://task-management-ec1a5.web.app/tasks

### Challenges Faced & Solutions

- Google Authentication Setup: Configured Firebase Authentication for seamless Google login. Used Firebase Auth API to manage user sessions.
- File Uploads: Used Firebase Storage for handling file uploads and saved the file URLs in Firestore.
- Responsive Design: Ensured that the app is mobile-first, using Material UI components and custom CSS to support different screen sizes.
