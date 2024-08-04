import Footer from "@/components/ui/campus/Footer";
import Main from "@/components/ui/public/Main";
import SignInButton from "@/components/ui/signin-button";

export default async function Home() {
  return (
    <>
      <Main className="flex items-center flex-col">
        <h1 className="text-2xl lg:text-4xl font-semibold py-4">Entrar al campus</h1>
        <SignInButton />
      </Main>
      <Footer />
    </>
  );
}
