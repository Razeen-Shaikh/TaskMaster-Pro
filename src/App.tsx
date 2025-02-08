import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import { Profile } from "./pages/Profile";
import Tasks from "./pages/Tasks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { monitorAuthState } from "./redux/actions/authActions";
import { AppDispatch, RootState } from "./redux/store";
import PrivateRoute from "./components/PrivateRoute";

import "./App.css";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    dispatch(monitorAuthState());
  }, [dispatch]);

  if (isAuthenticated) {
    return <Navigate to="/tasks" />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route index element={<Profile />} />
        </Route>
        <Route path="/tasks" element={<PrivateRoute />}>
          <Route index element={<Tasks />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
