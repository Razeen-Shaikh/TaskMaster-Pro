import React, { useState, useMemo, useCallback, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import {
  FaSortUp,
  FaSortDown,
  FaSort,
  FaChevronUp,
  FaChevronDown,
  FaPlus,
} from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { categories, statuses, Task } from "../api/tasks.data";
import {
  setSortDirection,
  sortTasks,
  addTask,
  updateTaskStatus,
  deleteTask,
  bulkDeleteTasks,
} from "../redux/features/taskSlice";
import { RootState } from "../redux/store";
import { formatDisplayDate } from "../utils/helper";
import { CustomSelect } from "./CustomSelect";
import { Table, TableCell, TableRow } from "./Table";
import TaskInputRow from "./Table/TaskInputRow";
import { ViewOrEdit } from "./ViewOrEdit";
import Modal from "./Modal";
import { MdLibraryAddCheck } from "react-icons/md";

import "./styles/TaskList.css";

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

export const TaskList = () => {
  const dispatch = useDispatch();
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());
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
  const [createTaskInput, setCreateTaskInput] = useState<Task>(INITIAL_TASK);
  const [open, setOpen] = useState<boolean>(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState<boolean>(false);

  const { filteredTasks, sortDirection } = useSelector(
    (state: RootState) => state.tasks
  );

  const categorizedTasks = useMemo(() => {
    const tasks = filteredTasks || [];

    return tasks.reduce(
      (acc, task) => {
        const statusMapping: Record<string, keyof typeof acc> = {
          "TO-DO": "todo",
          "IN-PROGRESS": "inProgress",
          COMPLETED: "completed",
        };

        const statusKey = statusMapping[task.status];

        if (statusKey) {
          acc[statusKey].push(task);
        }

        return acc;
      },
      { todo: [], inProgress: [], completed: [] } as Record<string, Task[]>
    );
  }, [filteredTasks]);

  const toggleSortDirection = useCallback(() => {
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    dispatch(setSortDirection(newSortDirection));
    dispatch(sortTasks());
  }, [dispatch, sortDirection]);

  const addTaskHandler = useCallback(() => {
    if (
      !createTaskInput.title ||
      !createTaskInput.dueDate ||
      !createTaskInput.status ||
      !createTaskInput.category
    )
      return;

    const newTask = {
      ...createTaskInput,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      history: [
        {
          date: new Date().toISOString(),
          action: "CREATED",
          details: "You created this task",
        },
      ],
    };

    dispatch(addTask(newTask));
    dispatch(sortTasks());
    setIsAddingTask(false);
    setCreateTaskInput(INITIAL_TASK);
  }, [dispatch, createTaskInput]);

  const cancelHandler = useCallback(() => {
    setIsAddingTask(false);
    if (createTaskInput.id) {
      dispatch(
        updateTaskStatus({
          ids: [createTaskInput.id],
          status: createTaskInput.status,
        })
      );
    }
    setCreateTaskInput(INITIAL_TASK);
  }, [dispatch, createTaskInput]);

  const editOrDelete = useCallback(
    (action: string, task: Task) => {
      if (action.toLowerCase() === "edit") {
        setTaskInput({ ...task });
        setOpen(true);
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

  const toggleTaskSelection = (id: string) => {
    setSelectedTasks((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      return newSelection;
    });
    setIsBulkModalOpen(true);
  };

  const bulkDelete = () => {
    dispatch(bulkDeleteTasks([...selectedTasks]));
    setSelectedTasks(new Set());
  };

  const bulkUpdateStatus = (status: string) => {
    dispatch(updateTaskStatus({ ids: [...selectedTasks], status }));
    setSelectedTasks(new Set());
  };

  useEffect(() => {
    if (selectedTasks.size === 0) {
      setIsBulkModalOpen(false);
    }
  }, [selectedTasks.size]);

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
                      taskInput={createTaskInput}
                      statuses={statuses}
                      categories={categories}
                      onAddTask={addTaskHandler}
                      onCancel={cancelHandler}
                      getMarginBottom={getMarginBottom}
                      setTaskInput={setCreateTaskInput}
                    />
                  )}
                </>
              )}
              {sectionVisibility[
                status as "todo" | "inProgress" | "completed"
              ] &&
                tasks.map((task, index) => (
                  <TableRow key={task.id + index}>
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
                      <input
                        type="checkbox"
                        className="checkbox"
                        onChange={() => toggleTaskSelection(task.id)}
                        checked={selectedTasks.has(task.id)}
                      />
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
                            updateTaskStatus({ ids: [task.id], status: value })
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
      {open && <ViewOrEdit task={taskInput} onClose={() => setOpen(false)} />}
      <Modal open={isBulkModalOpen}>
        <div className="flex-row align-center">
          <div className="flex-row align-center selcted-tasks-container">
            <div className="selected-tasks flex-row align-center justify-between">
              <p>
                {selectedTasks.size}{" "}
                {selectedTasks.size === 1 ? "Task" : "Tasks"} Selected
              </p>
              <button
                className="close-btn"
                onClick={() => {
                  setIsBulkModalOpen(false);
                  setSelectedTasks(new Set());
                }}
              >
                &times;
              </button>
            </div>
            <MdLibraryAddCheck className="icon" />
          </div>

          <div className="flex-row align-center">
            <CustomSelect
              options={statuses}
              selected={taskInput.status}
              onSelect={(value) => bulkUpdateStatus(value)}
              hideText={true}
              className="task-status"
              direction="top"
            >
              Status
            </CustomSelect>
            <button onClick={bulkDelete} className="delete-btn">
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
