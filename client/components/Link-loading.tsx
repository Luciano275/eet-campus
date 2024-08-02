'use client';

import Link, { LinkProps } from "next/link";
import { useLoading } from "./providers/loading-provider";
import { usePathname } from "next/navigation";
import { AnchorHTMLAttributes } from "react";

export default function LinkLoading(
  props
  : LinkProps & {
    children: React.ReactNode
    className?: string;
  } & AnchorHTMLAttributes<HTMLAnchorElement>
) {

  const { children, onClick, href } = props;

  const pathname = usePathname();

  const { setLoading } = useLoading();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== href) setLoading(true);
    if (onClick) onClick(e);
  }

  return (
    <Link {...props} onClick={handleClick}>
      {children}
    </Link>
  )
}