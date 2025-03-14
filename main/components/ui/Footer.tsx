import { INFO } from "@/lib/utils";
import { Link } from "next-view-transitions";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="p-10 bg-base-300 text-base-content grid grid-cols-2 md:grid-cols-4 md:[&>*]:mx-auto gap-y-10 gap-x-4"
      id="footer"
    >
      <aside className="flex flex-col justify-center items-center gap-4">
          <Image
              src="/logo.png"
              alt="Logo"
              width={90}
              height={90}
              loading="lazy"
          />
          <p className="text-center">
              E.E.T 3117 Mto. Daniel O. Reyes
              <br />
              <a
                  href="https://www.instagram.com/corchogang_f.c/"
                  className="text-blue-700"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                  Corcho Gang Org
              </a>
          </p>
      </aside>

      <nav className="flex flex-col gap-1 items-center">
          <h6 className="footer-title">Creadores</h6>
          {INFO.creators.map(({ link, name }) => (
              <a
                  key={name}
                  href={link}
                  className="link link-hover"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                  {name}
              </a>
          ))}
      </nav>

      <nav className="flex flex-col gap-1 items-center">
          <h6 className="footer-title">Legal</h6>
          <Link href="/termsofuse" className="link link-hover">
              Términos de uso
          </Link>
          <Link href="/termsofuse#user-content-cookies" className="link link-hover">
              Aviso de cookies
          </Link>
      </nav>

      <nav className="flex flex-col items-center">
          <h6 className="footer-title">Redes sociales</h6>
          <div className="flex gap-4 items-center">
              {INFO.social.map(({ link, name }) => (
                  <a
                      key={name}
                      href={link}
                      className="transition-all contrast-0 hover:contrast-100"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                  >
                      {name === "facebook" ? (
                          <svg
                              fill="#0099ff"
                              height="24px"
                              width="24px"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 310 310"
                          >
                              <g>
                                  <path d="M81.703,165.106h33.981V305c0,2.762,2.238,5,5,5h57.616c2.762,0,5-2.238,5-5V165.765h39.064c2.54,0,4.677-1.906,4.967-4.429l5.933-51.502c0.163-1.417-0.286-2.836-1.234-3.899c-0.949-1.064-2.307-1.673-3.732-1.673h-44.996V71.978c0-9.732,5.24-14.667,15.576-14.667c1.473,0,29.42,0,29.42,0c2.762,0,5-2.239,5-5V5.037c0-2.762-2.238-5-5-5h-40.545C187.467,0.023,186.832,0,185.896,0c-7.035,0-31.488,1.381-50.804,19.151c-21.402,19.692-18.427,43.27-17.716,47.358v37.752H81.703c-2.762,0-5,2.238-5,5v50.844C76.703,162.867,78.941,165.106,81.703,165.106z" />
                              </g>
                          </svg>
                      ) : (
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        id="instagram"
                        width="36px"
                        height="36px"
                      >
                        <linearGradient
                          id="a"
                          x1="255.531"
                          x2="255.531"
                          y1="117.176"
                          y2="406.065"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" stopColor="#ea8928" />
                          <stop offset="1" stopColor="#cf2b8f" />
                        </linearGradient>
                        <path
                          fill="url(#a)"
                          d="M326.1 104.1H185c-47.9 0-86.9 39-86.9 86.9v141c0 47.9 39 86.9 86.9 86.9h141c47.9 0 86.9-39 86.9-86.9V191c0-47.9-38.9-86.9-86.8-86.9zm58.9 228c0 32.5-26.4 58.9-58.9 58.9H185c-32.5 0-58.9-26.4-58.9-58.9V191c0-32.5 26.4-58.9 58.9-58.9h141c32.5 0 58.9 26.4 58.9 58.9l.1 141.1z"
                        />
                        <linearGradient
                          id="b"
                          x1="255.531"
                          x2="255.531"
                          y1="117.176"
                          y2="406.065"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" stopColor="#ea8928" />
                          <stop offset="1" stopColor="#cf2b8f" />
                        </linearGradient>
                        <path
                          fill="url(#b)"
                          d="M255.5 180.4c-44.7 0-81.1 36.4-81.1 81.1 0 44.7 36.4 81.1 81.1 81.1s81.1-36.4 81.1-81.1c0-44.7-36.3-81.1-81.1-81.1zm0 134.3c-29.3 0-53.2-23.9-53.2-53.2 0-29.3 23.9-53.2 53.2-53.2s53.2 23.9 53.2 53.2c0 29.4-23.8 53.2-53.2 53.2z"
                        />
                        <linearGradient
                          id="c"
                          x1="340.043"
                          x2="340.043"
                          y1="117.176"
                          y2="406.065"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" stopColor="#ea8928" />
                          <stop offset="1" stopColor="#cf2b8f" />
                        </linearGradient>
                        <path
                          fill="url(#c)"
                          d="M340 156.7c-5.4 0-10.7 2.2-14.5 6-3.8 3.8-6 9.1-6 14.5s2.2 10.7 6 14.5c3.8 3.8 9.1 6 14.5 6s10.7-2.2 14.5-6c3.8-3.8 6-9.1 6-14.5s-2.2-10.7-6-14.5c-3.8-3.8-9.1-6-14.5-6z"
                        />
                      </svg>
                      )}
                  </a>
              ))}
          </div>
      </nav>
    </footer>
  )
}