import React, { useMemo, useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import {
  FaChevronDown,
  FaChevronUp,
  FaPlus,
  FaSort,
  FaSortDown,
  FaSortUp,
} from "react-icons/fa";
import { RxDragHandleDots2 } from "react-icons/rx";
// import { AiOutlineEnter } from "react-icons/ai";
// import { CiCalendarDate } from "react-icons/ci";
import { FaCircleCheck } from "react-icons/fa6";
import {
  setSortDirection,
  sortTasks,
  addTask,
  updateTaskStatus,
} from "../redux/features/taskSlice";
import { Task } from "../api/types";
import { RootState } from "../redux/store";
import { CustomSelect, formatDisplayDate } from ".";
import "./TaskList.css";
import { TableCell, TableRow, TaskInputRow, Table } from "./common/Table";

interface TaskListProps {
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
};

export const TaskList = ({ categories, statuses }: TaskListProps) => {
  const dispatch = useDispatch();

  const [sectionVisibility, setSectionVisibility] = useState<{
    todo: boolean;
    inProgress: boolean;
    completed: boolean;
  }>({
    todo: true,
    inProgress: true,
    completed: true,
  });
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false);
  const [taskInput, setTaskInput] = useState<Task>(INITIAL_TASK);
  const [isTaskAddable, setIsTaskAddable] = useState<boolean>(false);
  const [error, setError] = useState<{
    title: string;
    dueDate: string;
    category: string;
    status: string;
  }>({ title: "", dueDate: "", category: "", status: "" });

  const { filteredTasks, sortDirection } = useSelector(
    (state: RootState) => state.tasks
  );

  const categorizedTasks: {
    todo: Task[];
    inProgress: Task[];
    completed: Task[];
  } = useMemo(() => {
    return {
      todo: filteredTasks.filter((task: Task) => task.status === "PENDING"),
      inProgress: filteredTasks.filter(
        (task: Task) => task.status === "IN-PROGRESS"
      ),
      completed: filteredTasks.filter(
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
      setError({ title: "", dueDate: "", category: "", status: "" });
      setIsTaskAddable(true);
    } else if (!taskInput.title) {
      setError({
        ...error,
        title: "Task name is required.",
      });
    } else if (!taskInput.dueDate) {
      setError({
        ...error,
        dueDate: "Due date is required.",
      });
    } else if (!taskInput.status) {
      setError({
        ...error,
        status: "Status is required.",
      });
    } else if (!taskInput.category) {
      setError({
        ...error,
        category: "Category is required.",
      });
    } else {
      dispatch(addTask(taskInput));
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
        setIsAddingTask(true);
        dispatch(updateTaskStatus({ id: task.id, status: "EDITING" }));
      } else if (
        action.toLowerCase() === "delete" &&
        window.confirm("Are you sure you want to delete this task?")
      ) {
        dispatch(updateTaskStatus({ id: task.id, status: "DELETED" }));
      }
    },
    [dispatch]
  );

  const toggleSectionVisibility = useCallback(
    (status: keyof typeof sectionVisibility) => {
      setSectionVisibility((prev) => ({
        ...prev,
        [status]: !prev[status],
      }));
    },
    []
  );

  const getMarginBottom = () =>
    !categorizedTasks.todo.length || !sectionVisibility.todo ? "3rem" : "";

  return (
    <Table>
      <div className="table-header">
        <TableCell className="py-2 pl-1" style={{ gridColumn: "span 3" }}>
          Task Name
        </TableCell>
        <TableCell
          className="py-2"
          onClick={toggleSortDirection}
          style={{ cursor: "pointer", gridColumn: "span 2" }}
        >
          <span>Due Date</span>&nbsp;
          {sortDirection === "asc" ? (
            <FaSortUp />
          ) : sortDirection === "desc" ? (
            <FaSortDown />
          ) : (
            <FaSort />
          )}
        </TableCell>
        <TableCell className="py-2" style={{ gridColumn: "span 2" }}>
          Status
        </TableCell>
        <TableCell className="py-2" style={{ gridColumn: "span 2" }}>
          Category
        </TableCell>
        <TableCell className="py-2"></TableCell>
      </div>
      <div className="table-body">
        {Object.entries(categorizedTasks).map(([status, tasks]) => (
          <React.Fragment key={status}>
            <TableRow>
              <TableCell
                className="table-cell"
                style={{
                  backgroundColor:
                    status === "todo"
                      ? "#FAC3FF"
                      : status === "inProgress"
                      ? "#85D9F1"
                      : "#CEFFCC",
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                  borderTop: "1px solid #0000001a",
                  padding: "0.5rem",
                  marginBottom:
                    status !== "todo" &&
                    !sectionVisibility[status as keyof typeof sectionVisibility]
                      ? "3rem"
                      : "0",
                }}
              >
                <h4
                  onClick={() =>
                    toggleSectionVisibility(
                      status as "todo" | "inProgress" | "completed"
                    )
                  }
                  className="flex-row align-center justify-between px-2 py-2 text-capitalize task-status-header"
                >
                  <p>
                    <span>{status.replace(/([A-Z])/g, " $1").trim()}</span> (
                    <span>{tasks.length}</span>)
                  </p>
                  {sectionVisibility[
                    status as "todo" | "inProgress" | "completed"
                  ] ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </h4>
              </TableCell>
            </TableRow>
            {status === "todo" && (
              <>
                <div className="table-row">
                  <div
                    className="table-cell"
                    style={{
                      gridColumn: "span 10",
                      marginBottom:
                        !isAddingTask &&
                        (!categorizedTasks.todo.length ||
                          !sectionVisibility.todo)
                          ? "3rem"
                          : "",
                    }}
                  >
                    <button
                      onClick={() => setIsAddingTask(true)}
                      className="add-task-button flex-row align-center"
                    >
                      <FaPlus
                        style={{
                          color: "#7B1984",
                          width: "18px",
                          height: "18px",
                        }}
                      />
                      <p className="text-uppercase">Add Task</p>
                    </button>
                  </div>
                </div>
                {isAddingTask && (
                  <TaskInputRow
                    taskInput={taskInput}
                    statuses={statuses}
                    categories={categories}
                    onTitleChange={(title: string) => {
                      setError({ ...error, title: "" });
                      setTaskInput({ ...taskInput, title });
                    }}
                    onDueDateSelect={(date) =>
                      setTaskInput({
                        ...taskInput,
                        dueDate: date.toISOString(),
                      })
                    }
                    onStatusSelect={(value) =>
                      setTaskInput({ ...taskInput, status: value })
                    }
                    onCategorySelect={(value) =>
                      setTaskInput({ ...taskInput, category: value })
                    }
                    onAddTask={addTaskHandler}
                    onCancel={cancelHandler}
                    getMarginBottom={getMarginBottom}
                    error={error}
                  />
                )}
              </>
            )}
            {sectionVisibility[status as "todo" | "inProgress" | "completed"] &&
              tasks.map((task, index) => (
                <TableRow
                  key={task.id}
                  className={
                    index === tasks.length - 1 &&
                    (status !== "todo" || tasks.length)
                      ? "last-task"
                      : ""
                  }
                >
                  <TableCell
                    className="flex-row align-center"
                    style={{ gridColumn: "span 3" }}
                  >
                    <input type="checkbox" className="checkbox" />
                    <RxDragHandleDots2 className="drag-icon" />
                    <FaCircleCheck
                      className="check-icon"
                      color={status === "completed" ? "#1B8D17" : ""}
                    />
                    <p className="task-title">{task.title}</p>
                  </TableCell>

                  <TableCell style={{ gridColumn: "span 2" }}>
                    <p className="task-due-date">
                      {formatDisplayDate(new Date(task.dueDate))}
                    </p>
                  </TableCell>

                  <TableCell style={{ gridColumn: "span 2" }}>
                    <CustomSelect
                      options={statuses}
                      selected={task.status}
                      onSelect={(value) =>
                        dispatch(
                          updateTaskStatus({ id: task.id, status: value })
                        )
                      }
                      hideText={true}
                      className="task-status"
                    >
                      {task.status}
                    </CustomSelect>
                  </TableCell>
                  <TableCell style={{ gridColumn: "span 2" }}>
                    <p>{task.category}</p>
                  </TableCell>
                  <TableCell>
                    <CustomSelect
                      options={["Edit", "Delete"]}
                      selected=""
                      onSelect={(value: string) => editOrDelete(value, task)}
                      className="bs-dots-container"
                      hideText={true}
                    >
                      <BsThreeDots style={{ cursor: "pointer" }} />
                    </CustomSelect>
                  </TableCell>
                </TableRow>
              ))}
          </React.Fragment>
        ))}
      </div>
    </Table>
  );
};
