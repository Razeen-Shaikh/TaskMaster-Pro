import { useMemo, useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import {
  deleteTask,
  setSortDirection,
  setTasks,
  sortTasks,
  addTask,
  updateTaskStatus,
} from "../../redux/features/taskSlice";
import dummyTasks, { Task } from "../../api/tasks.data";
import { RootState } from "../../redux/store";
import { CustomSelect, ViewOrEdit } from "..";
import TaskInputRow from "../Table/TaskInputRow";
import { formatDisplayDate } from "../../utils/helper";
import "./TaskBoard.css";
import { FaCircleCheck } from "react-icons/fa6";

interface TaskBoardProps {
  categories: string[];
  statuses: string[];
}

const INITIAL_TASK: Task = {
  id: "",
  title: "",
  description: "",
  category: "",
  dueDate: "",
  status: "",
  priority: "",
  tags: [],
  attachments: [],
  createdDate: "",
  updatedDate: "",
  history: [],
};

export const TaskBoard = ({ categories, statuses }: TaskBoardProps) => {
  const dispatch = useDispatch();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false);
  const [taskInput, setTaskInput] = useState<Task>(INITIAL_TASK);

  const { filteredTasks, sortDirection } = useSelector(
    (state: RootState) => state.tasks
  );

  const categorizedTasks: {
    "TO-DO": Task[];
    "IN-PROGRESS": Task[];
    COMPLETED: Task[];
  } = useMemo(() => {
    return {
      "TO-DO": filteredTasks.filter((task: Task) => task.status === "TO-DO"),
      "IN-PROGRESS": filteredTasks.filter(
        (task: Task) => task.status === "IN-PROGRESS"
      ),
      COMPLETED: filteredTasks.filter(
        (task: Task) => task.status === "COMPLETED"
      ),
    };
  }, [filteredTasks]);

  const toggleSortDirection = useCallback(() => {
    const newSortDirection =
      sortDirection === "asc" ? "desc" : sortDirection === "desc" ? "" : "asc";
    dispatch(setSortDirection(newSortDirection));
    dispatch(sortTasks());
  }, [dispatch, sortDirection]);

  const addTaskHandler = useCallback(() => {
    if (
      taskInput.title &&
      taskInput.dueDate &&
      taskInput.status &&
      taskInput.category
    ) {
      const now = new Date().toISOString();
      const newTask = {
        ...taskInput,
        createdDate: now,
        updatedDate: now,
        history: [
          {
            date: now,
            action: "CREATED",
            details: "You created this task",
          },
        ],
      };
      dispatch(addTask(newTask));
      setIsAddingTask(false);
      setTaskInput(INITIAL_TASK);
    }
  }, [dispatch, taskInput]);

  const cancelHandler = useCallback(() => {
    setIsAddingTask(false);
    dispatch(updateTaskStatus({ id: taskInput.id, status: taskInput.status }));
    setTaskInput(INITIAL_TASK);
  }, [dispatch, taskInput]);

  const editOrDelete = useCallback(
    (action: string, task: Task) => {
      if (action.toLowerCase() === "edit") {
        setTaskInput({ ...task });
        setSelectedTask({ ...task });
        setIsAddingTask(true);
      } else if (
        action.toLowerCase() === "delete" &&
        window.confirm("Are you sure you want to delete this task?")
      ) {
        dispatch(deleteTask(task.id));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(setTasks(dummyTasks));
  }, [dispatch]);

  return (
    <div className="task-board">
      <div className="board-column todo-column">
        <div className="column-header">
          <h4 className="column-title-todo">TO-DO</h4>
        </div>
        <div className="column-body">
          {categorizedTasks["TO-DO"].map((task) => (
            <div key={task.id} className="task-card">
              <div className="card-header">
                <p
                  className="task-title"
                  onClick={() => setSelectedTask(task)}
                  style={{
                    textDecoration:
                      task.status === "COMPLETED" ? "line-through" : "",
                    cursor: "pointer",
                  }}
                >
                  {task.title}
                </p>
                <CustomSelect
                  options={["Edit", "Delete"]}
                  selected=""
                  onSelect={(value: string) => editOrDelete(value, task)}
                  className="options-select"
                  hideText={true}
                >
                  <BsThreeDots style={{ cursor: "pointer" }} />
                </CustomSelect>
              </div>
              <div className="card-body">
                <p className="category">{task.category}</p>
                <p className="due-date">
                  {formatDisplayDate(new Date(task.dueDate))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="board-column inprogress-column">
        <div className="column-header">
          <h4 className="column-title-inprogress">IN-PROGRESS</h4>
        </div>
        <div className="column-body">
          {categorizedTasks["IN-PROGRESS"].map((task) => (
            <div key={task.id} className="task-card">
              <div className="card-header">
                <p
                  className="task-title"
                  onClick={() => setSelectedTask(task)}
                  style={{
                    textDecoration:
                      task.status === "COMPLETED" ? "line-through" : "",
                    cursor: "pointer",
                  }}
                >
                  {task.title}
                </p>
                <CustomSelect
                  options={["Edit", "Delete"]}
                  selected=""
                  onSelect={(value: string) => editOrDelete(value, task)}
                  className="options-select"
                  hideText={true}
                >
                  <BsThreeDots style={{ cursor: "pointer" }} />
                </CustomSelect>
              </div>
              <div className="card-body">
                <p className="category"> {task.category}</p>
                <p className="due-date">
                  {formatDisplayDate(new Date(task.dueDate))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="board-column completed-column">
        <div className="column-header">
          <h4 className="column-title-completed">COMPLETED</h4>
        </div>
        <div className="column-body">
          {categorizedTasks["COMPLETED"].length ? (
            categorizedTasks["COMPLETED"].map((task) => (
              <div key={task.id} className="task-card">
                <div className="card-header">
                  <p
                    className="task-title"
                    onClick={() => setSelectedTask(task)}
                    style={{
                      textDecoration: "line-through",
                      cursor: "pointer",
                    }}
                  >
                    {task.title}
                  </p>
                  <CustomSelect
                    options={["Edit", "Delete"]}
                    selected=""
                    onSelect={(value: string) => editOrDelete(value, task)}
                    className="options-select"
                    hideText={true}
                  >
                    <BsThreeDots style={{ cursor: "pointer" }} />
                  </CustomSelect>
                </div>
                <div className="card-body">
                  <p className="category"> {task.category}</p>
                  <p className="due-date">
                    {formatDisplayDate(new Date(task.dueDate))}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No Tasks in To-Do</p>
          )}
        </div>
      </div>

      {selectedTask && (
        <ViewOrEdit task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </div>
  );
};
