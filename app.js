import express from "express";
import tasks from "./route/tasks.js";
import { connectDB } from "./db/connect.js";
import * as dotenv from "dotenv";
import notFound from "./middleware/notFound.js";
import errorHandlerMiddleware from "./middleware/errorHandler.js";

dotenv.config();
//Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
// Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(express.static("./public"));
app.use(express.json());

//routes
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

//why this setup ? because I want to run my app if and only if it connect to my DB
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port} ...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
