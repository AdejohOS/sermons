"use server";

import bcrypt from "bcrypt";

import { CreateUserSchema, CreateUserValues } from "@/lib/validation";
import { db } from "@/lib/db";

export const createUser = async (values: CreateUserValues) => {
  const validatedFields = CreateUserSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { name, email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return {
      error: "Email already in use!",
    };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  return { success: `User ${name} created successfully!` };
};
