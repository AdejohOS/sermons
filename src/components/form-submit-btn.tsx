"use client";

import { useFormStatus } from "react-dom";
import LoadingButton from "./loading-btn";

export default function FormSubmitButton(
  props: React.BaseHTMLAttributes<HTMLButtonElement>
) {
  const { pending } = useFormStatus();

  return <LoadingButton loading={pending} {...props} type="submit" />;
}
