import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1, "Título é obrigatório").optional(),
  description: z.string().optional(),
  status: z.enum(["pending", "done"]).optional(),
});
