"use server";

import { signOut, signIn, auth } from "@/auth";
import {
  createBudget,
  createPot,
  deleteBudget,
  deletePot,
  getFileUrl,
  updatePotSaved,
  uploadFile,
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
export async function CreateNewVendor(formData: FormData) {
  try {
    const session = await auth();
    if (!session) throw new Error("User must be authenticated");

    const image = formData.get("image") as File;
    const imageName = `${String(session?.user?.id)} - ${image.name}`;
    const result = await uploadFile("vendors", imageName, image);
    const url = await getFileUrl(`vendors/${imageName}`);
    return result;
  } catch (error: any) {
    return error.message;
  }
}
