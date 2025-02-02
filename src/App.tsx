// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { FirebaseAppProvider } from "reactfire";
// import { initializeApp } from "firebase/app";
// import "./styles.css";

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID"
// };

// initializeApp(firebaseConfig);

// import Home from "./components/Home";
// import Login from "./components/Login";
// import TaskBoard from "./components/TaskBoard";
// import PrivateRoute from "./components/PrivateRoute";
// import { AuthProvider } from "./context/AuthContext";
// import Register from "./components/Register";
// import ForgotPassword from "./components/ForgotPassword";
// import Profile from "./components/Profile";
// import TaskDetails from "./components/TaskDetails";

// const App = () => {
//   return (
//     <FirebaseAppProvider firebaseConfig={firebaseConfig}>
//       <AuthProvider>
//         <Router>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//             <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
//             <Route path="/tasks" element={<PrivateRoute><TaskBoard /></PrivateRoute>} />
//             <Route path="/tasks/:taskId" element={<PrivateRoute><TaskDetails /></PrivateRoute>} />
//           </Routes>
//         </Router>
//       </AuthProvider>
//     </FirebaseAppProvider>
//   );
// };

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import './styles.css';
import { Profile } from "./pages/Profile";
import Tasks from "./pages/Tasks";

const App = () => {
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

