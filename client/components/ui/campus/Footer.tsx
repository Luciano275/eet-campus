import { MAIN_PAGE } from "@/routes";

export default function Footer() {
  return (
    <footer className="flex flex-wrap justify-center gap-x-10 gap-y-4 py-4 px-2 md:px-4 lg:px-8 items-center border-t border-t-base-300 mt-4">
      <div className="flex gap-2 items-center">
        <div className="w-6">
            <img
              src={'/logo.png'}
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
        <a
          href={`${MAIN_PAGE}/termsofuse`}
          className="hover:underline"
        >
          Términos de uso
        </a>
        <a
          href={`${MAIN_PAGE}/termsofuse#cookies`}
          className="hover:underline"
        >
          Aviso de cookies
        </a>
      </div>
    </footer>
  )
}