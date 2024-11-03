"use server";

import { signOut, signIn, auth } from "@/auth";
import {
  createBudget,
  createPot,
  deleteBudget,
  deletePot,
  updatePotSaved,
} from "./data-service";
import { revalidatePath } from "next/cache";

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
export async function CreateBudget(formData: FormData, userID: number) {
  //Make sure the user is logged in
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  //create a budget
  try {
    await createBudget(
      userID,
      formData.get("category"),
      formData.get("color"),
      formData.get("max")
    );
    revalidatePath("/budgets");
  } catch (error: any) {
    return error.message;
  }
}

//deleting a budget
export async function DeleteBudget(budgetID: number) {
  const error = await deleteBudget(budgetID);
  revalidatePath("/budgets");

  if (error) return error.message;
}

export async function CreatePot(formData: FormData, userID: number) {
  //
  try {
    await createPot(
      userID,
      formData.get("title"),
      formData.get("color"),
      formData.get("goal")
    );
    revalidatePath("/pots");
  } catch (error: any) {
    return error.message;
  }
}

export async function DeletePot(potID: number) {
  const error = await deletePot(potID);
  revalidatePath("/pots");

  if (error) return error.message;
}

export async function UpdatePotsSaved(potID: number, saved: number) {
  try {
    await updatePotSaved(potID, saved);
    revalidatePath("/pots");
  } catch (error: any) {
    return error.message;
  }
}
