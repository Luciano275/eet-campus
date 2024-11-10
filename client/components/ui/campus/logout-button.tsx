"use client";

import { signOutAction } from "@/lib/authActions";
import { useActionState } from "react";
import { BiLogOut } from "react-icons/bi";
import Form from 'next/form'

export default function LogoutButton() {
  
  const [state, action, isPending] = useActionState(signOutAction, undefined);

  return (
    <Form
      action={action}
      className="p-2"
      style={{
        transition: "box-shadow 500ms ease",
        boxShadow: `0 -4px 15px 0 rgb(3 7 18)`,
      }}
    >
      <button
        className={`flex justify-center items-center gap-2 py-2 px-4 ${isPending ? 'bg-gray-950' : 'bg-gray-900 hover:bg-red-600'} rounded-xl text-white w-full`}
        disabled={isPending}
      >
        <BiLogOut size={20} />
        Salir
      </button>
    </Form>
  );
}
