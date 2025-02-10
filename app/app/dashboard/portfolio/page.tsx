"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, ArrowDown } from "lucide-react"

export default function PortfolioPage() {
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

        {/* Portfolio Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border border-white/[0.08] bg-zinc-900/[0.65] p-6 backdrop-blur-md">
            <h3 className="text-sm text-white/60">Total Value</h3>
            <p className="mt-2 font-semibold text-2xl text-white">$0.00</p>
            <span className="mt-1 text-green-500 text-xs">+0.00%</span>
          </Card>
          <Card className="border border-white/[0.08] bg-zinc-900/[0.65] p-6 backdrop-blur-md">
            <h3 className="text-sm text-white/60">Current APY</h3>
            <p className="mt-2 font-semibold text-2xl text-white">0.00%</p>
            <span className="mt-1 text-white/40 text-xs">
              Across all strategies
            </span>
          </Card>
          <Card className="border border-white/[0.08] bg-zinc-900/[0.65] p-6 backdrop-blur-md">
            <h3 className="text-sm text-white/60">Total Earnings</h3>
            <p className="mt-2 font-semibold text-2xl text-white">$0.00</p>
            <span className="mt-1 text-white/40 text-xs">
              All-time earnings
            </span>
          </Card>
        </div>

        {/* Asset Distribution */}
        <div className="mt-8">
          <h2 className="mb-4 font-medium text-white text-xl">
            Asset Distribution
          </h2>
          <Card className="border border-white/[0.08] bg-zinc-900/[0.65] p-6 backdrop-blur-md">
            <div className="flex items-center justify-between border-white/[0.08] border-b pb-4">
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-full bg-white/[0.08]" />
                <div>
                  <h3 className="font-medium text-white">USDC</h3>
                  <p className="text-sm text-white/60">USD Coin</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-white">$0.00</p>
                <p className="text-sm text-white/60">0.00 USDC</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Strategy Allocation */}
        <div className="mt-8 mb-8">
          <h2 className="mb-4 font-medium text-white text-xl">
            Strategy Allocation
          </h2>
          <Card className="border border-white/[0.08] bg-zinc-900/[0.65] p-6 backdrop-blur-md">
            <p className="text-white/60">No active strategies</p>
          </Card>
        </div>
      </div>
    </main>
  )
}
