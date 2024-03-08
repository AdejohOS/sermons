"use server";

import { getPasswordResetTokenByToken } from "@/data/password-reset";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NewPasswordSchema, NewPasswordValues } from "@/lib/validation";

export const newPassword = async (
  values: NewPasswordValues,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing Token" };
  }
  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "invalid token!" };
  }

  const tokenExpired = new Date(existingToken.expires) < new Date();

  if (tokenExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: {
      id: existingUser.id,
    },
  });

  return { success: "Password updated" };
};
