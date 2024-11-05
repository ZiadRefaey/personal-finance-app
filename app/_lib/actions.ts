"use server";
async function authenticatedUser(session: any) {
  if (!session) throw new Error("User must be authenticated");
}
import { signOut, signIn, auth } from "@/auth";
import {
  createBudget,
  createPot,
  createTransaction,
  createVendor,
  deleteBudget,
  deletePot,
  getFileUrl,
  getVendors,
  readBudgets,
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
  try {
    await deletePot(potID);
    revalidatePath("/pots");
  } catch (error: any) {
    return error.message;
  }
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
    //authenticate the user
    const session = await auth();
    authenticatedUser(session);

    //get file data as File
    const image = formData.get("image") as File;

    //create a unique name for each image according to user ID
    const imageName = `${String(session?.user?.id)} - ${image.name}`;

    //upload the image to supabase's bucket
    await uploadFile("vendors", imageName, image);

    //retrieve the url of the uploaded image to store it in the database
    const imageUrl = await getFileUrl(`vendors/${imageName}`);

    //create a new record with the image's id and name from the form submission
    await createVendor(
      Number(session?.user?.id),
      formData.get("name"),
      imageUrl
    );
    revalidatePath("/transactions");
  } catch (error: any) {
    return error.message;
  }
}

export async function CreateTransaction(formData: FormData) {
  try {
    const session = await auth();
    authenticatedUser(session);
    const userId = Number(session?.user?.id);
    const budgetName = formData.get("category");
    const userBudgets = await readBudgets(userId);
    const budgetObject = userBudgets.filter(
      (budget) => budgetName === budget.name
    );

    const vendorName = formData.get("vendor");
    const userVendors = await getVendors(userId);
    const vendorObject = userVendors.filter(
      (vendor) => vendorName === vendor.name
    );

    await createTransaction(
      formData.get("amount"),
      budgetObject[0].id,
      vendorObject[0].id,
      userId
    );
    revalidatePath("/transactions");
  } catch (error: any) {
    return error.message;
  }
}
