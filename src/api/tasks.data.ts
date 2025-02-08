import { formatDisplayDate } from "../utils/helper";

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  dueDate: string;
  status: string;
  priority: string;
  tags: string[];
  attachments: string[];
  createdDate: string;
  updatedDate: string;
  history: {
    date: string;
    action: string;
    details: string;
  }[];
}
const generateRandomID = () => Math.random().toString(36).substring(2, 15);

const dummyTasks: Task[] = [
  {
    id: generateRandomID(),
    title: "Complete React Project",
    description: "Finalize the React project and deploy to production.",
    category: "Work",
    dueDate: "2025-02-10",
    status: "COMPLETED",
    priority: "High",
    tags: ["React", "Development"],
    attachments: ["requirements.pdf"],
    createdDate: "2025-01-01",
    updatedDate: "2025-01-15",
    history: [
      {
        date: "2025-01-01",
        action: "Created",
        details: "You created this task.",
      },
      {
        date: "2025-01-15",
        action: "Updated",
        details: "You changed status from in progress to complete.",
      },
    ],
  },
  {
    id: generateRandomID(),
    title: "Write Blog Post",
    description: "Write and publish a technical blog post on Redux Toolkit.",
    category: "Personal",
    dueDate: "2025-02-15",
    status: "IN-PROGRESS",
    priority: "Medium",
    tags: ["Writing", "Redux"],
    attachments: [],
    createdDate: "2025-01-05",
    updatedDate: "2025-01-10",
    history: [
      {
        date: "2025-01-05",
        action: "Created",
        details: "You created this task.",
      },
      {
        date: "2025-01-10",
        action: "Updated",
        details: "You changed status from to-do to in progress.",
      },
    ],
  },
  {
    id: generateRandomID(),
    title: "Grocery Shopping",
    description: "Buy vegetables, fruits, and essentials for the week.",
    category: "Personal",
    dueDate: "2025-02-05",
    status: "COMPLETED",
    priority: "Low",
    tags: ["Shopping"],
    attachments: [],
    createdDate: "2025-01-03",
    updatedDate: "2025-01-04",
    history: [
      {
        date: "2025-01-03",
        action: "Created",
        details: "You created this task.",
      },
      {
        date: "2025-01-04",
        action: "Updated",
        details: "You changed status from to-do to completed.",
      },
    ],
  },
  {
    id: generateRandomID(),
    title: "Prepare Presentation",
    description: "Create slides for the upcoming project review meeting.",
    category: "Work",
    dueDate: "2025-02-12",
    status: "TO-DO",
    priority: "High",
    tags: ["Presentation", "Work"],
    attachments: ["presentation.pptx"],
    createdDate: "2025-01-07",
    updatedDate: "2025-01-14",
    history: [
      {
        date: "2025-01-07",
        action: "Created",
        details: "You created this task.",
      },
      {
        date: "2025-01-14",
        action: "Updated",
        details: "You uploaded file.",
      },
    ],
  },
  {
    id: generateRandomID(),
    title: "Exercise",
    description: "Go for a 30-minute run in the park.",
    category: "Work",
    dueDate: "2025-02-06",
    status: "TO-DO",
    priority: "Medium",
    tags: ["Exercise", "Health"],
    attachments: [],
    createdDate: "2025-01-08",
    updatedDate: "2025-01-08",
    history: [
      {
        date: "2025-01-08",
        action: "Created",
        details: "You created this task.",
      },
    ],
  },
  {
    id: generateRandomID(),
    title: "Read a Book",
    description: "Read 'Atomic Habits' by James Clear.",
    category: "Personal",
    dueDate: "2025-02-20",
    status: "TO-DO",
    priority: "Low",
    tags: ["Reading"],
    attachments: [],
    createdDate: "2025-01-09",
    updatedDate: "2025-01-09",
    history: [
      {
        date: "2025-01-09",
        action: "Created",
        details: "You created this task.",
      },
    ],
  },
  {
    id: generateRandomID(),
    title: "Team Meeting",
    description: "Attend the weekly team meeting.",
    category: "Work",
    dueDate: "2025-02-07",
    status: "TO-DO",
    priority: "High",
    tags: ["Meeting", "Work"],
    attachments: [],
    createdDate: "2025-01-10",
    updatedDate: "2025-01-10",
    history: [
      {
        date: "2025-01-10",
        action: "Created",
        details: "You created this task.",
      },
    ],
  },
  {
    id: generateRandomID(),
    title: "Plan Vacation",
    description: "Plan the itinerary for the upcoming vacation.",
    category: "Personal",
    dueDate: "2025-02-25",
    status: "TO-DO",
    priority: "Medium",
    tags: ["Vacation", "Planning"],
    attachments: [],
    createdDate: "2025-01-11",
    updatedDate: "2025-01-11",
    history: [
      {
        date: "2025-01-11",
        action: "Created",
        details: "You created this task.",
      },
    ],
  },
  {
    id: generateRandomID(),
    title: "Doctor Appointment",
    description: "Visit the doctor for a regular check-up.",
    category: "Work",
    dueDate: "2025-02-08",
    status: "TO-DO",
    priority: "High",
    tags: ["Health", "Appointment"],
    attachments: [],
    createdDate: "2025-01-12",
    updatedDate: "2025-01-12",
    history: [
      {
        date: "2025-01-12",
        action: "Created",
        details: "You created this task.",
      },
    ],
  },
  {
    id: generateRandomID(),
    title: "Clean the House",
    description: "Do a thorough cleaning of the house.",
    category: "Personal",
    dueDate: "2025-02-09",
    status: "TO-DO",
    priority: "Medium",
    tags: ["Cleaning"],
    attachments: [],
    createdDate: "2025-01-13",
    updatedDate: "2025-01-13",
    history: [
      {
        date: "2025-01-13",
        action: "Created",
        details: "You created this task.",
      },
    ],
  },
  {
    id: generateRandomID(),
    title: "Client Presentation",
    description: "Prepare and deliver a presentation to the client.",
    category: "Work",
    dueDate: "2025-02-11",
    status: "TO-DO",
    priority: "High",
    tags: ["Presentation", "Client"],
    attachments: [],
    createdDate: "2025-01-14",
    updatedDate: "2025-01-14",
    history: [
      {
        date: "2025-01-14",
        action: "Created",
        details: "You created this task.",
      },
    ],
  },
  {
    id: generateRandomID(),
    title: "Update Resume",
    description: "Update the resume with recent job experience.",
    category: "Personal",
    dueDate: "2025-02-12",
    status: "TO-DO",
    priority: "Medium",
    tags: ["Resume", "Career"],
    attachments: [],
    createdDate: "2025-01-15",
    updatedDate: "2025-01-15",
    history: [
      {
        date: "2025-01-15",
        action: "Created",
        details: "You created this task.",
      },
    ],
  },
  {
    id: generateRandomID(),
    title: "Team Building Activity",
    description: "Organize a team building activity for the team.",
    category: "Work",
    dueDate: "2025-02-13",
    status: "TO-DO",
    priority: "Medium",
    tags: ["Team Building", "Work"],
    attachments: [],
    createdDate: "2025-01-16",
    updatedDate: "2025-01-16",
    history: [
      {
        date: "2025-01-16",
        action: "Created",
        details: "You created this task.",
      },
    ],
  },
  {
    id: generateRandomID(),
    title: "Pay Bills",
    description: "Pay the monthly utility bills.",
    category: "Personal",
    dueDate: "2025-02-14",
    status: "TO-DO",
    priority: "High",
    tags: ["Bills", "Finance"],
    attachments: [],
    createdDate: "2025-01-17",
    updatedDate: "2025-01-17",
    history: [
      {
        date: "2025-01-17",
        action: "Created",
        details: "You created this task.",
      },
    ],
  },
  {
    id: generateRandomID(),
    title: "Learn TypeScript",
    description: "Complete an online course on TypeScript.",
    category: "Work",
    dueDate: "2025-02-15",
    status: "TO-DO",
    priority: "Medium",
    tags: ["Learning", "TypeScript"],
    attachments: [],
    createdDate: "2025-01-18",
    updatedDate: "2025-01-18",
    history: [
      {
        date: "2025-01-18",
        action: "Created",
        details: "You created this task.",
      },
    ],
  },
  {
    id: generateRandomID(),
    title: "Family Dinner",
    description: "Organize a family dinner at home.",
    category: "Personal",
    dueDate: "2025-02-16",
    status: "TO-DO",
    priority: "High",
    tags: ["Family", "Dinner"],
    attachments: [],
    createdDate: "2025-01-19",
    updatedDate: "2025-01-19",
    history: [
      {
        date: "2025-01-19",
        action: "Created",
        details: "You created this task.",
      },
    ],
  },
  {
    id: generateRandomID(),
    title: "Car Maintenance",
    description: "Take the car for regular maintenance.",
    category: "Personal",
    dueDate: "2025-02-17",
    status: "TO-DO",
    priority: "Medium",
    tags: ["Car", "Maintenance"],
    attachments: [],
    createdDate: "2025-01-20",
    updatedDate: "2025-01-20",
    history: [
      {
        date: "2025-01-20",
        action: "Created",
        details: "You created this task.",
      },
    ],
  },
  {
    id: generateRandomID(),
    title: "Project Kickoff",
    description: "Kickoff meeting for the new project.",
    category: "Work",
    dueDate: "2025-02-18",
    status: "TO-DO",
    priority: "High",
    tags: ["Project", "Meeting"],
    attachments: [],
    createdDate: "2025-01-21",
    updatedDate: "2025-01-21",
    history: [
      {
        date: "2025-01-21",
        action: "Created",
        details: "You created this task.",
      },
    ],
  },
  {
    id: generateRandomID(),
    title: "Yoga Session",
    description: "Attend a yoga session in the morning.",
    category: "Work",
    dueDate: "2025-02-19",
    status: "TO-DO",
    priority: "Medium",
    tags: ["Yoga", "Health"],
    attachments: [],
    createdDate: "2025-01-22",
    updatedDate: "2025-01-22",
    history: [
      {
        date: "2025-01-22",
        action: "Created",
        details: "You created this task.",
      },
    ],
  },
  {
    id: generateRandomID(),
    title: "Code Review",
    description: "Review the code for the new feature implementation.",
    category: "Work",
    dueDate: "2025-02-20",
    status: "TO-DO",
    priority: "High",
    tags: ["Code Review", "Development"],
    attachments: [],
    createdDate: "2025-01-23",
    updatedDate: "2025-01-23",
    history: [
      {
        date: "2025-01-23",
        action: "Created",
        details: "You created this task.",
      },
    ],
  },
  {
    id: generateRandomID(),
    title: "Learn TypeScript",
    description: "Complete an online course on TypeScript.",
    category: "Work",
    dueDate: "2025-02-15",
    status: "TO-DO",
    priority: "Medium",
    tags: ["Learning", "TypeScript"],
    attachments: [],
    createdDate: "2025-01-18",
    updatedDate: "2025-01-18",
    history: [
      {
        date: "2025-01-18",
        action: "Created",
        details: "You created this task.",
      },
    ],
  },
  {
    id: generateRandomID(),
    title: "Prepare Sprint Report",
    description: "Compile data and prepare the sprint progress report.",
    category: "Work",
    dueDate: "2025-02-10",
    status: "IN-PROGRESS",
    priority: "High",
    tags: ["Agile", "Reports"],
    attachments: [],
    createdDate: "2025-01-20",
    updatedDate: "2025-02-01",
    history: [
      {
        date: "2025-01-20",
        action: "Created",
        details: "You created this task.",
      },
      {
        date: "2025-02-01",
        action: "Updated",
        details: "Changed status to IN-PROGRESS.",
      },
    ],
  },
  {
    id: generateRandomID(),
    title: "Grocery Shopping",
    description:
      "Buy weekly groceries including vegetables and dairy products.",
    category: "Personal",
    dueDate: "2025-02-08",
    status: "TO-DO",
    priority: "Low",
    tags: ["Errands", "Shopping"],
    attachments: [],
    createdDate: "2025-02-05",
    updatedDate: "2025-02-05",
    history: [
      {
        date: "2025-02-05",
        action: "Created",
        details: "You created this task.",
      },
    ],
  },
  {
    id: generateRandomID(),
    title: "Workout Session",
    description: "Attend a 1-hour gym session focusing on cardio.",
    category: "Personal",
    dueDate: "2025-02-07",
    status: "COMPLETED",
    priority: "Medium",
    tags: ["Fitness", "Health"],
    attachments: [],
    createdDate: "2025-02-02",
    updatedDate: "2025-02-07",
    history: [
      {
        date: "2025-02-02",
        action: "Created",
        details: "You created this task.",
      },
      {
        date: "2025-02-07",
        action: "Completed",
        details: "Marked task as completed.",
      },
    ],
  },
  {
    id: generateRandomID(),
    title: "Read 'Atomic Habits'",
    description: "Read 50 pages of the book 'Atomic Habits' by James Clear.",
    category: "Personal",
    dueDate: "2025-02-12",
    status: "IN-PROGRESS",
    priority: "Medium",
    tags: ["Reading", "Self-Improvement"],
    attachments: [],
    createdDate: "2025-01-25",
    updatedDate: "2025-02-03",
    history: [
      {
        date: "2025-01-25",
        action: "Created",
        details: "You created this task.",
      },
      {
        date: "2025-02-03",
        action: "Updated",
        details: "Started reading, status set to IN-PROGRESS.",
      },
    ],
  },
  {
    id: generateRandomID(),
    title: "Plan Weekend Trip",
    description: "Research and finalize plans for the upcoming weekend trip.",
    category: "Personal",
    dueDate: "2025-02-09",
    status: "TO-DO",
    priority: "High",
    tags: ["Travel", "Planning"],
    attachments: [],
    createdDate: "2025-02-04",
    updatedDate: "2025-02-04",
    history: [
      {
        date: "2025-02-04",
        action: "Created",
        details: "You created this task.",
      },
    ],
  },
  {
    id: generateRandomID(),
    title: "Review Pull Requests",
    description:
      "Check and provide feedback on open pull requests in the repo.",
    category: "Work",
    dueDate: "2025-02-06",
    status: "IN-PROGRESS",
    priority: "High",
    tags: ["Code Review", "GitHub"],
    attachments: [],
    createdDate: "2025-02-03",
    updatedDate: "2025-02-05",
    history: [
      {
        date: "2025-02-03",
        action: "Created",
        details: "You created this task.",
      },
      {
        date: "2025-02-05",
        action: "Updated",
        details: "Started reviewing pull requests.",
      },
    ],
  },
  {
    id: generateRandomID(),
    title: "Meditation Session",
    description: "Practice mindfulness meditation for 20 minutes.",
    category: "Work",
    dueDate: "2025-02-08",
    status: "TO-DO",
    priority: "Low",
    tags: ["Wellness", "Mental Health"],
    attachments: [],
    createdDate: "2025-02-06",
    updatedDate: "2025-02-06",
    history: [
      {
        date: "2025-02-06",
        action: "Created",
        details: "You created this task.",
      },
    ],
  },
  {
    id: generateRandomID(),
    title: "Fix UI Bugs",
    description: "Resolve UI issues reported by QA in the latest build.",
    category: "Work",
    dueDate: "2025-02-14",
    status: "TO-DO",
    priority: "High",
    tags: ["Bug Fix", "UI"],
    attachments: [],
    createdDate: "2025-02-05",
    updatedDate: "2025-02-05",
    history: [
      {
        date: "2025-02-05",
        action: "Created",
        details: "You created this task.",
      },
    ],
  },
  {
    id: generateRandomID(),
    title: "Cook Healthy Dinner",
    description: "Prepare a home-cooked healthy meal with fresh ingredients.",
    category: "Personal",
    dueDate: "2025-02-08",
    status: "TO-DO",
    priority: "Medium",
    tags: ["Cooking", "Healthy Living"],
    attachments: [],
    createdDate: "2025-02-06",
    updatedDate: "2025-02-06",
    history: [
      {
        date: "2025-02-06",
        action: "Created",
        details: "You created this task.",
      },
    ],
  },
];

dummyTasks.map((task, index) => {
  task.id += index;
  task.createdDate = formatDisplayDate(new Date(task.createdDate));
  task.updatedDate = formatDisplayDate(new Date(task.updatedDate));

  return task;
});

export const statuses = Array.from(
  new Set(dummyTasks.map((task) => task.status))
);
export const categories = Array.from(
  new Set(dummyTasks.map((task) => task.category))
);
export const tags = Array.from(
  new Set(dummyTasks.map((task) => task.tags.flat()))
);
export const dueDates = Array.from(
  new Set(dummyTasks.map((task) => formatDisplayDate(new Date(task.dueDate))))
);

export default dummyTasks;
