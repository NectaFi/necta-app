"use client"

import { Card } from "@/components/ui/card"
import { Activity, Brain, Shield } from "lucide-react"

interface AgentStatus {
  name: string
  status: "active" | "inactive" | "processing"
  lastActive: string
  description: string
  icon: React.ReactNode
}

const agents: AgentStatus[] = [
  {
    name: "Curator Agent",
    status: "active",
    lastActive: "2 minutes ago",
    description:
      "Analyzing market conditions and identifying optimal yield opportunities",
    icon: <Brain className="h-5 w-5" />,
  },
  {
    name: "Executor Agent",
    status: "processing",
    lastActive: "5 minutes ago",
    description:
      "Executing position rebalancing and yield optimization strategies",
    icon: <Activity className="h-5 w-5" />,
  },
  {
    name: "Sentinel Agent",
    status: "active",
    lastActive: "1 minute ago",
    description: "Monitoring risks and ensuring strategy safety",
    icon: <Shield className="h-5 w-5" />,
  },
]

export default function DashboardPage() {
  return (
    <main className="flex min-h-[calc(100vh-128px)] flex-col px-4 pt-24">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mb-8">
          <h1 className="font-semibold text-2xl text-white md:text-3xl">
            Dashboard
          </h1>
          <p className="mt-2 text-white/60">
            Monitor your agents and strategy performance
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {agents.map((agent) => (
            <Card
              key={agent.name}
              className="relative overflow-hidden border border-white/[0.08] bg-zinc-900/[0.65] p-6 backdrop-blur-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-white/[0.08] p-2">
                    {agent.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{agent.name}</h3>
                    <div className="mt-1 flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          agent.status === "active"
                            ? "bg-green-500"
                            : agent.status === "processing"
                              ? "animate-pulse bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      />
                      <span className="text-sm text-white/60">
                        {agent.status.charAt(0).toUpperCase() +
                          agent.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm text-white/60">{agent.description}</p>

              <div className="mt-4 text-white/40 text-xs">
                Last active: {agent.lastActive}
              </div>
            </Card>
          ))}
        </div>

        {/* Placeholder for Strategy Performance */}
        <div className="mt-8">
          <h2 className="mb-4 font-medium text-white text-xl">
            Strategy Performance
          </h2>
          <Card className="border border-white/[0.08] bg-zinc-900/[0.65] p-6 backdrop-blur-md">
            <p className="text-white/60">
              Strategy performance metrics coming soon...
            </p>
          </Card>
        </div>

        {/* Placeholder for Recent Activities */}
        <div className="mt-8 mb-8">
          <h2 className="mb-4 font-medium text-white text-xl">
            Recent Activities
          </h2>
          <Card className="border border-white/[0.08] bg-zinc-900/[0.65] p-6 backdrop-blur-md">
            <p className="text-white/60">Activity feed coming soon...</p>
          </Card>
        </div>
      </div>
    </main>
  )
}
