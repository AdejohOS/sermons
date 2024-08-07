import * as z from "zod";

// Create admin sermon author/preacher schema
export const CreateAuthorSchema = z.object({
  name: z.string().min(2, "Must contain at least 2 characters").max(50),
  about: z.string().max(50).optional(),
  imageUrl: z.string().optional(),
});
export type CreateAuthorValues = z.infer<typeof CreateAuthorSchema>;

// Edit admin sermon author/preacher schema
export const UpdateAuthorSchema = z.object({
  name: z.string().min(2, "Must contain at least 2 characters").max(50),
  about: z.string().max(50).optional(),
  imageUrl: z.string().optional(),
});
export type UpdateAuthorValues = z.infer<typeof UpdateAuthorSchema>;

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

export const ResetPasswordSchema = z.object({
  email: z.string().email({ message: "Email is required!" }),
});
export type ResetPasswordValues = z.infer<typeof ResetPasswordSchema>;

export const NewPasswordSchema = z.object({
  password: z.string().min(6, "Minimum of 6 characters is required!"),
});
export type NewPasswordValues = z.infer<typeof NewPasswordSchema>;

// Create admin category schema
export const CategorySchema = z.object({
  name: z.string().min(2, "Name is required!"),
  about: z.string().max(50).optional(),
  imageUrl: z.string().optional(),
});
export type CategoryValues = z.infer<typeof CategorySchema>;

// Location schema
export const LocationSchema = z.object({
  name: z.string().min(2, "Name is required!"),
  address: z.string().optional(),
  imageUrl: z.string().optional(),
});
export type LocationValues = z.infer<typeof LocationSchema>;
// Create admin category schema

export const SermonSchema = z.object({
  title: z.string().min(2, "Title is required!"),
  about: z.string().optional(),
  imageUrl: z.string().optional(),
  fileUrl: z.string(),
  authorId: z.string().min(1),
  locationId: z.string().min(1),
  categoryId: z.string().min(1),
  isPublished: z.boolean().default(false).optional(),
  dateDelivered: z.date(),
});
export type SermonValues = z.infer<typeof SermonSchema>;

export const CreateCommentSchema = z.object({
  description: z
    .string()
    .min(1, "Min of 1 character")
    .max(500, "Max of 500 character"),
});
export type CreateCommentValues = z.infer<typeof CreateCommentSchema>;
