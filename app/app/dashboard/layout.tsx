import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation"
import { DashboardNav } from "@/components/dashboard-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <BackgroundGradientAnimation
      containerClassName="min-h-screen"
      className="relative z-10"
    >
      <div className="flex min-h-screen flex-col">
        <DashboardNav />
        <div className="flex-1">{children}</div>
      </div>
    </BackgroundGradientAnimation>
  )
}
