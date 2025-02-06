import { AppHeader } from "@/components/app-header"

export default function AppPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#111111]">
      <AppHeader />

      <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <div className="max-w-2xl space-y-8">
          <h1 className="font-bold text-4xl text-white">
            Multi-Agent Yield Optimization
          </h1>
          <p className="text-2xl text-muted-foreground">Coming soon</p>
        </div>
      </main>
    </div>
  )
}
