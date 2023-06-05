import express from "express";
import {
  getAllTasks,
  deleteTask,
  updateTask,
  getSingleTask,
  createTask,
} from "../controllers/tasksController.js";

const router = express.Router();

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getSingleTask).patch(updateTask).delete(deleteTask);

export default router;
