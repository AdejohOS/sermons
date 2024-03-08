"use server";
import { CreateSermonSchema, CreateSermonValues } from "@/lib/validation";

export const createSermon = (values: CreateSermonValues) => {
  const validatedFields = CreateSermonSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { title } = validatedFields.data;
};
