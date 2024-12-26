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

export interface IInfoFooter {
  creators: {
    name: string;
    link: string;
  }[];
  social: {
    link: string;
    name: string;
  }[];
}

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

export const CAROUSEL_ITEMS = [
  { alt: "Banner", src: "/school/banner.webp" },
  { alt: "Adentro", src: "/school/adentro1.webp" },
  { alt: "Patio-1", src: "/school/patio1.webp" },
  { alt: "Taller-1", src: "/school/taller1.webp" },
];

export const members = [
  { alt: "Director", fullname: "Elio Omar Brito", img: '/equipment/director.webp', link: '' },
  { alt: "Vicedirectora", fullname: "Gabriela Garnica", img: '/equipment/vicedirectora.webp', link: '' },
  { alt: "Vicedirector", fullname: "Luis Haro", img: '/equipment/vicedirector.webp', link: '' },
]

export const INFO: IInfoFooter = {
  creators: [
    { name: "Luciano Luna", link: "https://github.com/Luciano275" },
    { name: "Fernando Gutierrez", link: "https://github.com/FerchuGtz18" },
    { name: "Santiago Lopez", link: "https://www.instagram.com/_santy_lopez_" },
    { name: "Enzo Guzman", link: "https://www.instagram.com/enzo_gzm_" },
    { name: "Jorge Flores", link: "https://www.instagram.com/jorgefloreszz_" },
    { name: "Joaquín Gimenez", link: "https://www.instagram.com/j0ack0gmz_" },
  ],
  social: [
    {
      link: "https://www.facebook.com/profile.php?id=100063505073625",
      name: "facebook",
    },
    {
      link: ".",
      name: "instagram",
    },
  ],
};