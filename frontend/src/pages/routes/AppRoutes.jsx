import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Login";
import Register from "../Register";
import Home from "../Home";
import Projects from "../Projects";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
