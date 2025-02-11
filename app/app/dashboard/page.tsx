"use client"

import { useEffect } from "react"
import { useAppStore } from "@/lib/store"
import { AgentStatusCard } from "@/components/dashboard/agent-status-card"
import { ThoughtFeed } from "@/components/dashboard/thought-feed"
import { WalletDataDisplay } from "@/components/dashboard/wallet-data"
import type { AgentStatus } from "@/lib/types"

export default function DashboardPage() {
  const {
    agents,
    thoughts,
    walletData,
    isLoading,
    error,
    fetchAgentStatus,
    fetchThoughts,
    fetchWalletData,
  } = useAppStore()

  useEffect(() => {
    // Initial fetch
    fetchAgentStatus()
    fetchThoughts()
    fetchWalletData()

    // Set up polling intervals
    const statusInterval = setInterval(fetchAgentStatus, 10000) // Every 10s
    const thoughtsInterval = setInterval(fetchThoughts, 5000) // Every 5s
    const walletInterval = setInterval(fetchWalletData, 30000) // Every 30s

    return () => {
      clearInterval(statusInterval)
      clearInterval(thoughtsInterval)
      clearInterval(walletInterval)
    }
  }, [fetchAgentStatus, fetchThoughts, fetchWalletData])

  if (error) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (isLoading && !agents.length && !thoughts.length && !walletData) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-white/60">Loading dashboard data...</p>
      </div>
    )
  }

  return (
    <div className="container space-y-8 py-8">
      {/* Agent Status Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent: AgentStatus) => (
          <AgentStatusCard key={agent.agent} agent={agent} />
        ))}
      </div>

      {/* Wallet Data */}
      {walletData && <WalletDataDisplay data={walletData} />}

      {/* Thought Feed */}
      <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-6">
        <h2 className="mb-6 font-medium text-lg">System Events</h2>
        <ThoughtFeed thoughts={thoughts} />
      </div>
    </div>
  )
}
