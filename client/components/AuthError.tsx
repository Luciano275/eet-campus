import { AuthError } from "next-auth"
import { BiError } from "react-icons/bi"

export default function AuthErrorPage(
  {error}
  : {
    error?: AuthError['type']
  }
) {
  if (error) {

    const msg = 
      error === 'AccessDenied' ? 'No tienes permiso para entrar al campus.'
      : 'Algo salio mal'

    return (
      <div className="mt-4 text-center w-full max-w-[400px] mx-auto p-3 rounded-xl bg-error text-white flex gap-2 items-center">
        <span>
          <BiError size={25} />
        </span>
        <span className="grow">{msg}</span>
      </div>
    )
  }
  return <></>
}