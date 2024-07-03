import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import connectDB from "./db/connect.js";
import cookieParser from "cookie-parser";

// routers
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import proposalRouter from "./routes/proposalRouter.js"

// public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV != "production") {
  app.use(morgan("dev"));
}

// make 'public' folder publicly available
app.use(express.static(path.resolve(__dirname, "./client/dist")));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ msg: "Welcome!" });
});

app.get("/api/v1", (req, res) => {
    res.send("serving apis on route /api/v1");
  });

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/proposal", authenticateUser, proposalRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

app.use("*", (req, res) => {
  res.status(500).json({ msg: "something went wrong with route" });
});

// middleware
app.use(errorHandlerMiddleware);

const port = process.env.SERVER_PORT || 5101;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(port, () => {
    console.log(`DB connection Established Successfully...`);
    console.log(`Server is listening on ${port}.`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
