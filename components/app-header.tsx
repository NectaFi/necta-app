"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import { Logo } from "@/components/ui/logo"
import { Button } from "@/components/ui/button"
import { useWindow } from "@/hooks/use-window"
import { APP_MENU } from "@/lib/constants/app"
import { Connect } from "@/components/connect"
import { NetworkSelector } from "@/components/ui/network-selector"

export function AppHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const { isMobile } = useWindow()

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed inset-x-0 top-4 z-50 mx-auto max-w-[1200px] px-4"
    >
      <nav className="flex h-12 items-center justify-between rounded-[24px] bg-white/80 shadow-[0_4px_12px_0_rgba(0,0,0,0.08)] ring-1 ring-black/[0.08] backdrop-blur-md md:h-[56px] dark:bg-zinc-800/80 dark:ring-white/[0.08]">
        <div className="flex items-center">
          <Logo className="px-4" />
        </div>

        <div className="hidden flex-1 items-center justify-center md:flex">
          <ul className="flex items-center space-x-10">
            {APP_MENU.map((route) => (
              <li key={route.href}>
                <Link
                  href={route.href}
                  className="flex items-center gap-2 font-medium text-[#23191A]/90 text-[16px] transition-colors hover:text-[#F29600]"
                >
                  {route.icon}
                  {route.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2 px-2.5">
          <NetworkSelector />
          <Connect />

          <Button
            size="icon"
            className="h-8 w-8 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {isOpen && isMobile && (
        <div className="mt-2 rounded-[24px] border bg-white/80 p-4 shadow-[0_4px_12px_0_rgba(0,0,0,0.08)] backdrop-blur-md md:hidden dark:bg-zinc-800/80">
          <ul className="space-y-3">
            {APP_MENU.map((route) => (
              <li key={route.href}>
                <Link
                  href={route.href}
                  className="flex items-center gap-2 rounded-[24px] px-4 py-2 text-[#23191A]/80 text-[16px] transition-colors hover:text-[#F29600]"
                  onClick={() => setIsOpen(false)}
                >
                  {route.icon}
                  {route.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.header>
  )
}
