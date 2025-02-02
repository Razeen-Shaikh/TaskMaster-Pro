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
}