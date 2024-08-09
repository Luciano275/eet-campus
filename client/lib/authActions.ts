"use server";

import { signIn, signOut } from "@/auth";
import { DEFAULT_REDIRECT } from "@/routes";

export async function signInAction(provider: "google" | "github") {
  await signIn(provider, {
    redirect: true,
    redirectTo: DEFAULT_REDIRECT,
  });
}

export async function signOutAction() {
  await signOut({
    redirect: true,
    redirectTo: "/",
  });
}
