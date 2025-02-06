import { Bot, Wallet, LineChart, Shield } from "lucide-react";

// Home page navigation
export const NAVBAR_MENU = [
  { title: "Blog", href: "http://blog.nectafi.xyz" },
  { title: "Docs", href: "http://docs.nectafi.xyz" },
] as const;

// Footer navigation
export const FOOTER_MENU = {
  Product: [
    { title: "Launch App", href: "/app" },
    { title: "Blog", href: "http://blog.nectafi.xyz" },
    { title: "Docs", href: "http://docs.nectafi.xyz" },
  ],
  Legal: [
    { title: "Privacy Policy", href: "/legal/privacy" },
    { title: "Terms of Service", href: "/legal/terms" },
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
      "Connect your wallet and deploy a secure Smart Account for automated yield optimization.",
  },
  {
    number: 2,
    title: "Deposit USDC & Activate Agents",
    description:
      "Deposit USDC and activate NectaFi’s intelligent agents to start optimizing your yield across DeFi protocols.",
  },
  {
    number: 3,
    title: "Track Profits & Withdraw Anytime",
    description:
      "Monitor real-time portfolio performance and withdraw your funds anytime with full self-custody.",
  },
] as const;

// Feature Section

export const FEATURES = [
  {
    id: "ai-automation",
    icon: <Bot className="h-10 w-10 text-white" />,
    title: "Multi-Agent Intelligence",
    description:
      "Three specialized agents work together to optimize yields across multiple protocols automatically.",
    badge: "Smart",
  },

  {
    id: "yield-optimization",
    icon: <LineChart className="h-10 w-10 text-white" />,
    title: "Automated Rebalancing",
    description:
      "Necta continuously monitors and rebalances your portfolio to maximize returns without manual intervention.",
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
    title: "Seamless UX",
    description:
      "Necta makes yield optimization efficient, adaptive, and stress-free for both seasoned DeFi users and newcomers.",
    badge: "Easy",
  },
] as const;
