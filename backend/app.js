import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import connectDB from "./db/database.js";
// import cors from "cors";

connectDB();

const app = express();
app.use(morgan("dev"));
// app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is running ");
});

export default app;
