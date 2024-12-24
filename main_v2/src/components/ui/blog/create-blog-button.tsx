'use client';

import { use } from "react";

export default function CreateBlogButton(
  {authPromise}
  : {
    authPromise: Promise<any>
  }
) {

  const auth = use(authPromise);

  if (auth && (auth.user.rol === 1 || auth.user.rol === 2)) {
    return (
      <a
      href="/blog/create"
        className="py-2 px-4 rounded-xl bg-green-500 text-white w-fit flex gap-2 hover:bg-green-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        Crear blog
      </a>
    )
  }
}