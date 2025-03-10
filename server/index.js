import "dotenv/config";
import express from "express";
import Hello from "./Hello.js";
import cors from "cors";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import session from "express-session";
import AssignmentsRoutes from "./Kanbas/Assignments/routes.js";
import EnrollmentsRoutes from "./Kanbas/Enrollments/routes.js";
import QuizRoutes from "./Kanbas/Quizzes/routes.js";
import AttemptsRoutes from "./Kanbas/Attempts/routes.js";
import mongoose from "mongoose";

const CONNECTION_STRING =
  process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
  })
);
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.REMOTE_SERVER,
  };
}
app.use(session(sessionOptions));
app.use(express.json());

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentsRoutes(app);
EnrollmentsRoutes(app);
AttemptsRoutes(app);
Hello(app);
QuizRoutes(app);
app.listen(process.env.PORT || 4000);
