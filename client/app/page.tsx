import Footer from "@/components/ui/campus/Footer";
import Main from "@/components/ui/public/Main";
import SignInButton from "@/components/ui/signin-button";
import { AuthError } from "next-auth";

export default async function Home(
  { searchParams }
  : {
    searchParams: {
      error?: AuthError['type'];
    }
  }
) {

  const error = searchParams.error;

  const msg = error === 'AccessDenied' ? 'No tienes permiso para entrar al campus.' : 'Algo salio mal'

  return (
    <>
      <Main className="flex items-center flex-col">
        <h1 className="text-2xl lg:text-4xl font-semibold">Entrar al campus</h1>
        <SignInButton />
        {error && (
          <div className="my-4 text-center w-full max-w-[400px] mx-auto p-3 rounded-xl bg-error text-white">
            {msg}
          </div>
        )}
      </Main>
      <Footer />
    </>
  );
}
