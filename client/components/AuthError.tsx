import { ErrorEnums } from "@/types";
import { useState } from "react";
import { BiError } from "react-icons/bi";
import { FaX } from "react-icons/fa6";

const errorMap = {
  [ErrorEnums.Configuration]:
    "Hay un problema al intentar autenticarte. Por favor, contactate con el soporte técnico para poder ayudarte.",
  [ErrorEnums.AccessDenied]: "No tienes permiso para entrar al campus.",
  [ErrorEnums.AccountTerminated]:
    "Tu cuenta ha sido dada de baja. Por favor, contactate con el administrador del campus para poder recuperarla.",
};

export default function AuthErrorPage({ error }: { error?: ErrorEnums }) {
  const [show, setShow] = useState(!!error);

  if (error && show) {
    return (
      <div className="mt-4 text-center w-full max-w-[500px] mx-auto py-3 pl-3 pr-10 rounded-xl bg-error text-white flex gap-2 items-center relative">
        <span>
          <BiError size={25} />
        </span>
        <span className="grow">
          {errorMap[error] ||
            "Algo salio mal. Por favor contactate con el soporte técnico si el error persiste."}
        </span>
        <span
          onClick={() => setShow(false)}
          className="absolute top-3 right-3 text-neutral-200 hover:text-white cursor-pointer"
        >
          <FaX size={16} />
        </span>
      </div>
    );
  }
  return <></>;
}
