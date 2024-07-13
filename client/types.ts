import { IconType } from "react-icons";

export type LinkType = {
  href: string;
  label: string;
  type?: "right" | "dropdown";
  bg?: string;
  items?: { href: string; label: string }[];
  hideOnMd?: boolean;
};

export type IInfoFooter = {
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

export type CampusLinkType = {
  href: string;
  label: string;
  icon: IconType;
}[]