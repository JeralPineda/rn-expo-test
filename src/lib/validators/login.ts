import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string().min(1, "El usuario es requerido"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});