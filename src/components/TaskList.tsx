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
import { FaCircleCheck } from "react-icons/fa6";
import dummyTasks, { Task } from "../api/tasks.data";
import {
  setSortDirection,
  sortTasks,
  addTask,
  updateTaskStatus,
  deleteTask,
  setTasks,
} from "../redux/features/taskSlice";
import { RootState } from "../redux/store";
import { formatDisplayDate } from "../utils/helper";
import { CustomSelect } from "./CustomSelect";
import { Table, TableCell, TableRow } from "./Table";
import TaskInputRow from "./Table/TaskInputRow";
import { ViewOrEdit } from "./ViewOrEdit";
import "../assets/styles/TaskList.css";

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
  createdDate: "",
  updatedDate: "",
  history: [],
};

export const TaskList = ({ categories, statuses }: TaskListProps) => {
  const dispatch = useDispatch();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

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
      todo: filteredTasks.filter((task: Task) => task.status === "TO-DO"),
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
      setTaskInput({
        ...taskInput,
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
        history: [
          {
            date: new Date().toISOString(),
            action: "CREATED",
            details: "You created this task",
          },
        ],
      });
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

  useEffect(() => {
    dispatch(setTasks(dummyTasks));
  }, [dispatch]);

  return (
    <>
      <Table>
        <div className="table-header d-none">
          <TableCell className="py-2 pl-1 span-3">Task Name</TableCell>
          <TableCell
            className="flex-row align-center py-2 span-2 cursor-pointer"
            onClick={toggleSortDirection}
          >
            <p>Due Date</p>
            {sortDirection === "asc" ? (
              <FaSortUp />
            ) : sortDirection === "desc" ? (
              <FaSortDown />
            ) : (
              <FaSort />
            )}
          </TableCell>
          <TableCell className="py-2 span-2">Status</TableCell>
          <TableCell className="py-2 span-2">Category</TableCell>
          <TableCell className="py-2"></TableCell>
        </div>
        <div className="table-body">
          {Object.entries(categorizedTasks).map(([status, tasks]) => (
            <React.Fragment key={status}>
              <TableRow>
                <TableCell
                  className="cursor-pointer p-2"
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
                    marginBottom:
                      status !== "todo" &&
                      status !== "completed" &&
                      (!sectionVisibility[
                        status as keyof typeof sectionVisibility
                      ] ||
                        !categorizedTasks[
                          status as keyof typeof categorizedTasks
                        ].length)
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
                      <FaChevronUp
                        style={{
                          color:
                            status === "todo"
                              ? "#3E0344"
                              : status === "inProgress"
                              ? "#055167"
                              : "#0D7A0A",
                        }}
                      />
                    ) : (
                      <FaChevronDown
                        style={{
                          color:
                            status === "todo"
                              ? "#3E0344"
                              : status === "inProgress"
                              ? "#055167"
                              : "#0D7A0A",
                        }}
                      />
                    )}
                  </h4>
                </TableCell>
              </TableRow>
              {status === "todo" && (
                <>
                  <TableRow className="d-none">
                    <TableCell
                      className="span-10"
                      style={{
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
                    </TableCell>
                  </TableRow>
                  {isAddingTask && (
                    <TaskInputRow
                      taskInput={taskInput}
                      statuses={statuses}
                      categories={categories}
                      onAddTask={addTaskHandler}
                      onCancel={cancelHandler}
                      getMarginBottom={getMarginBottom}
                      setTaskInput={setTaskInput}
                    />
                  )}
                </>
              )}
              {sectionVisibility[
                status as "todo" | "inProgress" | "completed"
              ] &&
                tasks.map((task, index) => (
                  <TableRow key={task.id}>
                    <TableCell
                      className="flex-row align-center span-3"
                      style={{
                        marginBottom:
                          index === tasks.length - 1 && status !== "completed"
                            ? "3rem"
                            : "",
                        borderBottomLeftRadius:
                          index === tasks.length - 1 ? "12px" : "",
                      }}
                    >
                      <input type="checkbox" className="checkbox" />
                      <RxDragHandleDots2 className="drag-icon" />
                      <FaCircleCheck
                        className="check-icon"
                        color={status === "completed" ? "#1B8D17" : ""}
                      />
                      <p
                        className="task-title"
                        style={{
                          textDecoration:
                            status === "completed" ? "line-through" : "",
                          cursor: "pointer",
                        }}
                      >
                        {task.title}
                      </p>
                    </TableCell>
                    <TableCell
                      className="span-2 d-none"
                      style={{
                        marginBottom:
                          index === tasks.length - 1 && status !== "completed"
                            ? "3rem"
                            : "",
                      }}
                    >
                      <p className="task-due-date">
                        {formatDisplayDate(new Date(task.dueDate))}
                      </p>
                    </TableCell>
                    <TableCell
                      className="span-2 d-none"
                      style={{
                        marginBottom:
                          index === tasks.length - 1 && status !== "completed"
                            ? "3rem"
                            : "",
                      }}
                    >
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
                    <TableCell
                      className="span-2 d-none"
                      style={{
                        marginBottom:
                          index === tasks.length - 1 && status !== "completed"
                            ? "3rem"
                            : "",
                      }}
                    >
                      <p>{task.category}</p>
                    </TableCell>
                    <TableCell
                      style={{
                        marginBottom:
                          index === tasks.length - 1 && status !== "completed"
                            ? "3rem"
                            : "",
                        borderBottomRightRadius:
                          index === tasks.length - 1 ? "12px" : "",
                        paddingRight: "1.5rem",
                      }}
                      className="d-none"
                    >
                      <CustomSelect
                        options={["Edit", "Delete"]}
                        selected=""
                        onSelect={(value: string) => editOrDelete(value, task)}
                        className="bs-dots-container"
                        hideText={true}
                        editOrDelete={true}
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
      {selectedTask && (
        <ViewOrEdit task={taskInput} onClose={() => setSelectedTask(null)} />
      )}
    </>
  );
};
