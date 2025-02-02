import { Task } from "./types";

const dummyTasks: Task[] = [
    {
        "id": "1",
        "title": "Complete React Project",
        "description": "Finalize the React project and deploy to production.",
        "category": "Work",
        "dueDate": "2024-02-10",
        "status": "In Progress",
        "priority": "High",
        "tags": ["React", "Development"],
        "attachments": ["requirements.pdf"]
    },
    {
        "id": "2",
        "title": "Write Blog Post",
        "description": "Write and publish a technical blog post on Redux Toolkit.",
        "category": "Personal",
        "dueDate": "2024-02-15",
        "status": "Pending",
        "priority": "Medium",
        "tags": ["Writing", "Redux"],
        "attachments": []
    },
    {
        "id": "3",
        "title": "Grocery Shopping",
        "description": "Buy vegetables, fruits, and essentials for the week.",
        "category": "Personal",
        "dueDate": "2024-02-05",
        "status": "Completed",
        "priority": "Low",
        "tags": ["Shopping"],
        "attachments": []
    },
    {
        "id": "4",
        "title": "Prepare Presentation",
        "description": "Create slides for the upcoming project review meeting.",
        "category": "Work",
        "dueDate": "2024-02-07",
        "status": "In Progress",
        "priority": "High",
        "tags": ["Presentation", "Work"],
        "attachments": ["slides.pptx"]
    },
    {
        "id": "5",
        "title": "Team Meeting",
        "description": "Discuss project milestones with the development team.",
        "category": "Work",
        "dueDate": "2024-02-06",
        "status": "Pending",
        "priority": "Medium",
        "tags": ["Meeting"],
        "attachments": []
    },
    {
        "id": "6",
        "title": "Fix Login Bug",
        "description": "Investigate and resolve login issue in the web app.",
        "category": "Work",
        "dueDate": "2024-02-08",
        "status": "In Progress",
        "priority": "High",
        "tags": ["Bug Fix", "Development"],
        "attachments": ["bug_report.txt"]
    },
    {
        "id": "7",
        "title": "Exercise",
        "description": "Go for a 5km run in the morning.",
        "category": "Health",
        "dueDate": "2024-02-05",
        "status": "Completed",
        "priority": "Medium",
        "tags": ["Fitness"],
        "attachments": []
    },
    {
        "id": "8",
        "title": "Read Book",
        "description": "Read 'Atomic Habits' by James Clear.",
        "category": "Personal",
        "dueDate": "2024-02-20",
        "status": "Pending",
        "priority": "Low",
        "tags": ["Reading"],
        "attachments": []
    },
    {
        "id": "9",
        "title": "Plan Weekend Trip",
        "description": "Decide location and book hotel for the weekend getaway.",
        "category": "Personal",
        "dueDate": "2024-02-12",
        "status": "Pending",
        "priority": "Medium",
        "tags": ["Travel"],
        "attachments": []
    },
    {
        "id": "10",
        "title": "Client Feedback",
        "description": "Review client feedback and update the project plan.",
        "category": "Work",
        "dueDate": "2024-02-09",
        "status": "In Progress",
        "priority": "High",
        "tags": ["Client", "Feedback"],
        "attachments": ["client_notes.pdf"]
    },
    {
        "id": "11",
        "title": "Doctors Appointment",
        "description": "Annual health check-up at 10 AM.",
        "category": "Health",
        "dueDate": "2024-02-11",
        "status": "Pending",
        "priority": "High",
        "tags": ["Health"],
        "attachments": []
    },
    {
        "id": "12",
        "title": "Clean House",
        "description": "Do a deep clean of the house.",
        "category": "Personal",
        "dueDate": "2024-02-10",
        "status": "Pending",
        "priority": "Low",
        "tags": ["Cleaning"],
        "attachments": []
    },
    {
        "id": "13",
        "title": "Watch Tutorial",
        "description": "Complete React Router tutorial.",
        "category": "Education",
        "dueDate": "2024-02-14",
        "status": "In Progress",
        "priority": "Medium",
        "tags": ["Learning", "React"],
        "attachments": []
    },
    {
        "id": "14",
        "title": "Dinner with Friends",
        "description": "Meet friends for dinner at 7 PM.",
        "category": "Social",
        "dueDate": "2024-02-09",
        "status": "Pending",
        "priority": "Medium",
        "tags": ["Friends"],
        "attachments": []
    },
    {
        "id": "15",
        "title": "Car Maintenance",
        "description": "Oil change and tire check.",
        "category": "Personal",
        "dueDate": "2024-02-18",
        "status": "Pending",
        "priority": "Medium",
        "tags": ["Car"],
        "attachments": []
    },
    {
        "id": "16",
        "title": "Call Parents",
        "description": "Weekly check-in with parents.",
        "category": "Personal",
        "dueDate": "2024-02-07",
        "status": "Completed",
        "priority": "Low",
        "tags": ["Family"],
        "attachments": []
    },
    {
        "id": "17",
        "title": "Project Deadline",
        "description": "Submit final project report.",
        "category": "Work",
        "dueDate": "2024-02-28",
        "status": "Pending",
        "priority": "High",
        "tags": ["Deadline"],
        "attachments": ["final_report.docx"]
    },
    {
        "id": "18",
        "title": "Yoga Session",
        "description": "Attend a 1-hour yoga class.",
        "category": "Health",
        "dueDate": "2024-02-10",
        "status": "Pending",
        "priority": "Medium",
        "tags": ["Fitness"],
        "attachments": []
    },
    {
        "id": "19",
        "title": "Update Portfolio",
        "description": "Add new projects to online portfolio.",
        "category": "Work",
        "dueDate": "2024-02-17",
        "status": "In Progress",
        "priority": "Medium",
        "tags": ["Career"],
        "attachments": []
    },
    {
        "id": "20",
        "title": "Pay Electricity Bill",
        "description": "Pay the monthly electricity bill before the due date.",
        "category": "Personal",
        "dueDate": "2024-02-08",
        "status": "Pending",
        "priority": "High",
        "tags": ["Bills"],
        "attachments": []
    },
    {
        "id": "21",
        "title": "Plan Team Outing",
        "description": "Organize a fun activity for the team.",
        "category": "Work",
        "dueDate": "2024-02-22",
        "status": "Pending",
        "priority": "Medium",
        "tags": ["Team", "Event"],
        "attachments": []
    }
]

export default dummyTasks;