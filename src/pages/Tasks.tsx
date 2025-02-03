import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { TaskBuddy, TaskList, TaskBoard, Logout, Select } from "../components";
import { RootState } from "../redux/store";
import { TiThMenuOutline } from "react-icons/ti";
import { CiSearch, CiViewBoard } from "react-icons/ci";
import { filterByCategory, filterByDueDate } from "../redux/features/taskSlice";

const Tasks = () => {
  const dispatch = useDispatch();
  const {
    user,
    isLoading: userLoading,
    error: userError,
  } = useSelector((state: RootState) => state.auth);
  const {
    tasks,
    isLoading: tasksLoading,
    error: tasksError,
  } = useSelector((state: RootState) => state.tasks);

  const [view, setView] = React.useState("list");
  const [categories, setCategories] = React.useState<string[]>([]);
  const [dueDates, setDueDates] = React.useState<string[]>([]);

  React.useEffect(() => {
    setCategories(
      Array.from(new Set(tasks?.map((task) => task.category))) || []
    );
    setDueDates(Array.from(new Set(tasks?.map((task) => task.dueDate))) || []);
  }, [tasks]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    dispatch(filterByCategory(event.target.value));

  const handleDueDateChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    dispatch(filterByDueDate(event.target.value));

  const handleAddTask = () => {};

  return (
    <div className="tasks-container">
      <div className="tasks-content">
        <TaskBuddy className="task-buddy" />
        <div className="profile">
          <div className="profile-icon">
            <img src="https://s3-alpha-sig.figma.com/img/f549/15dc/fd930beee5a3918d920109c2020d3ccb?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=SDvbi-RchTbKshhPi~aGicQHU5zkqx4vtypacHGL~wFdXsg7eJkKEhgi-Xt~FWDd89zdnCgKINqtlTOuxJ3hS5in4a1qv0hRlILIzvi2ugtiEpcLWCN~V8zCutdS78UbVaajVLtwjaEIRk0ms-qFU3aaMoZ~CCi7j3pTPj5-QHLk4ca4JFj1tTWCHEU7TxYnKePiTU1ddEG92iUogUiCWAAMbBJIDpYOc6O2dgmeRp0nSFTDQd6F~HSkPEFA71pP6KNdwyIxpHM~AzHQoLlhfk6kqJaALtqIgKyEs4t40Oh32uB1To~QodrmGXbLS4Bf0j~uJZ7J74rI5wIUyUPpcw__" />
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
          <Select data={categories} onChange={handleCategoryChange} />
          <Select data={dueDates} onChange={handleDueDateChange} />
        </div>
        <div className="search">
          <div className="search-bar">
            <CiSearch />
            <input type="text" placeholder="Search" />
          </div>
          <button onClick={handleAddTask}>Add Task</button>
        </div>
      </div>
      {view === "board" ? <TaskBoard /> : <TaskList />}
    </div>
  );
};

export default Tasks;
