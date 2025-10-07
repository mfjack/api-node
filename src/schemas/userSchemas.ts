import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2, "Name must have at least 2 characters"),
  email: z.email("Invalid email"),
});

export const updateUserSchema = createUserSchema.partial();
