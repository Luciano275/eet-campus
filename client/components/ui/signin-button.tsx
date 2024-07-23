"use client";

import { signInAction } from "@/lib/authActions";
import { DEFAULT_REDIRECT } from "@/routes";
import { useSession } from "next-auth/react";
import LinkLoading from "../Link-loading";
import { useLoading } from "../providers/loading-provider";

export default function SignInButton({ mobile }: { mobile?: boolean }) {
  const { setLoading } = useLoading();

  const session = useSession();
  const buttonClassName = `btn btn-neutral text-white ${
    mobile
      ? "btn-outline py-2 text-lg px-4 rounded-xl"
      : `hidden md:inline-flex`
  }`;

  const onLogin = async () => {
    setLoading(true);
    await signInAction();
  };

  return session.status === "authenticated" ? (
    <LinkLoading href={DEFAULT_REDIRECT} className={buttonClassName}>
      Ir al campus
    </LinkLoading>
  ) : session.status === "unauthenticated" ? (
    <button onClick={onLogin} className={buttonClassName}>
      Acceder
    </button>
  ) : (
    <></>
  );
}
