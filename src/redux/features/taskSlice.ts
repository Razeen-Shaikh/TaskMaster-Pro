import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../api/tasks.data";
import { formatDisplayDate } from "../../utils/helper";

interface TaskState {
  tasks: Task[];
  filteredTasks: Task[];
  filter: {
    category?: string;
    dueDate?: string;
    searchQuery?: string;
  };
  sortDirection: "asc" | "desc";
}

const initialState: TaskState = {
  tasks: [],
  filteredTasks: [],
  filter: {},
  sortDirection: "desc",
};

const applyFilters = (tasks: Task[], filter: TaskState["filter"]) => {
  return tasks.filter((task) => {
    return (
      (filter.category ? task.category === filter.category : true) &&
      (filter.dueDate
        ? formatDisplayDate(new Date(task.dueDate)) === filter.dueDate
        : true) &&
      (filter.searchQuery
        ? task.title.toLowerCase().includes(filter.searchQuery.toLowerCase())
        : true)
    );
  });
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      state.filteredTasks = action.payload;
    },

    setFilter: (state, action: PayloadAction<Partial<TaskState["filter"]>>) => {
      state.filter = { ...state.filter, ...action.payload };
      state.filteredTasks = applyFilters(state.tasks, state.filter);
    },

    sortTasks: (state) => {
      const sortedTasks = [...state.filteredTasks];
      const sortOrder = state.sortDirection === "asc" ? 1 : -1;

      sortedTasks.sort(
        (a, b) =>
          sortOrder *
          (new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      );

      state.filteredTasks = sortedTasks;
    },

    setSortDirection: (state, action: PayloadAction<"asc" | "desc">) => {
      state.sortDirection = action.payload;
    },

    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      state.filteredTasks = applyFilters(state.tasks, state.filter);
    },

    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
        state.filteredTasks = applyFilters(state.tasks, state.filter);
      }
    },

    updateTaskStatus: (
      state,
      action: PayloadAction<{ ids: string[]; status: string }>
    ) => {
      const { ids, status } = action.payload;
      state.tasks.forEach((task) => {
        if (ids.includes(task.id)) {
          task.status = status;
          task.updatedDate = new Date().toISOString();
          task.history.push({
            date: new Date().toISOString(),
            action: "UPDATED",
            details: `You changed status to ${status}`,
          });
        }
      });
      state.filteredTasks = applyFilters(state.tasks, state.filter);
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      state.filteredTasks = applyFilters(state.tasks, state.filter);
    },

    bulkDeleteTasks: (state, action: PayloadAction<string[]>) => {
      state.tasks = state.tasks.filter(
        (task) => !action.payload.includes(task.id)
      );
      state.filteredTasks = applyFilters(state.tasks, state.filter);
    },
  },
});

export const {
  setTasks,
  setFilter,
  sortTasks,
  setSortDirection,
  addTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
  bulkDeleteTasks,
} = taskSlice.actions;
export default taskSlice.reducer;
