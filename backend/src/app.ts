import express from "express";
import authRoutes from "./routes/global/auth/authRoute";
import instituteRoutes from "./routes/institute/instituteRoutes";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/institute", instituteRoutes);

export default app;
