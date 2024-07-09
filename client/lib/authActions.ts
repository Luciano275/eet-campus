'use server';

import { signIn, signOut } from "@/auth";
import { DEFAULT_REDIRECT } from "@/routes";

export async function signInAction() {
    await signIn('google', {
        redirect: true,
        redirectTo: DEFAULT_REDIRECT
    })
}

export async function signOutAction() {
    await signOut()
}