import * as z from "zod";

export const CreateAuthorSchema = z.object({
  name: z.string().min(2, "must contain at least 2 characters").max(50),
  aboutAuthor: z.string().max(50).optional(),
  imageUrl: z.string().optional(),
});

export type CreateAuthorValues = z.infer<typeof CreateAuthorSchema>;

export const CreateUserSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email({ message: "Email is required!" }),
  password: z.string().min(6, "minimum 6 characters is required!"),
});
export type CreateUserValues = z.infer<typeof CreateUserSchema>;

export const LoginUserSchema = z.object({
  email: z.string().email({ message: "Email is required!" }),
  password: z.string().min(1, "Password is required!"),
});
export type LoginUserValues = z.infer<typeof LoginUserSchema>;
