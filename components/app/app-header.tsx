"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { useWindow } from "@/hooks/use-window";
import { APP_MENU } from "@/lib/constants/app";
import { Connect } from "@/components/app/connect";
import { NetworkSelector } from "@/components/app/network-selector";
import { useEffect } from "react";

export function AppHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isMobile } = useWindow();

  useEffect(() => {
    setMounted(true);
  }, []);

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
          {APP_MENU.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="flex items-center gap-2 font-medium text-[16px] text-white/70 transition-colors hover:text-[#F29600]"
            >
              {route.icon}
              {route.title}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 px-2.5">
          <NetworkSelector />
          <Connect />

          {mounted && (
            <Button
              size="icon"
              className="h-8 w-8 md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          )}
        </div>
      </nav>

      {mounted && isOpen && isMobile && (
        <div className="mt-2 rounded-[24px] border border-white/[0.1] bg-zinc-900/[0.65] p-4 backdrop-blur-md md:hidden">
          {APP_MENU.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="flex items-center gap-2 rounded-[24px] px-4 py-2 text-[16px] text-white/70 transition-colors hover:text-[#F29600]"
              onClick={() => setIsOpen(false)}
            >
              {route.icon}
              {route.title}
            </Link>
          ))}
        </div>
      )}
    </motion.header>
  );
}
