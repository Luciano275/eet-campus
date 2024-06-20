'use client'

import Image from "next/image";
import Link from "next/link";
import { IconType } from "react-icons";
import { BsInstagram } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import FooterStyle from '@/styles/footer.module.css'
import React from "react";

interface IInfoFooter {
    creators: {
        name: string;
        link: string;
    }[],
    social: {
        icon: IconType
        link: string,
        name: 'facebook' | 'instagram',
        hoverIcon: any
    }[]
}

const INFO: IInfoFooter = {
    creators: [
        { name: 'Luciano Luna', link: 'https://github.com/Luciano275' },
        { name: 'Fernando Gutierrez', link: 'https://github.com/FerchuGtz18' },
        { name: 'Santiago Lopez', link: 'https://www.instagram.com/_santy_lopez_' },
        { name: 'Enzo Guzman', link: 'https://www.instagram.com/enzo_gzm_' },
        { name: 'Jorge Flores', link: 'https://www.instagram.com/jorgefloreszz_' }
    ],
    social: [
        { icon: FaFacebookF, link: 'https://www.facebook.com/profile.php?id=100063505073625', name: 'facebook', hoverIcon: <FaFacebookF className="text-blue-600" size={25} /> },
        { icon: BsInstagram, link: '', name: 'instagram', hoverIcon: <Image src="/assets/instagram.png" alt="l" width={25} height={25} /> }
    ]
}

const Creators = () => {
    return (
        <nav className="flex flex-col gap-1">
          <h6 className="footer-title">Creadores</h6>
          {INFO.creators.map(({ link, name }, index) => (
            <a href={link} key={`${index}:${link}`} className="link link-hover">
              {name}
            </a>
          ))}
        </nav>
    )
}

const Social = () => {
    return (
        <nav>
          <h6 className="footer-title">Redes sociales</h6>
          <div className="flex gap-4">
            {
                INFO.social.map(({ icon: Icon, link, name, hoverIcon: hoverIcon }, index) => (
                    <a href={link} key={`${index}:${link}`} className="transition-all contrast-0 hover:contrast-100">
                        {hoverIcon}
                    </a>
                ))
            }
          </div>
        </nav>
    )
}

export default function Footer() {
    return (
      <footer
        className="p-10 bg-base-300 text-base-content grid grid-cols-2 md:grid-cols-4 [&>*]:mx-auto gap-y-10 gap-x-4"
        id={FooterStyle.footer}
      >
        <aside className="flex flex-col justify-center items-center gap-4">
          <Image src={"/logo.jpg"} alt="Logo" width={80} height={80} />
          <p className="text-center">
            E.E.T 3117 Mto. Daniel O. Reyes
            <br />
            <a
              href={"https://www.instagram.com/corchogang_f.c/"}
              className="text-blue-700"
            >
              Corcho Gang Org
            </a>
          </p>
        </aside>

        <Creators />

        <nav className="flex flex-col gap-1">
          <h6 className="footer-title">Legal</h6>
          <Link href="/termsofuse" className="link link-hover">
            Términos de uso
          </Link>
          <Link href="/termsofuse#cookie-warning" className="link link-hover">
            Aviso de cookies
          </Link>
        </nav>

        <Social />
      </footer>
    );
}