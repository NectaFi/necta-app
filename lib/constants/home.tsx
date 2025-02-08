import { Bot, Wallet, LineChart, Shield } from "lucide-react";

// Home page navigation
export const NAVBAR_MENU = [
  { title: "Blog", href: "http://blog.nectafi.xyz" },
  { title: "Docs", href: "http://blog.nectafi.xyz/docs" },
] as const;

// Footer navigation
export const FOOTER_MENU = {
  Product: [
    { title: "Launch App", href: "/app" },
    { title: "Blog", href: "http://blog.nectafi.xyz" },
    { title: "Docs", href: "http://blog.nectafi.xyz/docs" },
  ],
  Legal: [
    { title: "Privacy Policy", href: "/#" },
    { title: "Terms of Service", href: "/#" },
  ],
  Socials: [
    { title: "X", href: "https://x.com/NectaFi" },
    { title: "Github", href: "https://github.com/NectaFi" },
  ],
} as const;

// Getting Started Steps
export const GETTING_STARTED_STEPS = [
  {
    number: 1,
    title: "Connect Wallet & Deploy Your Smart Account",
    description:
      "Launch the app, connect your wallet, and deploy a secure Smart Account for automated yield optimization.",
  },
  {
    number: 2,
    title: "Deposit Assets & Activate Agents",
    description:
      "Deposit USDC and activate NectaFi’s intelligent agents to optimize your yield across DeFi protocols.",
  },
  {
    number: 3,
    title: "Track Profits & Withdraw Anytime",
    description:
      "Monitor real-time performance and withdraw your funds at any time with full self-custody.",
  },
] as const;

// Feature Section

export const FEATURES = [
  {
    id: "ai-automation",
    icon: <Bot className="h-10 w-10 text-white" />,
    title: "Multi-Agent Intelligence",
    description:
      "Three specialized AI agents collaborate to automatically optimize yields across multiple protocols, securing the highest APYs effortlessly.",
    badge: "Smart",
  },

  {
    id: "yield-optimization",
    icon: <LineChart className="h-10 w-10 text-white" />,
    title: "Automated Rebalancing",
    description:
      "Necta's AI agents continuously monitor and rebalance your portfolio in real timeto maximize returns—no manual effort needed.",
    badge: "Efficient",
  },
  {
    id: "risk-management",
    icon: <Shield className="h-10 w-10 text-white" />,
    title: "Fully On-Chain & Self-Custodial",
    description:
      " Complete security and control, allowing you to maintain full custody of your assets.",
    badge: "Secure",
  },
  {
    id: "seamless-integration",
    icon: <Wallet className="h-10 w-10 text-white" />,
    title: "Effortless Yield Optimization",
    description:
      "Necta makes earning yield easy, adaptive, and stress-free for both seasoned DeFi users and newcomers.",
    badge: "Easy",
  },
] as const;
