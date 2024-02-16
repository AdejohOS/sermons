"use server";

import { LoginUserSchema, LoginUserValues } from "@/lib/validation";

export const login = async (values: LoginUserValues) => {
  const validatedFields = LoginUserSchema.safeParse(values);

  if (!validatedFields) {
    return { error: "Invalid fields!" };
  }

  return { success: "Logged in successfully!" };
};
