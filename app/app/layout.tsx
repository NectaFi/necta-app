export const dynamic = "force-dynamic"

import { AppHeader } from "@/components/app-header"
import { AppFooter } from "@/components/app-footer"
import { BackgroundGradient } from "@/components/ui/background-gradient"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <BackgroundGradient className="min-h-screen">
      <div className="flex min-h-screen flex-col">
        <AppHeader />
        <div className="flex-1">{children}</div>
        <AppFooter />
      </div>
    </BackgroundGradient>
  )
}
