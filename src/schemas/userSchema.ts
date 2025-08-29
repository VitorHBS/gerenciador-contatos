import { z } from "zod";

export const userSchema = z.object({
    name: z.string().min(1),
    email: z.email(),
    phone: z.string()
});

export const updateUserSchema = z.object({
    newName: z.string().min(2),
    newEmail: z.email()
});