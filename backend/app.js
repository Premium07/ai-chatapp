import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import connectDB from "./db/database.js";
import userRoutes from "./routes/user.routes.js";
import projectRoutes from "./routes/project.routes.js";
import cors from "cors";

connectDB();

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// routes

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);

export default app;
