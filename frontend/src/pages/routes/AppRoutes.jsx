import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Login";
import Register from "../Register";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
