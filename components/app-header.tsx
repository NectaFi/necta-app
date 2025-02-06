"use client"

import { Logo } from "@/components/ui/logo"
import { Button } from "@/components/ui/button"

export function AppHeader() {
  return (
    <header className="border-none bg-transparent px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Logo variant="dark" />
        <Button>Connect Wallet</Button>
      </div>
    </header>
  )
}
