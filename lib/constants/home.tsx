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
      "Connect your wallet and deploy your safe smart account to get started with automated yield optimization.",
  },
  {
    number: 2,
    title: "Deposit USDC & Activate Agents",
    description:
      "Deposit USDC and activate Necta's specialized agents to optimize your yields across DeFi protocols.",
  },
  {
    number: 3,
    title: "Track Your Profits & Withdraw",
    description:
      "Monitor your portfolio performance in real-time and withdraw your profits anytime with full self-custody of your assets.",
  },
] as const;

// Feature Section

export const FEATURES = [
  {
    id: "ai-automation",
    icon: <Bot className="h-10 w-10 text-white" />,
    title: "Multi-Agent Intelligence",
    description:
      "Three specialized agents work together to automatically manage your portfolio, optimizing yields across multiple protocols.",
    badge: "Smart",
  },

  {
    id: "yield-optimization",
    icon: <LineChart className="h-10 w-10 text-white" />,
    title: "Automated Rebalancing",
    description:
      "Our intelligent system continuously monitors and rebalances your portfolio to maximize returns.",
    badge: "Efficient",
  },
  {
    id: "risk-management",
    icon: <Shield className="h-10 w-10 text-white" />,
    title: "Fully On-Chain & Self-Custodial",
    description:
      "Ensures complete security and control, allowing users to maintain full custody of their assets.",
    badge: "Secure",
  },
  {
    id: "seamless-integration",
    icon: <Wallet className="h-10 w-10 text-white" />,
    title: "Seamless UX",
    description:
      "Designed for both seasoned DeFi enthusiasts and crypto newcomers, Necta makes yield optimization efficient, adaptive, and stress-free.",
    badge: "Easy",
  },
] as const;
