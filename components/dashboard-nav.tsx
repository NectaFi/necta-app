"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { NetworkSelector } from "@/components/ui/network-selector"
import { Connect } from "@/components/connect"
import { Logo } from "@/components/ui/logo"
import { LayoutDashboard, LineChart, Settings, Wallet } from "lucide-react"

const DASHBOARD_LINKS = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    name: "Portfolio",
    href: "/dashboard/portfolio",
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    name: "Strategies",
    href: "/dashboard/strategies",
    icon: <LineChart className="h-5 w-5" />,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="h-5 w-5" />,
  },
] as const

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed inset-x-0 top-4 z-50 mx-auto max-w-[1200px] px-4"
    >
      <nav className="flex h-12 items-center justify-between rounded-[24px] border border-white/[0.1] bg-zinc-900/[0.65] backdrop-blur-md md:h-[56px]">
        <div className="flex items-center">
          <Logo className="px-4" />
        </div>

        <div className="hidden flex-1 items-center justify-center md:flex">
          <ul className="flex items-center space-x-2">
            {DASHBOARD_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-2 rounded-[12px] px-3 py-1.5 text-[15px] transition-colors",
                      isActive
                        ? "bg-white/[0.08] text-white"
                        : "text-white/70 hover:text-white",
                    )}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="flex items-center gap-2 px-2.5">
          <NetworkSelector />
          <Connect />
        </div>
      </nav>
    </motion.header>
  )
}
