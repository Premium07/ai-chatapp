import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Login";
import Register from "../Register";
import Home from "../Home";
import Projects from "../Projects";
import UserAuth from "../auth/UserAuth";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <UserAuth>
              <Home />
            </UserAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/projects"
          element={
            <UserAuth>
              <Projects />
            </UserAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
