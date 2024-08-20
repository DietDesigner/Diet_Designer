export interface NavLinksType {
  navitem: string;
  subMenus?: { menu: string; link: string }[];
  link: string;
}

export const NavLinks = [
  {
    navitem: "Product",
    link: "#",
  },
  {
    navitem: "Partnerships",
    link: "#",
  },
  {
    navitem: "Pricing",
    link: "#",
  },
  {
    navitem: "Company",
    link: "#",
  },
];
export const MobileNavLinks = [
  {
    navitem: "Product",
    link: "#",
  },
  {
    navitem: "Partnerships",
    link: "#",
  },
  {
    navitem: "Pricing",
    link: "#",
  },
  {
    navitem: "Company",
    link: "#",
  },
];
export const LoginData = [
  {
    navitem: "Login",
    subMenus: [
      { menu: "For Talent", link: "/talent-login" },
      { menu: "For Company", link: "/company-login" },
    ],
    link: "",
  },
];
