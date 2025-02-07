import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TaskBuddy,
  TaskList,
  TaskBoard,
  Logout,
  CustomSelect,
  ViewOrEdit,
} from "../components";
import { RootState } from "../redux/store";
import { TiThMenuOutline } from "react-icons/ti";
import { CiSearch, CiViewBoard } from "react-icons/ci";
import { setFilter } from "../redux/features/taskSlice";
import { IoIosArrowDown } from "react-icons/io";

const Tasks = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { tasks, filter } = useSelector((state: RootState) => state.tasks);

  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState("list");
  const [categories, setCategories] = useState<string[]>([]);
  const [dueDates, setDueDates] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  console.log({ open });

  useEffect(() => {
    setCategories(
      Array.from(new Set(tasks?.map((task) => task.category))) || []
    );
    setDueDates(Array.from(new Set(tasks?.map((task) => task.dueDate))) || []);
    setStatuses(Array.from(new Set(tasks?.map((task) => task.status))) || []);
  }, [tasks]);

  useEffect(() => {
    dispatch(setFilter({ searchQuery }));
  }, [searchQuery, dispatch]);

  return (
    <>
      <div className="tasks-container">
        <div className="tasks-content d-none">
          <TaskBuddy className="task-buddy" />
          <div className="profile">
            <div className="profile-icon">
              <img src={user?.photoURL || ""} alt="User's Picture" />
              <p>{user?.displayName || user?.email || "Guest"}</p>
            </div>
          </div>
        </div>
        <div className="task-board-nav d-none">
          <ul>
            <li
              className={`list-style ${view === "list" ? "active" : ""}`}
              onClick={() => setView("list")}
            >
              <TiThMenuOutline size="16" />
              <p>List</p>
            </li>
            <li
              className={`board-style ${view === "board" ? "active" : ""}`}
              onClick={() => setView("board")}
            >
              <CiViewBoard size="16" />
              <p>Board</p>
            </li>
          </ul>
          <Logout />
        </div>
        <div className="tasks-filters d-none">
          <div className="filters">
            <p>Filter by:</p>
            <CustomSelect
              options={categories}
              selected=""
              onSelect={(value) => dispatch(setFilter({ ["category"]: value }))}
              className="select flex-row align-center justify-center"
            >
              <p>{filter.category || "Category"}</p>
              <IoIosArrowDown
                style={{ width: "12px", height: "12px", opacity: 0.6 }}
              />
            </CustomSelect>
            <CustomSelect
              options={dueDates}
              selected=""
              onSelect={(value) => dispatch(setFilter({ ["dueDate"]: value }))}
              className="select flex-row align-center justify-center"
            >
              <p>{filter.dueDate || "Due Date"}</p>
              <IoIosArrowDown
                style={{ width: "12px", height: "12px", opacity: 0.6 }}
              />
            </CustomSelect>
          </div>
          <div className="search">
            <div className="search-bar">
              <CiSearch style={{ width: "18px", height: "18px" }} />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              className="text-uppercase cursor-pointer"
              onClick={() => {
                console.log({ open });
                setOpen(true);
              }}
            >
              Add Task
            </button>
          </div>
        </div>
        <div className="d-lg-none task-buddy">
          <h1>TaskBuddy</h1>
          <div className="profile-icon">
            <img src={user?.photoURL || ""} alt="User's Picture" />
          </div>
        </div>
        <div className="d-lg-none tasks-filters-add-task">
          <button
            className="text-uppercase cursor-pointer"
            onClick={() => {
              setOpen(true);
            }}
          >
            Add Task
          </button>
        </div>
        <div className="d-lg-none sm-tasks-filters">
          <p>Filter by:</p>
          <CustomSelect
            options={categories}
            selected=""
            onSelect={(value) => dispatch(setFilter({ ["category"]: value }))}
            className="select flex-row align-center justify-center"
          >
            <p>{filter.category || "Category"}</p>
            <IoIosArrowDown
              style={{ width: "12px", height: "12px", opacity: 0.6 }}
            />
          </CustomSelect>
          <CustomSelect
            options={dueDates}
            selected=""
            onSelect={(value) => dispatch(setFilter({ ["dueDate"]: value }))}
            className="select flex-row align-center justify-center"
          >
            <p>{filter.dueDate || "Due Date"}</p>
            <IoIosArrowDown
              style={{ width: "12px", height: "12px", opacity: 0.6 }}
            />
          </CustomSelect>
        </div>
        <div className="d-lg-none">
          <div className="search-bar">
            <CiSearch style={{ width: "18px", height: "18px" }} />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="sm-tasks">
          {view === "board" ? (
            <TaskBoard categories={categories} statuses={statuses} />
          ) : (
            <TaskList categories={categories} statuses={statuses} />
          )}
        </div>
      </div>
      {open && <ViewOrEdit onClose={() => setOpen(false)} isCreate={true} />}
    </>
  );
};

export default Tasks;
