export type LinksType =
  | {
      href: string;
      label: string;
      type: "normal";
    }
  | {
      type: "dropdown";
      label: string;
      options: {
        href: string;
        label: string;
      }[];
    };

export const LINKS: LinksType[] = [
  { href: "/#equipment", label: "Equipo", type: "normal" },
  { href: "/blog", label: "Blog", type: "normal" },
  {
    label: "Especialidades",
    type: "dropdown",
    options: [
      { href: "/#informatic", label: "Informáctica" },
      { href: "/#electronic", label: "Electrónica" },
    ],
  },
  {
    label: "Capacitaciones",
    type: "dropdown",
    options: [
      { href: "/#informatic", label: "Informáctica" },
      { href: "/#electronic", label: "Electrónica" },
      { href: "/#electricity", label: "Electricidad" },
      { href: "/#robotics", label: "Robótica" },
    ],
  },
];