'use client'

import { signInAction } from "@/lib/authActions"
import { DEFAULT_REDIRECT } from "@/routes";
import { useSession } from "next-auth/react"
import Link from "next/link";

export default function SignInButton (
    {mobile}
    : {
        mobile?: boolean
    }
) {

    const session = useSession();
    const buttonClassName = `btn btn-neutral text-white ${
            mobile
              ? "btn-outline py-2 text-lg px-4 rounded-xl"
              : `hidden md:inline-flex`
          }`

    const onLogin = async () => {
        await signInAction();
    }

    return (
      session.status === 'authenticated' ? (
        <Link
          href={DEFAULT_REDIRECT}
          className={buttonClassName}
        >
          Ir al campus
        </Link>
      ) : session.status === 'unauthenticated' ? (
        <button
          onClick={onLogin}
          className={buttonClassName}
        >
          Acceder
        </button>
      ) : <></>
    );
   
}