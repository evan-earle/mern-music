// Import dependencies
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import allRoutes from "./routes/index.js";
import { connectToDB } from "./config/database.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: "./config/.env" });

// Create an express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectToDB();

// Routes
app.use("/api", allRoutes);

// error handler
app.use((err, req, res, next) => {
  console.log({ err });
  const status = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(status).json({ message, stack: err.stack });
});

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Start server
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
