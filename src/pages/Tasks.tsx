import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TaskBuddy, TaskList, TaskBoard, Logout, Select } from "../components";
import { RootState } from "../redux/store";
import { TiThMenuOutline } from "react-icons/ti";
import { CiSearch, CiViewBoard } from "react-icons/ci";
import { setFilter } from "../redux/features/taskSlice";

const Tasks = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { tasks } = useSelector((state: RootState) => state.tasks);

  const [view, setView] = useState("list");
  const [categories, setCategories] = useState<string[]>([]);
  const [dueDates, setDueDates] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);

  useEffect(() => {
    setCategories(
      Array.from(new Set(tasks?.map((task) => task.category))) || []
    );
    setTags(Array.from(new Set(tasks?.map((task) => task.tags).flat())) || []);
    setDueDates(Array.from(new Set(tasks?.map((task) => task.dueDate))) || []);
    setStatuses(Array.from(new Set(tasks?.map((task) => task.status))) || []);
  }, [tasks]);

  const handleAddTask = () => {};

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(setFilter({ [name]: value }));
  };

  return (
    <div className="tasks-container">
      <div className="tasks-content">
        <TaskBuddy className="task-buddy" />
        <div className="profile">
          <div className="profile-icon">
            <img src={user?.photoURL || ""} alt="User's Picture" />
            <p>{user?.displayName || user?.email || "Guest"}</p>
          </div>
        </div>
      </div>
      <div className="task-board-nav">
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
      <div className="tasks-filters">
        <div className="filters">
          <p>Filter by:</p>
          <Select
            name="category"
            title="Category"
            data={categories}
            onChange={handleChange}
          />
          <Select
            name="dueDate"
            title="DueDates"
            data={dueDates}
            onChange={handleChange}
          />
          <Select name="tag" title="Tags" data={tags} onChange={handleChange} />
        </div>
        <div className="search">
          <div className="search-bar">
            <CiSearch />
            <input type="text" placeholder="Search" />
          </div>
          <button onClick={handleAddTask}>Add Task</button>
        </div>
      </div>
      {view === "board" ? (
        <TaskBoard />
      ) : (
        <TaskList
          categories={categories}
          dueDates={dueDates}
          tags={tags}
          statuses={statuses}
        />
      )}
    </div>
  );
};

export default Tasks;
