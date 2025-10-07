import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../services/userService.js";
import type { Request, Response } from "express";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = await createUser({ name, email });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to create user" });
  }
};

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    if (typeof userId !== "string") {
      return res.status(400).json({ error: "User ID is required" });
    }
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const updatedUser = await updateUser(userId, { name, email });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to update user" });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    await deleteUser(userId);
    res.status(204).send();
  } catch (error: any) {
    console.error(error);
    if (error.message === "User not found") {
      return res.status(404).json({ error: "User not found" });
    }
    if (error.message === "Cannot delete user with associated tasks") {
      return res.status(409).json({ error: "Cannot delete user with associated tasks" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};
