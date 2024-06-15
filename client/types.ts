export type LinkType = {
  href: string;
  label: string;
  type?: "right" | "dropdown";
  bg?: string;
  items?: { href: string; label: string }[];
  hideOnMd?: boolean;
};