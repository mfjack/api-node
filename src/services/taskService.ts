import { prisma } from "../config/database.js";
import type { CreateTaskData, UpdateTaskData } from "../types/task.js";

const clean = (obj: any) => JSON.parse(JSON.stringify(obj));

export const createTask = async (data: CreateTaskData) => {
  const task = await prisma.task.create({
    data: {
      title: data.title,
      description: data.description ?? null,
      userId: data.userId,
    },
  });
  return task;
};

export const getAllTasks = async () => {
  const tasks = await prisma.task.findMany();
  return tasks;
};

export const getTaskById = async (id: string) => {
  const task = await prisma.task.findUnique({
    where: { id },
  });
  return task;
};

export const updateTask = async (id: string, data: UpdateTaskData) => {
  const task = await prisma.task.update({
    where: { id },
    data: clean(data),
  });
  return task;
};

export const deleteTask = async (id: string) => {
  await prisma.task.delete({
    where: { id },
  });
};

export const getTasksByUserId = async (userId: string) => {
  const tasks = await prisma.task.findMany({
    where: { userId },
  });
  return tasks;
};
