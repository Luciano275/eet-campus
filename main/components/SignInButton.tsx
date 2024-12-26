export default function SignInButton({ onlyMobile }: { onlyMobile?: boolean }) {
  return (
    <a
      href={process.env.NEXT_PUBLIC_CAMPUS_URL}
      className={`btn btn-primary hover:bg-blue-500 text-white ${
        onlyMobile ? "flex md:hidden" : "hidden md:inline-flex"
      }`}
    >
      Acceder
    </a>
  );
}
