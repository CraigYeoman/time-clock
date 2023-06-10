import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";
import employeeRouter from "./routes/employees.js";
import timestampRouter from "./routes/timestamps.js";

const app = express();

dotenv.config();

app.use("/api/v1/timecard/employee", employeeRouter);
app.use("/api/v1/timecard/timestamp", timestampRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
