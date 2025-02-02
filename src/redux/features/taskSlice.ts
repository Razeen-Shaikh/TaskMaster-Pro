import { createSlice } from "@reduxjs/toolkit";
import dummyTasks from "../../api/task";
import { Task } from "../../api/types/task.interface";

interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string;
}

const initialState: TaskState = {
    tasks: dummyTasks,
    loading: false,
    error: "",
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
    },
});

export const { addTask, editTask, deleteTask, setTasks } = taskSlice.actions;
export default taskSlice.reducer;
