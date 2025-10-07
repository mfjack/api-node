import {
  deleteTaskController,
  getAllTasksController,
  getTaskByIdController,
  updateTaskController,
} from "../controllers/taskController.js";
import { validate } from "../middlewares/validation.js";
import { updateTaskSchema } from "../schemas/taskSchemas.js";
import express from "express";

const router = express.Router();

router.get("/", getAllTasksController);
router.get("/:id", getTaskByIdController);
router.put("/:id", validate(updateTaskSchema), updateTaskController);
router.delete("/:id", deleteTaskController);

export { router as taskRoutes };
