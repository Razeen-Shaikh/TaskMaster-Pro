import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dummyTasks from "../../api/task";
import { Task } from "../../api/types/task.interface";

interface TaskState {
  tasks: Task[];
  filteredTasks: Task[];
  sortedTasks: Task[];
  filter: {
    category: string;
    dueDate: string;
    tag: string;
  };
  isLoading: boolean;
  error: string | null;
  sortDirection: "asc" | "desc" | "";
}

const initialState: TaskState = {
  tasks: dummyTasks,
  filteredTasks: dummyTasks,
  sortedTasks: dummyTasks,
  filter: {
    category: "",
    dueDate: "",
    tag: "",
  },
  isLoading: false,
  error: "",
  sortDirection: "",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      console.log({ action });
      state.filteredTasks.push(action.payload);
    },
    editTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) state.tasks[index] = action.payload;
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setTasks: (state, action) => {
      state.filteredTasks = action.payload;
    },
    setFilter: (state, action: PayloadAction<Partial<TaskState["filter"]>>) => {
      state.filter = { ...state.filter, ...action.payload };
      state.filteredTasks = state.tasks.filter((task) => {
        return (
          (state.filter.category
            ? task.category === state.filter.category
            : true) &&
          (state.filter.dueDate
            ? task.dueDate === state.filter.dueDate
            : true) &&
          (state.filter.tag ? task.tags.includes(state.filter.tag) : true)
        );
      });
    },
    sortTasks: (state) => {
      const sorted = [...state.sortedTasks];
      if (state.sortDirection === "asc") {
        sorted.sort(
          (a, b) =>
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        );
      } else if (state.sortDirection === "desc") {
        sorted.sort(
          (a, b) =>
            new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
        );
      }
      state.sortedTasks = sorted;
    },
    setSortDirection: (state, action: PayloadAction<"" | "asc" | "desc">) => {
      state.sortDirection = action.payload;
    },
    updateTaskStatus: (
      state,
      action: PayloadAction<{ id: string; status: string }>
    ) => {
      const { id, status } = action.payload;
      const index = state.filteredTasks.findIndex((task) => task.id === id);
      if (index !== -1) state.filteredTasks[index].status = status;
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  setTasks,
  setFilter,
  sortTasks,
  setSortDirection,
  updateTaskStatus,
} = taskSlice.actions;
export default taskSlice.reducer;
