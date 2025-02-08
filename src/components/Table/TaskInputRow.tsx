import React from "react";
import { AiOutlineEnter } from "react-icons/ai";
import { CiCalendarDate } from "react-icons/ci";
import { TableCell } from "./TableCell";
import { Task } from "../../api/tasks.data";
import { CalendarPopup } from "../Calendar";
import { CustomSelect } from "../CustomSelect";
import { FaPlus } from "react-icons/fa";

interface TaskInputRowProps {
  taskInput: Task;
  onAddTask: () => void;
  onCancel: () => void;
  statuses: string[];
  categories: string[];
  getMarginBottom: () => string;
  setTaskInput: (task: Task) => void;
}

const TaskInputRow: React.FC<TaskInputRowProps> = ({
  taskInput,
  onAddTask,
  onCancel,
  statuses,
  categories,
  getMarginBottom,
  setTaskInput,
}) => {
  return (
    <div className="table-row d-none">
      <TableCell
        style={{ gridColumn: "span 3", marginBottom: getMarginBottom() }}
      >
        <input
          type="text"
          placeholder="Task Title"
          onChange={(e) =>
            setTaskInput({ ...taskInput, title: e.target.value })
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
            onClick={onAddTask}
          >
            <span>{"Add"}</span>
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
        <div className="flex-row align-center">
          <CalendarPopup
            selectedDate={null}
            onSelect={(date) =>
              setTaskInput({ ...taskInput, dueDate: date.toISOString() })
            }
            className="add-date-button flex-row align-center justify-center"
          >
            <CiCalendarDate className="calendar-icon" />
            <span>Add Date</span>
          </CalendarPopup>
        </div>
      </TableCell>
      <TableCell
        style={{ gridColumn: "span 2", marginBottom: getMarginBottom() }}
      >
        <CustomSelect
          options={statuses}
          selected={""}
          onSelect={(value) => setTaskInput({ ...taskInput, status: value })}
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
          selected={""}
          onSelect={(value) => setTaskInput({ ...taskInput, category: value })}
          className="flex-row align-center justify-center fa-plus-container"
        >
          <FaPlus style={{ width: "16px", height: "16px" }} />
        </CustomSelect>
      </TableCell>
      <TableCell style={{ marginBottom: getMarginBottom() }} />
    </div>
  );
};

export default TaskInputRow;
