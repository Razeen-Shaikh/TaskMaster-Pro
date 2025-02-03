import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dummyTasks from "../../api/task";
import { Task } from "../../api/types/task.interface";

interface TaskState {
    tasks: Task[];
    filteredTasks: Task[];
    sortedTasks: Task[];
    isLoading: boolean;
    error: string | null;
    sortDirection: 'asc' | 'desc' | '';
}

const initialState: TaskState = {
    tasks: dummyTasks,
    filteredTasks: dummyTasks,
    sortedTasks: dummyTasks,
    isLoading: false,
    error: "",
    sortDirection: '',
};

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        editTask: (state, action) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) state.tasks[index] = action.payload;
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        setTasks: (state, action) => {
            state.tasks = action.payload;
        },
        filterByCategory: (state, action) => {
            const category = action.payload;
            state.filteredTasks = state.tasks.filter(task => task.category === category);
        },
        filterByDueDate: (state, action) => {
            const dueDate = action.payload;
            state.filteredTasks = state.tasks.filter(task => task.dueDate === dueDate);
        },
        sortTasks: (state) => {
            const sorted = [...state.sortedTasks];
            if (state.sortDirection === 'asc') {
                sorted.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
            } else if (state.sortDirection === 'desc') {
                sorted.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
            }
            state.sortedTasks = sorted;
        },
        setSortDirection: (state, action: PayloadAction<'' | 'asc' | 'desc'>) => {
            state.sortDirection = action.payload;
        },
    },
});

export const { addTask, editTask, deleteTask, setTasks, filterByCategory, filterByDueDate, sortTasks, setSortDirection } = taskSlice.actions;
export default taskSlice.reducer;
