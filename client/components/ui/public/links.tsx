import { LinkType } from "@/types";
import Link from "next/link";
import { FaArrowCircleDown } from "react-icons/fa";

export const LINKS: LinkType[] = [
  { href: "/", label: "Inicio" },
  {
    href: "",
    label: "Especialidades",
    type: "dropdown",
    items: [
      { href: "#informatic", label: "Informática" },
      { href: "#electronic", label: "Electrónica" },
    ],
  },
  {
    href: "",
    label: "Capacitaciones",
    type: "dropdown",
    items: [
      { href: "#informatic", label: "Informática" },
      { href: "#electronic", label: "Electrónica" },
      { href: "#electricity", label: "Electricidad" },
      { href: "#robotics", label: "Robótica" },
    ],
  },
  {
    href: "/register",
    label: "Inscribirse",
    type: "right",
    bg: "btn-info",
    hideOnMd: true,
  },
];

export const NormalLink = (props: LinkType & { pathname: string, mobile?: boolean }) => {
  const { href, label, pathname, mobile } = props;

  return (
    <Link
      href={href}
      className={`${
        pathname === href ? "text-info" : "text-white"
      } hover:text-info ${mobile && 'text-lg'}`}
    >
      {label}
    </Link>
  );
};

const Dropdown = (
  {children, mobile, label}
  : {
    children: React.ReactNode
    mobile?: boolean
    label: LinkType['label']
  }
) => {

  return (
    mobile ? (
      <details className="dropdown">
        <summary
          tabIndex={0}
          role="button"
          className={`text-white hover:text-info flex gap-1 items-center ${mobile && 'text-lg'}`}
        >
          {label} <FaArrowCircleDown />
        </summary>
        {children}
      </details>
    ) : (
      <div className="dropdown dropdown-hover">
        <div
          tabIndex={0}
          role="button"
          className={`text-white hover:text-info flex gap-1 items-center`}
        >
          {label} <FaArrowCircleDown />
        </div>
        {children}
      </div>
    )
  )
  
}

export const DropdownLink = (props: LinkType & {mobile?: boolean}) => {
  const { label, items, mobile } = props;

  return (
    <Dropdown
      label={label}
      mobile={mobile}
    >
      <ul
        tabIndex={0}
        className={`dropdown-content z-[1] menu p-2 shadow bg-gray-900 bg-opacity-90 rounded-box w-52 gap-y-1`}
      >
        {items?.map(({ href, label }, index) => (
          <li
            key={`${index}:${href}`}
            className={`text-white hover:bg-gray-700 hover:bg-opacity-50 rounded-lg bg-transparent`}
            data-theme={"dark"}
          >
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>
    </Dropdown>
  );
};
