'use client'

import { signInAction } from "@/lib/authActions"
import { DEFAULT_REDIRECT } from "@/routes";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

export default function SignInButton (
    {mobile}
    : {
        mobile?: boolean
    }
) {

    const session = useSession();

    const { push } = useRouter()

    const onLogin = async () => {
        await signInAction();
    }

    return (
      <button
        onClick={session.status === 'authenticated' ? () => push(DEFAULT_REDIRECT) : onLogin}
        className={`btn btn-neutral text-white ${
          mobile
            ? "btn-outline py-2 text-lg px-4 rounded-xl"
            : `hidden md:inline-flex`
        }`}
      >
        Acceder
      </button>
    );
   
}