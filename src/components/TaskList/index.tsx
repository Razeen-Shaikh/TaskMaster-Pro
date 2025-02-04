import React, { useMemo, useState, useCallback } from "react";
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
import { AiOutlineEnter } from "react-icons/ai";
import { CiCalendarDate } from "react-icons/ci";
import { FaCircleCheck } from "react-icons/fa6";
import {
  setSortDirection,
  sortTasks,
  addTask,
  updateTaskStatus,
} from "../../redux/features/taskSlice";
import { Task } from "../../api/types";
import { RootState } from "../../redux/store";
import { CustomSelect, CalendarPopup, formatDisplayDate } from "../";
import "./styles.css";

interface TaskListProps {
  categories: string[];
  dueDates: string[];
  tags: string[];
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
    dispatch(addTask(taskInput));
    setIsAddingTask(false);
    setTaskInput(INITIAL_TASK);
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

  const getMarginBottom = (status: keyof typeof categorizedTasks) => {
    return !categorizedTasks[status]?.length || !sectionVisibility[status]
      ? "3rem"
      : "";
  };

  return (
    <div className="task-list">
      <div className="table-header">
        <div
          className="table-cell py-2"
          style={{ gridColumn: "span 3", paddingLeft: "1rem" }}
        >
          Task Name
        </div>
        <div
          className="table-cell py-2"
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
        </div>
        <div className="table-cell py-2" style={{ gridColumn: "span 2" }}>
          Status
        </div>
        <div className="table-cell py-2" style={{ gridColumn: "span 2" }}>
          Category
        </div>
        <div className="table-cell py-2"></div>
      </div>
      <div className="table-body">
        {Object.entries(categorizedTasks).map(([status, tasks]) => (
          <React.Fragment key={status}>
            <div className="table-row">
              <div
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
              </div>
            </div>
            {status === "todo" && (
              <>
                <div className="table-row">
                  <div
                    className="table-cell"
                    style={{
                      gridColumn: "span 10",
                      marginBottom: getMarginBottom("todo"),
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
                  <div className="table-row">
                    <div
                      className="table-cell"
                      style={{
                        gridColumn: "span 3",
                        marginBottom: getMarginBottom("todo"),
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Task Title"
                        value={taskInput.title}
                        onChange={(e) =>
                          setTaskInput({
                            ...taskInput,
                            title: e.target.value,
                          })
                        }
                        style={{ marginLeft: "5rem" }}
                        className="add-task-input"
                      />
                      <div
                        className="add-task-button-container flex-row align-center"
                        style={{ marginLeft: "5rem" }}
                      >
                        <button
                          className="add-button text-uppercase flex-row align-center justify-center"
                          onClick={addTaskHandler}
                        >
                          <span>
                            {taskInput.status === "EDITING" ? "Save" : "Add"}
                          </span>
                          <AiOutlineEnter
                            style={{ width: "16px", height: "16px" }}
                          />
                        </button>
                        <button
                          className="cancel-button text-uppercase"
                          onClick={cancelHandler}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                    <div
                      className="table-cell"
                      style={{
                        gridColumn: "span 2",
                        marginBottom: getMarginBottom("todo"),
                      }}
                    >
                      <CalendarPopup
                        selectedDate={
                          taskInput.dueDate ? new Date(taskInput.dueDate) : null
                        }
                        onSelect={(date: Date) =>
                          setTaskInput({
                            ...taskInput,
                            dueDate: date.toISOString(),
                          })
                        }
                        className="add-date-button flex-row align-center justify-center"
                      >
                        <CiCalendarDate className="calendar-icon" />
                        <span>Add Date</span>
                      </CalendarPopup>
                    </div>
                    <div
                      className="table-cell"
                      style={{
                        gridColumn: "span 2",
                        marginBottom: getMarginBottom("todo"),
                      }}
                    >
                      <CustomSelect
                        options={statuses}
                        selected={taskInput.status}
                        onSelect={(value) =>
                          setTaskInput({ ...taskInput, status: value })
                        }
                        className="flex-row align-center justify-center fa-plus-container"
                      >
                        <FaPlus style={{ width: "16px", height: "16px" }} />
                      </CustomSelect>
                    </div>
                    <div
                      className="table-cell"
                      style={{
                        gridColumn: "span 2",
                        marginBottom: getMarginBottom("todo"),
                      }}
                    >
                      <CustomSelect
                        options={categories}
                        selected={taskInput.category}
                        onSelect={(value) =>
                          setTaskInput({ ...taskInput, category: value })
                        }
                        className="flex-row align-center justify-center fa-plus-container"
                      >
                        <FaPlus style={{ width: "16px", height: "16px" }} />
                      </CustomSelect>
                    </div>
                    <div
                      className="table-cell"
                      style={{ marginBottom: getMarginBottom("todo") }}
                    />
                  </div>
                )}
              </>
            )}
            {sectionVisibility[status as "todo" | "inProgress" | "completed"] &&
              tasks.map((task, index) => (
                <div
                  key={task.id}
                  className={`table-row ${
                    index === tasks.length - 1 &&
                    (status !== "todo" || tasks.length)
                      ? "last-task"
                      : ""
                  }`}
                >
                  <div
                    className="table-cell flex-row align-center"
                    style={{ gridColumn: "span 3" }}
                  >
                    <input type="checkbox" className="checkbox" />
                    <RxDragHandleDots2 className="drag-icon" />
                    <FaCircleCheck
                      className="check-icon"
                      color={status === "completed" ? "#1B8D17" : ""}
                    />
                    <p className="task-title">{task.title}</p>
                  </div>
                  <div className="table-cell" style={{ gridColumn: "span 2" }}>
                    <p className="task-due-date">
                      {formatDisplayDate(new Date(task.dueDate))}
                    </p>
                  </div>
                  <div className="table-cell" style={{ gridColumn: "span 2" }}>
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
                  </div>
                  <div className="table-cell" style={{ gridColumn: "span 2" }}>
                    {task.category}
                  </div>
                  <div className="table-cell">
                    <CustomSelect
                      options={["Edit", "Delete"]}
                      selected=""
                      onSelect={(value: string) => editOrDelete(value, task)}
                      className="bs-dots-container"
                      hideText={true}
                    >
                      <BsThreeDots style={{ cursor: "pointer" }} />
                    </CustomSelect>
                  </div>
                </div>
              ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
