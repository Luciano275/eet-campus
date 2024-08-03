import { LinkType } from "@/types";
import { DropdownLink, NormalLink } from "./links";
import { Fragment } from "react";
import Link from "next/link";

export default function GenerateLinks(
    {LINKS, pathname, mobile, condition}
    : {
        LINKS: LinkType[]
        pathname: string
        mobile?: boolean
        condition: 'normal:dropdown' | 'right'
    }
) {
    
    if (condition === 'normal:dropdown') {
        return (
            LINKS.map((link, index) => (
                typeof link.type === 'undefined' ? (
                    <NormalLink
                        key={`${index}:${link.href}`}
                        {...link}
                        pathname={pathname}
                        mobile={mobile}
                    />
                ) : link.type === 'dropdown' ? (
                    <DropdownLink
                        key={`${index}:${link.href}`}
                        {...link}
                        mobile={mobile}
                    />
                ) : <Fragment key={index} />
            ))
        )
    }

    return (
        LINKS.map((link, index) => {
            return (
              link.type === "right" &&
              (mobile ? (
                <Link
                  href={link.href}
                  key={`${index}:${link.href}`}
                  className={`btn ${link.bg} btn-outline text-white py-2 text-lg px-4 rounded-xl`}
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  href={link.href}
                  key={`${index}:${link.href}`}
                  className={`hidden md:inline-flex btn ${link.bg} text-white`}
                >
                  {link.label}
                </Link>
              ))
            );
        })
    )

}