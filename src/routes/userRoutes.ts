import express from "express";
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
} from "../controllers/userController.js";

import { validate } from "../middlewares/validation.js";
import { createUserSchema, updateUserSchema } from "../schemas/userSchemas.js";
import { getTasksByUserIdController, createTaskController } from "../controllers/taskController.js";
import { createTaskSchema } from "../schemas/taskSchemas.js";

const router = express.Router();

router.post("/", validate(createUserSchema), createUserController);
router.get("/", getAllUsersController);
router.get("/:id", getUserByIdController);
router.post("/:id/tasks", validate(createTaskSchema), createTaskController);
router.get("/:id/tasks", getTasksByUserIdController);
router.put("/:id", validate(updateUserSchema), updateUserController);
router.delete("/:id", deleteUserController);

export { router as userRoutes };
