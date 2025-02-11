"use client"

import { useEffect } from "react"
import { useAppStore } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, ArrowDown } from "lucide-react"
import { WalletDataDisplay } from "@/components/dashboard/wallet-data"
import { ProtocolScroll } from "@/components/ui/protocol-scroll"
import type { Position } from "@/lib/types"

export default function PortfolioPage() {
  const { walletData, isLoading, error, fetchWalletData } = useAppStore()

  useEffect(() => {
    // Initial fetch
    fetchWalletData()

    // Set up polling interval
    const interval = setInterval(fetchWalletData, 30000) // Every 30s

    return () => clearInterval(interval)
  }, [fetchWalletData])

  if (error) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (isLoading && !walletData) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-white/60">Loading portfolio data...</p>
      </div>
    )
  }

  return (
    <main className="flex min-h-[calc(100vh-128px)] flex-col px-4 pt-24">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-2xl text-white md:text-3xl">
              Portfolio
            </h1>
            <p className="mt-2 text-white/60">
              Manage your assets and track performance
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="gap-2 border-white/[0.08] bg-zinc-900/[0.65] text-white hover:bg-zinc-800/70"
            >
              <ArrowDown className="h-4 w-4" />
              Withdraw
            </Button>
            <Button className="gap-2 bg-[#F29600] text-white hover:bg-[#F29600]/80">
              <Plus className="h-4 w-4" />
              Deposit
            </Button>
          </div>
        </div>

        {/* Wallet Overview */}
        {walletData && <WalletDataDisplay data={walletData} />}

        {/* Active Protocols */}
        <Card className="border-white/[0.08] bg-zinc-900/[0.65] p-6 backdrop-blur-md">
          <h2 className="mb-6 font-medium text-lg">Active Protocols</h2>
          <ProtocolScroll />
        </Card>

        {/* Position Details */}
        <Card className="border-white/[0.08] bg-zinc-900/[0.65] p-6 backdrop-blur-md">
          <h2 className="mb-6 font-medium text-lg">Active Positions</h2>
          <div className="grid gap-4">
            {walletData?.positions.map((position: Position) => (
              <div
                key={position.protocol}
                className="flex items-center justify-between rounded-lg border border-white/[0.08] bg-white/[0.02] p-4"
              >
                <div>
                  <h3 className="font-medium">{position.protocol}</h3>
                  <p className="text-sm text-white/60">
                    Amount: {position.amount}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${position.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  )
}
