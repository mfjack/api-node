import { prisma } from "../config/database.js";
import type { CreateUserData, UpdateUserData } from "../types/user.js";

export const createUser = async (data: CreateUserData) => {
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
    },
  });
  return user;
};

export const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
};

export const updateUser = async (id: string, data: UpdateUserData) => {
  const user = await prisma.user.update({
    where: { id },
    data: {
      name: data.name,
      email: data.email,
    },
  });
  return user;
};

export const deleteUser = async (id: string) => {
  try {
    await prisma.task.deleteMany({
      where: { userId: id },
    });

    await prisma.user.delete({
      where: { id },
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new Error("User not found");
    }
    if (error.code === "P2003") {
      throw new Error("Cannot delete user with associated tasks");
    }
    throw error;
  }
};
