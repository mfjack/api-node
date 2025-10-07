import type { Request, Response } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  getTasksByUserId,
  updateTask,
} from "../services/taskService.js";

export const createTaskController = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const { id: userId } = req.params;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({ error: "User ID is required and must be a valid string" });
    }

    const task = await createTask({ userId, title, description });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllTasksController = async (req: Request, res: Response) => {
  try {
    const tasks = await getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getTaskByIdController = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    if (typeof taskId !== "string") {
      return res.status(400).json({ error: "Task ID is required and must be a string" });
    }
    const task = await getTaskById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateTaskController = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const { title, description, status } = req.body;
    if (typeof taskId !== "string") {
      return res.status(400).json({ error: "Task ID is required and must be a string" });
    }
    const updatedTask = await updateTask(taskId, { title, description, status });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteTaskController = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    if (typeof taskId !== "string") {
      return res.status(400).json({ error: "Task ID is required and must be a string" });
    }
    await deleteTask(taskId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getTasksByUserIdController = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const tasks = await getTasksByUserId(userId);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
