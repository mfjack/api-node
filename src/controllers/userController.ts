import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../services/userService.js";
import type { Request, Response } from "express";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = await createUser({ name, email });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Erro ao criar usuário" });
  }
};

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    if (typeof userId !== "string") {
      return res.status(400).json({ error: "ID do usuário não fornecido" });
    }
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ error: "ID do usuário não fornecido" });
    }
    const updatedUser = await updateUser(userId, { name, email });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Erro ao atualizar usuário" });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ error: "ID do usuário não fornecido" });
    }
    await deleteUser(userId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Erro ao deletar usuário" });
  }
};
