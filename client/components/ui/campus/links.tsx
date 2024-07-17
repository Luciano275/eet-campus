'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { generateLinks } from "@/lib/utils";

export default function CampusLinks(
  {rol}
  : {
    rol: number
  }
) {

    const pathname = usePathname();
    const [active, setActive] = useState(-1);

    const LINKS = generateLinks(rol)

    const changeActiveElement = (value: number) => {
        setActive(value);
    }

    return (
      <div
        className={`grow py-4 px-2 overflow-x-hidden overflow-y-auto`}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: `#09f transparent`
        }}
      >
        <ul className="flex flex-col gap-2">
          {LINKS?.map(({ href, icon: LinkIcon, label }, index) => (
            <Link
              href={href}
              key={`${index}:${label}`}
              className={`flex gap-2 items-center rounded-lg p-2 transition-colors ${
                pathname === href || active === index
                  ? 'bg-gray-900 text-white'
                  : "text-neutral-400"
              }`}
              onMouseEnter={() => changeActiveElement(index)}
              onMouseLeave={() => changeActiveElement(-1)}
            >
              <LinkIcon size={25} />
              {label}
            </Link>
          ))}
        </ul>
      </div>
    );
}