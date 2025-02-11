"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { WalletData } from "@/lib/types"
import { formatEther } from "viem"

export function WalletDataDisplay({ data }: { data: WalletData }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-medium text-sm">Total Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="font-bold text-2xl">
            {formatEther(BigInt(data.totalBalance))} ETH
          </div>
          <p className="text-muted-foreground text-xs">
            {data.tokens.length} tokens tracked
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-medium text-sm">Total Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="font-bold text-2xl">
            ${data.totalValue.toFixed(2)}
          </div>
          <p className="text-muted-foreground text-xs">
            {data.positions.length} active positions
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-medium text-sm">APY</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="font-bold text-2xl">
            {data.averageApy.toFixed(2)}%
          </div>
          <p className="text-muted-foreground text-xs">
            Average across positions
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-medium text-sm">Risk Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="font-bold text-2xl">{data.riskScore}/100</div>
          <p className="text-muted-foreground text-xs">
            Portfolio risk assessment
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
