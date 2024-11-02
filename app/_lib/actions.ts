"use server";

import { signOut, signIn, auth } from "@/auth";
import { createBudget, deleteBudget } from "./data-service";

export async function SignInWithGoogle() {
  await signIn("google", { redirectTo: "/" });
}
export async function SignInWithSpotify() {
  await signIn("spotify", { redirectTo: "/" });
}
export async function SignInWithGithub() {
  await signIn("github", { redirectTo: "/" });
}
export async function SignOutAction() {
  await signOut({ redirectTo: "/login" });
}
export async function CreateBudget(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  try {
    await createBudget(
      Number(session?.user?.id),
      formData.get("category"),
      formData.get("color"),
      formData.get("max")
    );
  } catch (error: any) {
    return error.message;
  }
}
export async function DeleteBudget(budgetID: number) {
  const error = await deleteBudget(budgetID);
  if (error) return error.message;
}
