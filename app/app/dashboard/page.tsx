"use client"

import { useState } from "react"
import { Brain, Eye, Terminal } from "lucide-react"
import { Card } from "@/components/ui/card"
import { SystemEvents } from "@/components/ui/system-events"
import { cn } from "@/lib/utils"

interface AgentStatus {
  name: string
  status: "active" | "processing" | "inactive"
  description: string
  icon: React.ReactNode
  lastActive: string
}

export default function DashboardPage() {
  const [agents, _setAgents] = useState<AgentStatus[]>([
    {
      name: "Curator Agent",
      status: "active",
      description:
        "Analyzing market conditions and identifying optimal yield opportunities",
      icon: <Brain className="h-5 w-5 text-white/80" />,
      lastActive: "2 minutes ago",
    },
    {
      name: "Executor Agent",
      status: "processing",
      description:
        "Executing position rebalancing and yield optimization strategies",
      icon: <Terminal className="h-5 w-5 text-white/80" />,
      lastActive: "5 minutes ago",
    },
    {
      name: "Sentinel Agent",
      status: "active",
      description: "Monitoring risks and ensuring strategy safety",
      icon: <Eye className="h-5 w-5 text-white/80" />,
      lastActive: "1 minute ago",
    },
  ])

  return (
    <main className="container mx-auto max-w-[1200px] px-4 py-8">
      <div className="mb-8">
        <h1 className="font-semibold text-2xl text-white">Dashboard</h1>
        <p className="text-white/60">
          Monitor your agents and strategy performance
        </p>
      </div>

      {/* Agent Status Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {agents.map((agent) => (
          <Card
            key={agent.name}
            className="border-white/[0.08] bg-zinc-900/[0.65] p-4 backdrop-blur-md"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08]">
                {agent.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-white">{agent.name}</h3>
                  <span
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs",
                      agent.status === "active"
                        ? "bg-green-500/10 text-green-500"
                        : agent.status === "processing"
                          ? "bg-yellow-500/10 text-yellow-500"
                          : "bg-red-500/10 text-red-500",
                    )}
                  >
                    <span className="relative flex h-2 w-2">
                      <span
                        className={cn(
                          "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                          agent.status === "active"
                            ? "bg-green-500"
                            : agent.status === "processing"
                              ? "bg-yellow-500"
                              : "bg-red-500",
                        )}
                      />
                      <span
                        className={cn(
                          "relative inline-flex h-2 w-2 rounded-full",
                          agent.status === "active"
                            ? "bg-green-500"
                            : agent.status === "processing"
                              ? "bg-yellow-500"
                              : "bg-red-500",
                        )}
                      />
                    </span>
                    {agent.status.charAt(0).toUpperCase() +
                      agent.status.slice(1)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-white/60">
                  {agent.description}
                </p>
                <p className="mt-2 text-white/40 text-xs">
                  Last active: {agent.lastActive}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Strategy Performance */}
      <div className="mb-8">
        <h2 className="mb-4 font-medium text-white text-xl">
          Strategy Performance
        </h2>
        <Card className="border-white/[0.08] bg-zinc-900/[0.65] p-6 backdrop-blur-md">
          <p className="text-white/60">
            Strategy performance metrics coming soon...
          </p>
        </Card>
      </div>

      {/* Recent Activities */}
      <div>
        <h2 className="mb-4 font-medium text-white text-xl">
          Recent Activities
        </h2>
        <SystemEvents />
      </div>
    </main>
  )
}
