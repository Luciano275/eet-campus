import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-wrap justify-center gap-x-10 gap-y-4 py-4 px-2 md:px-4 lg:px-8 items-center border-t border-t-base-300 mt-4">
      <div className="flex gap-2 items-center">
        <div className="w-6">
            <img
              src={'/logo.jpg'}
              alt={'Logo'}
              className="w-full max-w-full h-auto"
            />
        </div>
        <p className="flex gap-1 text-sm">
          <span>© 2024</span>
          <a href="https://www.instagram.com/corchogang_f.c/" className="hover:underline">
            Corcho Gang, Org.
          </a>
        </p>
      </div>
      <div className="flex gap-x-4 gap-y-2 flex-wrap justify-center items-center text-sm">
        <Link
          href={'/termsofuse'}
          className="hover:underline"
        >
          Términos de uso
        </Link>
        <Link
          href={'/termsofuse#cookie-warning'}
          className="hover:underline"
        >
          Aviso de cookies
        </Link>
      </div>
    </footer>
  )
}