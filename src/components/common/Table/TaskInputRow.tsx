import React from "react";
import { AiOutlineEnter } from "react-icons/ai";
import { CiCalendarDate } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { TableRow, TableCell } from ".";
import { Task } from "../../../api/types";
import { CalendarPopup } from "../Calendar/Calendar";
import { CustomSelect } from "../CustomSelect/CustomSelect";

interface TaskInputRowProps {
  taskInput: Task;
  statuses: string[];
  categories: string[];
  onTitleChange: (title: string) => void;
  onDueDateSelect: (date: Date) => void;
  onStatusSelect: (status: string) => void;
  onCategorySelect: (category: string) => void;
  onAddTask: () => void;
  onCancel: () => void;
  getMarginBottom: () => string;
  error: {
    title: string;
    dueDate: string;
    category: string;
    status: string;
  };
}

export const TaskInputRow: React.FC<TaskInputRowProps> = ({
  taskInput,
  statuses,
  categories,
  onTitleChange,
  onDueDateSelect,
  onStatusSelect,
  onCategorySelect,
  onAddTask,
  onCancel,
  getMarginBottom,
  error,
}) => {
  return (
    <>
      <TableRow>
        <TableCell
          style={{ gridColumn: "span 3", marginBottom: getMarginBottom() }}
        >
          <input
            type="text"
            placeholder="Task Title"
            value={taskInput.title}
            onChange={(e) => onTitleChange(e.target.value)}
            style={{ marginLeft: "5rem" }}
            className="add-task-input"
          />
          {error.title && (
            <p
              className="error-message"
              style={{ marginLeft: "5rem", color: "red" }}
            >
              {error.title}
            </p>
          )}
          <div
            className="add-task-button-container flex-row align-center"
            style={{ marginLeft: "5rem" }}
          >
            <button
              className="add-button text-uppercase flex-row align-center justify-center"
              onClick={onAddTask}
            >
              <span>{taskInput.status === "EDITING" ? "Save" : "Add"}</span>
              <AiOutlineEnter style={{ width: "16px", height: "16px" }} />
            </button>
            <button className="cancel-button text-uppercase" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </TableCell>
        <TableCell
          style={{ gridColumn: "span 2", marginBottom: getMarginBottom() }}
        >
          <CalendarPopup
            selectedDate={
              taskInput.dueDate ? new Date(taskInput.dueDate) : null
            }
            onSelect={onDueDateSelect}
            className="add-date-button flex-row align-center justify-center"
          >
            <CiCalendarDate className="calendar-icon" />
            <span>Add Date</span>
          </CalendarPopup>
          {error.dueDate && (
            <span style={{ color: "red" }}>{error.dueDate}</span>
          )}
        </TableCell>
        <TableCell
          style={{ gridColumn: "span 2", marginBottom: getMarginBottom() }}
        >
          <CustomSelect
            options={statuses}
            selected={taskInput.status}
            onSelect={onStatusSelect}
            className="flex-row align-center justify-center fa-plus-container"
          >
            <FaPlus style={{ width: "16px", height: "16px" }} />
          </CustomSelect>
        </TableCell>
        <TableCell
          style={{ gridColumn: "span 2", marginBottom: getMarginBottom() }}
        >
          <CustomSelect
            options={categories}
            selected={taskInput.category}
            onSelect={onCategorySelect}
            className="flex-row align-center justify-center fa-plus-container"
          >
            <FaPlus style={{ width: "16px", height: "16px" }} />
          </CustomSelect>
        </TableCell>
        <TableCell style={{ marginBottom: getMarginBottom() }} />
      </TableRow>
    </>
  );
};
