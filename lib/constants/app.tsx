import { ChartPie, LayoutGrid, Github, Twitter } from "lucide-react"

export const APP_MENU = [
  { title: "Home", href: "/app", icon: <LayoutGrid className="h-5 w-5" /> },
  {
    title: "Portfolio",
    href: "/app/portfolio",
    icon: <ChartPie className="h-5 w-5" />,
  },
] as const

export const APP_LINKS = [
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "Docs",
    href: "/docs",
  },
] as const

export const APP_SOCIALS = [
  {
    name: "X",
    href: "https://x.com/nectalabs",
    icon: Twitter,
  },
  {
    name: "GitHub",
    href: "https://github.com/nectalabs",
    icon: Github,
  },
] as const

export const NETWORKS = [
  {
    name: "Base",
    icon: "/protocols/base.svg",
  },
  {
    name: "Arbitrum",
    icon: "/protocols/arbitrum.svg",
  },
] as const

export const PROTOCOLS = [
  {
    name: "AAVE",
    apy: "5.02%",
    icon: "/protocols/aave.svg",
  },
  {
    name: "Compound",
    apy: "5.87%",
    icon: "/protocols/compound.svg",
  },
  {
    name: "Morpho",
    apy: "10.78%",
    icon: "/protocols/morpho.png",
  },
] as const
